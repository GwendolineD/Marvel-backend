const mongoose = require("mongoose");

const User = mongoose.model("User", {
  email: String,
  username: String,
  avatar: String,
  token: String,
  hash: String,
  salt: String,
  favoriteCharacters: { type: [String], default: [] },
  favoriteComics: { type: [String], default: [] },
});

module.exports = User;
