import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select"; // Corrected import path
import { useState, useEffect } from "react";
import { useGetRetailerInventoryMutation } from "../../services/common/index.js";
import { usePostSaleProductMutation } from "../../services/common/index.js";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SaleProduct = () => {
  const retailerEmail = localStorage.getItem("email");

  const [getRetailerInventory, { isLoading }] =
    useGetRetailerInventoryMutation();
  const [postSaleProduct, { isLoadingPostProduct }] =
    usePostSaleProductMutation();

  const [inventoryData, setInventoryData] = useState([]);

  useEffect(() => {
    const getInventory = async () => {
      const response = await getRetailerInventory({ retailerEmail }).unwrap();
   
      setInventoryData(response.products);
    };
    getInventory();
  }, [getRetailerInventory, retailerEmail]);

  const [formData, setFormData] = useState({
    productName: "",
    quantitySold: "",
    price: "",
    manufactureDate: "",
    expiryDate: "",
    retailerEmail: retailerEmail,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await postSaleProduct(formData).unwrap();
   

      toast.success("Product Sale Done successfully!", {
        position: "top-right",
        autoClose: 1000,
      });
    } catch (error) {
      console.error("Product Sale Failed:", error);
      toast.error(`Product Sale ! ${error.data.msg}`, {
        position: "top-right",
        autoClose: 2000,
      });
    }
  };

  const handleProductSelect = (productName) => {
    const selectedProduct = inventoryData.find(
      (product) => product.productName === productName
    );
    if (selectedProduct) {
      setFormData({
        productName: selectedProduct.productName,
        quantitySold: selectedProduct.quantity,
        price: selectedProduct.price,
        manufactureDate: selectedProduct.manufactureDate,
        expiryDate: selectedProduct.expiryDate,
        retailerEmail: retailerEmail,
      });
    }
  };

  return (
    <>
      <ToastContainer />

      <div className="flex justify-center mt-2">
        
        <form
          onSubmit={handleFormSubmit}
          className="space-y-4 p-4 w-[600px] bg-white rounded-2xl"
        >
          <h1 className="text-2xl font-extrabold mb-6 text-center text-gray-400">Product Sale</h1>
          <Select onValueChange={handleProductSelect}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select product" />
            </SelectTrigger>
            <SelectContent>
              {inventoryData.map((product) => (
                <SelectItem key={product.productId} value={product.productName}>
                  {product.productName}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Input
            label="Quantity Sold"
            name="quantitySold"
            value={formData.quantitySold}
            onChange={handleInputChange}
            placeholder="Enter quantity sold"
            type="number"
            className="w-full"
            required
          />
          <Input
            label="Price"
            name="price"
            value={formData.price}
            onChange={handleInputChange}
            placeholder="Enter price"
            type="number"
            className="w-full"
            required
          />
          <Input
            label="Manufacture Date"
            name="manufactureDate"
            value={formData.manufactureDate}
            onChange={handleInputChange}
            placeholder="Enter manufacture date"
            type="date"
            className="w-full"
            required
            disabled
          />
          <Input
            label="Expiry Date"
            name="expiryDate"
            value={formData.expiryDate}
            onChange={handleInputChange}
            placeholder="Enter expiry date"
            type="date"
            className="w-full"
            required
            disabled
          />
          <Input
            label="Retailer Email"
            name="retailerEmail"
            value={formData.retailerEmail}
            onChange={handleInputChange}
            placeholder="Enter retailer email"
            type="email"
            className="w-full"
            required
            disabled
          />

          <Button
            type="submit"
            className="w-full bg-orange-500 text-white mt-4 hover:bg-black p-2"
          >
            Submit
          </Button>
        </form>
      </div>
    </>
  );
};

export default SaleProduct;
