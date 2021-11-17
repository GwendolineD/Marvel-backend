const express = require("express");
const router = express.Router();
const axios = require("axios");

router.get("/comics/:characterId", async (req, res) => {
  console.log("route comics's characters");

  const apiKey = process.env.MARVEL_API_KEY;
  const characterId = req.params.characterId;

  try {
    const apiResponse = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/comics/${characterId}?apiKey=${apiKey}`
    );
    res.status(200).json(apiResponse.data);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
