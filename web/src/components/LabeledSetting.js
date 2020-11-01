import React from "react";
import PropTypes from "prop-types";

import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";

const styles = {
  root: {
    marginTop: "32px",
    display: "flex",
    flexDirection: "column",
    userSelect: "none",
  },
  heading: {
    display: "flex",
    flexDirection: "row",
  },
  icon: {
    width: "48px",
    marginRight: "8px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  label: {},
  body: {
    flexGrow: "1",
    display: "flex",
    flexDirction: "row",
  },
  gutter: {
    width: "48px",
    marginRight: "8px",
  },
  content: {},
};

class LabeledSetting extends React.Component {
  render() {
    return (
      <Box style={styles.root}>
        <Box style={styles.heading}>
          <Box style={styles.icon}>{this.props.icon}</Box>
          <Box style={styles.label}>
            <Typography variant="h6">{this.props.label}</Typography>
            <Typography variant="caption" color="textSecondary">
              {this.props.description}
            </Typography>
          </Box>
        </Box>
        <Box style={styles.body}>
          <Box style={styles.gutter} />
          <Box style={styles.content}>{this.props.children}</Box>
        </Box>
      </Box>
    );
  }
}

LabeledSetting.propTypes = {
  label: PropTypes.string,
  description: PropTypes.string,
  icon: PropTypes.node,
};

export default LabeledSetting;
