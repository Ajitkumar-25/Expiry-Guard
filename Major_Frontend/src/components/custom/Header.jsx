// src/components/Header.js
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { removeUser } from "../../Redux/reducers/auth";
import { TailSpin } from "react-loader-spinner";
import { Button } from "../ui/button";
import Logo from "../../../public/Logo.jpg";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../components/ui/avatar";

const Header = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = localStorage.getItem("userType");
  const formattedUser = user
    ? user.charAt(0).toUpperCase() + user.slice(1).toLowerCase()
    : "";

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <TailSpin height="80" width="80" color="#f3a247" ariaLabel="loading" />
      </div>
    );
  }
  return (
    <header className="bg-white shadow p-4 flex justify-between items-center">
      <div className="flex items-center justify-center gap-4">
        <img src={Logo} className="w-14 h-14" />
        <h1 className="text-3xl font-extrabold text-primary">Expiry Guard</h1>
      </div>
      <div className="text-md text-gray-600 font-bold p-4">{formattedUser} Dashboard</div>
    </header>
  );
};

export default Header;
