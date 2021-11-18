require("dotenv").config();
const express = require("express");
const expressFormidable = require("express-formidable");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
app.use(expressFormidable());
app.use(cors());

mongoose.connect("mongodb://localhost/marvel");
// mongoose.connect(process.env.MONGO_DB_URI)

app.get("/", (req, res) => {
  console.log("route /");
  res.json("welcome to Marvel Univers");
});

const charactersRoute = require("./routes/characters");
app.use(charactersRoute);

const comicsRoute = require("./routes/comics");
app.use(comicsRoute);

const comicsCharacterRoute = require("./routes/comicsCharacter");
app.use(comicsCharacterRoute);

const userRoute = require("./routes/user");
app.use(userRoute);

app.all("*", (req, res) => {
  console.log("route not found");
  res.status(400).json({ message: "Route not found" });
});

app.listen(process.env.PORT, () => {
  console.log("Server has started !");
});
