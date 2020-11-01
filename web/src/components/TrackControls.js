import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import Collapse from "@material-ui/core/Collapse";
import IconButton from "@material-ui/core/IconButton";
import PauseIcon from "@material-ui/icons/Pause";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import SkipNextIcon from "@material-ui/icons/SkipNext";
import SkipPreviousIcon from "@material-ui/icons/SkipPrevious";
import Slider from "@material-ui/core/Slider";
import Box from "@material-ui/core/Box";

import AlbumIcon from "@material-ui/icons/Album";

import { activeTheme } from "../client/theme";

const styles = {
  root: {},
  art: {
    width: "100%",
    paddingBottom: "100%",
    backgroundColor: activeTheme().palette.background.default,
    position: "relative",
  },
  noArt: {
    position: "absolute",
    height: "100%",
    width: "100%",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  controls: {
    textAlign: "center",
  },
  button: {
    height: "64px",
    width: "64px",
  },
  seekBar: {
    marginTop: "-16px",
  },
};

class TrackControls extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      expandArt: true,
    };
  }

  render() {
    const track = this.props.track || {};
    const art_style = {
      backgroundImage: `url(${track.artwork_url})`,
      backgroundSize: "100%",
    };

    const toggleExpandArt = () => {
      let tempState = this.state;
      tempState.expandArt = !this.state.expandArt;
      this.setState(tempState);
    };

    return (
      <Box style={styles.root}>
        <Collapse in={this.state.expandArt} collapsedHeight={16}>
          <Box
            style={{ ...styles.art, ...art_style }}
            onClick={toggleExpandArt}
          >
            {!("artwork_url" in track && track.artwork_url) && (
              <AlbumIcon color="disabled" style={styles.noArt} />
            )}
          </Box>
        </Collapse>
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
            <PlayArrowIcon style={styles.button} />
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
    darkMode: state.shell.darkMode,
  };
};

export default connect(mapStateToProps)(TrackControls);
