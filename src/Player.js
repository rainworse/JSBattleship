function Player(name, moveCB, placeShipCB, placeVerticallyCB = null) {
  const playerName = name;
  const moveCallback = moveCB;
  const placeShipCallback = placeShipCB;
  const placeVerticallyCallback = placeVerticallyCB;
  const movesTaken = [];

  const getMove = (boardSize) => {
    const move = moveCallback(movesTaken, boardSize);
    return new Promise((resolve, reject) => {
      Promise.resolve(move).then((value) => {
        movesTaken.push(value);
        resolve(value);
      });
    });
  };

  const placeShip = (existingShips) => {
    return placeShipCallback();
  };

  const placeVertically = () => {
    if (placeVerticallyCallback != null) {
      return placeVerticallyCallback();
    }

    return false;
  };

  return { playerName, getMove, placeShip, placeVertically };
}

module.exports = Player;
