import React from "react";
import { connect } from "react-redux";

import Box from "@material-ui/core/Box";
import TrackList from "./TrackList";
import TrackControls from "./TrackControls";
import { getTracks } from "../client/api";
import { addItems, advanceQueue, reverseQueue } from "../actions/queue";

const styles = {
  root: {
    backgroundColor: "red",
    height: "100vh",
    width: "512px",
    display: "flex",
    flexDirection: "column",
  },
  queue: {
    backgroundColor: "silver",
    flexGrow: "1",
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
    let tracks = getTracks({}, (result) => {
      this.props.dispatch(addItems(result));
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
      activeUrl = `http://localhost:8080${activeTrack.url}`;
    }

    return (
      <Box style={styles.root}>
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
        <Box style={styles.queue}>
          <TrackList tracks={this.props.queue.slice(1)} showColumns={false} />
        </Box>
      </Box>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    queue: state.queue.primary,
  };
};

export default connect(mapStateToProps)(Player);
