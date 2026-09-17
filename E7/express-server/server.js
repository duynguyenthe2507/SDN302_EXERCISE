const express = require("express");

const app = express();

const articleRouter = require("./routes/articleRouter");

app.use("/articles", articleRouter);

app.get("/", (req, res) => {
  res.send("Home page");
});

app.listen(3000, () => {
  console.log("Running on port 3000");
});
