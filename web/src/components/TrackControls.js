import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import IconButton from "@material-ui/core/IconButton";
import PauseIcon from "@material-ui/icons/Pause";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import SkipNextIcon from "@material-ui/icons/SkipNext";
import SkipPreviousIcon from "@material-ui/icons/SkipPrevious";
import Box from "@material-ui/core/Box";

import { advanceQueue } from "../actions/queue";

const styles = {
  root: {
    backgroundColor: "green",
    display: "flex",
    flexDirection: "row",
  },
  art: {
    height: "96px",
    width: "96px",
    backgroundColor: "lightBlue",
  },
  body: {
    flexGrow: "1",
  },
  controls: {
    backgroundColor: "silver",
  },
  title: {
    padding: "16px",
  },
};

class TrackControls extends React.Component {
  render() {
    const track = this.props.track || {};

    return (
      <Box style={styles.root}>
        <Box style={styles.art}>ART</Box>
        <Box style={styles.body}>
          <Box style={styles.controls}>
            <IconButton color="primary" onClick={this.props.callbacks.previous}>
              <SkipPreviousIcon />
            </IconButton>
            <IconButton color="primary" onClick={this.props.callbacks.play}>
              <PlayArrowIcon />
            </IconButton>
            <IconButton color="primary" onClick={this.props.callbacks.pause}>
              <PauseIcon />
            </IconButton>
            <IconButton color="primary" onClick={this.props.callbacks.next}>
              <SkipNextIcon />
            </IconButton>
          </Box>
          <Box style={styles.title}>{track.title}</Box>
        </Box>
      </Box>
    );
  }
}

TrackControls.propTypes = {
  track: PropTypes.object,
  callbacks: PropTypes.object,
};

const mapStateToProps = (state) => {
  return {
    queue: state.queue.primary,
  };
};

export default connect(mapStateToProps)(TrackControls);
