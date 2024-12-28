import { useState, useEffect } from "react";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Textarea } from "../../components/ui/textarea";
import { useGetSupplierForRetailerMutation } from "../../services/common/index.js";
import SelectComponent from "./Components/SupplierSelect";
import { usePostAddProductMutation } from "../../services/common/index.js";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SaleProduct from "./SaleProduct";
export default function ProductForm({}) {
  const [supplierData, { isLoading }] = useGetSupplierForRetailerMutation();
  const [postAddProduct, { isLoadingPostProduct }] =
    usePostAddProductMutation();

  const [supplierResponse, setsupplierResponse] = useState([]);

  const retailerEmail = localStorage.getItem("email");

  const [formData, setFormData] = useState({
    productName: "",
    description: "",
    quantity: "",
    price: "",
    batchNumber: "",
    manufactureDate: "",
    expiryDate: "",
    supplierEmail: "",
    supplierName: "",
    retailerEmail: retailerEmail,
  });

  useEffect(() => {
    try {
      const response = supplierData({ retailerEmail })
        .unwrap()
        .then((response) => {
          const dataArray = Array.isArray(response) ? response : [response];

          setsupplierResponse(dataArray);
        })
        .catch((error) => console.error("Error fetching retailers:", error));
    } catch (error) {
      console.error(`No supplier data found ${error}`);
    }
  }, [supplierData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };
  const handleSelectEmailChange = (email) => {
    setFormData((prevData) => ({ ...prevData, supplierEmail: email }));
  };

  const handleSelectNameChange = (name) => {
    setFormData((prevData) => ({ ...prevData, supplierName: name }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await postAddProduct(formData).unwrap();

      toast.success("Product Added successfully!", {
        position: "top-right",
        autoClose: 1000,
      });
    } catch (error) {
      console.error("Add Product Error:", error);
      toast.error(`Add Product! ${error.data.msg}`, {
        position: "top-right",
        autoClose: 2000,
      });
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="flex justify-center mt-2 space-x-8 items-center">
        <div className="flex justify-center mt-2">
          <form
            onSubmit={handleSubmit}
            className="space-y-2 p-4 w-[600px] bg-white rounded-2xl"
          >
            <h1 className="text-2xl font-extrabold mb-6 text-center text-gray-400 ">
              Add Product{" "}
            </h1>
            <Input
              label="Product Name"
              name="productName"
              value={formData.productName}
              onChange={handleInputChange}
              placeholder="Enter product name"
              className="w-full "
              required
            />
            <Textarea
              label="Description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Enter description"
              className="w-full"
              required
            />
            <Input
              label="Quantity"
              name="quantity"
              value={formData.quantity}
              onChange={handleInputChange}
              placeholder="Enter quantity"
              type="number"
              className="w-full "
              required
            />
            <Input
              label="Price"
              name="price"
              value={formData.price}
              onChange={handleInputChange}
              placeholder="Enter price per item"
              type="number"
              className="w-full "
              required
            />
            <Input
              label="Batch Number"
              name="batchNumber"
              value={formData.batchNumber}
              onChange={handleInputChange}
              placeholder="Enter batch number"
              className="w-full "
              required
            />
            <Input
              label="Manufacture Date"
              name="manufactureDate"
              value={formData.manufactureDate}
              onChange={handleInputChange}
              type="date"
              className="w-full "
              required
            />
            <Input
              label="Expiry Date"
              name="expiryDate"
              value={formData.expiryDate}
              onChange={handleInputChange}
              type="date"
              className="w-full "
              required
            />

            <SelectComponent
              selectData={supplierResponse}
              onEmailChange={handleSelectEmailChange}
              onNameChange={handleSelectNameChange}
              isOrderComponent={false}
            />
            <Input
              label="Retailer Email"
              name="retailerEmail"
              value={formData.retailerEmail}
              onChange={handleInputChange}
              placeholder="Enter retailer email"
              type="email"
              className="w-full "
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
        <SaleProduct />
      </div>
    </>
  );
}
