import {
  InventoryTrackingTwo,
  Users,
  PartnerShip,
  Parternship_two,
  InventoryTrackingThree,
} from "../../assets/index";

import { TotalSales } from "../../assets/index";
import { Notifications } from "../../assets/index";
import { Reporting } from "../../assets/index";
import { Expiry } from "../../assets/index";
import { Expiry2 } from "../../assets/index";
import { Driver } from "../../assets/index";
const Benefits = () => {
  const benefits = [
    {
      title: "Real-time Inventory Tracking",
      description:
        "Track inventory levels in real-time to prevent overstocking or stockouts.",
      icon: InventoryTrackingThree,
    },
    {
      title: "Automated Expiry Management",
      description:
        "Automatically manage products nearing expiry to reduce waste and maximize shelf space.",
      icon: Expiry2,
    },
    {
      title: "Enhanced Supplier-Retailer Collaboration",
      description:
        "Facilitate better communication and coordination between suppliers and retailers.",
      icon: Users,
    },
    {
      title: "Redistribution of Near-Expiry Products",
      description:
        "Efficiently redistribute products nearing expiry to stores with higher demand.",
      icon: Driver,
    },
    // {
    //   title: "Comprehensive Financial Reporting",
    //   description:
    //     "Generate detailed financial reports to analyze profit, loss, and overall performance.",
    //   icon: Reporting,
    // },
    // {
    //   title: "Timely Notifications",
    //   description:
    //     "Receive timely alerts and notifications to take action on near-expiry products.",
    //   icon: Notifications,
    // },
    {
      title: "Minimized Waste and Maximized Profitability",
      description:
        "Implement strategies to minimize waste and enhance overall profitability.",
      icon: TotalSales,
    },
    {
      title: "Customer Satisfaction",
      description:
        "Ensure customer satisfaction by keeping fresh products in stock and delivering on time.",
      icon: Parternship_two,
    },
  ];

  return (
    <section className="py-5 m-16 " id="features">
      <div className="container mx-auto px-6  text-center">
        <h2 className="text-4xl font-extrabold text-orange-600">Features</h2>
        <p className="mt-2 text-gray-600 text-2xl font-semibold ">
          What's Expiry Guard Provides
        </p>
        <div className="mt-10 grid  gap-8 md:grid-cols-2 lg:grid-cols-3">
          {benefits.map((benefit, index) => (
            <div key={index} className="p-6 shadow rounded-3xl bg-gray-100">
              <div className="flex justify-center">
                <img
                  src={benefit.icon}
                  alt={benefit.title}
                  className="w-26 h-20 mb-4"
                />
              </div>
              <h3 className="text-2xl font-semibold text-gray-700">
                {benefit.title}
              </h3>
              <p className="mt-2 text-gray-500 font-medium text-md">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Benefits;
