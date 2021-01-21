const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const cors = require("cors");

const { handleError, AppError } = require("./middleware/error");

require("dotenv").config();

//Connect the database
mongoose
  .connect(process.env.DB_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => {
    console.log("MongoDB Connected!");
  })
  .catch((e) => {
    console.log(e);
  });

//configure app
app.use(cors());
app.use(express.static(path.resolve(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Run the init function located in the middleware folder
require("./middleware/init")();

// Import and mount routers
app.use("/api/v1/auth", require("./routes/auth.router"));

//Error Handler
app.use((err, req, res, next) => {
  console.log(err);
  if (err.name === "JsonWebTokenError") {
    const error = new AppError(400, "Invalid Token");
    handleError(error, res);
    return null;
  }
  if (!err.code) {
    const error = new AppError(500, "Internal server error.");
    handleError(error, res);
    return null;
  }
  handleError(err, res);
});

module.exports = app;
