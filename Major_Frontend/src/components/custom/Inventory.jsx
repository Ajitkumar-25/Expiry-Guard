import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import RetailerDetailsOverlay from "./RetailerDetailsOverlay";
import { TailSpin } from "react-loader-spinner";
import RetailerInfoCard from "./RetailerCard";
import { useGetRetailerForSupplierMutation } from "../../services/common/";
import RetailerInventory from "../../pages/RetailerDashboard/RetailerInventory";

function Inventory() {
  const [selectedRetailer, setSelectedRetailer] = useState(null);
  const [getRetailerForSupplierMutation, { isLoading }] =
    useGetRetailerForSupplierMutation();
  const [retailerData, setRetailerData] = useState([]);
  const userType = localStorage.getItem("userType");

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

  const transitionSettings = {
    duration: 0.6,
    ease: [0.42, 0, 0.58, 1],
  };
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <TailSpin height="80" width="80" color="#f3a247" ariaLabel="loading" />
      </div>
    );
  }
  if (userType === "retailer") {
    return <RetailerInventory />;
  }

  return (
    <div className="relative flex w-full h-full">
      {/* Table section */}
      <motion.div
        className="relative"
        style={{ width: selectedRetailer ? "50%" : "100%" }}
        animate={{ width: selectedRetailer ? "50%" : "100%" }}
        transition={transitionSettings}
      >
        <RetailerInfoCard data={retailerData} />
      </motion.div>

      {/* Overlay section */}
      {selectedRetailer && (
        <motion.div
          className="relative bg-white shadow-lg h-full"
          style={{ width: "50%" }} // Set overlay width to 50%
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          transition={transitionSettings}
        >
          <RetailerDetailsOverlay
            retailer={selectedRetailer}
            onClose={() => setSelectedRetailer(null)}
          />
        </motion.div>
      )}
    </div>
  );
}

export default Inventory;
