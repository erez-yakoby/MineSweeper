import { List, ListItem, ButtonGroup, Container } from "@mui/material";
import Cell from "./Cell";

export default function BoardGrid({ board, handleCellClick, isDisabled }) {
  // each ListItem is a row in the game grid
  return (
    <Container maxWidth="xs" sx={{ display: "flex", justifyContent: "center" }}>
      <List disablePadding className="gameBoard">
        {board.map((row, index) => (
          <ListItem key={index} disablePadding>
            <ButtonGroup disabled={isDisabled}>
              {row.map((cell) => (
                <Cell cell={cell} handleCellClick={handleCellClick} />
              ))}
            </ButtonGroup>
          </ListItem>
        ))}
      </List>
    </Container>
  );
}
