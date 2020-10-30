import React from "react";
import PropTypes from "prop-types";

import Box from "@material-ui/core/Box";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";

import SongsContextMenu from "./SongsContextMenu";

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
    position: "relative",
  },
  tab: {
    padding: "8px",
  },
  info: {
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
  control: {
    width: "48px",
    height: "48px",
    position: "absolute",
    top: 0,
    right: 0,
    paddingTop: "16px",
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
        <Box style={{ ...styles.art, ...art_style }}>
          <Box style={styles.control}>
            <SongsContextMenu songs={this.props.album.tracks} />
          </Box>
        </Box>
        <Box style={styles.tab}>
          <Box style={styles.info}>
            <Typography style={styles.info}>{this.props.album.name}</Typography>
            <Typography variant="caption" color="textSecondary">
              {this.props.album.artist} ({this.props.album.year})
            </Typography>
          </Box>
        </Box>
      </Card>
    );
  }
}

AlbumCard.propTypes = {
  album: PropTypes.object,
};

export default AlbumCard;
