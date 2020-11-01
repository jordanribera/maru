import React from "react";
import PropTypes from "prop-types";

import Box from "@material-ui/core/Box";

const styles = {
  root: {
    backgroundColor: "yellow",
    opacity: 0.5,
    height: "100%",
    width: "100%",
  },
};

class Art extends React.Component {
  render() {
    const handleResize = (event) => {
      console.log("resized!");
    };

    return (
      /* TODO: create a frame that will remain square and fill its parent */
      <Box style={styles.root} onResize={handleResize}>
        <Box style={{ ...styles.art, ...artStyle }} onClick={toggleExpandArt}>
          {!("artwork_url" in activeTrack && activeTrack.artwork_url) && (
            <AlbumIcon color="disabled" style={styles.noArt} />
          )}
        </Box>
      </Box>
    );
  }
}

Art.propTypes = {
  url: PropTypes.string,
  fit: PropTypes.oneOf(["height", "width"]),
};

export default Art;
