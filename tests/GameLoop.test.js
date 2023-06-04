const GameLoop = require('../src/GameLoop');
const Player = require('../src/Player');
const Gameboard = require('../src/Gameboard');

let gameloop;
let player1;
let player2;

beforeEach(() => {
  gameloop = GameLoop(() => {});

  const player1Moves = [
    [1, 3],
    [1, 4],
    [1, 2],
  ];
  const player2Moves = [
    [3, 5],
    [3, 4],
    [3, 3],
  ];

  player1 = Player(
    'player1',
    (movesTaken) => {
      return player1Moves.pop();
    },
    (existingShips) => {
      return [3, 3];
    }
  );

  player2 = Player(
    'player2',
    (movesTaken) => {
      return player2Moves.pop();
    },
    (existingShips) => {
      return [4, 4];
    }
  );

  gameloop.setupGame(
    player1,
    player2,
    1,
    10,
    () => {},
    () => {},
    () => {},
    () => {}
  );
});

test('Current turn', () => {
  expect(gameloop.currentTurn()).toEqual(player1);
});

test('Start game', () => {
  new Promise((resolve, reject) => {
    resolve(
      gameloop.startGame(
        () => {},
        () => {},
        () => {}
      )
    );
  }).then((result) => {
    expect(gameloop.getWinner()).toEqual(player2);
  });
});

test('Play round', () => {
  const gameboard = Gameboard(10);
  gameboard.placeShip(1, [1, 2]);

  new Promise((resolve, reject) => {
    resolve(gameloop.playRound(player1, gameboard));
  }).then((result) => {
    expect(gameboard.gameEnded()).toBeTruthy();
  });
});
