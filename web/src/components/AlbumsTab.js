import React from "react";

import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import AlbumCard from "./AlbumCard";

import { getAlbums } from "../client/api";

const styles = {
  root: {
    padding: "16px",
    height: "100vh",
    overflow: "auto",
  },
};

class AlbumsTab extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      results: [],
    };
  }

  componentDidMount() {
    getAlbums({}, (result) => {
      let tempState = this.state;
      tempState.results = result;
      this.setState(tempState);
    });
  }

  render() {
    return (
      <Box style={styles.root}>
        <Grid container spacing={2} justify="flex-start">
          {this.state.results.map((item, index) => (
            <Grid item xs={6} sm={6} md={6} lg={4} xl={3} key={index}>
              <AlbumCard album={item} />
            </Grid>
          ))}
        </Grid>
      </Box>
    );
  }
}

export default AlbumsTab;
