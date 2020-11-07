import React from "react";
import PropTypes from "prop-types";

import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import { activeTheme, colorMap } from "../client/theme";

const styles = {
  root: {
    height: "256px",
    width: "256px",
    position: "relative",
  },
  wrapper: {
    position: "absolute",
    top: "0px",
    bottom: "0px",
    left: "0px",
    right: "0px",
  },
  grid: {
    height: "100%",
  },
  colorButton: {
    height: "100%",
    width: "100%",
    minWidth: "100%",
  },
};

class ColorSelector extends React.Component {
  render() {
    const activeStyle = (colorKey) => {
      let borderColor = activeTheme().palette.divider;
      if (colorKey === this.props.activeColor) {
        borderColor = activeTheme().palette.text.primary;
      }

      return { border: `solid 4px ${borderColor}` };
    };

    return (
      <Box style={{ ...styles.root, ...this.props.style }}>
        <Box style={styles.wrapper}>
          <Grid container style={styles.grid} spacing={1} justify="flex-start">
            {Object.keys(colorMap).map((key) => (
              <Grid item xs={3} key={key}>
                <Button
                  onClick={() => {
                    this.props.onChange(key);
                  }}
                  variant="contained"
                  style={{
                    backgroundColor: colorMap[key].color[500],
                    ...styles.colorButton,
                    ...activeStyle(key),
                  }}
                />
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>
    );
  }
}

ColorSelector.propTypes = {
  activeColor: PropTypes.string,
  onChange: PropTypes.func,
};

export default ColorSelector;
