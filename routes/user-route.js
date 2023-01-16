const userController = require("../controllers/user-controller");
const express = require("express");
const { check } = require("express-validator");
const route = express.Router();

route.post(
  "/signup",
  [
    check("name").not().isEmpty(),
    check("email").normalizeEmail().isEmail(),
    check("password").isLength({ min: 8 }),
  ],
  userController.signup
);

route.post(
  "/login",
  [
    check("email").normalizeEmail().isEmail(),
    check("password").isLength({ min: 8 }),
  ],
  userController.login
);

route.post("/addFavorite/:id/:movieId", userController.addToFavorites);

route.get("/getFavorites/:id", userController.getFavorites);

route.get("/:id", userController.getUserById);

module.exports = route;
