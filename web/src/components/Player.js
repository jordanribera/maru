import React from "react";
import { connect } from "react-redux";

import Paper from "@material-ui/core/Paper";
import Queue from "./Queue";
import TrackControls from "./TrackControls";
import { advanceQueue, reverseQueue } from "../actions/queue";

import { activeTheme } from "../client/theme";

const styles = {
  root: {
    height: "100vh",
    minWidth: "512px",
    display: "flex",
    flexDirection: "column",
    borderRight: `1px solid ${activeTheme().palette.divider}`,
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
    };
  }

  player() {
    return document.querySelector("#ThePlayer");
  }

  controlCallbacks() {
    return {
      play: () => {
        this.player().play();
      },
      pause: () => {
        this.player().pause();
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
          tempState.currentTime = this.player().currentTime;
          this.setState(tempState);
        }
      },
      durationChange: () => {
        let tempState = this.state;
        tempState.duration = this.player().duration;
        this.setState(tempState);
      },
      seeking: (event, value) => {
        let tempState = this.state;
        tempState.seeking = true;
        this.setState(tempState);
      },
      seek: (event, value) => {
        console.log(`seeking to ${value}`);
        this.player().currentTime = value;
        let tempState = this.state;
        tempState.seeking = false;
        this.setState(tempState);
      },
    };
  }

  render() {
    const activeTrack = this.props.queue[0];
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
          src={activeUrl}
          onPlay={this.controlCallbacks().onPlay}
          onEnded={this.controlCallbacks().onEnded}
          onTimeUpdate={this.controlCallbacks().timeUpdate}
          onDurationChange={this.controlCallbacks().durationChange}
          autoPlay
        />
        <TrackControls
          track={activeTrack}
          callbacks={this.controlCallbacks()}
          currentTime={this.state.currentTime}
          duration={this.state.duration}
        />
        <Queue showEnd={true} />
      </Paper>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    queue: state.queue.primary,
    darkMode: state.shell.darkMode,
  };
};

export default connect(mapStateToProps)(Player);
