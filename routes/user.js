const express = require("express");
const router = express.Router();
const uid2 = require("uid2");
const SHA256 = require("crypto-js/sha256");
const encBase64 = require("crypto-js/enc-base64");

const User = require("../models/User");

router.post("/signup", async (req, res) => {
  console.log("route sign up");
  //

  try {
    const doesEmailExist = await User.findOne({ email: req.fields.email });
    if (doesEmailExist) {
      res.status(409).json({ message: "conflict" });
    } else if (!req.fields.username) {
      res.status(400).json({ message: "please enter a username" });
    } else {
      const password = req.fields.password;
      const salt = uid2(16);
      const hash = SHA256(password + salt).toString(encBase64);
      const token = uid2(16);

      const newUser = new User({
        email: req.fields.email,
        username: req.fields.username,
        token: token,
        hash: hash,
        salt: salt,
      });

      await newUser.save();

      res.status(200).json({
        _id: newUser._id,
        token: newUser.token,
        username: newUser.username,
      });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.post("/login", async (req, res) => {
  console.log("route login");
  try {
    const doesExist = await User.findOne({ email: req.fields.email });
    if (!doesExist) {
      res.status(401).json({ message: "Email or password not valid" });
    } else {
      const password = req.fields.password;
      const userSalt = doesExist.salt;
      const hashToTest = SHA256(password + userSalt).toString(encBase64);
      const userHash = doesExist.hash;

      if (userHash === hashToTest) {
        res.status(200).json({
          _id: doesExist._id,
          token: doesExist.token,
          username: doesExist.username,
        });
      } else {
        res.status(401).json({ message: "Email or password not valid" });
      }
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
