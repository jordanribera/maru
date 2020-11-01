import React from "react";
import PropTypes from "prop-types";

import Box from "@material-ui/core/Box";

const styles = {};

class Art extends React.Component {
  render() {
    return (
      /* TODO: create a frame that will remain square and fill its parent */
      <Box>Thing</Box>
    );
  }
}

Art.propTypes = {
  url: PropTypes.string,
  fit: PropTypes.oneOf(["height", "width"]),
};

export default Art;
