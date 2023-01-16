const mongoose = require("mongoose");
const Commentary = require("../models/commentary");
const HttpError = require("../models/HttpError");
const movie = require("../models/movie");

const addCommentary = async (req, res, next) => {
  console.log("hello");
  const userId = req.params["userId"];
  const movieId = req.params["movieId"];
  console.log("userId : " + userId);
  console.log("movieId : " + movieId);
  const { text } = req.body;
  const commentary = new Commentary({
    userId,
    movieId,
    text,
  });
  try {
    await commentary.save();
  } catch (error) {
    return next(new HttpError("Error", 500));
  }
  res.json(commentary);
};

const getCommentariesByMovieId = async (req, res, next) => {
  const movieId = req.params["movieId"];
  console.log(movieId);
  const commentaries = await Commentary.find({ movieId });
  res.json(commentaries);
};

exports.addCommentary = addCommentary;
exports.getCommentariesByMovieId = getCommentariesByMovieId;
