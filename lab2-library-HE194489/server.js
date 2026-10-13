require("dotenv").config();
const express = require("express");
const app = express();

const DB = require("./config/db");
const bookRoutes = require("./routes/bookRoutes");
const memberRoutes = require("./routes/memberRoutes");
const loanRoutes = require("./routes/loanRoutes");

//middlewares
app.use(express.json());
//Routes
app.use("/api/books", bookRoutes);
app.use("/api/members", memberRoutes);
app.use("/api/loans", loanRoutes);

app.get("/", (req, res) => {
  res.status(200).json({ message: "Welcome to Practical Exam!" });
});

const PORT = process.env.PORT || 9999;

const startServer = async () => {
  try {
    await DB();
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  } catch (error) {
    console.error("Server failed to start:", error.message);
    process.exit(1);
  }
};

startServer();
