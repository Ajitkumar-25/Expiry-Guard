import React from "react";
import { InventoryTrackingTwo } from "../../assets/index";
import { Link } from "react-router-dom";
import { HeroImg } from "../../assets/index";

const Hero = () => {
  return (
    <section className="bg-blue-50 py-16 px-20">
      <div className="container mx-auto px-6 flex flex-col md:flex-row items-center">
        {/* Text Section - Left side */}
        <div className="md:w-1/2 text-center md:text-left">
          <h1 className="text-5xl font-bold text-orange-600">
            Optimize Inventory, Maximize Profit
          </h1>
          <p className="mt-4 text-xl text-gray-800 font-medium">
            Connect retailers and suppliers to redistribute near-expiry products
            efficiently.
          </p>
          <Link to="/register">
            <button className="mt-8 bg-orange-600 text-white text-xl py-5 px-6 rounded-2xl shadow hover:bg-orange-700 font-bold">
              Get Started for Free
            </button>
          </Link>
        </div>

        {/* Image Section - Right side */}
        <div className="mt-8 md:mt-0 md:w-1/2 flex justify-center">
          <img
            src={HeroImg}
            alt="Hero Image"
            className="h-100 w-100 object-cover"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
