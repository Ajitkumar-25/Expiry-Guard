import { useGetAdminDataMutation } from "../../services/common/index";
import { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import { FaTrash } from "react-icons/fa";

const AdminDashboard = () => {
  const [getAdmindata] = useGetAdminDataMutation();
  const [suppliersData, setSuppliersData] = useState([]);
  const [retailersData, setRetailersData] = useState([]);

  useEffect(() => {
    getAdmindata({})
      .unwrap()
      .then((response) => {
        if (response) {
          const dataArray = Array.isArray(response) ? response : [response];
          setSuppliersData(dataArray.flatMap((item) => item.suppliers || []));
          setRetailersData(dataArray.flatMap((item) => item.retailers || []));
        }
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, [getAdmindata]);

  const handleDelete = (type, id) => {
    console.log(`Delete ${type} with ID: ${id}`);
    // Implement delete logic here
  };

  const suppliersColumns = [
    { name: "Supplier ID", selector: (row) => row.supplierId, sortable: true },
    { name: "Name", selector: (row) => row.name, sortable: true },
    { name: "Email", selector: (row) => row.email, sortable: true },
    { name: "Phone", selector: (row) => row.phoneNumber, sortable: true },
    {
      name: "Company",
      selector: (row) => row.companyName || "N/A",
      sortable: true,
    },
    {
      name: "Commodity",
      selector: (row) => row.commoditySold || "N/A",
      sortable: true,
    },
    {
      name: "Action",
      cell: (row) => (
        <button
          onClick={() => handleDelete("supplier", row._id)}
          className="text-red-500 hover:text-red-700 transition duration-200 ease-in-out"
        >
          <FaTrash className="text-lg" />
        </button>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
  ];

  const retailersColumns = [
    { name: "Retailer ID", selector: (row) => row.retailerId, sortable: true },
    { name: "Name", selector: (row) => row.name, sortable: true },
    { name: "Email", selector: (row) => row.email, sortable: true },
    { name: "Phone", selector: (row) => row.phoneNumber, sortable: true },
    { name: "Address", selector: (row) => row.address, sortable: true },
    {
      name: "Action",
      cell: (row) => (
        <button
          onClick={() => handleDelete("retailer", row._id)}
          className="text-red-500 hover:text-red-700 transition duration-200 ease-in-out"
        >
          <FaTrash className="text-lg" />
        </button>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
  ];

  const customStyles = {
    header: {
      style: {
        fontSize: "16px",
        fontWeight: "bold",
        textTransform: "uppercase",
        color: "#1F2937",
      },
    },
    rows: {
      style: {
        "&:hover": {
          backgroundColor: "#F3F4F6",
        },
      },
    },
    pagination: {
      style: {
        backgroundColor: "#F9FAFB",
        borderTop: "1px solid #E5E7EB",
      },
    },
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4 md:px-20">
      <div className="max-w-8xl mx-auto bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-4xl font-extrabold text-orange-600 text-center mb-6 pb-3 border-b-2">
          Admin Dashboard
        </h1>

        {/* Suppliers Section */}
        <div className="mb-10">
          <h2 className="text-3xl font-bold text-gray-400 mb-4">Suppliers</h2>
          <DataTable
            columns={suppliersColumns}
            data={suppliersData}
            pagination
            highlightOnHover
            responsive
            striped
            customStyles={customStyles}
          />
        </div>

        {/* Retailers Section */}
        <div>
          <h2 className="text-3xl font-semibold text-gray-400 mb-4">
            Retailers
          </h2>
          <DataTable
            columns={retailersColumns}
            data={retailersData}
            pagination
            highlightOnHover
            responsive
            striped
            customStyles={customStyles}
          />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
