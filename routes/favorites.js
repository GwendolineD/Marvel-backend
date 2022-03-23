const express = require("express");
const router = express.Router();

const axios = require("axios");

const isAuthenticated = require("../middleware/isAuthenticated");

router.get("/favorites", isAuthenticated, async (req, res) => {
  console.log("route /favorites");

  const apiKey = process.env.MARVEL_API_KEY;

  const { favoriteCharacters, favoriteComics } = req.user;

  const favCh = [];
  const numOfPageForCh = Math.ceil(1493 / 100);
  // Get all the 1493 characters
  for (let i = 0; i < numOfPageForCh; i++) {
    const { data } = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/characters?limit=100&skip=${
        100 * i
      }&apiKey=${apiKey}`
    );

    // Go trought data and push into favCh only the favorites characters
    for (let j = 0; j < data.results.length; j++) {
      if (favoriteCharacters.includes(data.results[j]._id)) {
        favCh.push(data.results[j]);
      }
    }

    // if we have all the favorite characters, we stop the loop
    if (favCh.length === favoriteCharacters.length) {
      break;
    }
  }

  const favCo = [];
  const numOfPageForCo = Math.ceil(47397 / 100);
  //   Get all the 47397 comics
  for (let i = 0; i < numOfPageForCo; i++) {
    const { data } = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/comics?limit=100&skip=${
        100 * i
      }&apiKey=${apiKey}`
    );

    // Go trought data and push into favCo only the favorites comics
    for (let j = 0; j < data.results.length; j++) {
      if (favoriteComics.includes(data.results[j]._id)) {
        favCo.push(data.results[j]);
      }
    }

    // if we have all the favorite comics, we stop the loop
    if (favCo.length === favoriteComics.length) {
      break;
    }
  }

  res.json({ favCo: favCo, favCh: favCh });
});

module.exports = router;
