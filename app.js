const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const userRoute = require("./routes/user-route");
const commentaryRoute = require("./routes/commentary-route");
const url = "mongodb://localhost:27017/movies";

const app = express();

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.header("Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, OPTIONS");
  next();
});

app.use(bodyParser.json());

app.use("/api/users", userRoute);

app.use("/api/commentary", commentaryRoute);
//Error Handling for unsupported routes
app.use((req, res, next) => {
  const error = new HttpError("Could not find this route.", 404);
  throw error;
});

//Error Handling middleware
app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }

  res.status(error.code || 500);
  res.json({ message: error.message || "An Unknowen Error has occured" });
});

mongoose
  .connect(url)
  .then(() => {
    app.listen(5000);
  })
  .catch((error) => {
    console.log(error);
  });
