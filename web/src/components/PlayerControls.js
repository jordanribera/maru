import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { withStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import ArrowDropUpIcon from "@material-ui/icons/ArrowDropUp";
import PauseIcon from "@material-ui/icons/Pause";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import SkipNextIcon from "@material-ui/icons/SkipNext";
import SkipPreviousIcon from "@material-ui/icons/SkipPrevious";
import Slider from "@material-ui/core/Slider";
import Box from "@material-ui/core/Box";

import VolumeMenu from "./VolumeMenu";

const styles = {
  root: {
    position: "relative",
    minHeight: "64px",
    maxHeight: "64px",
    display: "flex",
  },
  zone: {
    left: {
      display: "flex",
      justifyContent: "center",
    },
    center: {
      flexGrow: 1,
      display: "flex",
      justifyContent: "center",
    },
    right: {
      display: "flex",
      justifyContent: "center",
    },
  },
  controls: {
    textAlign: "center",
    backgroundColor: "orange",
  },
  button: {
    height: "56px",
    width: "56px",
  },
  seekBar: {
    position: "absolute",
    bottom: 4,
    left: 0,
    right: 0,
    marginBottom: "-17px",
  },
};

const StyleSlider = withStyles({
  root: {
    color: "primary",
    height: 8,
  },
  thumb: {
    height: 16,
    width: 16,
    border: "2px solid currentColor",
    marginTop: -4,
    marginLeft: -8,
    "&:focus, &:hover, &$active": {
      boxShadow: "inherit",
    },
  },
  active: {},
  valueLabel: {
    left: "calc(-50% + 4px)",
  },
  track: {
    height: 8,
  },
  rail: {
    height: 8,
  },
})(Slider);

class PlayerControls extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      expandArt: true,
    };
    this.slider = React.createRef();
  }

  render() {
    const playing = !Boolean(this.props.player && this.props.player.paused);

    return (
      <Box style={styles.root}>
        <Box style={styles.zone.left}>
          <VolumeMenu
            color="primary"
            onChangeCommitted={this.props.callbacks.volume}
          />
        </Box>
        <Box style={styles.zone.center}>
          <IconButton
            style={styles.button}
            color="primary"
            onClick={this.props.callbacks.previous}
          >
            <SkipPreviousIcon />
          </IconButton>
          {!playing && (
            <IconButton
              style={styles.button}
              color="primary"
              onClick={this.props.callbacks.play}
            >
              <PlayArrowIcon style={styles.button} />
            </IconButton>
          )}
          {playing && (
            <IconButton
              style={styles.button}
              color="primary"
              onClick={this.props.callbacks.pause}
            >
              <PauseIcon style={styles.button} />
            </IconButton>
          )}
          <IconButton
            style={styles.button}
            color="primary"
            onClick={this.props.callbacks.next}
          >
            <SkipNextIcon />
          </IconButton>
        </Box>
        <Box style={styles.zone.right}>
          <IconButton
            style={styles.button}
            color="primary"
            onClick={this.props.callbacks.expandArt}
          >
            {this.props.expandArt ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
          </IconButton>
        </Box>
        <StyleSlider
          ref={this.slider}
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

PlayerControls.propTypes = {
  track: PropTypes.object,
  callbacks: PropTypes.object,
  player: PropTypes.object,
};

const mapStateToProps = (state) => {
  return {
    expandArt: state.shell.expandArt,
    queue: state.queue.primary,
  };
};

export default connect(mapStateToProps)(PlayerControls);
