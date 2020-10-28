import React from "react";
import { connect } from "react-redux";

import { ThemeProvider } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import CssBaseline from "@material-ui/core/CssBaseline";

import Player from "./components/Player";
import Library from "./components/Library";
import { darkTheme, lightTheme } from "./client/theme";

const styles = {
  root: {
    backgroundColor: "orange",
    height: "100vh",
    display: "flex",
  },
};

class MaruClient extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  activeTheme() {
    return this.props.darkMode ? darkTheme : lightTheme;
  }

  render(dispatch) {
    return (
      <ThemeProvider theme={this.activeTheme()}>
        <CssBaseline />
        <Box style={styles.root}>
          <Player />
          <Library />
        </Box>
      </ThemeProvider>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    darkMode: state.shell.darkMode,
  };
};

export default connect(mapStateToProps)(MaruClient);
