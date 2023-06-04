const Gameboard = require('../src/Gameboard');

let gameboard;

beforeEach(() => {
  gameboard = Gameboard(10);
  gameboard.placeShip(3, [2, 4]);
});

test('Place ship', () => {
  gameboard.placeShip(4, [3, 2]);
  const ships = gameboard.getShips();
  expect(ships.length).toBe(2);
  expect(ships[0].location).toEqual([2, 4]);
});

test('Place ship on another ship', () => {
  gameboard.placeShip(2, [1, 5], true);
  const ships = gameboard.getShips();
  expect(ships.length).toBe(1);
});

test('Place ship near board edge', () => {
  expect(gameboard.placeShip(2, [9, 8])).toBeTruthy();
});

test('Place ship over board edge', () => {
  expect(gameboard.placeShip(3, [9, 8])).toBeFalsy();
});

test('Place ship outside board', () => {
  expect(gameboard.placeShip(4, [9, 10])).toBeFalsy();
});

test('Location hit', () => {
  gameboard.receiveAttack([1, 3]);
  expect(gameboard.locationHit([1, 3])).toBeTruthy();
});

test('Receive attack', () => {
  gameboard.receiveAttack([2, 4]);
  const ships = gameboard.getShips();
  expect(ships[0].ship.timesHit()).toBe(1);
});

test('Attack same place', () => {
  expect(gameboard.receiveAttack([2, 4])).toBeTruthy();
  expect(gameboard.receiveAttack([2, 4])).toBeFalsy();
});

test('Game ended', () => {
  gameboard.placeShip(1, [1, 3]);
  expect(gameboard.gameEnded()).toBeFalsy();
  gameboard.receiveAttack([2, 4]);
  gameboard.receiveAttack([2, 5]);
  gameboard.receiveAttack([2, 6]);
  gameboard.receiveAttack([1, 3]);
  expect(gameboard.gameEnded()).toBeTruthy();
});
