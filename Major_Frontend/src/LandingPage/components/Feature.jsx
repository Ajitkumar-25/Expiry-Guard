import React from "react";
import { FeatureSectionone, TotalRevenue } from "../../assets/index";

const Features = () => {
  const features = [
    {
      title: "Smart Inventory Tracking",
      description: "Track and manage near-expiry products in real-time.",
      img: FeatureSectionone,
    },
    {
      title: "Seamless Redistribution",
      description:
        "Connect with suppliers or retailers for efficient redistribution.",
      img: TotalRevenue,
    },
    {
      title: "Cost Savings",
      description: "Reduce wastage and save costs on returns.",
      img: TotalRevenue,
    },
  ];

  return (
    <section className="mt-10 mb-10 bg-white" >
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-extrabold  text-center text-orange-600 ">
          Features
        </h2>
        <div className="mt-10 grid gap-8 md:grid-cols-3">
          {features.map((feature, index) => (
            <div
              key={index}
              className="p-6 bg-gray-800 rounded-xl shadow text-center"
            >
              <img src={feature.img} className="h-40 w-40 m-auto" />
              <h3 className="mt-4 text-2xl font-bold text-white">
                {feature.title}
              </h3>
              <p className="mt-2 text-white font-semibold text-md">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
