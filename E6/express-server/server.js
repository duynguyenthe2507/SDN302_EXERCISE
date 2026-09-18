const express = require("express");
const app = express();

const data = require("./data.json");

app.use(express.json());

app.get("/api/data", (req, res) => {
  res.json(data);
});
app.post("/api/update", (req, res) => {
  const update = req.body;
  res.json(update)
});

app.get("/", (req, res) => {
  res.send(data.message);
});
app.listen(3000, () => {
  console.log("Running on port 3000");
});
