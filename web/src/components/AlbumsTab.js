import React from "react";
import PropTypes from "prop-types";
import Measure from "react-measure";

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
      dimensions: {
        height: -1,
        width: -1,
      },
    };
  }

  componentDidMount() {
    /* TODO: need to use filters, update results on filter change */
    /* TODO: need to load more pages when we scroll down */
    if (this.props.api) this.updateResults();
  }

  updateResults() {
    this.props.api.getAlbums(this.state.filters).then((response) => {
      let tempState = this.state;
      tempState.results = response.results || [];
      this.setState(tempState);
    });
  }

  setDimensions(dimensions) {
    let tempState = this.state;
    tempState.dimensions = dimensions;
    this.setState(tempState);
  }

  render() {
    let gridFactor = 6;
    if (this.state.dimensions.width > 800) gridFactor = 4;
    if (this.state.dimensions.width > 1280) gridFactor = 3;
    if (this.state.dimensions.width > 1440) gridFactor = 2;
    if (this.state.dimensions.width > 2560) gridFactor = 1;

    return (
      <Measure bounds onResize={(rect) => this.setDimensions(rect.bounds)}>
        {({ measureRef }) => (
          <Box ref={measureRef} style={styles.root}>
            <Grid container spacing={2} justify="flex-start">
              {this.state.results.map((item, index) => (
                <Grid item xs={gridFactor} key={index}>
                  <AlbumCard album={item} />
                </Grid>
              ))}
            </Grid>
          </Box>
        )}
      </Measure>
    );
  }
}

AlbumsTab.propTypes = {
  api: PropTypes.object,
};

export default AlbumsTab;
