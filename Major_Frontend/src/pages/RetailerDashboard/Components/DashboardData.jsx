import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
const DashboardOverviewCard = ({ data }) => {
  const { lowStockProducts, nearestExpiryProducts, latestProductRequests } = {
    ...data,
  };
  const [isHighlighted, setIsHighlighted] = useState(false);

  useEffect(() => {
    
    setIsHighlighted(true);

    // Remove the highlight after 3 seconds (adjust as needed)
    const timer = setTimeout(() => setIsHighlighted(false), 3000);
    return () => clearTimeout(timer);
  }, []);
  const navigate = useNavigate();

  return (
    // <div className="p-4 bg-gray-100 ">
    <div
      className="my-10 max-w-full shadow-lg rounded-lg overflow-hidden bg-gradient-to-r from-[#5d60ef] to-[#a39af6]

"
    >
      <div className="p-6 w-full">
        <h2 className="text-2xl  text-white font-bold  mb-4">
          Quick View Alerts
        </h2>

        <div className="flex flex-row gap-x-6">
          {/* Low Stock Products */}
          <div className="flex-1 bg-gray-50 p-4 rounded-lg shadow-md">
            <div className=" relative">
              <h3 className="text-lg font-semibold text-gray-600 mb-2 border-b-2">
                Low Stock Products
              </h3>
              <button
                className="absolute top-[-10px] right-0 mt-2 text-sm text-blue-600 hover:underline"
                onClick={() => navigate("/inventory")}
              >
                Show All
              </button>
            </div>
            <ul>
              {lowStockProducts.map((product, index) => (
                <li
                  key={index}
                  className="flex justify-between text-sm text-gray-600 mb-1"
                >
                  <span>{product.productName}</span>
                  <span className="text-red-600 font-medium">
                    {product.quantity}
                  </span>
                </li>
              ))}
            </ul>
          </div>
          <motion.div
            initial={{ scale: 1 }}
            animate={
              isHighlighted
                ? {
                    scale: [1, 1.1, 1],
                    rotate: [0, 2, -2, 0],
                    boxShadow: [
                      "0 0 10px rgba(255, 0, 0, 0.5)",
                      "0 0 20px rgba(255, 0, 0, 1)",
                      "0 0 10px rgba(255, 0, 0, 0.5)",
                      "0 0 0 rgba(0, 0, 0, 0)",
                    ],
                  }
                : { scale: 1, boxShadow: "0 0 0 rgba(0, 0, 0, 0)" }
            }
            transition={{
              duration: 0.6,
              repeat: isHighlighted ? Infinity : 0,
              repeatType: "loop",
            }}
            className="flex-1 bg-gray-50 p-4 rounded-lg shadow-md"
          >
            <div className="relative">
              <h3 className="text-lg font-semibold text-gray-600 mb-2 border-b-2">
                Near Expiry Products
              </h3>
              <button
                className="absolute top-[-10px] right-0 mt-2 text-sm text-blue-600 hover:underline"
                onClick={() => navigate("/inventory")}
              >
                Show All
              </button>
            </div>
            <ul>
              {nearestExpiryProducts.map((product, index) => (
                <li
                  key={index}
                  className="flex justify-between text-sm text-gray-600 mb-1"
                >
                  <span>{product.productName}</span>
                  <span className="text-orange-600">{product.expiryDate}</span>
                </li>
              ))}
            </ul>
          </motion.div>
          {/* Latest Product Requests */}
          <div className="flex-1 bg-gray-50 p-4 rounded-lg shadow-md">
            <div className=" relative">
              <h3 className="text-lg font-semibold text-gray-600 mb-2 border-b-2">
                Latest Product Requests
              </h3>
              <button
                className=" absolute top-[-10px] right-0 mt-2 text-sm text-blue-600 hover:underline"
                onClick={() => navigate("/my_request")}
              >
                Show All
              </button>
            </div>
            <ul>
              {latestProductRequests.map((request, index) => (
                <li
                  key={index}
                  className="flex justify-between text-sm text-gray-600 mb-1"
                >
                  <span>{request.productName}</span>
                  <div
                    className={`text-white text-xs font-bold mb-4 p-1 rounded-md ${
                      request.reqStatus === "pending"
                        ? "bg-red-500"
                        : request.reqStatus === "processing"
                        ? "bg-orange-500"
                        : "bg-green-500"
                    }`}
                  >
                    {request.reqStatus.toUpperCase()}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>

    // </div>
  );
};

export default DashboardOverviewCard;
