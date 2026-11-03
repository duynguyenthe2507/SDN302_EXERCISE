require("dotenv").config();
const express = require("express");
const app = express();

const mongoose = require("mongoose");
const DB = require("./config/db");
const customerRoutes = require("./routes/customerRoutes");
const productRoutes = require("./routes/productRoutes");
const orderRoutes = require("./routes/orderRoutes");

DB();

//middlewares
app.use(express.json());
//Routes
app.use("/api/customers", customerRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);

app.get("/", async (req, res) => {
  try {
    res.send({ message: "Welcome to Practical Exam!" });
  } catch (error) {
    res.send({ error: error.message });
  }
});

const PORT = process.env.PORT || 9999;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
