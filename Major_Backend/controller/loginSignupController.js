var express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const Supplier = require("../models/supplier");
const Retailer = require("../models/retailer");

const api_registration = async (req, res) => {
  try {
    const {
      userType,
      name,
      email,
      password,
      phoneNumber,
      address,
      companyName,
      commoditySold,
    } = req.body;

    let UserModel, userIdPrefix, existingUser;
    if (userType === "supplier") {
      UserModel = Supplier;
      userIdPrefix = "SUP";
      existingUser = await UserModel.findOne({ email: email });
    } else if (userType === "retailer") {
      UserModel = Retailer;
      userIdPrefix = "RET";
      existingUser = await UserModel.findOne({ email: email });
    } else {
      return res.status(400).json({ msg: "Invalid user type" });
    }

    if (existingUser) {
      return res.status(400).json({ msg: `${userType} already exists` });
    }

    const userId = `${userIdPrefix}-${Date.now()}-${Math.floor(
      Math.random() * 1000
    )}`;
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUserData = {
      [`${userType}Id`]: userId,
      name,
      email,
      password: hashedPassword,
      phoneNumber,
      address,
    };

    if (userType === "supplier") {
      newUserData.companyName = companyName;
      newUserData.commoditySold = commoditySold;
    }

    const newUser = new UserModel(newUserData);
    await newUser.save();
    res.json({ msg: `${userType} registered successfully` });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

const api_login = async (req, res) => {
  try {
    const { userType, email, password } = req.body;

    let UserModel, userKey;
    if (userType === "supplier") {
      UserModel = Supplier;
      userKey = "supplier";
    } else if (userType === "retailer") {
      UserModel = Retailer;
      userKey = "retailer";
    } else {
      return res.status(400).json({ msg: "Invalid user type" });
    }

    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: "Invalid email" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid password" });
    }
    const payload = {
      [userKey]: {
        id: user.id,
      },
    };
    jwt.sign(
      payload,
      process.env.SECRET_KEY,
      { expiresIn: 360000 },
      (err, token) => {
        if (err) throw err;

        res.json({ authToken: token, userType: userType, user });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

module.exports = {
  api_registration,
  api_login,
};
