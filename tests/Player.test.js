const Player = require('../src/Player');

let player;

beforeEach(() => {
  const getMoveCallback = (movesTaken) => {
    return [1, 2];
  };

  const placeShipCallback = (placedShips) => {
    return [3, 3];
  };
  player = Player('playa1', getMoveCallback, placeShipCallback);
});

test('Make move', () => {
  player.getMove().then((result) => {
    expect(result).toEqual([1, 2]);
  });
});

test('Place ship', () => {
  expect(player.placeShip([])).toEqual([3, 3]);
});
