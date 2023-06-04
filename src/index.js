const DOMMediator = require('./DOMMediator');
const GameLoop = require('./GameLoop');
const Player = require('./Player');

function getHumanPlayer() {
  const player = Player(
    'human',
    (movesTaken, boardSize) => {
      return DOMMediator.getUserInput(
        movesTaken,
        DOMMediator.getTileClicked,
        tileValidCheck,
        DOMMediator.resetTileClicked,
        player
      );
    },
    () => {
      return DOMMediator.getUserInput(
        null,
        DOMMediator.getShipTileClicked,
        () => {
          return true;
        },
        DOMMediator.resetShipTileClicked,
        player
      );
    },
    DOMMediator.getPlacementCheckboxValue
  );

  return player;
}

function getComputerPlayer() {
  const player = Player(
    'computer',
    randomMove,
    () => {
      return randomMove([], 10);
    },
    // () => {return dummyPlacement();}
    () => {
      return Math.random() < 0.5;
    }
  );

  return player;
}

function getUserShipPlacement(player) {
  DOMMediator.resetShipTileClicked(player);
  return waitForClickedPlaceShipTile(player);
}

function tileValidCheck(tile, movesTaken) {
  if (tile == null || tile == undefined) {
    return null;
  }

  for (const move of movesTaken) {
    if (move[0] == tile[0] && move[1] == tile[1]) {
      return false;
    }
  }
  return true;
}

function waitForClickedPlaceShipTile(player) {
  return new Promise((resolve, reject) => {
    const clickedTile1 = async () => {
      const result = await DOMMediator.getShipTileClicked(player);

      if (result !== null) {
        resolve(result);
      } else {
        setTimeout(clickedTile1, 100);
      }
    };

    clickedTile1();
  });
}

function randomMove(movesTaken, boardSize) {
  while (true) {
    const x = Math.floor(Math.floor(Math.random() * boardSize));
    const y = Math.floor(Math.floor(Math.random() * boardSize));

    let moveAllowed = true;

    for (const move of movesTaken) {
      if (move[0] == x && move[1] == y) {
        moveAllowed = false;
      }
    }

    if (moveAllowed) {
      return [x, y];
    }
  }
}

function dummyPlacement() {
  return [3, 3];
}

document.getElementById('restart').addEventListener('click', restart);

function restart() {
  gameloop.abortGame();
  endRunningGame();
  startNewGame(getHumanPlayer(), getComputerPlayer());
}

let endRunningGame;
let gameloop;

function startNewGame(playerOne, playerTwo) {
  DOMMediator.reset();
  gameloop = GameLoop(DOMMediator.setMessage);
  const game = new Promise((resolve, reject) => {
    resolve(
      gameloop.setupGame(
        playerOne,
        playerTwo,
        3,
        10,
        DOMMediator.drawShipBoard,
        DOMMediator.drawEnemyBoard,
        DOMMediator.showPlacementCheckbox,
        DOMMediator.hidePlacementCheckbox
      )
    );
  });

  game
    .then((value) => {
      return new Promise((resolve, reject) => {
        endRunningGame = resolve;
        gameloop.startGame(
          DOMMediator.drawShipBoard,
          DOMMediator.drawEnemyBoard,
          resolve
        );
      });
    })
    .then((value2) => {
      let winner = gameloop.getWinner();
      if (winner != null) {
        console.log(winner.playerName + ' wins');
      } else {
        console.log('restarted');
      }
    });
}

startNewGame(getHumanPlayer(), getComputerPlayer());
