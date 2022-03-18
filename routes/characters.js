const express = require("express");
const router = express.Router();

const axios = require("axios");

router.get("/characters", async (req, res) => {
  console.log("route /characters");

  const apiKey = process.env.MARVEL_API_KEY;

  const { name, limit, skip } = req.query;

  try {
    const apiResponse = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/characters?name=${
        name ? name : ""
      }&limit=${limit ? limit : ""}&skip=${skip ? skip : ""}&apiKey=${apiKey}`
    );

    // console.log(apiResponse.data);

    res.status(200).json(apiResponse.data);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
