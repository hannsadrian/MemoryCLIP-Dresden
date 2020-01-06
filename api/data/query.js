var LatLon = require('mt-latlon');
const fs = require('fs')

let buildings = require('./buildings.json');
let places = require('./places.json');
let depots = require("./mahndepots.json")
let stolpersteine = require("./stolpersteine.json")

// Buildings

function getBuildingByID(id) {
  found = [];

  buildings.forEach(building => {
    if (building.id.toString() === id.toString()) {
      found.push(building)
    }
  })

  return found;
}

function getBuildingByName(query) {
  found = [];

  buildings.forEach(building => {
    if (building.name.toLowerCase().includes(query.toLowerCase())) {
      found.push(building)
    }
  })

  return found;
}

function getBuildingByCoordinates(lat, lng) {
  found = [];

  buildings.forEach(building => {
    const p1 = new LatLon(lat, lng);
    const p2 = new LatLon(building.coordinates.lat, building.coordinates.lng);
    const dist = p1.distanceTo(p2);

    if (dist < 0.25) {
      building.distanceInM = dist*1000;
      found.push(building)
    }
  })

  return found;
}

// Places

function getPlaceByID(id) {
  found = [];

  places.forEach(place => {
    if (place.id.toString() === id.toString()) {
      found.push(place)
    }
  })

  return found;
}

function getPlaceByName(query) {
  found = [];

  places.forEach(place => {
    if (place.name.toLowerCase().includes(query.toLowerCase())) {
      found.push(place)
    }
  })

  return found;
}

function getPlaceByCoordinates(lat, lng) {
  found = [];

  places.forEach(place => {
    const p1 = new LatLon(lat, lng);
    const p2 = new LatLon(place.coordinates.lat, place.coordinates.lng);
    const dist = p1.distanceTo(p2);

    if (dist < 0.25) {
      place.distanceInM = dist*1000;
      found.push(place)
    }
  })

  return found;
}

// Mahndepot

function getDepotByID(id) {
  found = [];

  depots.forEach(depot => {
    if (depot.id.toString() === id.toString()) {
      found.push(depot)
    }
  })

  return found;
}

function getDepotByName(query) {
  found = [];

  depots.forEach(depot => {
    if (depot.name.toLowerCase().includes(query.toLowerCase())) {
      found.push(depot)
    }
  })

  return found;
}

function getDepotByCoordinates(lat, lng) {
  found = [];

  depots.forEach(depot => {
    const p1 = new LatLon(lat, lng);
    const p2 = new LatLon(depot.coordinates.lat, depot.coordinates.lng);
    const dist = p1.distanceTo(p2);

    if (dist < 0.25) {
      depot.distanceInM = dist*1000;
      found.push(depot)
    }
  })

  return found;
}

// Stolperstein

function getStolpersteinByID(id) {
  found = [];

  stolpersteine.forEach(stolperstein => {
    if (stolperstein.id.toString() === id.toString()) {
      found.push(stolperstein)
    }
  })

  return found;
}

function getStolpersteinByName(query) {
  found = [];

  stolpersteine.forEach(stolperstein => {
    if (stolperstein.name.toLowerCase().includes(query.toLowerCase())) {
      found.push(stolperstein)
    }
  })

  return found;
}

function getStolpersteinByCoordinates(lat, lng) {
  found = [];

  stolpersteine.forEach(stolperstein => {
    const p1 = new LatLon(lat, lng);
    const p2 = new LatLon(stolperstein.coordinates.lat, stolperstein.coordinates.lng);
    const dist = p1.distanceTo(p2);

    if (dist < 0.25) {
      stolperstein.distanceInM = dist*1000;
      found.push(stolperstein)
    }
  })

  return found;
}

module.exports = { 
  getBuildingByName, getBuildingByCoordinates, getBuildingByID, getPlaceByName, getPlaceByCoordinates, getPlaceByID,
  getDepotByName, getDepotByCoordinates, getDepotByID,
  getStolpersteinByName, getStolpersteinByCoordinates, getStolpersteinByID
 }