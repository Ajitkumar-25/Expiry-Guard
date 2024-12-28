import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {
  InventoryTracking,
  InventoryTrackingTwo,
  Environ,
  PartnerShip,
  Van,
} from "../assets/index";
const OnboardingCarousel = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    arrows: false,
  };

  const carouselData = [
    {
      title: "Optimize Inventory",
      description:
        "Minimize wastage by managing near-expiry products effectively. Track inventory in real time and take proactive actions.",
      icon: "📦",
      image: InventoryTracking,
    },
    {
      title: "Streamline Shipping",
      description:
        "Redistribute excess stock between retailers efficiently. Ensure timely delivery and maintain stock balance.",
      icon: "🚚",
      image: Van,
    },
    {
      title: "Boost Retailer-Supplier Collaboration",
      description:
        "Foster communication between suppliers and retailers. Request or offer products seamlessly through connected dashboards.",
      icon: "🤝",
      image: PartnerShip,
    },
    {
      title: "Achieve Sustainability Goals",
      description:
        "Contribute to sustainability by reducing product wastage. Track wastage reduction metrics in real time.",
      icon: "🌍",
      image: Environ,
    },
  ];

  return (
    <div className="w-[500px] max-w-xl mx-auto py-10">
      <Slider {...settings}>
        {carouselData.map((item, index) => (
          <div key={index} className="p-4">
            <div className="flex flex-col items-centerbg-gradient-to-r from-black via-gray-900 to-gray-800  rounded-lg overflow-hidden">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-[250px] object-fit"
              />
              <div className="p-6 text-center">
                <h2 className="text-2xl font-bold text-white flex items-center justify-center">
                  <span className="text-3xl mr-2">{item.icon}</span>
                  {item.title}
                </h2>
                <p className="text-white mt-4 text-md font-semibold text-center p-2">
                  {item.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default OnboardingCarousel;
