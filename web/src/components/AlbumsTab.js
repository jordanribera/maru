import React from "react";
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
    getAlbums([], (result) => {
      let tempState = this.state;
      tempState.results = result;
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

export default AlbumsTab;
