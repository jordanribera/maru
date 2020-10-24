import React from "react";

import Box from "@material-ui/core/Box";

import Player from "./components/Player";
import Library from "./components/Library";

const styles = {
  root: {
    backgroundColor: "orange",
    height: "100vh",
    display: "flex",
  },
}

class MaruClient extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render(dispatch) {
    return (
      <Box style={styles.root}>
        <Player />
        <Library />
      </Box>
    );
  }
}

export default MaruClient;
