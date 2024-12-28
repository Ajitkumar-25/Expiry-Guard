const mongoose = require("mongoose");

const driverSchema = new mongoose.Schema({
  driverId: {
    type: String,
    required: true,
    unique: true,
  },
  driverName: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  vehicleNumber: {
    type: String,
    required: true,
  },
  driverEmail: {
    type: String,
    required: true,
  },
  serviceArea: {
    type: String,
    required: true,
  },
  vehicleType: {
    type: String,
    required: true,
  },
});

const supplierSchema = new mongoose.Schema({
  supplierId: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  companyName: {
    type: String,
    required: true,
  },
  commoditySold: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  drivers: [driverSchema],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Supplier =
  mongoose.models.Supplier || mongoose.model("Supplier", supplierSchema);

module.exports = Supplier;
