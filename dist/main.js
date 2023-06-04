/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/DOMMediator.js":
/*!****************************!*\
  !*** ./src/DOMMediator.js ***!
  \****************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const LocationUtils = __webpack_require__(/*! ./LocationUtils */ \"./src/LocationUtils.js\");\r\n\r\nconst DOMMediator = (() => {\r\n  let clickedTiles = [];\r\n  let clickedPlaceShipTiles = null;\r\n\r\n  const createBoardTile = () => {\r\n    const tile = document.createElement('div');\r\n    tile.classList.add('tile');\r\n    return tile;\r\n  };\r\n\r\n  function tileClicked(event) {\r\n    const row = event.target.row;\r\n    const column = event.target.column;\r\n    const player = event.target.player;\r\n    clickedTiles[player] = [row, column];\r\n  }\r\n\r\n  function placeShipTileClicked(event) {\r\n    const row = event.target.row;\r\n    const column = event.target.column;\r\n    clickedPlaceShipTiles = [row, column];\r\n  }\r\n\r\n  const resetTileClicked = (player) => {\r\n    clickedTiles[player] = null;\r\n  };\r\n\r\n  const resetShipTileClicked = (player) => {\r\n    clickedPlaceShipTiles = null;\r\n  };\r\n\r\n  const getTileClicked = (player) => {\r\n    return clickedTiles[player];\r\n  };\r\n\r\n  const getShipTileClicked = (player) => {\r\n    return clickedPlaceShipTiles;\r\n  };\r\n\r\n  const createBoard = (size, player = null) => {\r\n    const board = [];\r\n    for (let i = 0; i < size; i++) {\r\n      const row = [];\r\n      for (let j = 0; j < size; j++) {\r\n        const tile = createBoardTile();\r\n        tile.row = i;\r\n        tile.column = j;\r\n        if (player != null) {\r\n          tile.player = player;\r\n          tile.addEventListener('click', tileClicked);\r\n          tile.classList.add('enemy');\r\n        } else {\r\n          tile.addEventListener('click', placeShipTileClicked);\r\n        }\r\n\r\n        row.push(tile);\r\n      }\r\n      board.push(row);\r\n    }\r\n\r\n    return board;\r\n  };\r\n\r\n  const drawShipBoard = (gameboard) => {\r\n    const boardContainer = document.getElementById('player-board');\r\n    boardContainer.innerHTML = '';\r\n    const board = createBoard(gameboard.getSize());\r\n    addShips(board, gameboard.getShips());\r\n    addLocationsHit(board, gameboard.getLocationsHit());\r\n    drawBoard(boardContainer, board, gameboard.getSize());\r\n  };\r\n\r\n  const drawEnemyBoard = (gameboard, player) => {\r\n    const boardContainer = document.getElementById('shots-taken');\r\n    boardContainer.innerHTML = '';\r\n    const board = createBoard(gameboard.getSize(), player);\r\n    addLocationsHit(board, gameboard.getLocationsHit());\r\n    addShipsHit(board, gameboard.getShips());\r\n    drawBoard(boardContainer, board, gameboard.getSize());\r\n  };\r\n\r\n  function addShips(board, ships) {\r\n    for (const ship of ships) {\r\n      for (const coordinate of LocationUtils.getShipCoordinates(ship)) {\r\n        board[coordinate[0]][coordinate[1]].classList.add('ship');\r\n      }\r\n    }\r\n  }\r\n\r\n  function addLocationsHit(board, locations) {\r\n    for (const location of locations) {\r\n      board[location[0]][location[1]].classList.add('hit');\r\n    }\r\n  }\r\n\r\n  function addShipsHit(board, ships) {\r\n    for (const ship of ships) {\r\n      for (const location of LocationUtils.getShipCoordinates(ship)) {\r\n        const tile = board[location[0]][location[1]];\r\n        if (tile.classList.contains('hit')) {\r\n          tile.classList.add('ship');\r\n        }\r\n      }\r\n    }\r\n  }\r\n\r\n  function drawBoard(container, board, size) {\r\n    for (let i = 0; i < size; i++) {\r\n      for (let j = 0; j < size; j++) {\r\n        container.appendChild(board[i][j]);\r\n      }\r\n    }\r\n  }\r\n\r\n  function getUserInput(\r\n    checkParams,\r\n    tileClickedCheck,\r\n    tileValidCheck,\r\n    resetMethod,\r\n    player\r\n  ) {\r\n    resetMethod(player);\r\n    return waitForClickedTile(\r\n      checkParams,\r\n      tileClickedCheck,\r\n      tileValidCheck,\r\n      resetMethod,\r\n      player\r\n    );\r\n  }\r\n\r\n  function waitForClickedTile(\r\n    checkParams,\r\n    tileClickedCheck,\r\n    tileValidCheck,\r\n    resetMethod,\r\n    player\r\n  ) {\r\n    return new Promise((resolve, reject) => {\r\n      const clickedTile = async () => {\r\n        const result = await tileClickedCheck(player);\r\n\r\n        if (result !== null) {\r\n          if (tileValidCheck(result, checkParams)) {\r\n            resolve(result);\r\n          } else {\r\n            resetMethod(player);\r\n            setTimeout(clickedTile, 100);\r\n          }\r\n        } else {\r\n          setTimeout(clickedTile, 100);\r\n        }\r\n      };\r\n\r\n      clickedTile();\r\n    });\r\n  }\r\n\r\n  function setMessage(message) {\r\n    const messageContainer = document.getElementById('message');\r\n    messageContainer.innerHTML = message;\r\n  }\r\n\r\n  function reset() {\r\n    clickedTiles = [];\r\n    clickedPlaceShipTiles = null;\r\n  }\r\n\r\n  function showPlacementCheckbox() {\r\n    document.getElementById('placement').classList.remove('hide');\r\n  }\r\n\r\n  function hidePlacementCheckbox() {\r\n    document.getElementById('placement').classList.add('hide');\r\n  }\r\n\r\n  function getPlacementCheckboxValue() {\r\n    return document.getElementById('vertically').checked;\r\n  }\r\n\r\n  return {\r\n    createBoard,\r\n    drawShipBoard,\r\n    drawEnemyBoard,\r\n    resetTileClicked,\r\n    getTileClicked,\r\n    resetShipTileClicked,\r\n    getShipTileClicked,\r\n    getUserInput,\r\n    setMessage,\r\n    reset,\r\n    showPlacementCheckbox,\r\n    hidePlacementCheckbox,\r\n    getPlacementCheckboxValue,\r\n  };\r\n})();\r\n\r\nmodule.exports = DOMMediator;\r\n\n\n//# sourceURL=webpack://battleship/./src/DOMMediator.js?");

