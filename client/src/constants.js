const gameParams = {
  easy: {
    numRows: 9,
    numCols: 9,
    numBombs: 10,
  },
  medium: {
    numRows: 9,
    numCols: 14,
    numBombs: 20,
  },
  hard: {
    numRows: 9,
    numCols: 28,
    numBombs: 40,
  },
};

const neigbors = [
  { x: -1, y: -1 },
  { x: -1, y: 0 },
  { x: -1, y: 1 },
  { x: 0, y: -1 },
  { x: 0, y: 1 },
  { x: 1, y: -1 },
  { x: 1, y: 0 },
  { x: 1, y: 1 },
];

const textColor = {
  1: "blue",
  2: "green",
  3: "red",
  4: "orange",
  5: "blue",
  6: "green",
  7: "red",
  8: "orange",
};

module.exports.gameParams = gameParams;
module.exports.neigbors = neigbors;
module.exports.textColor = textColor;
