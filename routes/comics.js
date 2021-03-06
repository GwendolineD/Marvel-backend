const express = require("express");
const router = express.Router();

const axios = require("axios");

router.get("/comics", async (req, res) => {
  console.log("route /comics");

  const apiKey = process.env.MARVEL_API_KEY;

  const { title, limit, skip } = req.query;

  try {
    const apiResponse = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/comics?title=${
        title ? title : ""
      }&limit=${limit ? limit : ""}&skip=${skip ? skip : ""}&apiKey=${apiKey}`
    );

    res.status(200).json(apiResponse.data);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
