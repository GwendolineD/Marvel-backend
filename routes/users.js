const express = require("express");
const router = express.Router();

const uid2 = require("uid2");
const SHA256 = require("crypto-js/sha256");
const encBase64 = require("crypto-js/enc-base64");

const User = require("../models/User");
const isAuthenticated = require("../middleware/isAuthenticated");

router.post("/signup", async (req, res) => {
  console.log("route sign up");

  const avatars = [
    "https://res.cloudinary.com/du3ko16j1/image/upload/v1647876729/Marvel/archer_olfscy.jpg",
    "https://res.cloudinary.com/du3ko16j1/image/upload/v1647876752/Marvel/hulk_iqbmkp.jpg",
    "https://res.cloudinary.com/du3ko16j1/image/upload/v1647876753/Marvel/ironman_xtyeif.jpg",
    "https://res.cloudinary.com/du3ko16j1/image/upload/v1647876754/Marvel/thor_b3n5ep.jpg",
    "https://res.cloudinary.com/du3ko16j1/image/upload/v1647876760/Marvel/captain-america_jx8qze.jpg",
    "https://res.cloudinary.com/du3ko16j1/image/upload/v1647876813/Marvel/thanos_-_copie_Small_emibzi.jpg",
    "https://res.cloudinary.com/du3ko16j1/image/upload/v1647876815/Marvel/black-widow_-_copie_Small_lgu71o.jpg",
  ];

  const randomIndex = Math.floor(Math.random() * 7);
  const avatar = avatars[randomIndex];

  try {
    const { email, password, username, favoriteCharacters, favoriteComics } =
      req.fields;

    const doesEmailExist = await User.findOne({ email: email });

    if (doesEmailExist) {
      res.status(409).json({ message: "conflict" });
    } else if (!username) {
      res.status(400).json({ message: "please enter a username" });
    } else {
      const salt = uid2(16);
      const hash = SHA256(password + salt).toString(encBase64);
      const token = uid2(16);

      const newUser = new User({
        email: email,
        username: username,
        avatar: avatar,
        token: token,
        hash: hash,
        salt: salt,
        favoriteCharacters: favoriteCharacters,
        favoriteComics: favoriteComics,
      });

      await newUser.save();

      res.status(200).json({
        _id: newUser._id,
        token: newUser.token,
        avatar: newUser.avatar,
        username: newUser.username,
        favoriteCharacters: newUser.favoriteCharacters,
        favoriteComics: newUser.favoriteComics,
      });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.post("/login", async (req, res) => {
  console.log("route login");

  try {
    const { email, password } = req.fields;

    const doesExist = await User.findOne({ email: email });

    if (!doesExist) {
      res.status(401).json({ message: "Email or password not valid" });
    } else {
      const userSalt = doesExist.salt;
      const hashToTest = SHA256(password + userSalt).toString(encBase64);
      const userHash = doesExist.hash;

      if (userHash === hashToTest) {
        res.status(200).json({
          _id: doesExist._id,
          token: doesExist.token,
          username: doesExist.username,
          avatar: doesExist.avatar,
          favoriteCharacters: doesExist.favoriteCharacters,
          favoriteComics: doesExist.favoriteComics,
        });
      } else {
        res.status(401).json({ message: "Email or password not valid" });
      }
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.post("/changeFavorite", isAuthenticated, async (req, res) => {
  console.log("route add favorite");

  const { favoriteCharacters, favoriteComics } = req.fields;
  const user = req.user;

  if (favoriteCharacters) {
    user.favoriteCharacters = favoriteCharacters;
  }
  if (favoriteComics) {
    user.favoriteComics = favoriteComics;
  }

  await user.save();

  res.status(200).json(user);
});

module.exports = router;
