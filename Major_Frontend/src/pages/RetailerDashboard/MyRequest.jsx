import { useEffect, useState } from "react";
import { usePostMyRequestMutation } from "../../services/common/index";
import { FaRupeeSign, FaSortUp, FaSortDown } from "react-icons/fa";
import "react-toastify/dist/ReactToastify.css";

import { Badge } from "../../components/ui/badge";
import Loader from "../../components/custom/Loader";

const MyRequest = () => {
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
  const [statusDropdown, setStatusDropdown] = useState(null);
  const [data, setdata] = useState([]);

  const [postMyRequest, { isLoadingPostMyRequest }] =
    usePostMyRequestMutation();

  const retailerEmail = localStorage.getItem("email");

  const getRequestData = async () => {
    try {
      const response = await postMyRequest({ retailerEmail }).unwrap();

      setdata(response);
    } catch (error) {
      console.error(`No request data found ${error}`);
    }
  };

  useEffect(() => {
    getRequestData();
  }, [postMyRequest]);

  const sortedData = [...data].sort((a, b) => {
    if (sortConfig.key) {
      const aValue = a[sortConfig.key];
      const bValue = b[sortConfig.key];
      if (aValue < bValue) return sortConfig.direction === "asc" ? -1 : 1;
      if (aValue > bValue) return sortConfig.direction === "asc" ? 1 : -1;
    }
    return 0;
  });

  const toggleSort = (column) => {
    const columnKeyMap = {
      "Request Date": "createdAt",
      "Update Status": "reqStatus",
      requestId: "requestId",
      productName: "productName",
      price: "price",
      quantity: "quantity",
      supplierEmail: "supplierEmail",
      retailerEmail: "retailerEmail",
      expiryDate: "expiryDate",
      reqType: "reqType",
    };
    const key = columnKeyMap[column] || column;

    setSortConfig((prevConfig) => ({
      key,
      direction:
        prevConfig.key === key && prevConfig.direction === "asc"
          ? "desc"
          : "asc",
    }));
  };

  const getSortIcon = (column) => {
    const columnKeyMap = {
      "Request Date": "createdAt",
      "Update Status": "reqStatus",
      requestId: "requestId",
      productName: "productName",
      price: "price",
      quantity: "quantity",
      supplierEmail: "supplierEmail",
      retailerEmail: "retailerEmail",
      expiryDate: "expiryDate",
      reqType: "reqType",
    };
    const key = columnKeyMap[column] || column;

    if (sortConfig.key === key) {
      return sortConfig.direction === "asc" ? (
        <FaSortUp title="Sort Descending" />
      ) : (
        <FaSortDown title="Sort Ascending" />
      );
    }
    return <FaSortUp title="Sort Descending" />;
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const sendRequests = sortedData.filter((item) => item.reqType === "send");
  const otherRequests = sortedData.filter((item) => item.reqType !== "send");
  if (isLoadingPostMyRequest) {
    return <Loader />;
  }

  return (
    <>
      <div className="p-4 bg-white shadow-md rounded-lg">
        <table className="w-full text-left border-collapse">
          <thead className="flex-row">
            <tr className="text-gray-600 uppercase text-xs font-semibold border-b flex-row justify-center space-x-6">
              {[
                "requestId",
                "productName",
                "price",
                "quantity",
                "supplierEmail",
                // "retailerEmail",
                "expiryDate",
                "reqType",
                "Request Date",
                "Update Status",
              ].map((column) => (
                <th
                  key={column}
                  className="flex-row justify-center space-x-10 cursor-pointer"
                  onClick={() => toggleSort(column)}
                >
                  <span>{column.replace(/([A-Z])/g, " $1")}</span>
                  <span>{getSortIcon(column)}</span>
                </th>
              ))}
            </tr>
          </thead>

          <thead>
            <tr className="text-gray-600 uppercase text-xs font-semibold border-b text-center ">
              <th
                colSpan="9"
                className="px-4 py-5 text-gray-800 uppercase text-md font-extrabold "
              >
                Products Send
              </th>
            </tr>
          </thead>
          <tbody className="text-gray-800 text-sm bg-slate-100">
            {sendRequests.length > 0 ? (
              sendRequests.map((product) => (
                <tr key={product._id} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-4">{product.requestId}</td>
                  <td className="px-4 py-4">{product.productName}</td>
                  <td className="px-4 py-4 text-gray-800 font-semibold flex items-center">
                    <FaRupeeSign />
                    {product.price}
                  </td>
                  <td className="px-4 py-4">{product.quantity}</td>
                  <td className="px-4 py-4">{product.supplierEmail}</td>
                  {/* <td className="px-4 py-4">{product.retailerEmail}</td> */}
                  <td className="px-4 py-4 text-white font-extrabold text-xs bg-red-500 hover:bg-red-700">
                    {product.expiryDate}
                  </td>
                  <td className="px-4 py-4 text-black font-semibold text-md">
                    {product.reqType.toUpperCase()}
                  </td>
                  <td className="px-4 py-4 text-green-600 font-semibold">
                    {formatDate(product.createdAt)}
                  </td>
                  <td className="px-4 py-4 font-semibold text-white relative">
                    {isLoadingPostMyRequest ? (
                      <Loader />
                    ) : (
                      <Badge
                        className={`py-1 font-bold cursor-pointer ${
                          product.reqStatus === "pending"
                            ? "bg-red-500"
                            : product.reqStatus === "processing"
                            ? "bg-orange-500"
                            : "bg-green-500"
                        }`}
                      >
                        {product.reqStatus.toUpperCase()}
                      </Badge>
                    )}

                    {statusDropdown === product._id && (
                      <div className="absolute top-full mt-1 left-0 w-32 bg-white shadow-lg rounded-lg p-2 z-10">
                        {["pending", "processing", "processed"].map(
                          (status) => (
                            <button
                              key={status}
                              onClick={() => {
                                setStatusDropdown(null);
                              }}
                              className={`block w-full text-left px-2 py-1 font-semibold ${
                                status === "pending"
                                  ? "text-red-500"
                                  : status === "processing"
                                  ? "text-orange-500"
                                  : "text-green-500"
                              }`}
                            >
                              {status.charAt(0).toUpperCase() + status.slice(1)}
                            </button>
                          )
                        )}
                      </div>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <Loader />
            )}
          </tbody>

          <thead>
            <tr className="text-gray-800 uppercase text-xs font-semibold border-b text-center ">
              <th colSpan="9" className="px-4 py-5 text-md font-extrabold ">
                Products Requested
              </th>
            </tr>
          </thead>
          <tbody className="text-gray-800 text-sm bg-violet-100">
            {otherRequests.length > 0 ? (
              otherRequests.map((product) => (
                <tr key={product._id} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-4">{product.requestId}</td>
                  <td className="px-4 py-4">{product.productName}</td>
                  <td className="px-4 py-4 text-gray-800 font-semibold flex items-center">
                    <FaRupeeSign />
                    {product.price}
                  </td>
                  <td className="px-4 py-4">{product.quantity}</td>
                  <td className="px-4 py-4">{product.supplierEmail}</td>
                  {/* <td className="px-4 py-4">{product.retailerEmail}</td> */}
                  <td className="px-4 py-4 text-white  text-xs    font-extrabold bg-red-500 hover:bg-red-700">
                    {product.expiryDate}
                  </td>
                  <td className="px-4 py-4 text-black font-semibold text-md mx-6">
                    {product.reqType.toUpperCase()}
                  </td>
                  <td className="px-4 py-4 text-green-600 font-semibold">
                    {formatDate(product.createdAt)}
                  </td>
                  <td className="px-4 py-4 font-semibold text-white relative">
                    {isLoadingPostMyRequest ? (
                      <Loader />
                    ) : (
                      <Badge
                        variant="default"
                        className={`py-1 font-bold cursor-pointer ${
                          product.reqStatus === "pending"
                            ? "bg-red-500"
                            : product.reqStatus === "processing"
                            ? "bg-orange-500"
                            : "bg-green-500"
                        }`}
                      >
                        {product.reqStatus.toUpperCase()}
                      </Badge>
                    )}

                    {statusDropdown === product._id && (
                      <div className="absolute top-full mt-1 left-0 w-32 bg-white shadow-lg rounded-lg p-2 z-10">
                        {["pending", "processing", "processed"].map(
                          (status) => (
                            <button
                              key={status}
                              onClick={() => {
                                setStatusDropdown(null);
                              }}
                              className={`block w-full text-left px-2 py-1 font-semibold ${
                                status === "pending"
                                  ? "text-red-500"
                                  : status === "processing"
                                  ? "text-orange-500"
                                  : "text-green-500"
                              }`}
                            >
                              {status.charAt(0).toUpperCase() + status.slice(1)}
                            </button>
                          )
                        )}
                      </div>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <Loader />
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default MyRequest;
