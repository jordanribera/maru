import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import IconButton from "@material-ui/core/IconButton";
import PauseIcon from "@material-ui/icons/Pause";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import SkipNextIcon from "@material-ui/icons/SkipNext";
import SkipPreviousIcon from "@material-ui/icons/SkipPrevious";
import Slider from "@material-ui/core/Slider";
import Box from "@material-ui/core/Box";

import { advanceQueue } from "../actions/queue";

const styles = {
  root: {
    backgroundColor: "white",
  },
  art: {
    height: "512px",
    width: "100%",
    backgroundColor: "lightBlue",
  },
  body: {
    flexGrow: "1",
  },
  controls: {
    textAlign: "center",
    marginTop: "-48px",
  },
  button: {},
  seekBar: {
    marginTop: "-16px",
  },
  title: {
    marginTop: "-20px",
    padding: "16px",
  },
};

class TrackControls extends React.Component {
  render() {
    const track = this.props.track || {};
    const art_style = {
      backgroundImage: `url(${track.artwork_url})`,
      backgroundSize: "100%",
    };

    return (
      <Box style={styles.root}>
        <Box style={{ ...styles.art, ...art_style }} />
        <Box style={styles.controls}>
          <IconButton
            style={styles.button}
            color="primary"
            onClick={this.props.callbacks.previous}
          >
            <SkipPreviousIcon />
          </IconButton>
          <IconButton
            style={styles.button}
            color="primary"
            onClick={this.props.callbacks.play}
          >
            <PlayArrowIcon />
          </IconButton>
          <IconButton
            style={styles.button}
            color="primary"
            onClick={this.props.callbacks.pause}
          >
            <PauseIcon />
          </IconButton>
          <IconButton
            style={styles.button}
            color="primary"
            onClick={this.props.callbacks.next}
          >
            <SkipNextIcon />
          </IconButton>
        </Box>
        <Slider
          style={styles.seekBar}
          value={this.props.currentTime}
          min={0}
          max={this.props.duration}
          onChange={this.props.callbacks.seeking}
          onChangeCommitted={this.props.callbacks.seek}
        />
        <Box style={styles.title}>{track.title}</Box>
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
