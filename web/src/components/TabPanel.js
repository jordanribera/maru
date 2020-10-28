import React from "react";
import PropTypes from "prop-types";

import Box from "@material-ui/core/Box";

const styles = {
  root: {
    padding: "64px",
  },
};

class TabPanel extends React.Component {
  render() {
    const { children, value, index, ...other } = this.props;

    return (
      <Box
        style={styles.root}
        role="tabpanel"
        hidden={value !== index}
        {...other}
      >
        {value === index && <Box p={0}>{children}</Box>}
      </Box>
    );
  }
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

export default TabPanel;
