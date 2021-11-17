const express = require("express");
const router = express.Router();
const axios = require("axios");

router.get("/characters", async (req, res) => {
  console.log("route /characters");
  const apiKey = process.env.MARVEL_API_KEY;

  try {
    const apiResponse = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/characters?apiKey=${apiKey}`
    );
    // console.log("data>>>", apiResponse.data);
    // const result = apiResponse.data.results;
    // const result2 = result.limit(10);
    // console.log("result>>>", result);
    // console.log("result2>>>", result2);

    res.status(200).json(apiResponse.data);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
