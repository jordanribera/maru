import React from "react";
import { connect } from "react-redux";

import Box from "@material-ui/core/Box";
import Paper from "@material-ui/core/Paper";
import Queue from "./Queue";
import TrackControls from "./TrackControls";
import { apiServer, getTracks } from "../client/api";
import { addItems, advanceQueue, reverseQueue } from "../actions/queue";

import { activeTheme } from "../client/theme";

const styles = {
  root: {
    height: "100vh",
    width: "512px",
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

  componentDidMount() {
    let tracks = getTracks({ artist: "radiohead" }, (result) => {
      // this.props.dispatch(addItems(result));
    });
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
      onEnded: () => {
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
    }

    return (
      <Paper square style={styles.root}>
        <audio
          id="ThePlayer"
          src={activeUrl}
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
        <Queue />
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
