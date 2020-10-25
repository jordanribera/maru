import React from "react";

import Box from "@material-ui/core/Box";

const styles = {
  root: {
    backgroundColor: "purple",
    height: "100%",
    flexGrow: "1",
  },
};

class Library extends React.Component {
  render() {
    return <Box style={styles.root}>Library things go here.</Box>;
  }
}

export default Library;
