import React from "react";

import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import AlbumCard from "./AlbumCard";
import { getArtists, getAlbums, getTracks } from "../client/api";

const styles = {
  root: {
    padding: "16px",
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
    let artists = getAlbums({}, (result) => {
      console.log(result);
      let tempState = this.state;
      tempState.results = result;
      this.setState(tempState);
    });
  }

  render() {
    return (
      <Box style={styles.root}>
        <Grid container spacing={2} justify="flex-start">
          {this.state.results.map((item) => (
            <Grid item xs={2}>
              <AlbumCard album={item} />
            </Grid>
          ))}
        </Grid>
      </Box>
    );
  }
}

export default AlbumsTab;
