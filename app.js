if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
// const port = process.env.PORT || 3000;
const cors = require("cors");
const express = require("express");
const errorHandler = require("./middlewares/errorHandler");
const app = express();
const router = require("./routes");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(router);
app.use(errorHandler);

app.listen(port, (_) => {
  console.log(`This app is listening on port `, port)
});

// module.exports = app