// src/components/Redistribution.js
import React, { useEffect, useState } from "react";
import { TailSpin } from "react-loader-spinner";
import { Button } from "../../components/ui/button";
import { useGetProductReqSupplierMutation } from "../../services/common";
import RetailerProductData from "./ProductRequest/RetailerProduct";
const Redistribution = () => {
  const supplierEmail = localStorage.getItem("email");

  const [getProductReq, { isLoading }] = useGetProductReqSupplierMutation();
  const [retailerProductData, setretailerProductData] = useState([]);

  useEffect(() => {
    const getProductData = async () => {
      const response = await getProductReq({ supplierEmail });

      setretailerProductData(response.data);
    };
    getProductData();
  }, [getProductReq]);

  const handleClick = () => {};
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <TailSpin height="80" width="80" color="#f3a247" ariaLabel="loading" />
      </div>
    );
  }
  return (
    <div className="flex items-center justify-center h-full">
      <h2 className="text-2xl font-semibold">
        <RetailerProductData data={retailerProductData} />
      </h2>
    </div>
  );
};

export default Redistribution;
