import React from "react";
import { TailSpin } from "react-loader-spinner";

const Loader = () => {
  return (
    <div className="fixed inset-0 flex justify-center items-center bg-gray-100 bg-opacity-50 z-50">
      <TailSpin height="80" width="80" color="#f3a247" ariaLabel="loading" />
    </div>
  );
};

export default Loader;
