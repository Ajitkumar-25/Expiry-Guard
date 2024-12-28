import React from "react";

const HowItWorks = () => {
  const steps = [
    {
      title: "Track Inventory",
      description:
        "Retailers upload near-expiry product data to the dashboard.",
      icon: "📦",
    },
    {
      title: "Raise Requests",
      description: "Retailers send redistribution requests to suppliers.",
      icon: "📤",
    },
    {
      title: "Find Matches",
      description: "Suppliers match demand and ship products to retailers.",
      icon: "🔍",
    },
    {
      title: "Optimize & Save",
      description: "Both parties reduce waste and increase profitability.",
      icon: "📈",
    },
  ];

  return (
    <section className="py-20 px-10 bg-gray-50" id="about">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-extrabold text-center text-orange-600">
          How It Works
        </h2>
        <div className="mt-10 grid gap-8 md:grid-cols-4">
          {steps.map((step, index) => (
            <div key={index} className="text-center">
              <div className="text-5xl">{step.icon}</div>
              <h3 className="mt-5 text-xl font-bold text-gray-800">
                {step.title}
              </h3>
              <p className="mt-4 text-gray-600 font-medium text-center">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