/***/ }),

/***/ "./src/GameLoop.js":
/*!*************************!*\
  !*** ./src/GameLoop.js ***!
  \*************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const Gameboard = __webpack_require__(/*! ../src/Gameboard */ \"./src/Gameboard.js\");\r\nconst DOMMediator = __webpack_require__(/*! ./DOMMediator */ \"./src/DOMMediator.js\");\r\n\r\nfunction GameLoop(setMessageCB) {\r\n  const setMessage = setMessageCB;\r\n  let playerTakingTurn;\r\n  let player1;\r\n  let player2;\r\n  let board1;\r\n  let board2;\r\n  let gameAborted;\r\n\r\n  async function setupGame(\r\n    playerOne,\r\n    playerTwo,\r\n    ships,\r\n    boardSize,\r\n    drawShipBoard,\r\n    drawEnemyBoard,\r\n    showPlacementCheckbox,\r\n    hidePlacementCheckbox\r\n  ) {\r\n    player1 = playerOne;\r\n    player2 = playerTwo;\r\n    playerTakingTurn = player1;\r\n\r\n    board1 = Gameboard(boardSize);\r\n    board2 = Gameboard(boardSize);\r\n\r\n    setMessage('Place your ships');\r\n    showPlacementCheckbox();\r\n\r\n    for (let i = 0; i < ships; i++) {\r\n      drawBoards(drawShipBoard, drawEnemyBoard);\r\n      let board1Placed = false;\r\n      while (!board1Placed) {\r\n        const placement = await Promise.resolve(player1.placeShip());\r\n        board1Placed = board1.placeShip(\r\n          i + 2,\r\n          placement,\r\n          player1.placeVertically()\r\n        );\r\n      }\r\n    }\r\n\r\n    hidePlacementCheckbox();\r\n\r\n    for (let i = 0; i < ships; i++) {\r\n      let board2Placed = false;\r\n      while (!board2Placed) {\r\n        const placement = await Promise.resolve(player2.placeShip());\r\n        board2Placed = board2.placeShip(\r\n          i + 2,\r\n          placement,\r\n          player2.placeVertically()\r\n        );\r\n      }\r\n    }\r\n  }\r\n\r\n  async function startGame(drawShipBoard, drawEnemyBoard, resolve) {\r\n    gameAborted = false;\r\n\r\n    while (!gameAborted && !board1.gameEnded() && !board2.gameEnded()) {\r\n      drawBoards(drawShipBoard, drawEnemyBoard);\r\n      setMessage(player1.playerName + ' make your move');\r\n      const player1Move = await playRound(player1, board2);\r\n      drawBoards(drawShipBoard, drawEnemyBoard);\r\n      setMessage(player2.playerName + ' make your move');\r\n      const player2Move = await playRound(player2, board1);\r\n    }\r\n    drawBoards(drawShipBoard, drawEnemyBoard);\r\n    const winner = getWinner();\r\n    if (winner != null && winner != undefined) {\r\n      setMessage(winner.playerName + ' wins');\r\n    }\r\n\r\n    resolve();\r\n  }\r\n\r\n  function drawBoards(drawShipBoard, drawEnemyBoard) {\r\n    drawShipBoard(board1);\r\n    drawEnemyBoard(board2, player1);\r\n  }\r\n\r\n  const playRound = (player, gameboard) => {\r\n    return new Promise((resolve, reject) => {\r\n      const move = player.getMove(gameboard.getSize());\r\n      move.then((value) => {\r\n        gameboard.receiveAttack(value);\r\n        resolve(value);\r\n      });\r\n    });\r\n  };\r\n\r\n  const currentTurn = () => {\r\n    return playerTakingTurn;\r\n  };\r\n\r\n  const getWinner = () => {\r\n    if (board1.gameEnded()) {\r\n      return player2;\r\n    }\r\n\r\n    if (board2.gameEnded()) {\r\n      return player1;\r\n    }\r\n\r\n    return null;\r\n  };\r\n\r\n  const abortGame = () => {\r\n    gameAborted = true;\r\n  };\r\n\r\n  return { setupGame, startGame, playRound, currentTurn, getWinner, abortGame };\r\n}\r\n\r\nmodule.exports = GameLoop;\r\n\n\n//# sourceURL=webpack://battleship/./src/GameLoop.js?");

