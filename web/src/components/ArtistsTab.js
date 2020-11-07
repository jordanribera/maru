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
    /* TODO: need to use filters, update results on filter change */
    /* TODO: need to load more pages when we scroll down */
    if (this.props.api) this.updateResults();
  }

  updateResults() {
    this.props.api.getArtists(this.state.filters).then((response) => {
      let tempState = this.state;
      tempState.results = response.results || [];
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
