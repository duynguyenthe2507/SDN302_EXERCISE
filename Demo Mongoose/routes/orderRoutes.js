const express = require("express");
const router = express.Router();
const orderController = require("../controllers/orderController");

router.get("/", orderController.getAllOrders);
router.get("/:id", orderController.getOrderById);
router.post("/:id", orderController.createOrder);
router.put("/:id", orderController.updateOrderById);
router.delete("/:id", orderController.deleteOrderById);

module.exports = router;
