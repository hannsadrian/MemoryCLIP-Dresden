let LatLon = require('mt-latlon');

let entries = require('./entries.json');

function getByID(id) {
  let found = [];

  entries.forEach(entry => {
    if (entry.id.toString() === id.toString()) {
      found.push(entry);
    }
  });

  return found;
}

function getByName(query, types) {
  let found = [];

  entries.forEach(entry => {
    if (entry.name.toLowerCase().includes(query.toLowerCase())) {
      if (hasType(entry, types))
        found.push(entry);
    }
  });

  return found;
}

function getByCoordinates(lat, lng, types) {
  let found = [];

  entries.forEach(entry => {
    const p1 = new LatLon(lat, lng);
    const p2 = new LatLon(entry.coordinates.lat, entry.coordinates.lng);
    const dist = p1.distanceTo(p2);

    if (dist < 0.25) {
      entry.distanceInM = dist*1000;
      if (hasType(entry, types))
        found.push(entry);
    }
  });

  return found;
}

function hasType(entry, types) {
  if (types.length === 0)
    return true;

  let hasType = false;
  types.forEach(type => {
    if (entry.type === type)
      hasType = true;
  });
  return hasType;
}

module.exports = { 
  getByName, getByCoordinates, getByID
};