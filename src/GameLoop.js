const Gameboard = require('../src/Gameboard');
const DOMMediator = require('./DOMMediator');

function GameLoop(setMessageCB) {
  const setMessage = setMessageCB;
  let playerTakingTurn;
  let player1;
  let player2;
  let board1;
  let board2;
  let gameAborted;

  async function setupGame(
    playerOne,
    playerTwo,
    ships,
    boardSize,
    drawShipBoard,
    drawEnemyBoard,
    showPlacementCheckbox,
    hidePlacementCheckbox
  ) {
    player1 = playerOne;
    player2 = playerTwo;
    playerTakingTurn = player1;

    board1 = Gameboard(boardSize);
    board2 = Gameboard(boardSize);

    setMessage('Place your ships');
    showPlacementCheckbox();

    for (let i = 0; i < ships; i++) {
      drawBoards(drawShipBoard, drawEnemyBoard);
      let board1Placed = false;
      while (!board1Placed) {
        const placement = await Promise.resolve(player1.placeShip());
        board1Placed = board1.placeShip(
          i + 2,
          placement,
          player1.placeVertically()
        );
      }
    }

    hidePlacementCheckbox();

    for (let i = 0; i < ships; i++) {
      let board2Placed = false;
      while (!board2Placed) {
        const placement = await Promise.resolve(player2.placeShip());
        board2Placed = board2.placeShip(
          i + 2,
          placement,
          player2.placeVertically()
        );
      }
    }
  }

  async function startGame(drawShipBoard, drawEnemyBoard, resolve) {
    gameAborted = false;

    while (!gameAborted && !board1.gameEnded() && !board2.gameEnded()) {
      drawBoards(drawShipBoard, drawEnemyBoard);
      setMessage(player1.playerName + ' make your move');
      const player1Move = await playRound(player1, board2);
      drawBoards(drawShipBoard, drawEnemyBoard);
      setMessage(player2.playerName + ' make your move');
      const player2Move = await playRound(player2, board1);
    }
    drawBoards(drawShipBoard, drawEnemyBoard);
    const winner = getWinner();
    if (winner != null && winner != undefined) {
      setMessage(winner.playerName + ' wins');
    }

    resolve();
  }

  function drawBoards(drawShipBoard, drawEnemyBoard) {
    drawShipBoard(board1);
    drawEnemyBoard(board2, player1);
  }

  const playRound = (player, gameboard) => {
    return new Promise((resolve, reject) => {
      const move = player.getMove(gameboard.getSize());
      move.then((value) => {
        gameboard.receiveAttack(value);
        resolve(value);
      });
    });
  };

  const currentTurn = () => {
    return playerTakingTurn;
  };

  const getWinner = () => {
    if (board1.gameEnded()) {
      return player2;
    }

    if (board2.gameEnded()) {
      return player1;
    }

    return null;
  };

  const abortGame = () => {
    gameAborted = true;
  };

  return { setupGame, startGame, playRound, currentTurn, getWinner, abortGame };
}

module.exports = GameLoop;
