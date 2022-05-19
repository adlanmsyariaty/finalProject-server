const express = require("express");
// const errorHandler = require("./middlewares/error-handlers");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 3000;
const routes = require("./routes/index");

app.use(cors());

app.use(express.urlencoded({ extended: false }));

app.use(express.json());

app.use("/", routes);

// app.use(errorHandler);

app.listen(port, () => {
  console.log(`app listening on port ${port}`);
});

module.exports = app;