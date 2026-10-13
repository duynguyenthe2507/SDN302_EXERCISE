require("dotenv").config();
const express = require("express");
const app = express();

const mongoose = require("mongoose");
const DB = require("./config/db");
const bookRoutes = require("./routes/bookRoutes");
const memberRoutes = require("./routes/memberRoutes");
const loanRoutes = require("./routes/loanRoutes");

DB();

//middlewares
app.use(express.json());
//Routes
app.use("/api/books", bookRoutes);
app.use("/api/members", memberRoutes);
app.use("/api/loans", loanRoutes);

app.get("/", async (req, res) => {
  try {
    res.send({ message: "Welcome to Practical Exam!" });
  } catch (error) {
    res.send({ error: error.message });
  }
});

const PORT = process.env.PORT || 9999;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
