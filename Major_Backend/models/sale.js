const mongoose = require("mongoose");

const SaleSchema = new mongoose.Schema({
  productName: {
    type: String,
    required: true,
  },
  quantitySold: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  manufactureDate: {
    type: Date,
    required: true,
  },
  expiryDate: {
    type: Date,
    required: true,
  },
  retailerEmail: {
    type: String,
    required: true,
  },
  saleDate: {
    type: Date,
    required: true,
    default: Date.now,
  },
  month: {
    type: Number,
  },
  year: {
    type: Number,
  },
});

SaleSchema.pre("save", function (next) {
  const sale = this;
  const saleDate = new Date(sale.saleDate);
  sale.month = saleDate.getMonth() + 1;
  sale.year = saleDate.getFullYear();
  next();
});

const Sale = mongoose.models.Sale || mongoose.model("Sale", SaleSchema);
module.exports = Sale;
