// src/components/Table.js
import React from 'react';

const Table = () => {

  const data = [
    {
      retailerName: 'Retailer A',
      itemSold: 'Item 1',
      quantitySold: 100,
      driverAssigned: 'Driver X',
      deliveryDate: '2024-09-20',
      expiryDate: '2025-09-20',
    },
    {
      retailerName: 'Retailer B',
      itemSold: 'Item 2',
      quantitySold: 150,
      driverAssigned: 'Driver Y',
      deliveryDate: '2024-09-21',
      expiryDate: '2025-09-21',
    },
    {
      retailerName: 'Retailer B',
      itemSold: 'Item 2',
      quantitySold: 150,
      driverAssigned: 'Driver Y',
      deliveryDate: '2024-09-21',
      expiryDate: '2025-09-21',
    },
    {
      retailerName: 'Retailer B',
      itemSold: 'Item 2',
      quantitySold: 150,
      driverAssigned: 'Driver Y',
      deliveryDate: '2024-09-21',
      expiryDate: '2025-09-21',
    },
    {
      retailerName: 'Retailer B',
      itemSold: 'Item 2',
      quantitySold: 150,
      driverAssigned: 'Driver Y',
      deliveryDate: '2024-09-21',
      expiryDate: '2025-09-21',
    },
    // Add more mock data as needed
  ];

  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="text-lg font-semibold mb-4">Sales Data</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto">
          <thead className="bg-gray-200">
            <tr>
              <th className="px-4 py-2">Retailer Name</th>
              <th className="px-4 py-2">Item Sold</th>
              <th className="px-4 py-2">Quantity Sold</th>
              <th className="px-4 py-2">Driver Assigned</th>
              <th className="px-4 py-2">Delivery Date</th>
              <th className="px-4 py-2">Expiry Date</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, idx) => (
              <tr key={idx} className="text-center border-t">
                <td className="px-4 py-2">{row.retailerName}</td>
                <td className="px-4 py-2">{row.itemSold}</td>
                <td className="px-4 py-2">{row.quantitySold}</td>
                <td className="px-4 py-2">{row.driverAssigned}</td>
                <td className="px-4 py-2">{row.deliveryDate}</td>
                <td className="px-4 py-2">{row.expiryDate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;
