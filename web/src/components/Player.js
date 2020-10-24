import React from "react";
import { connect } from "react-redux";

import Box from "@material-ui/core/Box";
import TrackList from "./TrackList";
import { getTracks } from "../client/api";
import { addItems } from "../actions/queue";

const styles = {
  root: {
    backgroundColor: "red",
    height: "100vh",
    width: "512px",
    display: "flex",
    flexDirection: "column",
  },
  nowPlaying: {
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
    title: {
      fontWeight: "bold",
      flexGrow: "1",
    },
  },
  queue: {
    backgroundColor: "silver",
    flexGrow: "1",
  },
}

const dummyQueue = [
  { art: "red", title: "First Song", },
  { art: "green", title: "Second Song", },
  { art: "blue", title: "Third Song", },
  { art: "yellow", title: "Fourth Song", },
  { art: "orange", title: "Fifth Song", },
  { art: "purple", title: "Sixth Song", },
  { art: "salmon", title: "Seventh Song", },
];

class Player extends React.Component {
  componentDidMount() {
    let tracks = getTracks({album:"Blackwater Park"}, (result) => {
      this.props.dispatch(addItems(result));
      console.log(this.props.queue);
    });
  }

  render() {
    return (
      <Box style={styles.root}>
        <Box style={styles.nowPlaying.root}>
          <Box style={styles.nowPlaying.art}>ART</Box>
          <Box style={styles.nowPlaying.title}>Now Playing Song</Box>
        </Box>
        <Box style={styles.queue}>
          <TrackList tracks={this.props.queue} showColumns={false}/>
        </Box>
      </Box>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    queue: state.queue.queue,
  };
};

export default connect(mapStateToProps)(Player);
