import { createMuiTheme } from "@material-ui/core/styles";
import { blue } from "@material-ui/core/colors";

const getTheme = (dark, color) => {
  return createMuiTheme({
    palette: {
      type: dark ? "dark" : "light",
      primary: {
        main: color,
      },
    },
  });
};

export const darkTheme = getTheme(true, blue[500]);
export const lightTheme = getTheme(false, blue[500]);
