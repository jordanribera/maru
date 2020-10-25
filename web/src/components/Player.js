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
  componentDidMount() {
    let tracks = getTracks({ album: "Warp Riders" }, (result) => {
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
    };
  }

  render() {
    const activeTrack = this.props.queue[0];
    let activeUrl = "";
    if (activeTrack) {
      activeUrl = `http://localhost:8080${activeTrack.url}`;
    }
    console.log(activeTrack);

    return (
      <Box style={styles.root}>
        <audio
          id="ThePlayer"
          ref="audio_tag"
          src={activeUrl}
          onEnded={this.controlCallbacks().onEnded}
          autoPlay
        />
        <TrackControls
          track={activeTrack}
          callbacks={this.controlCallbacks()}
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
