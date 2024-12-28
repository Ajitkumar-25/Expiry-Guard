const mongoose = require("mongoose");

const transferTaskSchema = new mongoose.Schema({
  taskId: String,
  sourceRetailerEmail: {
    type: String,
    required: true,
  },
  sourceRetailerName: {
    type: String,
    required: true,
  },
  sourceRetailerAddress: {
    type: String,
  },

  targetRetailerEmail: {
    type: String,
    required: true,
  },
  targetRetailerName: {
    type: String,
    required: true,
  },
  targetRetailerAddress: {
    type: String,
  },
  products: [
    {
      productName: String,
      quantity: String,
      price: String,
    },
  ],
  driverEmail: {
    type: String,
    required: true,
  },
  supplierEmail: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["assigned", "completed"],
    default: "assigned",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
TransferTask =
  mongoose.models.TransferTask ||
  mongoose.model("TransferTask", transferTaskSchema);
module.exports = TransferTask;
