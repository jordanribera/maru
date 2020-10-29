import store from "./store";

import { createMuiTheme } from "@material-ui/core/styles";
import { red, pink, purple, deepPurple } from "@material-ui/core/colors";
import { indigo, blue, lightBlue, cyan } from "@material-ui/core/colors";
import { teal, green, lightGreen, lime } from "@material-ui/core/colors";
import { yellow, amber, orange, deepOrange } from "@material-ui/core/colors";

export const colorMap = {
  red: { label: "Red", color: red },
  pink: { label: "Pink", color: pink },
  purple: { label: "Purple", color: purple },
  deepPurple: { label: "Deep Purple", color: deepPurple },

  indigo: { label: "Indigo", color: indigo },
  blue: { label: "Blue", color: blue },
  lightBlue: { label: "Light Blue", color: lightBlue },
  cyan: { label: "Cyan", color: cyan },

  teal: { label: "Teal", color: teal },
  green: { label: "Green", color: green },
  lightGreen: { label: "Light Green", color: lightGreen },
  lime: { label: "Lime", color: lime },

  yellow: { label: "Yellow", color: yellow },
  amber: { label: "Amber", color: amber },
  orange: { label: "Orange", color: orange },
  deepOrange: { label: "Deep Orange", color: deepOrange },
};

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

export const activeTheme = () => {
  const state = store.getState();
  return getTheme(
    state.shell.darkMode,
    colorMap[state.shell.themeColor].color[500]
  );
};

export const darkTheme = getTheme(true, colorMap["blue"].color[500]);
export const lightTheme = getTheme(false, colorMap["blue"].color[500]);
