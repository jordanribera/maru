import React from "react";
import PropTypes from "prop-types";
import Measure from "react-measure";

import Box from "@material-ui/core/Box";
import CircularProgress from "@material-ui/core/CircularProgress";
import Grid from "@material-ui/core/Grid";
import AlbumCard from "./AlbumCard";

import { getAlbums } from "../client/api";

const styles = {
  root: {
    padding: "16px",
    height: "100vh",
    overflow: "auto",
  },
  loadingWrapper: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
};

class AlbumsTab extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      count: 0,
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
    if (this.props.api) this.fetchMore(48);
  }

  fetchMore(limit = 24) {
    if (!this.state.loading) {
      let tempState = this.state;
      tempState.loading = true;
      this.setState(tempState);

      this.props.api
        .getAlbums([
          //...this.state.filters,
          ...[`offset:${this.state.results.length}`, `limit:${limit}`],
        ])
        .then((response) => {
          let tempState = this.state;
          tempState.count = response.count || 0;
          tempState.results = [...tempState.results, ...response.results];
          tempState.loading = false;
          this.setState(tempState);
        });
    }
  }

  setDimensions(dimensions) {
    let tempState = this.state;
    tempState.dimensions = dimensions;
    this.setState(tempState);
  }

  handleScroll(e) {
    const t = e.currentTarget;
    if (t.scrollHeight - t.scrollTop < t.scrollHeight / 2) {
      if (this.state.results.length < this.state.count) {
        console.log(`${this.state.results.length} / ${this.state.count} load`);
        this.fetchMore();
      }
    }
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
          <Box
            ref={measureRef}
            style={styles.root}
            onScroll={(e) => this.handleScroll(e)}
          >
            <Grid container spacing={2} justify="flex-start">
              {this.state.results.map((item, index) => (
                <Grid item xs={gridFactor} key={index}>
                  <AlbumCard album={item} />
                </Grid>
              ))}
              {this.state.loading && (
                <Grid item xs={12} key="loading">
                  <Box style={styles.loadingWrapper}>
                    <CircularProgress />
                  </Box>
                </Grid>
              )}
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
