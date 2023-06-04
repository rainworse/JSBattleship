const LocationUtils = (() => {
  function shipsOverlap(ship1, ship2) {
    const ship1Coordinates = getShipCoordinates(ship1);
    const ship2Coordinates = getShipCoordinates(ship2);

    for (const coordinate of ship1Coordinates) {
      for (const otherCoordinate of ship2Coordinates) {
        if (locationsAreSame(coordinate, otherCoordinate)) {
          return true;
        }
      }
    }

    return false;
  }

  function getShipCoordinates(ship) {
    const coordinates = [];
    for (let i = 0; i < ship.length; i++) {
      let coordinate = [...ship.location];
      if (ship.isVertical) {
        coordinate[0] = coordinate[0] + i;
      } else {
        coordinate[1] = coordinate[1] + i;
      }
      coordinates.push(coordinate);
    }

    return coordinates;
  }

  function locationsAreSame(location1, location2) {
    return location1[0] == location2[0] && location1[1] == location2[1];
  }

  return { shipsOverlap, getShipCoordinates, locationsAreSame };
})();

module.exports = LocationUtils;
