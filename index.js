require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());

const charactersRoute = require("./routes/characters");
app.use(charactersRoute);

const comicsRoute = require("./routes/comics");
app.use(comicsRoute);

const comicsCharacterRoute = require("./routes/comicsCharacter");
app.use(comicsCharacterRoute);

app.get("/", (req, res) => {
  console.log("route /");
  res.json("welcome to Marvel Univers");
});

app.all("*", (req, res) => {
  console.log("route not found");
  res.status(400).json({ message: "Route not found" });
});

app.listen(process.env.PORT, () => {
  console.log("Server has started !");
});
