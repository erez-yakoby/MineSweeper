import { createTheme } from "@mui/material/styles";

const arcBlue = "#0B72B9";
const arcOrange = "#FFBA60";

export default createTheme({
  typography: {
    fontSize: 15,
    h5: {
      color: "white",
      fontWeight: 100,
    },
    h4: {
      color: "white",
      fontWeight: 100,
      textAlign: "center",
    },
  },

  palette: {
    common: {
      blue: `${arcBlue}`,
      orange: `${arcOrange}`,
    },
    primary: {
      main: `${arcBlue}`,
    },
    secondary: {
      main: `${arcOrange}`,
    },
  },
});
