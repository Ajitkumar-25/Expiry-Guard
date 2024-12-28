import { useGetWebStatsMutation } from "../../services/common/index";
import { useState, useEffect } from "react";
import { RiMoneyRupeeCircleLine } from "react-icons/ri";
import { MdOutlineAddShoppingCart } from "react-icons/md";
const Webstats = () => {
  const [webstats] = useGetWebStatsMutation();
  const [webstatsData, setwebstatsData] = useState([]);

  useEffect(() => {
    try {
      webstats({})
        .unwrap()
        .then((response) => {
          const dataArray = Array.isArray(response) ? response : [response];

          setwebstatsData(dataArray[0]);
        })
        .catch((error) => console.error("Error fetching retailers:", error));
    } catch (error) {
      console.error(`No supplier data found ${error}`);
    }
  }, [webstats]);
  console.log(webstatsData);

  return (
    <section className="text-gray-600 body-font mx-20 mt-28" id="statistics">
      <div className="container px-5 pb-6  mx-auto ">
        <div className="flex flex-col text-center w-full mb-8">
          <h1 className="sm:text-3xl text-2xl font-extrabold title-font text-orange-600">
            Platform Statistics
          </h1>
        </div>
        <div className="flex flex-wrap -m-4 text-center">
          <div className="p-4 md:w-1/3 sm:w-1/2 w-full">
            <div className=" px-4 py-6 rounded-lg">
              <svg
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="text-indigo-500 w-12 h-12 mb-3 inline-block"
                viewBox="0 0 24 24"
              >
                <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"></path>
                <circle cx="9" cy="7" r="4"></circle>
                <path d="M23 21v-2a4 4 0 00-3-3.87m-4-12a4 4 0 010 7.75"></path>
              </svg>
              <h2 className="title-font font-medium text-3xl text-gray-900">
                {webstatsData.totalUsercount}
              </h2>
              <p className="leading-relaxed">Total Suppliers And Retailers</p>
            </div>
          </div>
          <div className="p-4 md:w-1/3 sm:w-1/2 w-full">
            <div className="px-4 py-6 rounded-lg">
              <MdOutlineAddShoppingCart className="text-indigo-500 w-12 h-12 mb-3 inline-block" />
              <h2 className="title-font font-medium text-3xl text-gray-900">
                {webstatsData.totalProductsCountSaved}
              </h2>
              <p className="leading-relaxed">Products Saved From Expiring</p>
            </div>
          </div>

          <div className="p-4 md:w-1/3 sm:w-1/2 w-full">
            <div className=" px-4 py-6 rounded-lg">
              <RiMoneyRupeeCircleLine className="text-indigo-500 w-12 h-12 mb-3 inline-block" />
              <h2 className="title-font font-medium text-3xl text-gray-900">
                ₹{webstatsData.totalRevenueGenerated}
              </h2>
              <p className="leading-relaxed">Money Saved</p>
            </div>
          </div>
          {/* <div className="p-4 md:w-1/4 sm:w-1/2 w-full">
            <div className="border-2 border-gray-200 px-4 py-6 rounded-lg">
              <svg
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="text-indigo-500 w-12 h-12 mb-3 inline-block"
                viewBox="0 0 24 24"
              >
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
              </svg>
              <h2 className="title-font font-medium text-3xl text-gray-900">
                46
              </h2>
              <p className="leading-relaxed">Places</p>
            </div>
          </div> */}
        </div>
      </div>
    </section>
  );
};

export default Webstats;
