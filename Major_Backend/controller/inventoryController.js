const Supplier = require("../models/supplier");
const Inventory = require("../models/inventory");
const Retailer = require("../models/retailer");
const ProductRequest = require("../models/productRequest");
const Sale = require("../models/sale");

// Helper function to format a date to 'YYYY-MM-DD'
const formatDateToYYYYMMDD = (date) => {
  const d = new Date(date);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const api_add_product = async (req, res) => {
  try {
    const {
      productName,
      description,
      quantity,
      price,
      batchNumber,
      manufactureDate,
      expiryDate,
      supplierEmail,
      supplierName,
      retailerEmail,
    } = req.body;

    // Format dates to 'YYYY-MM-DD'
    const formattedManufactureDate = formatDateToYYYYMMDD(manufactureDate);
    const formattedExpiryDate = formatDateToYYYYMMDD(expiryDate);

    // Find the inventory for the retailer
    let inventory = await Inventory.findOne({ retailerEmail });

    if (!inventory) {
      // If no inventory exists for the retailer, create one
      inventory = new Inventory({ retailerEmail, products: [] });
    }

    // Find an existing product in the inventory
    const existingProduct = inventory.products.find(
      (product) =>
        product.productName === productName &&
        product.manufactureDate === formattedManufactureDate &&
        product.expiryDate === formattedExpiryDate &&
        product.price === price
    );

    if (existingProduct) {
      // If the product exists, update its quantity
      existingProduct.quantity += quantity;
    } else {
      // If the product does not exist, generate a unique productId and add the new product to the inventory
      const productId = `PROD-${Date.now()}-${Math.floor(
        Math.random() * 1000
      )}`;

      inventory.products.push({
        productId,
        productName,
        description,
        quantity,
        price,
        batchNumber,
        manufactureDate: formattedManufactureDate, // Store in 'YYYY-MM-DD' format
        expiryDate: formattedExpiryDate, // Store in 'YYYY-MM-DD' format
        supplierEmail,
        supplierName,
      });
    }

    // Save the updated inventory
    await inventory.save();

    res.json({ msg: "Product added successfully" });
  } catch (err) {
    console.error(err.message);
    if (err.code === 11000) {
      return res.status(400).json({ msg: "Duplicate product ID" });
    }
    res.status(500).send("Server Error");
  }
};

const api_update_quantity = async (req, res) => {
  try {
    const {
      productName,
      quantitySold,
      price,
      manufactureDate,
      expiryDate,
      retailerEmail,
    } = req.body;

    // Format dates to 'YYYY-MM-DD'
    const formattedManufactureDate = formatDateToYYYYMMDD(manufactureDate);
    const formattedExpiryDate = formatDateToYYYYMMDD(expiryDate);

    // Find the inventory for the retailer
    let inventory = await Inventory.findOne({ retailerEmail });

    if (!inventory) {
      return res
        .status(404)
        .json({ msg: "Inventory not found for the retailer" });
    }

    // Find products matching the criteria
    const productsToUpdate = inventory.products.filter(
      (product) =>
        product.productName === productName &&
        product.price === price &&
        product.manufactureDate === formattedManufactureDate &&
        product.expiryDate === formattedExpiryDate
    );

    if (productsToUpdate.length === 0) {
      return res
        .status(404)
        .json({ msg: "No matching product found in inventory" });
    }

    // Check if there's enough quantity in the first matching product
    let productUpdated = false;
    for (let product of productsToUpdate) {
      if (product.quantity >= quantitySold) {
        // Update the quantity
        product.quantity -= quantitySold;
        productUpdated = true;
        break;
      }
    }

    if (!productUpdated) {
      return res.status(400).json({ msg: "Not enough quantity available" });
    }

    // Save the updated inventory
    await inventory.save();

    // Save the sale information
    const sale = new Sale({
      productName,
      quantitySold,
      price,
      manufactureDate: formattedManufactureDate,
      expiryDate: formattedExpiryDate,
      retailerEmail,
      saleDate: new Date(),
    });

    await sale.save();

    res.json({
      msg: "Product quantity updated and sale recorded successfully",
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

const api_get_sales_data = async (req, res) => {
  try {
    const { retailerEmail } = req.body;

    if (!retailerEmail) {
      return res.status(400).json({ msg: "Retailer email is required" });
    }

    // Build the query object
    const query = { retailerEmail };

    // Fetch the sales data
    const sales = await Sale.find(query);

    // Aggregate data for analytics
    const totalSales = sales.reduce((sum, sale) => sum + sale.quantitySold, 0);
    const totalRevenue = sales.reduce(
      (sum, sale) => sum + sale.quantitySold * sale.price,
      0
    );

    const monthlySales = {};
    const monthlyRevenue = {};
    const productSales = {};

    sales.forEach((sale) => {
      const monthYear = `${sale.month}-${sale.year}`;
      if (!monthlySales[monthYear]) {
        monthlySales[monthYear] = 0;
        monthlyRevenue[monthYear] = 0;
      }
      monthlySales[monthYear] += sale.quantitySold;
      monthlyRevenue[monthYear] += sale.quantitySold * sale.price;

      if (!productSales[sale.productName]) {
        productSales[sale.productName] = 0;
      }
      productSales[sale.productName] += sale.quantitySold;
    });

    const topSellingProducts = Object.entries(productSales)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5);

    res.json({
      totalSales,
      totalRevenue,
      monthlySales,
      monthlyRevenue,
      topSellingProducts,
      salesByProduct: productSales,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

const api_getRetailersForSupplier = async (req, res) => {
  try {
    const { supplierEmail } = req.body;

    if (!supplierEmail) {
      return res.status(400).send("Supplier email is required");
    }

    // Find inventories containing products from the given supplier
    const inventories = await Inventory.find({
      "products.supplierEmail": supplierEmail,
    });

    // Extract unique retailer emails
    const retailerEmails = [
      ...new Set(inventories.map((inventory) => inventory.retailerEmail)),
    ];

    // Fetch detailed retailer information using the extracted emails
    const retailers = await Retailer.find({ email: { $in: retailerEmails } });

    res.json(retailers);
    // console.log(retailers);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

const api_getSuppliersForRetailer = async (req, res) => {
  try {
    const { retailerEmail } = req.body;
    // console.log(retailerEmail);

    if (!retailerEmail) {
      return res
        .status(400)
        .json({ error: "Retailer Email email is required" });
    }
    const inventories = await Inventory.find({ retailerEmail });
    const supplierEmails = [
      ...new Set(
        inventories
          .map((inventory) =>
            inventory.products.map((product) => product.supplierEmail)
          )
          .flat()
      ),
    ];
    const suppliers = await Supplier.find({ email: { $in: supplierEmails } });

    res.json(suppliers);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

const api_getExpiringProducts = async (req, res) => {
  try {
    const { retailerEmail, days } = req.body;
    if (!retailerEmail) {
      return res.status(400).json({ message: "retailerEmail is required" });
    }

    const inventory = await Inventory.findOne({ retailerEmail });
    if (!inventory) {
      return res.status(404).json({ message: "Inventory not found" });
    }

    const currentDate = new Date();

    const getFormattedDates = (days) => {
      const targetDate = new Date();
      targetDate.setDate(currentDate.getDate() + days);
      const formattedCurrentDate = formatDateToYYYYMMDD(currentDate);
      const formattedTargetDate = formatDateToYYYYMMDD(targetDate);
      return { formattedCurrentDate, formattedTargetDate };
    };

    const filterExpiringProducts = (startDate, endDate) => {
      return inventory.products.filter((product) => {
        const formattedExpiryDate = formatDateToYYYYMMDD(product.expiryDate);
        return (
          formattedExpiryDate >= startDate && formattedExpiryDate <= endDate
        );
      });
    };

    if (days == null) {
      const { formattedCurrentDate, formattedTargetDate } =
        getFormattedDates(7);
      const expiringProducts = filterExpiringProducts(
        formattedCurrentDate,
        formattedTargetDate
      );
      return res
        .status(200)
        .json({ expiringProductsCount: expiringProducts.length });
    } else {
      const { formattedCurrentDate, formattedTargetDate } =
        getFormattedDates(days);
      const expiringProducts = filterExpiringProducts(
        formattedCurrentDate,
        formattedTargetDate
      );
      return res.status(200).json({ expiringProducts });
    }
  } catch (error) {
    console.error("Error Fetching Expiring Products:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const api_getExpiringProductsForSupplier = async (req, res) => {
  try {
    const { retailerEmail, days, supplierEmail } = req.body;
    if (!retailerEmail) {
      return res.status(400).json({ message: "retailerEmail is required" });
    }
    if (!supplierEmail) {
      return res.status(400).json({ message: "supplierEmail is required" });
    }

    const inventory = await Inventory.findOne({ retailerEmail });
    if (!inventory) {
      return res.status(404).json({ message: "Inventory not found" });
    }
    const currentDate = new Date();

    const getFormattedDates = (days) => {
      const targetDate = new Date();
      targetDate.setDate(currentDate.getDate() + days);
      const formattedCurrentDate = formatDateToYYYYMMDD(currentDate);
      const formattedTargetDate = formatDateToYYYYMMDD(targetDate);
      return { formattedCurrentDate, formattedTargetDate };
    };

    const filterExpiringProducts = (startDate, endDate) => {
      return inventory.products.filter((product) => {
        const formattedExpiryDate = formatDateToYYYYMMDD(product.expiryDate);
        return (
          product.supplierEmail === supplierEmail &&
          formattedExpiryDate >= startDate &&
          formattedExpiryDate <= endDate
        );
      });
    };

    if (!days) {
      const { formattedCurrentDate, formattedTargetDate } =
        getFormattedDates(7);
      const expiringProducts = filterExpiringProducts(
        formattedCurrentDate,
        formattedTargetDate
      );
      return res.json({ expiringProductsCount: expiringProducts.length });
    } else {
      const { formattedCurrentDate, formattedTargetDate } =
        getFormattedDates(days);
      const expiringProducts = filterExpiringProducts(
        formattedCurrentDate,
        formattedTargetDate
      );
      return res.json({ expiringProducts });
    }
  } catch (error) {
    console.error("Error Fetching Expiring Products:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
const api_getInventory = async (req, res) => {
  try {
    const { retailerEmail } = req.body;
    const inventory = await Inventory.findOne({ retailerEmail });
    if (!inventory) {
      return res.status(404).json({ msg: "Inventory not found" });
    }
    res.json(inventory);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

const api_getInventoryForRetailerBySupplier = async (req, res) => {
  try {
    const { retailerEmail, supplierEmail } = req.body;
    const inventory = await Inventory.findOne({ retailerEmail });

    if (!inventory) {
      return res.status(404).json({ msg: "Inventory not found" });
    }
    const supplierProducts = inventory.products.filter(
      (product) => product.supplierEmail === supplierEmail
    );

    res.json(supplierProducts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

const api_productRequests = async (req, res) => {
  try {
    const {
      productName,
      price,
      quantity,
      supplierEmail,
      retailerEmail,
      expiryDate,
      reqType,
    } = req.body;

    const requestId = `REQ-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

    const newProductRequest = new ProductRequest({
      requestId: requestId,
      productName,
      price,
      quantity,
      supplierEmail,
      retailerEmail,
      expiryDate,
      reqType,
    });
    const savedProductRequest = await newProductRequest.save();
    res.status(201).json(savedProductRequest);
  } catch (error) {
    console.error("Error saving product request:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const api_SeeProductRequests = async (req, res) => {
  try {
    const { supplierEmail } = req.body;

    const productRequests = await ProductRequest.find({
      supplierEmail: supplierEmail,
    }).sort({ createdAt: -1 });
    res.json(productRequests);
  } catch (error) {
    console.error("Error Fetching Product Request:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const api_getRetailerProductRequests = async (req, res) => {
  try {
    const { retailerEmail } = req.body;
    const productRequests = await ProductRequest.find({
      retailerEmail,
    });
    res.json(productRequests);
  } catch (error) {
    console.error("Error Fetching Product Request:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const api_updateProductRequestStatus = async (req, res) => {
  try {
    const { requestId, reqStatus } = req.body;
    const productRequest = await ProductRequest.findOneAndUpdate(
      { requestId },
      { reqStatus },
      { new: true }
    );
    if (!productRequest) {
      return res.status(404).json({ msg: "Product request not found" });
    }

    res.json({ msg: "Product request status updated", productRequest });
  } catch (error) {
    console.error("Error updating product request status:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const api_getSuppliersAndRetailers = async (req, res) => {
  try {
    const suppliers = await Supplier.find();
    const retailers = await Retailer.find();
    res.json({ suppliers, retailers });
  } catch (error) {
    console.error("Error fetching suppliers and retailers:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
module.exports = {
  api_add_product,
  api_update_quantity,
  api_getRetailersForSupplier,
  api_getSuppliersForRetailer,
  api_getExpiringProducts,
  api_getInventory,
  api_getInventoryForRetailerBySupplier,
  api_productRequests,
  api_SeeProductRequests,
  api_get_sales_data,
  api_updateProductRequestStatus,
  api_getRetailerProductRequests,
  api_getExpiringProductsForSupplier,
  api_getSuppliersAndRetailers,
};
