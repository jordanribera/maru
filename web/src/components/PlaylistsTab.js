import React from "react";

import Box from "@material-ui/core/Box";

import Art from "./Art";

const styles = {
  root: {
    height: "100vh",
  },
  tallBox: {
    height: "calc(100% - 512px)",
    width: "512px",
    backgroundColor: "green",
  },
  wideBox: {
    height: "512px",
    width: "100%",
    backgroundColor: "blue",
  },
};

class PlaylistsTab extends React.Component {
  render() {
    return (
      <Box style={styles.root}>
        <Box style={styles.tallBox}>
          <Art fit="width" />
        </Box>
        <Box style={styles.wideBox}>
          <Art fit="width" />
        </Box>
      </Box>
    );
  }
}

export default PlaylistsTab;
