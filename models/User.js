const mongoose = require("mongoose");

const User = mongoose.model("User", {
  email: String,
  username: String,
  avatar: String,
  token: String,
  hash: String,
  salt: String,
  favoriteCharacters: { type: [Object], default: [] },
  favoriteComics: { type: [Object], default: [] },
});

module.exports = User;
