import React from "react";
import { XIcon } from "@heroicons/react/outline";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { motion } from "framer-motion";

function RetailerDetailsOverlay({ retailer, onClose }) {
  const data = [
    { name: "Stock Left", value: 500 },
    { name: "New Stock Required", value: 200 },
    { name: "Sold Stock", value: 300 },
    { name: "Total Stock Supplied", value: 800 },
  ];
  const COLORS = ["#0088FE", "#FFBB28", "#FF8042"];

  return (
    <motion.div
      className="bg-white p-6 shadow-md h-full relative"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
    >
      {/* X Icon for Close */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 p-2 hover:bg-gray-200 rounded-full"
      >
        <XIcon className="h-6 w-6 text-gray-500 hover:text-red-500" />
      </button>

      {/* Retailer Details */}
      <div className="text-center">
        <h2 className="text-3xl font-semibold mb-6">{retailer.name} Details</h2>

        <div className="grid grid-cols-2 gap-6 mb-6">
          <p className="font-medium">Item Sold:</p>
          <p>200</p>
          <p className="font-medium">Stock Left:</p>
          <p>400</p>
          <p className="font-medium">Stock Sold by Retailer:</p>
          <p>300</p>
          <p className="font-medium">New Stock Needed:</p>
          <p>200</p>
          <p className="font-medium">Next Stock Delivery:</p>
          <p>2024-09-25</p>
          <p className="font-medium">Driver Assigned:</p>
          <p>Aju kumar</p>
        </div>

        {/* Pie Chart for Stock Information */}
        <div className="mt-6">
          <h3 className="text-xl font-semibold mb-4">Stock Overview</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={data}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
              >
                {data.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </motion.div>
  );
}

export default RetailerDetailsOverlay;
