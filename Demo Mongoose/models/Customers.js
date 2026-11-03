const mongoose = require("mongoose");

const customersSchema = new mongoose.Schema({
  id: { type: String },
  name: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true },
  address: { type: String, required: true },
  createdAt: { type: Date, required: true },
  updatedAt: { type: Date, required: true },
});

const Customer = mongoose.model("Customer", customersSchema, "customers");
module.exports = Customer;
