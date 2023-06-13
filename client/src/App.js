import "./App.css";
import Game from "./components/Game";
import { ThemeProvider } from "@mui/material";
import theme from "./components/theme";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className="app">
        <header className="gameHeader">MineSweeper</header>
        <Game />
      </div>
    </ThemeProvider>
  );
}

export default App;
