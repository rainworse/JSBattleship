const LocationUtils = require('./LocationUtils');

const DOMMediator = (() => {
  let clickedTiles = [];
  let clickedPlaceShipTiles = null;

  const createBoardTile = () => {
    const tile = document.createElement('div');
    tile.classList.add('tile');
    return tile;
  };

  function tileClicked(event) {
    const row = event.target.row;
    const column = event.target.column;
    const player = event.target.player;
    clickedTiles[player] = [row, column];
  }

  function placeShipTileClicked(event) {
    const row = event.target.row;
    const column = event.target.column;
    clickedPlaceShipTiles = [row, column];
  }

  const resetTileClicked = (player) => {
    clickedTiles[player] = null;
  };

  const resetShipTileClicked = (player) => {
    clickedPlaceShipTiles = null;
  };

  const getTileClicked = (player) => {
    return clickedTiles[player];
  };

  const getShipTileClicked = (player) => {
    return clickedPlaceShipTiles;
  };

  const createBoard = (size, player = null) => {
    const board = [];
    for (let i = 0; i < size; i++) {
      const row = [];
      for (let j = 0; j < size; j++) {
        const tile = createBoardTile();
        tile.row = i;
        tile.column = j;
        if (player != null) {
          tile.player = player;
          tile.addEventListener('click', tileClicked);
          tile.classList.add('enemy');
        } else {
          tile.addEventListener('click', placeShipTileClicked);
        }

        row.push(tile);
      }
      board.push(row);
    }

    return board;
  };

  const drawShipBoard = (gameboard) => {
    const boardContainer = document.getElementById('player-board');
    boardContainer.innerHTML = '';
    const board = createBoard(gameboard.getSize());
    addShips(board, gameboard.getShips());
    addLocationsHit(board, gameboard.getLocationsHit());
    drawBoard(boardContainer, board, gameboard.getSize());
  };

  const drawEnemyBoard = (gameboard, player) => {
    const boardContainer = document.getElementById('shots-taken');
    boardContainer.innerHTML = '';
    const board = createBoard(gameboard.getSize(), player);
    addLocationsHit(board, gameboard.getLocationsHit());
    addShipsHit(board, gameboard.getShips());
    drawBoard(boardContainer, board, gameboard.getSize());
  };

  function addShips(board, ships) {
    for (const ship of ships) {
      for (const coordinate of LocationUtils.getShipCoordinates(ship)) {
        board[coordinate[0]][coordinate[1]].classList.add('ship');
      }
    }
  }

  function addLocationsHit(board, locations) {
    for (const location of locations) {
      board[location[0]][location[1]].classList.add('hit');
    }
  }

  function addShipsHit(board, ships) {
    for (const ship of ships) {
      for (const location of LocationUtils.getShipCoordinates(ship)) {
        const tile = board[location[0]][location[1]];
        if (tile.classList.contains('hit')) {
          tile.classList.add('ship');
        }
      }
    }
  }

  function drawBoard(container, board, size) {
    for (let i = 0; i < size; i++) {
      for (let j = 0; j < size; j++) {
        container.appendChild(board[i][j]);
      }
    }
  }

  function getUserInput(
    checkParams,
    tileClickedCheck,
    tileValidCheck,
    resetMethod,
    player
  ) {
    resetMethod(player);
    return waitForClickedTile(
      checkParams,
      tileClickedCheck,
      tileValidCheck,
      resetMethod,
      player
    );
  }

  function waitForClickedTile(
    checkParams,
    tileClickedCheck,
    tileValidCheck,
    resetMethod,
    player
  ) {
    return new Promise((resolve, reject) => {
      const clickedTile = async () => {
        const result = await tileClickedCheck(player);

        if (result !== null) {
          if (tileValidCheck(result, checkParams)) {
            resolve(result);
          } else {
            resetMethod(player);
            setTimeout(clickedTile, 100);
          }
        } else {
          setTimeout(clickedTile, 100);
        }
      };

      clickedTile();
    });
  }

  function setMessage(message) {
    const messageContainer = document.getElementById('message');
    messageContainer.innerHTML = message;
  }

  function reset() {
    clickedTiles = [];
    clickedPlaceShipTiles = null;
  }

  function showPlacementCheckbox() {
    document.getElementById('placement').classList.remove('hide');
  }

  function hidePlacementCheckbox() {
    document.getElementById('placement').classList.add('hide');
  }

  function getPlacementCheckboxValue() {
    return document.getElementById('vertically').checked;
  }

  return {
    createBoard,
    drawShipBoard,
    drawEnemyBoard,
    resetTileClicked,
    getTileClicked,
    resetShipTileClicked,
    getShipTileClicked,
    getUserInput,
    setMessage,
    reset,
    showPlacementCheckbox,
    hidePlacementCheckbox,
    getPlacementCheckboxValue,
  };
})();

module.exports = DOMMediator;
