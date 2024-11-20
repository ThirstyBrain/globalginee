import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#ff4081", // Feminine and bright
    },
    secondary: {
      main: "#3f51b5",
    },
    background:{
      default:"#ffccd8"
    }
  },
  typography: {
    fontFamily: "Roboto, Arial, sans-serif",
  },
});

export default theme;
