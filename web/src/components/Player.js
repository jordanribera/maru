import React from "react";
import { connect } from "react-redux";

import Box from "@material-ui/core/Box";
import Collapse from "@material-ui/core/Collapse";
import Paper from "@material-ui/core/Paper";
import Queue from "./Queue";
import Art from "./Art";
import PlayerControls from "./PlayerControls";

import { advanceQueue, reverseQueue } from "../actions/queue";
import { setExpandArt } from "../actions/shell";
import { activeTheme } from "../client/theme";

const styles = {
  root: {
    height: "100vh",
    minWidth: "512px",
    display: "flex",
    flexDirection: "column",
    borderRight: `1px solid ${activeTheme().palette.divider}`,
  },
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
  queue: {
    backgroundColor: "silver",
  },
};

class Player extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentTime: 0,
      duration: 0,
      seeking: false,
      expandArt: true,
    };
    this.player = React.createRef();
  }

  controlCallbacks() {
    return {
      play: () => {
        this.player.current.play();
      },
      pause: () => {
        this.player.current.pause();
      },
      next: () => {
        this.props.dispatch(advanceQueue());
      },
      previous: () => {
        this.props.dispatch(reverseQueue());
      },
      onPlay: () => {
        console.log("played");
      },
      onEnded: () => {
        console.log("ended");
        this.props.dispatch(advanceQueue());
      },
      timeUpdate: () => {
        if (!this.state.seeking) {
          let tempState = this.state;
          tempState.currentTime = this.player.current.currentTime;
          this.setState(tempState);
        }
      },
      durationChange: () => {
        let tempState = this.state;
        tempState.duration = this.player.current.duration;
        this.setState(tempState);
      },
      seeking: (event, value) => {
        let tempState = this.state;
        tempState.seeking = true;
        this.setState(tempState);
      },
      seek: (event, value) => {
        console.log(`seeking to ${value}`);
        this.player.current.currentTime = value;
        let tempState = this.state;
        tempState.seeking = false;
        this.setState(tempState);
      },
      volume: (event, value) => {
        this.player.current.volume = value / 100;
      },
      expandArt: () => {
        this.props.dispatch(setExpandArt(!this.props.expandArt));
      },
    };
  }

  render() {
    const activeTrack = this.props.queue[0] || {};
    let activeUrl = "";
    if (activeTrack) {
      activeUrl = activeTrack.url;
      document.title = `${activeTrack.title} - ${activeTrack.artist}`;
    } else {
      document.title = "Maru";
    }

    return (
      <Paper square style={styles.root}>
        <audio
          id="ThePlayer"
          ref={this.player}
          src={activeUrl}
          onPlay={this.controlCallbacks().onPlay}
          onEnded={this.controlCallbacks().onEnded}
          onTimeUpdate={this.controlCallbacks().timeUpdate}
          onDurationChange={this.controlCallbacks().durationChange}
          volume={this.props.volume / 100}
          autoPlay
        />
        <Box
          style={{ flexGrow: 1 }}
          onClick={() => this.controlCallbacks().expandArt()}
        >
          <Collapse in={this.props.expandArt} collapsedHeight={0}>
            <Art fit="width" url={activeTrack.artwork} />
          </Collapse>
        </Box>
        <PlayerControls
          track={activeTrack}
          player={this.player.current}
          callbacks={this.controlCallbacks()}
          currentTime={this.state.currentTime}
          duration={this.state.duration}
        />
        <Queue showEnd={false} />
      </Paper>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    queue: state.queue.primary,
    darkMode: state.shell.darkMode,
    expandArt: state.shell.expandArt,
    volume: state.shell.volume,
  };
};

export default connect(mapStateToProps)(Player);
