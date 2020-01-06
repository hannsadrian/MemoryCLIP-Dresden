var query = require("./data/query")
var express = require("express")
var cors = require("cors");
var app = express()
app.use(cors());
const port = process.env.PORT || "8000";

app.get("/query/building", (req, res) => {
  if (req.query.name !== undefined) {
    res.status(200).send(query.getBuildingByName(req.query.name));
  } else if (req.query.lng !== undefined && req.query.lat !== undefined) {
    res.status(200).send(query.getBuildingByCoordinates(req.query.lat, req.query.lng));
  } else if (req.query.id !== undefined) {
    res.status(200).send(query.getBuildingByID(req.query.id))
  } else {
    res.status(400).send("Please query a name, coordinate or id.")
  }
});

app.get("/query/place", (req, res) => {
  if (req.query.name !== undefined) {
    res.status(200).send(query.getPlaceByName(req.query.name));
  } else if (req.query.lng !== undefined && req.query.lat !== undefined) {
    res.status(200).send(query.getPlaceByCoordinates(req.query.lat, req.query.lng));
  } else if (req.query.id !== undefined) {
    res.status(200).send(query.getPlaceByID(req.query.id))
  } else {
    res.status(400).send("Please query a name, coordinate or id.")
  }
})

app.get("/query/depot", (req, res) => {
  if (req.query.name !== undefined) {
    res.status(200).send(query.getDepotByName(req.query.name));
  } else if (req.query.lng !== undefined && req.query.lat !== undefined) {
    res.status(200).send(query.getDepotByCoordinates(req.query.lat, req.query.lng));
  } else if (req.query.id !== undefined) {
    res.status(200).send(query.getDepotByID(req.query.id))
  } else {
    res.status(400).send("Please query a name, coordinate or id.")
  }
})

app.get("/query/stolperstein", (req, res) => {
  if (req.query.name !== undefined) {
    res.status(200).send(query.getStolpersteinByName(req.query.name));
  } else if (req.query.lng !== undefined && req.query.lat !== undefined) {
    res.status(200).send(query.getStolpersteinByCoordinates(req.query.lat, req.query.lng));
  } else if (req.query.id !== undefined) {
    res.status(200).send(query.getStolpersteinByID(req.query.id))
  } else {
    res.status(400).send("Please query a name, coordinate or id.")
  }
})

app.listen(port, () => {
  console.log(`Listening to requests on port ${port}`);
});