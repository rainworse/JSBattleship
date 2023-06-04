const Ship = require('../src/Ship');

let ship;
beforeEach(() => {
  ship = Ship(3);
});

test('Hit ship', () => {
  ship.hit();
  expect(ship.timesHit()).toBe(1);
});

test('Sink ship', () => {
  ship.hit();
  ship.hit();
  ship.hit();
  expect(ship.isSunk()).toBeTruthy();
});