/***/ }),

/***/ "./src/Gameboard.js":
/*!**************************!*\
  !*** ./src/Gameboard.js ***!
  \**************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const Ship = __webpack_require__(/*! ../src/Ship */ \"./src/Ship.js\");\r\nconst LocationUtils = __webpack_require__(/*! ../src/LocationUtils */ \"./src/LocationUtils.js\");\r\n\r\nfunction Gameboard(size) {\r\n  const boardSize = size;\r\n  const ships = [];\r\n  const locationsHit = new Set();\r\n  const placeShip = (length, location, isVertical = false) => {\r\n    if (\r\n      location[0] < 0 ||\r\n      location[0] >= boardSize ||\r\n      location[1] < 0 ||\r\n      location[1] >= boardSize\r\n    ) {\r\n      return false;\r\n    }\r\n\r\n    if (\r\n      (isVertical && location[0] + length - 1 >= boardSize) ||\r\n      (!isVertical && location[1] + length - 1 >= boardSize)\r\n    ) {\r\n      return false;\r\n    }\r\n\r\n    const shipObj = Ship(length);\r\n    const ship = { ship: shipObj, length, location, isVertical };\r\n\r\n    for (const otherShip of ships) {\r\n      if (LocationUtils.shipsOverlap(ship, otherShip)) {\r\n        return false;\r\n      }\r\n    }\r\n\r\n    ships.push(ship);\r\n    return true;\r\n  };\r\n\r\n  const getShips = () => ships;\r\n\r\n  const getLocationsHit = () => locationsHit;\r\n\r\n  const receiveAttack = (location) => {\r\n    if (!locationHit(location)) {\r\n      ships.forEach((ship) => {\r\n        if (\r\n          !ship.isVertical &&\r\n          ship.location[0] == location[0] &&\r\n          ship.location[1] <= location[1] &&\r\n          ship.location[1] + ship.length - 1 >= location[1]\r\n        ) {\r\n          ship.ship.hit();\r\n        } else if (\r\n          ship.isVertical &&\r\n          ship.location[1] == location[1] &&\r\n          ship.location[0] <= location[0] &&\r\n          ship.location[0] + ship.length - 1 >= location[0]\r\n        ) {\r\n          ship.ship.hit();\r\n        }\r\n      });\r\n\r\n      locationsHit.add(location);\r\n      return true;\r\n    }\r\n    return false;\r\n  };\r\n\r\n  const locationHit = (location) => {\r\n    for (const otherLocation of locationsHit) {\r\n      if (LocationUtils.locationsAreSame(location, otherLocation)) {\r\n        return true;\r\n      }\r\n    }\r\n    return false;\r\n  };\r\n\r\n  const gameEnded = () => {\r\n    for (const ship of ships) {\r\n      if (!ship.ship.isSunk()) {\r\n        return false;\r\n      }\r\n    }\r\n\r\n    return true;\r\n  };\r\n\r\n  const getSize = () => {\r\n    return boardSize;\r\n  };\r\n\r\n  return {\r\n    placeShip,\r\n    getShips,\r\n    getLocationsHit,\r\n    receiveAttack,\r\n    locationHit,\r\n    gameEnded,\r\n    getSize,\r\n  };\r\n}\r\n\r\nmodule.exports = Gameboard;\r\n\n\n//# sourceURL=webpack://battleship/./src/Gameboard.js?");

