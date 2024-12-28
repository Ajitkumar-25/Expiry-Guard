const mongoose = require("mongoose");

const productRequestSchema = new mongoose.Schema({
  requestId: {
    type: String,
    required: true,
  },
  productName: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  supplierEmail: {
    type: String,
    required: true,
  },
  retailerEmail: {
    type: String,
    required: true,
  },
  expiryDate: {
    type: String,
  },
  reqType: {
    type: String,
    required: true,
  },
  reqStatus: {
    type: String,
    enum: ["pending", "processing", "processed"],
    default: "pending",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const ProductRequest = mongoose.model("ProductRequest", productRequestSchema);

module.exports = ProductRequest;
