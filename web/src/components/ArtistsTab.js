import React from "react";

import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import ArtistCard from "./ArtistCard";
import { getArtists } from "../client/api";

const styles = {
  root: {
    padding: "16px",
  },
};

class ArtistsTab extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      results: [],
    };
  }

  componentDidMount() {
    getArtists({}, (result) => {
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
            <Grid item xs={2} key={index}>
              <ArtistCard artist={item} />
            </Grid>
          ))}
        </Grid>
      </Box>
    );
  }
}

export default ArtistsTab;