/***/ }),

/***/ "./src/LocationUtils.js":
/*!******************************!*\
  !*** ./src/LocationUtils.js ***!
  \******************************/
/***/ ((module) => {

eval("const LocationUtils = (() => {\r\n  function shipsOverlap(ship1, ship2) {\r\n    const ship1Coordinates = getShipCoordinates(ship1);\r\n    const ship2Coordinates = getShipCoordinates(ship2);\r\n\r\n    for (const coordinate of ship1Coordinates) {\r\n      for (const otherCoordinate of ship2Coordinates) {\r\n        if (locationsAreSame(coordinate, otherCoordinate)) {\r\n          return true;\r\n        }\r\n      }\r\n    }\r\n\r\n    return false;\r\n  }\r\n\r\n  function getShipCoordinates(ship) {\r\n    const coordinates = [];\r\n    for (let i = 0; i < ship.length; i++) {\r\n      let coordinate = [...ship.location];\r\n      if (ship.isVertical) {\r\n        coordinate[0] = coordinate[0] + i;\r\n      } else {\r\n        coordinate[1] = coordinate[1] + i;\r\n      }\r\n      coordinates.push(coordinate);\r\n    }\r\n\r\n    return coordinates;\r\n  }\r\n\r\n  function locationsAreSame(location1, location2) {\r\n    return location1[0] == location2[0] && location1[1] == location2[1];\r\n  }\r\n\r\n  return { shipsOverlap, getShipCoordinates, locationsAreSame };\r\n})();\r\n\r\nmodule.exports = LocationUtils;\r\n\n\n//# sourceURL=webpack://battleship/./src/LocationUtils.js?");

/***/ }),

/***/ "./src/Player.js":
/*!***********************!*\
  !*** ./src/Player.js ***!
  \***********************/
/***/ ((module) => {

eval("function Player(name, moveCB, placeShipCB, placeVerticallyCB = null) {\r\n  const playerName = name;\r\n  const moveCallback = moveCB;\r\n  const placeShipCallback = placeShipCB;\r\n  const placeVerticallyCallback = placeVerticallyCB;\r\n  const movesTaken = [];\r\n\r\n  const getMove = (boardSize) => {\r\n    const move = moveCallback(movesTaken, boardSize);\r\n    return new Promise((resolve, reject) => {\r\n      Promise.resolve(move).then((value) => {\r\n        movesTaken.push(value);\r\n        resolve(value);\r\n      });\r\n    });\r\n  };\r\n\r\n  const placeShip = (existingShips) => {\r\n    return placeShipCallback();\r\n  };\r\n\r\n  const placeVertically = () => {\r\n    if (placeVerticallyCallback != null) {\r\n      return placeVerticallyCallback();\r\n    }\r\n\r\n    return false;\r\n  };\r\n\r\n  return { playerName, getMove, placeShip, placeVertically };\r\n}\r\n\r\nmodule.exports = Player;\r\n\n\n//# sourceURL=webpack://battleship/./src/Player.js?");

/***/ }),

/***/ "./src/Ship.js":
/*!*********************!*\
  !*** ./src/Ship.js ***!
  \*********************/
