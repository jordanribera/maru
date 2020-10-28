import React from "react";
import PropTypes from "prop-types";

import Box from "@material-ui/core/Box";
import Card from "@material-ui/core/Card";
import { getArtists, getAlbums, getTracks } from "../client/api";

const styles = {
  root: {
    display: "flex",
    flexDirection: "column",

    height: "256px",
  },
  art: {
    flexGrow: "1",
  },
  name: {
    maxHeight: "32px",
    padding: "8px",
    textAlign: "center",
  },
};

class ArtistCard extends React.Component {
  render() {
    return (
      <Card style={styles.root} raised={true}>
        <Box style={styles.art} />
        <Box style={styles.name}>{this.props.artist.name}</Box>
      </Card>
    );
  }
}

ArtistCard.propTypes = {
  artist: PropTypes.object,
};

export default ArtistCard;
