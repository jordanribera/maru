import React from "react";

import Box from "@material-ui/core/Box";

const styles = {
  root: {
    backgroundColor: "orange",
  },
  player: {
    backgroundColor: "blue",
  },
  library: {
    backgroundColor: "green",
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
        <Box style={styles.player}>
          Player
        </Box>
        <Box style={styles.library}>
          Library
        </Box>
      </Box>
    );
  }
}

export default MaruClient;
