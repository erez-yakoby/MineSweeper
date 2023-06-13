import { Button } from "@mui/material";
import { textColor } from "../constants";

export default function Cell({ cell, handleCellClick }) {
  return (
    <Button
      variant={cell.isOpen ? "outlined" : "contained"}
      size="small"
      color={
        (cell.location.x + cell.location.y) % 2 === 0 ? "primary" : "secondary"
      }
      onClick={() => handleCellClick(cell.location.x, cell.location.y, false)}
      onContextMenu={(event) => {
        event.preventDefault();
        handleCellClick(cell.location.x, cell.location.y, true);
      }}
      sx={{
        aspectRatio: 1 / 1,
        color: cell.hasFlag || textColor[cell.numBombs],
        fontSize: 18,
        fontWeight: 700,
        boxShadow: 5,
        borderRadius: 0,
      }}
    >
      {cell.isOpen
        ? cell.isBomb
          ? "B"
          : cell.numBombs !== 0 && cell.numBombs
        : cell.hasFlag
        ? "F"
        : ""}
    </Button>
  );
}
