import React from "react";
import Slider from "react-slick";
import { FaUser, FaCog, FaChartLine } from "react-icons/fa";

// Sample images
const images = [
  "https://via.placeholder.com/300x200/ff7f7f/fff?text=Image+1",
  "https://via.placeholder.com/300x200/7f7fff/fff?text=Image+2",
  "https://via.placeholder.com/300x200/7fff7f/fff?text=Image+3",
];

const sliderData = [
  {
    title: "User Management",
    description: "Manage user profiles and settings effortlessly.",
    icon: <FaUser className="text-4xl mb-2" />,
  },
  {
    title: "Settings",
    description: "Configure application settings for better performance.",
    icon: <FaCog className="text-4xl mb-2" />,
  },
  {
    title: "Analytics",
    description: "Track user behavior and improve engagement.",
    icon: <FaChartLine className="text-4xl mb-2" />,
  },
];

const GlassmorphicSlider = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 3000,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div className="w-full p-8 bg-gray-100">
      <Slider {...settings}>
        {sliderData.map((item, index) => (
          <div key={index} className="flex justify-center">
            <div className="bg-white bg-opacity-30 backdrop-blur-md shadow-lg rounded-lg p-6 flex flex-col items-center">
              {item.icon}
              <h2 className="text-2xl font-semibold mb-2">{item.title}</h2>
              <p className="text-center text-gray-700">{item.description}</p>
              <img
                src={images[index]}
                alt={`Slide ${index + 1}`}
                className="mt-4 rounded-md"
              />
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default GlassmorphicSlider;
