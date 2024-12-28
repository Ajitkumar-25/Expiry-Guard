import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useGetSavedProductsDataSupplierMutation } from "@/services/common";
import { useGetCompletedTransferTaskCounMutation } from "@/services/common";
import { useGetRetailerForSupplierMutation } from "@/services/common";
import { useGetDriverDetailsMutation } from "@/services/common";
import { useGetTransferTaskDataMutation } from "@/services/common";
import { useGetProductReqSupplierMutation } from "@/services/common";
import {
  TotalRevenue,
  ProductSaved,
  Request,
  Driver,
  Users,
} from "../../assets/index";

const SupplierDashboard = () => {
  const supplierEmail = localStorage.getItem("email");
  const Navigate = useNavigate();

  const [getSavedProductsDataSupplier, { isLoading }] =
    useGetSavedProductsDataSupplierMutation();
  const [getCompletedTransferTaskCount, { isCountLoading }] =
    useGetCompletedTransferTaskCounMutation();
  const [getRetailerForSupplierMutation, { isRetailerLoading }] =
    useGetRetailerForSupplierMutation();
  const [GetDriverDetailsCount, { isDriverLoading }] =
    useGetDriverDetailsMutation();
  const [getTransferTaskData, { isTransferLoading }] =
    useGetTransferTaskDataMutation();
  const [getProductReqSupplierMutation, { isProductLoading }] =
    useGetProductReqSupplierMutation();

  const [
    getSavedProductsDataSupplierResponse,
    setGetSavedProductsDataSupplierResponse,
  ] = useState([]);
  const [
    getCompletedTransferTaskCountResponse,
    setgetCompletedTransferTaskCountResponse,
  ] = useState([]);
  const [retailerData, setRetailerData] = useState([]);
  const [totalDriver, setTotalDriver] = useState([]);
  const [transferTaskData, setTransferTaskData] = useState([]);
  const [productReqSupplier, setProductReqSupplier] = useState([]);

  useEffect(() => {
    getSavedProductsDataSupplier({ supplierEmail }).then((response) => {
      setGetSavedProductsDataSupplierResponse(response.data);
    });
  }, [getSavedProductsDataSupplier]);

  useEffect(() => {
    getCompletedTransferTaskCount({ supplierEmail }).then((response) => {
      setgetCompletedTransferTaskCountResponse(
        response.data.completedTaskCount
      );
    });
  }, [getCompletedTransferTaskCount]);

  useEffect(() => {
    if (supplierEmail) {
      getRetailerForSupplierMutation({ supplierEmail })
        .unwrap()
        .then((response) => {
          const dataArray = Array.isArray(response) ? response : [response];

          setRetailerData(dataArray.length);
        })
        .catch((error) => console.error("Error fetching retailers:", error));
    } else {
      console.error("No supplier email found in localStorage.");
    }
  }, [getRetailerForSupplierMutation]);

  useEffect(() => {
    if (supplierEmail) {
      GetDriverDetailsCount({ supplierEmail })
        .unwrap()
        .then((response) => {
          const dataArray = Array.isArray(response) ? response : [response];

          setTotalDriver(dataArray.length);
        })
        .catch((error) => console.error("Error fetching retailers:", error));
    } else {
      console.error("No supplier email found in localStorage.");
    }
  }, [GetDriverDetailsCount]);

  console.log("len driver is ", totalDriver);

  useEffect(() => {
    if (supplierEmail) {
      getTransferTaskData({ supplierEmail })
        .unwrap()
        .then((response) => {
          const dataArray = Array.isArray(response) ? response : [response];

          setTransferTaskData(dataArray);
        })
        .catch((error) =>
          console.error("Error fetching transfer task data:", error)
        );
    } else {
      console.error("No supplier email found in localStorage.");
    }
  }, [getTransferTaskData]);

  console.log("transfer task data is ", transferTaskData);
  const ModifiedtransferTaskData = transferTaskData.slice(0, 3);

  useEffect(() => {
    if (supplierEmail) {
      getProductReqSupplierMutation({ supplierEmail })
        .unwrap()
        .then((response) => {
          const dataArray = Array.isArray(response) ? response : [response];

          setProductReqSupplier(dataArray);
        })
        .catch((error) =>
          console.error("Error fetching product request data:", error)
        );
    } else {
      console.error("No supplier email found in localStorage.");
    }
  }, [getProductReqSupplierMutation]);

  console.log("product req data is ", productReqSupplier);

  const modifiedProductReqSupplier = productReqSupplier.slice(0, 3);

  const productSaved =
    getSavedProductsDataSupplierResponse.totalProductsCountSaved;
  const moneySaved = getSavedProductsDataSupplierResponse.totalRevenueGenerated;

  return (
    <div className="p-6 bg-white min-h-screen rounded-xl ">
      {/* cards Data  */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4  ">
        <div
          className="bg-white p-4 rounded-2xl shadow bg-gradient-to-r from-[#ffe2e6] to-[#f7d7e3] flex flex-col justify-between h-full

"
        >
          <div className="flex justify-between items-center mb-2">
            <div className="flex flex-col gap-3 justify-center ">
              <img
                className="h-14 w-14"
                src={ProductSaved}
                alt="Product Saved Icon"
              />
              <h3 className="font-semibold text-md text-gray-600">
                Total Products Saved From expiring in Units
              </h3>
            </div>
          </div>
          <div className="text-2xl font-semibold  text-gray-800 mt-auto">
            {productSaved}
          </div>
        </div>
        <div
          className="bg-white p-4  rounded-2xl shadow bg-gradient-to-r from-[#fff4de] to-[#fef1c7]
flex flex-col justify-between h-full
"
        >
          <div className="flex justify-between items-center mb-2">
            <div className="flex flex-col gap-3 justify-center ">
              <img className="h-12 w-12" src={TotalRevenue} />
              <h3 className="font-semibold text-md text-gray-600">
                Money Saved By Redistribution
              </h3>
            </div>
          </div>
          <div className="text-2xl font-semibold  text-gray-800 mt-auto">
            {" "}
            ₹{moneySaved}
          </div>
        </div>
        <div
          className="bg-white p-4 rounded-2xl shadow bg-gradient-to-r from-[#dcfce7] to-[#f0fdf4]
flex flex-col justify-between h-full
"
        >
          <div className="flex justify-between items-center mb-2">
            <div className="flex flex-col gap-3 justify-center ">
              <img className="h-14 w-20 mt-[-10px]" src={Request} />
              <h3 className="font-semibold text-md">Total completed Request</h3>
            </div>
          </div>
          <div className="text-2xl font-semibold  text-gray-800 mt-auto">
            {getCompletedTransferTaskCountResponse}
          </div>
        </div>
        <div
          className="bg-white p-4  rounded-2xl shadow bg-gradient-to-r from-[#b7e6fa] to-[#ffffff] flex flex-col justify-between h-full

          "
        >
          <div className="flex justify-between items-center mb-2">
            <div className="flex flex-col gap-3 justify-center ">
              <img className="h-12 w-20" src={Users} />
              <h3 className="font-semibold text-md text-gray-600">
                Total Connected Retailers
              </h3>
            </div>
          </div>
          <div className="text-2xl font-semibold   text-gray-800 mt-auto">
            {retailerData}
          </div>
        </div>
        <div
          className="bg-white p-4 rounded-2xl shadow bg-gradient-to-r from-[#dcfce7] to-[#f0fdf4]
flex flex-col justify-between h-full
"
        >
          <div className="flex justify-between items-center mb-2">
            <div className="flex flex-col gap-3 justify-center ">
              <img className="h-14 w-20 mt-[-10px]" src={Driver} />
              <h3 className="font-semibold text-md text-gray-600">
                Total Connected Drivers
              </h3>
            </div>
          </div>
          <div className="text-2xl font-semibold  text-gray-800 mt-auto">
            {totalDriver}
          </div>
        </div>
      </div>

      <div className="my-10 max-w-full shadow-lg rounded-lg overflow-hidden bg-gradient-to-r from-[#5d60ef] to-[#a39af6] ">
        <div className="p-6 ">
          <h2 className="text-2xl text-white font-bold mb-6">
            Dashboard Overview
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-50 p-6 rounded-3xl shadow-md">
              <div className="relative mb-4">
                <h3 className="text-lg font-semibold text-blackmb-2 border-b-2 pb-2">
                  Latest Transfer Task Data
                </h3>
                <button
                  className="absolute top-0 right-0 mt-2 text-sm text-blue-600 hover:underline"
                  onClick={() => Navigate("/orders")}
                >
                  Show All
                </button>
              </div>
              <ul>
                {ModifiedtransferTaskData.map((task, index) => (
                  <li
                    key={index}
                    className="mb-2 border-b-2 hover:bg-gradient-to-r from-purple-300 to-purple-100 p-2"
                  >
                    <h4 className="text-sm font-medium text-black mb-1">
                      Task ID: {task.taskId}
                    </h4>
                    <div className="flex justify-between">
                      <div className="text-sm text-gray-600">
                        <p>
                          <b>Source Retailer:</b> {task.sourceRetailerName}
                        </p>
                        <p>
                          <b>Target Retailer:</b> {task.targetRetailerName}
                        </p>
                      </div>
                      <div
                        className={` text-white text-xs font-bold mb-4 p-1  rounded-md ${
                          task.status === "assigned"
                            ? "bg-orange-500"
                            : task.status === "completed"
                            ? "bg-green-500"
                            : ""
                        }`}
                      >
                        {task.status.toUpperCase()}
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-gray-50 p-6 rounded-3xl shadow-md">
              <div className="relative mb-4">
                <h3 className="text-lg font-semibold text-black mb-2 border-b-2 pb-2">
                  Latest Product Request Data
                </h3>
                <button
                  className="absolute top-0 right-0 mt-2 text-sm text-blue-600 hover:underline"
                  onClick={() => Navigate("/product_request")}
                >
                  Show All
                </button>
              </div>
              <ul>
                {modifiedProductReqSupplier.map((task, index) => (
                  <li
                    key={index}
                    className="mb-2 border-b-2 hover:bg-gradient-to-r from-[#b7e6fa] to-[#ffffff] p-2"
                  >
                    <h4 className="text-sm font-semibold text-black mb-1">
                      Request ID: {task.requestId}
                    </h4>
                    <div className="flex justify-between">
                      <div className="text-sm text-gray-600">
                        <p>
                          <b>Product Name:</b> {task.productName}
                        </p>
                        <p>
                          <b>Price:</b> {task.price}
                        </p>
                      </div>
                      <div
                        className={`text-white text-xs font-bold mb-4 p-1 rounded-md ${
                          task.reqStatus === "pending"
                            ? "bg-red-500"
                            : task.reqStatus === "processing"
                            ? "bg-orange-500"
                            : "bg-green-500"
                        }`}
                      >
                        {task.reqStatus.toUpperCase()}
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupplierDashboard;
