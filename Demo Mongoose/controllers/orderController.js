const Order = require("../models/Orders");

exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find();
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
exports.getOrderById = async (req, res) => {
  try {
    const orders = await Order.findById(req.params.id);
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
exports.createOrder = async (req, res) => {
  try {
    const orders = new Order(req.body);
    await orders.save();
    res.status(201).json(orders);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
exports.updateOrderById = async (req, res) => {
  try {
    const orders = await Order.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true },
    );
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
exports.deleteOrderById = async (req, res) => {
  try {
    const orderId = Number(req.params.id);
    const orderIndex = data.orders.findIndex((o) => o.id === orderId);

    if (orderIndex === -1) {
      return res.status(404).json({ message: "Article not found" });
    }

    const deletedOrder = data.orders.splice(orderIndex, 1);
    res.status(200).json(deletedOrder[0]);
  } catch (error) {
    res.json({ error: error.message });
  }
};