/***/ ((module) => {

eval("function Ship(length) {\r\n  const totalLength = length;\r\n  let health = length;\r\n  const hit = () => {\r\n    health--;\r\n  };\r\n  const timesHit = () => {\r\n    return totalLength - health;\r\n  };\r\n\r\n  const isSunk = () => {\r\n    return health == 0;\r\n  };\r\n\r\n  return { hit, timesHit, isSunk };\r\n}\r\n\r\nmodule.exports = Ship;\r\n\n\n//# sourceURL=webpack://battleship/./src/Ship.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

eval("const DOMMediator = __webpack_require__(/*! ./DOMMediator */ \"./src/DOMMediator.js\");\r\nconst GameLoop = __webpack_require__(/*! ./GameLoop */ \"./src/GameLoop.js\");\r\nconst Player = __webpack_require__(/*! ./Player */ \"./src/Player.js\");\r\n\r\nfunction getHumanPlayer() {\r\n  const player = Player(\r\n    'human',\r\n    (movesTaken, boardSize) => {\r\n      return DOMMediator.getUserInput(\r\n        movesTaken,\r\n        DOMMediator.getTileClicked,\r\n        tileValidCheck,\r\n        DOMMediator.resetTileClicked,\r\n        player\r\n      );\r\n    },\r\n    () => {\r\n      return DOMMediator.getUserInput(\r\n        null,\r\n        DOMMediator.getShipTileClicked,\r\n        () => {\r\n          return true;\r\n        },\r\n        DOMMediator.resetShipTileClicked,\r\n        player\r\n      );\r\n    },\r\n    DOMMediator.getPlacementCheckboxValue\r\n  );\r\n\r\n  return player;\r\n}\r\n\r\nfunction getComputerPlayer() {\r\n  const player = Player(\r\n    'computer',\r\n    randomMove,\r\n    () => {\r\n      return randomMove([], 10);\r\n    },\r\n    // () => {return dummyPlacement();}\r\n    () => {\r\n      return Math.random() < 0.5;\r\n    }\r\n  );\r\n\r\n  return player;\r\n}\r\n\r\nfunction getUserShipPlacement(player) {\r\n  DOMMediator.resetShipTileClicked(player);\r\n  return waitForClickedPlaceShipTile(player);\r\n}\r\n\r\nfunction tileValidCheck(tile, movesTaken) {\r\n  if (tile == null || tile == undefined) {\r\n    return null;\r\n  }\r\n\r\n  for (const move of movesTaken) {\r\n    if (move[0] == tile[0] && move[1] == tile[1]) {\r\n      return false;\r\n    }\r\n  }\r\n  return true;\r\n}\r\n\r\nfunction waitForClickedPlaceShipTile(player) {\r\n  return new Promise((resolve, reject) => {\r\n    const clickedTile1 = async () => {\r\n      const result = await DOMMediator.getShipTileClicked(player);\r\n\r\n      if (result !== null) {\r\n        resolve(result);\r\n      } else {\r\n        setTimeout(clickedTile1, 100);\r\n      }\r\n    };\r\n\r\n    clickedTile1();\r\n  });\r\n}\r\n\r\nfunction randomMove(movesTaken, boardSize) {\r\n  while (true) {\r\n    const x = Math.floor(Math.floor(Math.random() * boardSize));\r\n    const y = Math.floor(Math.floor(Math.random() * boardSize));\r\n\r\n    let moveAllowed = true;\r\n\r\n    for (const move of movesTaken) {\r\n      if (move[0] == x && move[1] == y) {\r\n        moveAllowed = false;\r\n      }\r\n    }\r\n\r\n    if (moveAllowed) {\r\n      return [x, y];\r\n    }\r\n  }\r\n}\r\n\r\nfunction dummyPlacement() {\r\n  return [3, 3];\r\n}\r\n\r\ndocument.getElementById('restart').addEventListener('click', restart);\r\n\r\nfunction restart() {\r\n  gameloop.abortGame();\r\n  endRunningGame();\r\n  startNewGame(getHumanPlayer(), getComputerPlayer());\r\n}\r\n\r\nlet endRunningGame;\r\nlet gameloop;\r\n\r\nfunction startNewGame(playerOne, playerTwo) {\r\n  DOMMediator.reset();\r\n  gameloop = GameLoop(DOMMediator.setMessage);\r\n  const game = new Promise((resolve, reject) => {\r\n    resolve(\r\n      gameloop.setupGame(\r\n        playerOne,\r\n        playerTwo,\r\n        3,\r\n        10,\r\n        DOMMediator.drawShipBoard,\r\n        DOMMediator.drawEnemyBoard,\r\n        DOMMediator.showPlacementCheckbox,\r\n        DOMMediator.hidePlacementCheckbox\r\n      )\r\n    );\r\n  });\r\n\r\n  game\r\n    .then((value) => {\r\n      return new Promise((resolve, reject) => {\r\n        endRunningGame = resolve;\r\n        gameloop.startGame(\r\n          DOMMediator.drawShipBoard,\r\n          DOMMediator.drawEnemyBoard,\r\n          resolve\r\n        );\r\n      });\r\n    })\r\n    .then((value2) => {\r\n      let winner = gameloop.getWinner();\r\n      if (winner != null) {\r\n        console.log(winner.playerName + ' wins');\r\n      } else {\r\n        console.log('restarted');\r\n      }\r\n    });\r\n}\r\n\r\nstartNewGame(getHumanPlayer(), getComputerPlayer());\r\n\n\n//# sourceURL=webpack://battleship/./src/index.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;