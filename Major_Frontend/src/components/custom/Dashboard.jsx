import { useEffect, useState } from "react";
import Cards from "./Cards";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  Cell,
  Legend,
} from "recharts";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import { Dialog, DialogContent, DialogTitle } from "../../components/ui/dialog";

import { useGetExpiringProductsMutation } from "../../services/common/index";
import { useGetRetailerInventoryMutation } from "../../services/common/index";
import { usePostMyRequestMutation } from "../../services/common/index";
import { useGetSalesDtaMutation } from "../../services/common/index";
import { useGetSavedProductsDataRetailerMutation } from "../../services/common/index";
import Loader from "./Loader";
import DashboardData from "../../pages/RetailerDashboard/Components/DashboardData";

const Dashboard = () => {
  const [getSalesData, { isLoading }] = useGetSalesDtaMutation();
  const [retaileSalesData, setretaileSalesData] = useState(null);
  const [data, setdata] = useState([]);

  const retailerEmail = localStorage.getItem("email");

  const navigate = useNavigate();
  useEffect(() => {
    const showDialog = localStorage.getItem("HideDialog");
    if (!showDialog) {
      setModalOpen(true);
    }
  }, []);

  const [modalOpen, setModalOpen] = useState(true);
  const [getExpiringProducts, { isLoading: isExpiringLoading }] =
    useGetExpiringProductsMutation();
  const [expiringProducts, setExpiringProducts] = useState(0);
  const userType = localStorage.getItem("userType");

  const [getproductsSavedDataRetailer, { isSavedProductsDataLoading }] =
    useGetSavedProductsDataRetailerMutation();
  const [savedproductsDataRetailer, setsavedproductsDataRetailer] = useState(
    []
  );

  useEffect(() => {
    try {
      getproductsSavedDataRetailer({ retailerEmail })
        .unwrap()
        .then((response) => {
          setsavedproductsDataRetailer(response);
        })
        .catch((error) =>
          console.error("Error fetching saved product details:", error)
        );
    } catch (error) {
      console.error(`No data found ${error}`);
    }
  }, [getproductsSavedDataRetailer]);

  const productsSavedFromExpiring =
    savedproductsDataRetailer.totalProductsCountSaved;
  const moneySavedByProducts = savedproductsDataRetailer.totalRevenueGenerated;

  const [postMyRequest, { isLoadingPostMyRequest }] =
    usePostMyRequestMutation();
  const getRequestData = async () => {
    try {
      const response = await postMyRequest({ retailerEmail }).unwrap();

      setdata(response);
    } catch (error) {
      console.error(`No request data found ${error}`);
    }
  };
  const sortedData = [...data].sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );
  const latestProductRequests = sortedData.slice(0, 3);

  useEffect(() => {
    getRequestData();
  }, [postMyRequest]);

  useEffect(() => {
    try {
      getSalesData({ retailerEmail })
        .unwrap()
        .then((response) => {
          setretaileSalesData(response);
        })
        .catch((error) => console.error("Error fetching retailers:", error));
    } catch (error) {
      console.error(`No supplier data found ${error}`);
    }
  }, [getSalesData]);

  useEffect(() => {
    try {
      getExpiringProducts({ retailerEmail })
        .unwrap()
        .then((response) => {
          setExpiringProducts(response.expiringProductsCount);
        })
        .catch((error) =>
          console.error("Error fetching expiring products:", error)
        );
    } catch (error) {
      console.error(`No expiring products found ${error}`);
    }
  }, [getExpiringProducts]);

  const [getRetailerInventory, { isRetailerLoading }] =
    useGetRetailerInventoryMutation();

  const [inventoryData, setInventoryData] = useState([]);
  useEffect(() => {
    const getInventory = async () => {
      const response = await getRetailerInventory({ retailerEmail }).unwrap();

      setInventoryData(response.products);
    };
    getInventory();
  }, [getRetailerInventory, retailerEmail]);

  if (isLoading || !retaileSalesData) {
    return <Loader />;
  }
  const parseDate = (date) => new Date(date);

  const lowStockProducts = inventoryData
    .filter((product) => product.quantity < 10)
    .sort((a, b) => a.quantity - b.quantity)
    .slice(0, 5);

  const nearestExpiryProducts = inventoryData
    .filter((product) => parseDate(product.expiryDate) >= new Date())
    .sort((a, b) => parseDate(a.expiryDate) - parseDate(b.expiryDate))
    .slice(0, 5);

  const { monthlySales, monthlyRevenue, topSellingProducts, salesByProduct } =
    retaileSalesData;

  const salesData = Object.keys(monthlySales).map((month) => ({
    month,
    sales: monthlySales[month],
    revenue: monthlyRevenue[month],
  }));

  const salesByProductData = Object.entries(salesByProduct).map(
    ([product, sales]) => ({
      product,
      sales,
    })
  );

  const topSellingProductsData = topSellingProducts
    .map(([product, quantity]) => ({
      product,
      quantity,
    }))
    .slice(0, 5);

  const COLORS = ["#9d5bbd", "#9d5bbd", "#9d5bbd", "#9d5bbd"];

  const date = new Date();
  const currentYear = date.getFullYear();
  const currentMonth = date.getMonth() + 1;
  const monthYearDate = `${currentMonth}-${currentYear}`;

  const totalSales = salesData.reduce((acc, curr) => acc + curr.sales, 0);
  const totalRevenue = salesData.reduce((acc, curr) => acc + curr.revenue, 0);
  const monthlySalesValue = monthlySales[monthYearDate] || 0;
  const monthlyRevenueValue = monthlyRevenue[monthYearDate] || 0;

  const handleNavigate = () => {
  sessionStorage.setItem("HideDialog", "true");
    navigate("/inventory");
  };
  const handleDialogClose = () => {
    sessionStorage.setItem("HideDialog", "true");
    setModalOpen(false);
  };
  const HideDialog = sessionStorage.getItem("HideDialog");

  return (
    <div className="p-6 bg-white min-h-screen rounded-xl ">
      {/* Dialog Modal */}
      {userType === "retailer" && !HideDialog && (
        <Dialog open={modalOpen} onOpenChange={handleDialogClose}>
          <DialogContent
            className="bg-primary w-[900px] h-[300px] rounded-md"
            description=""
            aria-describedby={undefined}
          >
            <div className="bg-white -m-5 rounded-md flex justify-center items-center">
              <DialogTitle className="text-5xl text-red-600 font-bold text-center py-3">
                !! ALERT !!
              </DialogTitle>
            </div>
            <h1 className="text-2xl text-white font-extrabold text-center mt-6">
              Expiring Products
            </h1>
            <div className="text-center text-white text-lg mt-4">
              {expiringProducts > 0 ? (
                <p>
                  You have{" "}
                  <span
                    className="text-orange-400 font-semibold  hover:underline cursor-pointer "
                    onClick={handleNavigate}
                  >
                    {expiringProducts === 1
                      ? `${expiringProducts} product `
                      : `${expiringProducts} products `}
                  </span>
                  expiring within a week.
                </p>
              ) : (
                <p>No products are expiring within a week.</p>
              )}
            </div>
          </DialogContent>
        </Dialog>
      )}

      <Cards
        salesData={{
          totalSales,
          totalRevenue,
          monthlySales: monthlySalesValue,
          monthlyRevenue: monthlyRevenueValue,
          moneySavedByProducts,
          productsSavedFromExpiring,
        }}
      />
      {/* Right Panel */}

      <DashboardData
        data={{
          lowStockProducts,
          nearestExpiryProducts,
          latestProductRequests,
        }}
      />

      {/* Overview Section */}
      <div className="mt-10 grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sales Overview */}
        <div className="bg-slate-100 p-6 rounded-xl shadow">
          <h2 className="text-xl font-semibold mb-4">Sales Overview</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={salesData}>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="sales" fill="#FF7F50" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Revenue Overview */}
        <div className="bg-slate-100 p-6 rounded-xl shadow">
          <h2 className="text-xl font-semibold mb-4">Revenue Overview</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={salesData}>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="revenue"
                stroke="#8884d8"
                strokeWidth={3}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Product Insights Section */}
      <div className="mt-10 grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sales by Product */}
        <div className="bg-slate-100 p-6 rounded-xl shadow">
          <h2 className="text-xl font-semibold mb-4">Sales by Product</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={salesByProductData}>
              <XAxis dataKey="product" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="sales"
                stroke="#82ca9d"
                strokeWidth={3}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Top Selling Products */}
        <div className="bg-slate-100 p-6 rounded-xl shadow">
          <h2 className="text-xl font-semibold mb-4">Top 5 Selling Products</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              data={topSellingProductsData}
              layout="vertical"
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <XAxis type="number" />
              <YAxis type="category" dataKey="product" />
              <Tooltip />
              <Legend />
              <Bar dataKey="quantity" fill="#8884d8">
                {topSellingProductsData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
