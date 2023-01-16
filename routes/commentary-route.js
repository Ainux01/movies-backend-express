const commentaryController = require("../controllers/commentary-controller");
const express = require("express");
const route = express.Router();

route.post("/:userId/:movieId", commentaryController.addCommentary);

route.get("/:movieId", commentaryController.getCommentariesByMovieId);

module.exports = route;
