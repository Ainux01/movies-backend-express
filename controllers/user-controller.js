const mongoose = require("mongoose");
const User = require("../models/user");
const HttpError = require("../models/HttpError");
const { validationResult } = require("express-validator");
const Movie = require("../models/movie");
const { findById } = require("../models/movie");
const signup = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(new HttpError("Invalid Inputs", 500));
  }
  const { name, email, password } = req.body;
  const createdUser = new User({
    name,
    email,
    password,
  });
  try {
    await createdUser.save();
  } catch (error) {
    return next(new HttpError("Error Creating user", 500));
  }
  res.status(201).json(createdUser);
};

const login = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(new HttpError("Invalid Inputs", 500));
  }
  const { email, password } = req.body;
  let userFound;
  try {
    userFound = await User.findOne({ email, password });
  } catch (error) {
    return next(new HttpError("Error Logging user", 500));
  }
  console.log(userFound.id);
  res.json({ userFound });
};

const getUserById = async (req, res, next) => {
  const id = req.params["id"];
  const user = await User.findOne({ id });
  res.json(user);
};

const addToFavorites = async (req, res, next) => {
  const userId = req.params["id"];
  const movieId = req.params["movieId"];
  const user = await User.findOne({ userId });
  const movie = new Movie({
    movieId: movieId,
  });
  user.favoris.push(movie);
  user.save();
  res.json(user);
};
const getFavorites = async (req, res, next) => {
  const id = req.params["id"];
  console.log(id);
  const user = await User.findOne({ id });
  res.json(user.favoris);
};

exports.signup = signup;
exports.login = login;
exports.addToFavorites = addToFavorites;
exports.getUserById = getUserById;
exports.getFavorites = getFavorites;
