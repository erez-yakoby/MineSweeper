import "../App.css";
import Header from "./Header";
import BoardGrid from "./BoardGrid";
import { useEffect, useState } from "react";
import { gameParams, neigbors } from "../constants";
import {
  Container,
  Typography,
  ToggleButtonGroup,
  ToggleButton,
} from "@mui/material";

function Game() {
  const [gp, setGp] = useState(gameParams.easy); // gp = game parameters (#rows, #cols, #bombs)
  const [board, setBoard] = useState([]);
  const [isWon, setIsWon] = useState(false);
  const [gameStatus, setGameStatus] = useState("init");
  const [flagCounter, setFlagCounter] = useState(gp.numBombs);
  const [closedCells, setClosedCells] = useState(gp.numRows * gp.numCols);
  const [time, setTime] = useState(0);
  const [difficulty, setDifficulty] = useState("easy");

  ///////////////////////////////////// hooks /////////////////////////////////////

  //   initialization
  useEffect(() => {
    setBoard(createBoard(gp));
  }, []);

  // stop watch hook
  useEffect(() => {
    const interval = setInterval(() => {
      setTime((seconds) => seconds + 1);
    }, 1000);
    if (gameStatus !== "progress") {
      clearInterval(interval);
      return;
    }
    return () => clearInterval(interval);
  }, [gameStatus]);

  //   check for win
  useEffect(() => {
    if (flagCounter === 0 && closedCells === gp.numBombs) {
      setIsWon(true);
      setGameStatus("done");
    }
  }, [flagCounter, closedCells]);

  //   change difficulty
  useEffect(() => {
    resetGame();
  }, [gp]);

  ///////////////////////////////////// handle click events /////////////////////////////////////
  function handleCellClick(row, col, isRightClick) {
    if (gameStatus === "init") setGameStatus("progress");
    if (isRightClick) handleRightClick(row, col);
    else openCell(row, col);
  }

  function handleRightClick(row, col) {
    const newBoard = board.slice();
    const cell = newBoard[row][col];
    if (cell.isOpen) return;
    if (cell.hasFlag) {
      setFlagCounter(flagCounter + 1);
      cell.hasFlag = false;
    } else if (flagCounter > 0) {
      setFlagCounter(flagCounter - 1);
      cell.hasFlag = true;
    }
    setBoard(newBoard);
  }

  function openCell(row, col) {
    const newBoard = board.slice();
    const cell = newBoard[row][col];
    if (cell.isOpen) return;
    if (cell.hasFlag) setFlagCounter(flagCounter + 1);

    cell.isOpen = true;
    setClosedCells((prevCount) => prevCount - 1);
    if (cell.isBomb) {
      setGameStatus("done");
    } else if (cell.numBombs === 0) {
      openNeigbourCells(row, col);
    }
    setBoard(newBoard);
  }

  function openNeigbourCells(row, col) {
    if (board[row][col].numBombs > 0) {
      return;
    }
    neigbors.forEach(({ x, y }) => {
      if (
        0 <= row + x &&
        row + x < gp.numRows &&
        0 <= col + y &&
        col + y < gp.numCols
      ) {
        const neigbor = board[row + x][col + y];
        if (!neigbor.isOpen && !neigbor.isBomb) {
          neigbor.isOpen = true;
          setClosedCells((prevCount) => prevCount - 1);

          neigbor.value = neigbor.numBombs.toString();
          openNeigbourCells(row + x, col + y);
        }
      }
    });
  }

  function selectDifficulty(level) {
    setDifficulty(level);
    switch (level) {
      case "easy":
        setGp(gameParams.easy);
        break;
      case "medium":
        setGp(gameParams.medium);
        break;
      case "hard":
        setGp(gameParams.hard);
        break;

      default:
        break;
    }
  }

  function resetGame() {
    setIsWon(false);
    setGameStatus("init");
    setFlagCounter(gp.numBombs);
    setClosedCells(gp.numRows * gp.numCols);
    setBoard(createBoard(gp));
    setTime(0);
  }

  return (
    <Container maxWidth="sm">
      <Header onReset={resetGame} flagCount={flagCounter} time={time} />
      <Container sx={{ display: "flex", justifyContent: "center", marginY: 2 }}>
        <ToggleButtonGroup
          exclusive
          value={difficulty}
          className="gameBoard"
          onChange={(e, value) => selectDifficulty(value)}
        >
          <ToggleButton value="easy"> easy</ToggleButton>
          <ToggleButton value="medium"> medium</ToggleButton>
          <ToggleButton value="hard"> hard</ToggleButton>
        </ToggleButtonGroup>
      </Container>

      <BoardGrid
        board={board}
        handleCellClick={handleCellClick}
        isDisabled={gameStatus === "done"}
      />

      <Typography variant="h4" margin={3}>
        {isWon ? "You Won!" : gameStatus === "done" ? "Game Over!" : ""}
      </Typography>
    </Container>
  );
}

///////////////////////////////////// board utils /////////////////////////////////////
function createBoard(gp) {
  const board = [];
  for (let row = 0; row < gp.numRows; row++) {
    let curRow = [];
    for (let col = 0; col < gp.numCols; col++) {
      curRow.push(createCell(row, col));
    }
    board.push(curRow);
  }
  setBombs(board, gp);
  return board;
}

function setBombs(board, gp) {
  const locations = [];

  //   generate an array of random locations for the bombs
  while (locations.length < gp.numBombs) {
    const row = Math.floor(Math.random() * gp.numRows);
    const col = Math.floor(Math.random() * gp.numCols);
    const idx = locations.findIndex(
      (element) => element.row === row && element.col === col
    );
    if (idx === -1) {
      locations.push({ row, col });
    }
  }

  //   go over the locations, place bomb in each location and increament
  //   the numBombs counter of all neigbor cells
  locations.forEach(({ row, col }) => {
    board[row][col].isBomb = true;
    neigbors.forEach(({ x, y }) => {
      if (isValidLocation(row + x, col + y, gp)) {
        board[row + x][col + y].numBombs += 1;
      }
    });
  });
}

function isValidLocation(row, col, gp) {
  return 0 <= row && row < gp.numRows && 0 <= col && col < gp.numCols
    ? true
    : false;
}

function createCell(x, y) {
  return {
    isOpen: false,
    isBomb: false,
    hasFlag: false,
    numBombs: 0,
    location: {
      x: x,
      y: y,
    },
  };
}

export default Game;
