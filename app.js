require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { errors } = require("celebrate");

const app = express();
const { PORT = 3001 } = process.env;
const mongoose = require("mongoose");
const mainRouter = require("./routes/index");
const { NOT_FOUND } = require("./utils/errors");
const errorHandler = require("./middlewares/error-handler");
const { requestLogger, errorLogger } = require("./middlewares/logger");

mongoose
  .connect("mongodb://127.0.0.1:27017/wtwr_db")
  .then(() => {
    // eslint-disable-next-line no-console
    console.log("Connected to DB");
  })
  .catch(
    // eslint-disable-next-line no-console
    console.error
  );

app.use(cors());
app.use(express.json());
app.use(requestLogger);
app.use("/", mainRouter);

app.use((req, res) => {
  res.status(NOT_FOUND).send({ message: "Requested resource not found" });
});

app.use(errorLogger);
app.use(errors());

app.use(errorHandler);

if (process.env.NODE_ENV !== "test") {
  app.listen(PORT, () => {
    // eslint-disable-next-line no-console
    console.log(`listening on ${PORT}`);
  });
}
