import React, { useEffect, useState } from "react";
import { useGetRetailerInventoryMutation } from "../../services/common/index.js";
import InventoryTable from "./Components/InventoryTable.jsx";
import { ArchiveIcon } from "lucide-react";

const RetailerInventory = () => {
  const [getRetailerInventory, { isLoading }] =
    useGetRetailerInventoryMutation();
  const retailerEmail = localStorage.getItem("email");
  const [inventoryData, setInventoryData] = useState([]);
  useEffect(() => {
    const getInventory = async () => {
      const response = await getRetailerInventory({ retailerEmail }).unwrap();
   
      setInventoryData(response.products);
    };
    getInventory();
  }, [getRetailerInventory, retailerEmail]);
  return (
    <div className="relative  w-full h-full">
      <InventoryTable items={inventoryData} />
    </div>
  );
};

export default RetailerInventory;
