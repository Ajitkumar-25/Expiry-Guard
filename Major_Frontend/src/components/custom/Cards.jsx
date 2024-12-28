import React, { useState, useEffect } from "react";
import {
  MonthlySales,
  MonthlyRevenue,
  TotalRevenue,
  ProductSaved,
  TotalSales,
  TotalRevenueHand,
} from "../../assets/index";

const Cards = ({ salesData }) => {
  const [cardData, setCardData] = useState({
    totalSales: 0,
    totalRevenue: 0,
    monthlySales: 0,
    monthlyRevenue: 0,
    productsSavedFromExpiring: 0,
    moneySavedByProducts: 0,
  });

  useEffect(() => {
    if (salesData) {
      const {
        totalSales,
        totalRevenue,
        monthlySales,
        monthlyRevenue,
        productsSavedFromExpiring,
        moneySavedByProducts,
      } = salesData;
      setCardData({
        totalSales,
        totalRevenue,
        monthlySales,
        monthlyRevenue,
        productsSavedFromExpiring,
        moneySavedByProducts,
      });
    }
  }, [salesData]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4  ">
      <div
        className="bg-white p-4 rounded-2xl shadow bg-gradient-to-r from-[#ffe2e6] to-[#f7d7e3] flex flex-col justify-between h-full

"
      >
        <div className="flex justify-between items-center mb-2 ">
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
        <div className="text-2xl font-semibold text-gray-800 mt-auto">
          {cardData.productsSavedFromExpiring}
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
        <div className="text-2xl font-semibold  text-gray-800 mt-auto ">
          {" "}
          ₹{cardData.moneySavedByProducts}
        </div>
      </div>
      <div
        className="bg-white p-4 rounded-2xl shadow bg-gradient-to-r from-[#dcfce7] to-[#f0fdf4]
flex flex-col justify-between h-full
"
      >
        <div className="flex justify-between items-center mb-2">
          <div className="flex flex-col gap-3 justify-center ">
            <img className="h-14 w-14" src={TotalSales} />
            <h3 className="font-semibold text-md">Total Sales</h3>
          </div>
        </div>
        <div className="text-2xl font-semibold  ">{cardData.totalSales}</div>
      </div>
      <div
        className="bg-white p-4  rounded-2xl shadow bg-gradient-to-r from-purple-300 to-purple-100 flex flex-col justify-between h-full 
"
      >
        <div className="flex justify-between items-center mb-2">
          <div className="flex flex-col gap-3 justify-center ">
            <img className="h-14 w-14" src={TotalRevenueHand} />
            <h3 className="font-semibold text-md text-gray-600">
              Total Revenue
            </h3>
          </div>
        </div>
        <div className="text-2xl font-semibold">
          ₹{cardData.totalRevenue.toLocaleString()}
        </div>
      </div>
      <div
        className="bg-white p-4  rounded-2xl shadow bg-gradient-to-r from-[#b7e6fa] to-[#ffffff] flex flex-col justify-between h-full

"
      >
        <div className="flex justify-between items-center mb-2">
          <div className="flex flex-col gap-3 justify-center ">
            <img className="h-14 w-14" src={MonthlySales} />
            <h3 className="font-semibold text-md text-gray-600">
              Monthly Sales in units
            </h3>
          </div>
        </div>
        <div className="text-2xl font-semibold">{cardData.monthlySales}</div>
      </div>
      <div
        className="bg-white p-4 rounded-2xl shadow bg-gradient-to-r from-[#f4e8ff] to-[#ffffff] flex flex-col justify-between h-full

"
      >
        <div className="flex justify-between items-center mb-2">
          <div className="flex flex-col gap-3 justify-center ">
            <img className="h-14 w-14" src={MonthlyRevenue} />
            <h3 className="font-semibold text-md text-gray-600">
              Monthly Revenue
            </h3>
          </div>
        </div>
        <div className="text-2xl font-semibold">
          ₹{cardData.monthlyRevenue.toLocaleString()}
        </div>
      </div>
    </div>
  );
};

export default Cards;
