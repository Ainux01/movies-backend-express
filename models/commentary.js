const mongoose = require("mongoose");

const commentarySchema = mongoose.Schema({
  userId: { type: String, required: true },
  movieId: { type: String, required: true },
  text: { type: String, required: true },
});

module.exports = mongoose.model("Commentary", commentarySchema);
