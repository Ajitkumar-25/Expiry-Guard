import React from "react";
import { useGetInventoryForRetailerBySupplierMutation } from "../../services/common/index.js";
import { useNavigate } from "react-router-dom";

const RetailerInfoCard = ({ data }) => {
  const navigate = useNavigate();
  const [getInventory, { isLoading }] =
    useGetInventoryForRetailerBySupplierMutation();

  const handleClick = (retailerEmail, retailerData) => {
    const supplierEmail = localStorage.getItem("email");

    if (supplierEmail) {
      getInventory({ supplierEmail, retailerEmail })
        .then((response) => {
          navigate("/inventory/productsdata", {
            state: {
              inventoryData: response.data,
              isOpenAlertModal: true,
              retailerEmail: retailerEmail,
              supplierEmail: supplierEmail,
              retailerData: retailerData,
            },
          });
        })
        .catch((error) => {
          console.error("API error:", error);
        });
    } else {
      console.error("Supplier email not found in localStorage.");
    }
  };

  return (
    <div className="bg-gray-100 p-8 min-h-screen">
      <h2 className="text-3xl font-semibold text-gray-800 mb-6">
        Retailer Information
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.map((retailer) => (
          <div
            key={retailer._id}
            className="bg-white p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105 border-t-4 border-orange-500 hover:bg-slate-100 cursor-pointer"
            onClick={() => handleClick(retailer.email, retailer)}
          >
            <div className="flex items-center mb-4">
              <div className="w-16 h-16 rounded-full bg-gray-300 flex-shrink-0 mr-4 overflow-hidden shadow-sm">
                <img
                  src={`https://ui-avatars.com/api/?name=${retailer.name}&background=FFA500&color=fff`}
                  alt={`${retailer.name}'s avatar`}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-800">
                  {retailer.name}
                </h3>
                <p className="text-sm text-gray-500">{retailer.email}</p>
              </div>
            </div>
            <div className="text-sm text-gray-700">
              <p className="mb-2">
                <span className="font-semibold text-orange-600">Address:</span>{" "}
                {retailer.address}
              </p>
              <p>
                <span className="font-semibold text-orange-600">Phone:</span>{" "}
                {retailer.phoneNumber}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RetailerInfoCard;
