import React from "react";
import PropTypes from "prop-types";

import Box from "@material-ui/core/Box";
import Card from "@material-ui/core/Card";
import { getArtists, getAlbums, getTracks } from "../client/api";

const styles = {
  root: {
    display: "flex",
    flexDirection: "column",
  },
  art: {
    width: "100%",
    paddingBottom: "100%",
    flexGrow: "1",
  },
  name: {
    maxHeight: "32px",
    padding: "8px",
    textAlign: "center",
  },
};

class AlbumCard extends React.Component {
  render() {
    const art_style = {
      backgroundImage: `url(${this.props.album.artwork_url})`,
      backgroundSize: "100%",
    };

    return (
      <Card style={styles.root} raised={true}>
        <Box style={{ ...styles.art, ...art_style }} />
        <Box style={styles.name}>
          {this.props.album.name} ({this.props.album.year})
        </Box>
      </Card>
    );
  }
}

AlbumCard.propTypes = {
  album: PropTypes.object,
};

export default AlbumCard;
