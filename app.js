if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const cors = require("cors");
const express = require("express");
const errorHandler = require("./middlewares/errorHandler");
const app = express();
const port = process.env.PORT || 3000;
const router = require("./routes");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(router);
app.use(errorHandler);

module.exports = app;
