const TransferTask = require("../models/tranferTask");
const Supplier = require("../models/supplier");
const Retailer = require("../models/retailer");

const api_add_driver = async (req, res) => {
  try {
    const {
      supplierEmail,
      driverName,
      phoneNumber,
      vehicleNumber,
      driverEmail,
      serviceArea,
      vehicleType,
    } = req.body;

    const supplier = await Supplier.findOne({ email: supplierEmail });
    if (!supplier) {
      return res.status(400).json({ msg: "Supplier not found" });
    }

    const driverId = `DRV-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
    const newDriver = {
      driverId,
      driverName,
      phoneNumber,
      vehicleNumber,
      driverEmail,
      serviceArea,
      vehicleType,
    };

    supplier.drivers.push(newDriver);
    await supplier.save();

    res.json({ msg: "Driver added successfully", driver: newDriver });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

const api_get_drivers = async (req, res) => {
  try {
    const { supplierEmail } = req.body;

    const supplier = await Supplier.findOne({ email: supplierEmail });
    if (!supplier) {
      return res.status(400).json({ msg: "Supplier not found" });
    }

    res.json(supplier.drivers);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

const api_remove_driver = async (req, res) => {
  try {
    const { supplierId, driverId } = req.body;

    const supplier = await Supplier.findOne({ supplierId });
    if (!supplier) {
      return res.status(400).json({ msg: "Supplier not found" });
    }

    supplier.drivers = supplier.drivers.filter(
      (driver) => driver.driverId !== driverId
    );
    await supplier.save();

    res.json({ msg: "Driver removed successfully" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

const assign_transfer_task = async (req, res) => {
  try {
    const {
      sourceRetailerEmail,
      sourceRetailerName,
      sourceRetailerAddress,
      targetRetailerEmail,
      targetRetailerName,
      targetRetailerAddress,
      products,
      supplierEmail,
      driverEmail,
    } = req.body;

    const supplier = await Supplier.findOne({ email: supplierEmail });
    if (!supplier) {
      return res.status(400).json({ msg: "Supplier not found" });
    }

    const driver = supplier.drivers.find(
      (driver) => driver.driverEmail === driverEmail
    );
    if (!driver) {
      return res.status(400).json({ msg: "Driver not found" });
    }

    const taskId = `TASK-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
    const newTask = new TransferTask({
      taskId,
      sourceRetailerEmail,
      sourceRetailerName,
      sourceRetailerAddress,
      targetRetailerEmail,
      targetRetailerName,
      targetRetailerAddress,
      products,
      driverEmail,
      supplierEmail,
    });

    await newTask.save();

    const sendEmail = require("../config/emailConfig");
    const emailTemplate = require("../utils/emailTemplate");

    const emailContent = emailTemplate({
      sourceRetailerName,
      sourceRetailerAddress,
      targetRetailerName,
      targetRetailerAddress,
      products,
      supplierEmail,
      driverEmail,
      taskId,
    });

    await sendEmail(driverEmail, "New Transfer Task Assigned", emailContent);

    res.json({ msg: "Transfer task assigned successfully", task: newTask });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

const api_update_task_status = async (req, res) => {
  try {
    const { taskId } = req.params;

    const task = await TransferTask.findOne({ taskId });
    if (!task) {
      return res.status(404).json({ msg: "Task not found" });
    }

    task.status = "completed";
    await task.save();

    res.status(200).send(`
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Task Confirmation</title>
        <style>
          body {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            margin: 0;
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
          }
          .container {
            text-align: center;
            padding: 20px;
            background-color: #ffffff;
            border-radius: 8px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            max-width: 90%;
            margin: auto;
          }
          h1 {
            color: #28a745;
            font-size: 24px;
            margin-bottom: 20px;
          }
          .task-id {
            color: #FF0000;
            font-weight: bold;
          }
          p {
            font-size: 18px;
            color: #333;
          }
          @media (max-width: 600px) {
            h1 {
              font-size: 20px;
            }
            p {
              font-size: 16px;
            }
          }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>Task Confirmed for TaskId: <span class="task-id">${taskId}</span></h1>
          <p>Thank you for confirming the task completion.</p>
        </div>
      </body>
      </html>
    `);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

const api_get_tranferTask_data = async (req, res) => {
  try {
    const { supplierEmail } = req.body;
    const supplier = await Supplier.findOne({ email: supplierEmail });
    if (!supplier) {
      return res.status(400).json({ msg: "Supplier not found" });
    }
    const tasks = await TransferTask.find({
      supplierEmail: supplierEmail,
    }).sort({ createdAt: -1 });
    res.json(tasks);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};
const api_get_completed_TransferTask_count = async (req, res) => {
  try {
    const { supplierEmail } = req.body;

    const supplier = await Supplier.findOne({ email: supplierEmail });
    if (!supplier) {
      return res.status(400).json({ msg: "Supplier not found" });
    }

    const completedTaskCount = await TransferTask.countDocuments({
      supplierEmail: supplierEmail,
      status: "completed",
    });

    res.json({ completedTaskCount: completedTaskCount });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

const api_get_savedProductsDataRetailer = async (req, res) => {
  try {
    const { retailerEmail } = req.body;

    // Find all transfer tasks for the given retailer email with status 'completed'
    const completedTransferTasksForRetailer = await TransferTask.find({
      sourceRetailerEmail: retailerEmail,
      status: "completed",
    });

    if (completedTransferTasksForRetailer.length === 0) {
      return res.status(400).json({ msg: "No Products Found" });
    }

    // Initialize counters for total products and total revenue
    let totalProductsCountSaved = 0;
    let totalRevenueGenerated = 0;

    // Iterate through each completed transfer task
    completedTransferTasksForRetailer.forEach((task) => {
      task.products.forEach((product) => {
        const quantity = parseInt(product.quantity, 10);
        const price = parseFloat(product.price);

        totalProductsCountSaved += quantity;
        totalRevenueGenerated += quantity * price;
      });
    });

    // Return the total count of products and total revenue
    return res.status(200).json({
      totalProductsCountSaved,
      totalRevenueGenerated,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

const api_getwebStats = async (req, res) => {
  try {
    const completedTransferTasks = await TransferTask.find({
      status: "completed",
    });
    const totalSupplier = await Supplier.find();
    const totalRetailer = await Retailer.find();

    const totalsuppliercount = totalSupplier.length;
    const totalRetailercount = totalRetailer.length;

    let totalProductsCountSaved = 0;
    let totalRevenueGenerated = 0;

    completedTransferTasks.forEach((task) => {
      task.products.forEach((product) => {
        const quantity = parseInt(product.quantity, 10);
        const price = parseFloat(product.price);

        totalProductsCountSaved += quantity;
        totalRevenueGenerated += quantity * price;
      });
    });
    return res.status(200).json({
      totalProductsCountSaved: totalProductsCountSaved,
      totalRevenueGenerated: totalRevenueGenerated,
      totalUsercount: totalRetailercount + totalsuppliercount,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

const api_get_savedProductsDataSupplier = async (req, res) => {
  try {
    const { supplierEmail } = req.body;

    const completedTransferTasksForSupplier = await TransferTask.find({
      supplierEmail: supplierEmail,
      status: "completed",
    });

    if (completedTransferTasksForSupplier.length === 0) {
      return res.status(400).json({ msg: "No Products Found" });
    }

    // Initialize counters for total products and total revenue
    let totalProductsCountSaved = 0;
    let totalRevenueGenerated = 0;

    // Iterate through each completed transfer task
    completedTransferTasksForSupplier.forEach((task) => {
      task.products.forEach((product) => {
        const quantity = parseInt(product.quantity, 10);
        const price = parseFloat(product.price);

        totalProductsCountSaved += quantity;
        totalRevenueGenerated += quantity * price;
      });
    });

    // Return the total count of products and total revenue
    return res.status(200).json({
      totalProductsCountSaved,
      totalRevenueGenerated,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

module.exports = {
  api_add_driver,
  api_get_drivers,
  api_remove_driver,
  assign_transfer_task,
  api_update_task_status,
  api_get_tranferTask_data,
  api_get_savedProductsDataRetailer,
  api_get_savedProductsDataSupplier,
  api_get_completed_TransferTask_count,
  api_getwebStats,
};
