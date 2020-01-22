var query = require("./data/query");
var express = require("express");
var cors = require("cors");
var app = express();
app.use(cors());
const port = process.env.PORT || "8000";

app.use('/static', express.static('static'));

app.get("/", (req, res) => {
  res.status(200).send({
    apiName: "MemoryCLIP-Dresden",
    apiVersion: "0.0.1",
    description: "Backend for MemoryCLIP-Dresden",
    github: "https://github.com/Adwirawien/MemoryCLIP-Dresden"
  })
});

app.get("/query", (req, res) => {
  let types = [];

  if (req.query.only) {
    /*
    TYPES
      building
      place
      depot
      stolperstein
    */
    req.query.only.split(",").forEach((type) => {
      types.push(type.toLowerCase());
    })
  }

  if (req.query.all === "true") {
    res.status(200).send(query.getAll(types));
  } else if (req.query.name) {
    res.status(200).send(query.getByName(req.query.name, types));
  } else if (req.query.lng && req.query.lat) {
    res.status(200).send(query.getByCoordinates(req.query.lat, req.query.lng, types));
  } else {
    res.status(400).send("Please query a name, coordinate or id.")
  }
});

app.get("/entry", (req, res) => {
  if (req.query.id) {
    res.status(200).send(query.getByID(req.query.id))
  } else {
    res.status(400).send("Please provide a id.")
  }
});

app.listen(port, () => {
  console.log(`Listening to requests on port ${port}`);
});