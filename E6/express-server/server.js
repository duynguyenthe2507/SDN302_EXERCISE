const express = require("express");
const app = express();

const data = require("./data.json")

app.get("/api/data", (req, res) => {
 res.json(data)
});

app.get("/", (req, res) => {
  res.send(data.message);
});
app.listen(3000, () => {
  console.log("Running on port 3000");
});
