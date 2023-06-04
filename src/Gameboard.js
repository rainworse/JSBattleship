const Ship = require('../src/Ship');
const LocationUtils = require('../src/LocationUtils');

function Gameboard(size) {
  const boardSize = size;
  const ships = [];
  const locationsHit = new Set();
  const placeShip = (length, location, isVertical = false) => {
    if (
      location[0] < 0 ||
      location[0] >= boardSize ||
      location[1] < 0 ||
      location[1] >= boardSize
    ) {
      return false;
    }

    if (
      (isVertical && location[0] + length - 1 >= boardSize) ||
      (!isVertical && location[1] + length - 1 >= boardSize)
    ) {
      return false;
    }

    const shipObj = Ship(length);
    const ship = { ship: shipObj, length, location, isVertical };

    for (const otherShip of ships) {
      if (LocationUtils.shipsOverlap(ship, otherShip)) {
        return false;
      }
    }

    ships.push(ship);
    return true;
  };

  const getShips = () => ships;

  const getLocationsHit = () => locationsHit;

  const receiveAttack = (location) => {
    if (!locationHit(location)) {
      ships.forEach((ship) => {
        if (
          !ship.isVertical &&
          ship.location[0] == location[0] &&
          ship.location[1] <= location[1] &&
          ship.location[1] + ship.length - 1 >= location[1]
        ) {
          ship.ship.hit();
        } else if (
          ship.isVertical &&
          ship.location[1] == location[1] &&
          ship.location[0] <= location[0] &&
          ship.location[0] + ship.length - 1 >= location[0]
        ) {
          ship.ship.hit();
        }
      });

      locationsHit.add(location);
      return true;
    }
    return false;
  };

  const locationHit = (location) => {
    for (const otherLocation of locationsHit) {
      if (LocationUtils.locationsAreSame(location, otherLocation)) {
        return true;
      }
    }
    return false;
  };

  const gameEnded = () => {
    for (const ship of ships) {
      if (!ship.ship.isSunk()) {
        return false;
      }
    }

    return true;
  };

  const getSize = () => {
    return boardSize;
  };

  return {
    placeShip,
    getShips,
    getLocationsHit,
    receiveAttack,
    locationHit,
    gameEnded,
    getSize,
  };
}

module.exports = Gameboard;
