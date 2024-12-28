import { Input } from "../../../components/ui/input";
import { Textarea } from "../../../components/ui/textarea";
import { Button } from "../../../components/ui/button";
import { useState, useEffect } from "react";
import { useGetRetailerForSupplierMutation } from "../../../services/common/index.js";
import Loader from "../../../components/custom/Loader";
import SelectComponent from "../../RetailerDashboard/Components/SupplierSelect";
import { useGetDriverDetailsMutation } from "../../../services/common/index.js";
import { usePostTransferTaskMutation } from "../../../services/common/index.js";
import { useGetTransferTaskDataMutation } from "../../../services/common/index.js";
import { toast, ToastContainer } from "react-toastify";
import {
  Dialog,
  DialogContent,
  DialogOverlay,
} from "../../../components/ui/dialog";
import { Badge } from "../../../components/ui/badge";
import "react-toastify/dist/ReactToastify.css";

const Orders = () => {
  const [getRetailerForSupplierMutation, { isLoading }] =
    useGetRetailerForSupplierMutation();
  const [getdriverData, { isdriverLoading }] = useGetDriverDetailsMutation();
  const [PostTransferTask, { isPostTransferTaskLoading }] =
    usePostTransferTaskMutation();
  const [getTransferTaskData, { isGetTransferTaskDataLoading }] =
    useGetTransferTaskDataMutation();

  const [retailerData, setRetailerData] = useState([]);
  const [driverData, setDriverData] = useState([]);
  const [transferTaskData, setTransferTaskData] = useState([]);
  const [formVisible, setFormVisible] = useState(false);
  const handleModalOpen = () => setFormVisible(true);
  const handleModalClose = () => setFormVisible(false);

  const supplierEmail = localStorage.getItem("email");
  useEffect(() => {
    if (supplierEmail) {
      getRetailerForSupplierMutation({ supplierEmail })
        .unwrap()
        .then((response) => {
          const dataArray = Array.isArray(response) ? response : [response];

          setRetailerData(dataArray);
        })
        .catch((error) => console.error("Error fetching retailers:", error));
    } else {
      console.error("No supplier email found in localStorage.");
    }
  }, [getRetailerForSupplierMutation]);

  useEffect(() => {
    if (supplierEmail) {
      getdriverData({ supplierEmail })
        .unwrap()
        .then((response) => {
          const dataArray = Array.isArray(response) ? response : [response];

          setDriverData(dataArray);
        })
        .catch((error) => console.error("Error fetching retailers:", error));
    } else {
      console.error("No supplier email found in localStorage.");
    }
  }, [getdriverData]);

  useEffect(() => {
    if (supplierEmail) {
      getTransferTaskData({ supplierEmail })
        .unwrap()
        .then((response) => {
          const dataArray = Array.isArray(response) ? response : [response];
          setTransferTaskData(dataArray);
        })
        .catch((error) => console.error("Error fetching retailers:", error));
    } else {
      console.error("No supplier email found in localStorage.");
    }
  }, [getTransferTaskData]);

  const [formData, setFormData] = useState({
    sourceRetailerEmail: "",
    sourceRetailerName: "",
    sourceRetailerAddress: "",
    targetRetailerEmail: "",
    targetRetailerName: "",
    targetRetailerAddress: "",
    products: [{ productName: "", quantity: "", price: "" }],
    supplierEmail: supplierEmail,
    driverEmail: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleSourceEmailChange = (email) => {
    const retailer = retailerData.find((item) => item.email === email);

    setFormData((prevData) => ({
      ...prevData,
      sourceRetailerEmail: email,
      sourceRetailerName: retailer?.name || "",
      sourceRetailerAddress: retailer?.address || "",
    }));
  };

  const handleTargetEmailChange = (email) => {
    const retailer = retailerData.find((item) => item.email === email);
    setFormData((prevData) => ({
      ...prevData,
      targetRetailerEmail: email,
      targetRetailerName: retailer?.name || "",
      targetRetailerAddress: retailer?.address || "",
    }));
  };
  const handleDriverEmailChange = (email) => {
    setFormData((prevData) => ({
      ...prevData,
      driverEmail: email,
    }));
  };
  const handleProductChange = (e, index) => {
    const { name, value } = e.target;
    const products = [...formData.products];
    products[index] = {
      ...products[index],
      [name]: value,
    };
    setFormData((prevData) => ({
      ...prevData,
      products,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await PostTransferTask(formData).unwrap();

      toast.success("Transfer Request Send!!", {
        position: "top-right",
        autoClose: 1000,
      });
      setFormVisible(false);
    } catch (error) {
      toast.error(`Transfer Product Error! ${error.data.msg}`, {
        position: "top-right",
        autoClose: 2000,
      });
    }
  };
  if (isLoading) {
    return <Loader />;
  }
  return (
    <>
      <ToastContainer />
      <div className="relative">
        {/* Top-right button */}
        <div className="absolute top-4 right-4">
          <Button
            className="bg-orange-500 hover:bg-black text-white px-4 py-2"
            onClick={handleModalOpen}
          >
            Assign New Task
          </Button>
        </div>

        {/* Main table container */}
        <div className="p-4 bg-white rounded-lg">
          <h2 className="text-lg text-gray-500 font-bold mb-4">
            Transfer Task Details
          </h2>
          <table className="table-auto w-full border-collapse shadow-lg">
            <thead>
              <tr className="bg-orange-500 text-white">
                <th className="border border-green-600 p-2">Task ID</th>
                <th className="border border-green-600 p-2">Source Retailer</th>
                <th className="border border-green-600 p-2">Source Address</th>
                <th className="border border-green-600 p-2">Target Retailer</th>
                <th className="border border-green-600 p-2">Target Address</th>
                <th className="border border-green-600 p-2">Products</th>
                <th className="border border-green-600 p-2">Driver</th>
                <th className="border border-green-600 p-2">Status</th>
                <th className="border border-green-600 p-2">Created At</th>
                <th className="border border-green-600 p-2">Supplier Email</th>
              </tr>
            </thead>
            <tbody>
              {transferTaskData.map((task) => (
                <tr key={task._id} className="hover:bg-green-100">
                  <td className="border border-green-600 p-2">{task.taskId}</td>
                  <td className="border border-green-600 p-2">
                    {task.sourceRetailerName}
                  </td>
                  <td className="border border-green-600 p-2">
                    {task.sourceRetailerAddress}
                  </td>
                  <td className="border border-green-600 p-2">
                    {task.targetRetailerName}
                  </td>
                  <td className="border border-green-600 p-2">
                    {task.targetRetailerAddress}
                  </td>
                  <td className="border border-green-600 p-2">
                    {task.products.map((product) => (
                      <div key={product._id} className="mb-2">
                        <p className="font-semibold">{product.productName}</p>
                        <p>Quantity: {product.quantity}</p>
                        <p>Price: {product.price}</p>
                      </div>
                    ))}
                  </td>
                  <td className="border border-green-600 p-2">
                    {task.driverEmail}
                  </td>
                  <td className="border border-green-600 p-2">
                    <Badge
                      className={`py-1 font-bold cursor-pointer ${
                        task.status === "assigned"
                          ? "bg-orange-500"
                          : "bg-green-500"
                      }`}
                    >
                      {task.status}
                    </Badge>
                  </td>
                  <td className="border border-green-600 p-2">
                    {new Date(task.createdAt).toLocaleString()}
                  </td>
                  <td className="border border-green-600 p-2">
                    {task.supplierEmail}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Modal for the form */}
        <Dialog open={formVisible} onOpenChange={setFormVisible}>
          <DialogOverlay className="fixed inset-0 bg-black bg-opacity-50 z-40" />
          <DialogContent
            className="absolute inset-0 flex items-center justify-center z-50 p-4 "
            style={{
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              backgroundColor: "#fff",
              borderRadius: "0.75rem",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
              maxWidth: "700px",
              width: "100%",
              height: "550px",
              maxHeight: "100%",
              padding: "30px",

              overflowY: "auto",
            }}
          >
            <form className="space-y-4 w-full h-full" onSubmit={handleSubmit}>
              <h1 className="text-2xl font-bold mb-4 text-center text-black">
                Assign Transfer Task
              </h1>

              {/* Source Retailer */}
              <SelectComponent
                selectData={retailerData}
                onEmailChange={handleSourceEmailChange}
                onNameChange={() => {}}
                isOrderComponent={true}
              />
              <Input
                label="Source Retailer Name"
                name="sourceRetailerName"
                placeholder="Enter source retailer name"
                className="w-full"
                value={formData.sourceRetailerName}
                readOnly
              />
              <Textarea
                label="Source Retailer Address"
                name="sourceRetailerAddress"
                placeholder="Enter source retailer address"
                className="w-full"
                value={formData.sourceRetailerAddress}
                onChange={handleChange}
                required
              />

              {/* Target Retailer */}
              <SelectComponent
                selectData={retailerData}
                onEmailChange={handleTargetEmailChange}
                onNameChange={() => {}}
                isOrderComponent={true}
              />
              <Input
                label="Target Retailer Name"
                name="targetRetailerName"
                placeholder="Enter target retailer name"
                className="w-full"
                value={formData.targetRetailerName}
                readOnly
              />
              <Textarea
                label="Target Retailer Address"
                name="targetRetailerAddress"
                placeholder="Enter target retailer address"
                className="w-full"
                value={formData.targetRetailerAddress}
                readOnly
              />

              {/* Products */}
              {formData.products.map((product, index) => (
                <div key={index} className="space-y-2">
                  <Input
                    label="Product Name"
                    name="productName"
                    placeholder="Enter product name"
                    className="w-full"
                    value={product.productName}
                    onChange={(e) => handleProductChange(e, index)}
                    required
                  />
                  <Input
                    label="Quantity"
                    name="quantity"
                    placeholder="Enter quantity"
                    type="number"
                    className="w-full"
                    value={product.quantity}
                    onChange={(e) => handleProductChange(e, index)}
                    required
                  />
                  <Input
                    label="Price"
                    name="price"
                    placeholder="Enter price"
                    type="number"
                    className="w-full"
                    value={product.price}
                    onChange={(e) => handleProductChange(e, index)}
                    required
                  />
                </div>
              ))}

              {/* Supplier Email */}
              <Input
                label="Supplier Email"
                name="supplierEmail"
                placeholder="Enter supplier email"
                type="email"
                className="w-full"
                value={formData.supplierEmail}
                onChange={handleChange}
                readOnly
              />

              {/* Driver */}
              <SelectComponent
                selectData={driverData}
                onEmailChange={handleDriverEmailChange}
                onNameChange={() => {}}
                isOrderComponent={true}
              />

              {/* Submit Button */}
              <Button
                type="submit"
                className="w-full bg-orange-500 text-white mt-2 hover:bg-black p-2 "
              >
                Submit
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
};

export default Orders;
