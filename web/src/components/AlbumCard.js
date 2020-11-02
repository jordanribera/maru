import React from "react";
import PropTypes from "prop-types";

import Box from "@material-ui/core/Box";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";

import Art from "./Art";
import LibraryContextMenu from "./LibraryContextMenu";

const styles = {
  root: {
    height: "100%",
    width: "100%",
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
    display: "flex",
    height: "64px",
  },
  info: {
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    flexGrow: 1,
  },
  control: {
    width: "32px",
    height: "32px",
  },
};

class AlbumCard extends React.Component {
  render() {
    return (
      <Card style={styles.root}>
        <Art fit="width" url={this.props.album.artwork_url}></Art>
        <Box style={styles.tab}>
          <Box style={styles.info}>
            <Typography style={styles.info}>{this.props.album.name}</Typography>
            <Typography variant="caption" color="textSecondary">
              {this.props.album.artist} ({this.props.album.year})
            </Typography>
          </Box>
          <Box style={styles.control}>
            <LibraryContextMenu songs={this.props.album.tracks} />
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
