const mongoose = require("mongoose");

const ordersSchema = new mongoose.Schema({
  id: { type: String },
  customer_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Customer",
    required: true,
  },
  items: [
    {
      product_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
      },
      quantity: { type: Number, required: true },
      price_at_order: { type: Number, required: true },
      total: { type: Number, required: true },
    },
  ],
  total_amount: { type: Number, required: true },
  payment_method: { type: String, required: true },
  status: { type: String, required: true },
  order_date: { type: Date, required: true },
  createdAt: { type: Date, required: true },
  updatedAt: { type: Date, required: true },
});

const Order = mongoose.model("Order", ordersSchema, "orders");
module.exports = Order;
