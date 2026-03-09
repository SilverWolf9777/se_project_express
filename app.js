const express = require("express");
const app = express();
const { PORT = 3001 } = process.env;
const mongoose = require("mongoose");
const mainRouter = require("./routes/index");
const { NOT_FOUND } = require("./utils/errors");

mongoose
  .connect("mongodb://127.0.0.1:27017/wtwr_db")
  .then(() => {
    console.log("Connected to DB");
  })
  .catch(console.error);

app.use(express.json());

// Temporary authorization middleware
app.use((req, res, next) => {
  req.user = {
    _id: "5d8b8592978f8bd833ca8133", // Replace with actual test user ID
  };
  next();
});

app.use("/", mainRouter);

// 404 handler for non-existent routes
app.use((req, res) => {
  res.status(NOT_FOUND).send({ message: "Requested resource not found" });
});

app.listen(PORT, () => {
  console.log(`listening on ${PORT}`);
});
