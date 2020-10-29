import React from "react";

import Box from "@material-ui/core/Box";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Table from "@material-ui/core/Table";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import ArtistCard from "./ArtistCard";
import { getArtists, getAlbums, getTracks } from "../client/api";

const styles = {
  root: {
    padding: "16px",
    height: "100vh",
    overflow: "auto",
  },
  container: {
    maxHeight: "100%",
  },
  tableHead: {
    fontWeight: "bold",
  },
};

const formatTime = (time) => {
  /* TODO: put this method out of its misery */
  var date = new Date(0);
  date.setSeconds(time);
  return date.toISOString().substr(11, 8);
};

class SongsTab extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      results: [],
    };
  }

  componentDidMount() {
    let artists = getTracks({}, (result) => {
      let tempState = this.state;
      tempState.results = result;
      this.setState(tempState);
    });
  }

  songRow(track) {
    return (
      <TableRow key={track.title}>
        <TableCell>#</TableCell>
        <TableCell>{track.title}</TableCell>
        <TableCell>{track.artist}</TableCell>
        <TableCell>{track.album}</TableCell>
        <TableCell>{track.year}</TableCell>
        <TableCell>{formatTime(track.length)}</TableCell>
      </TableRow>
    );
  }

  render() {
    return (
      <Box style={styles.root}>
        <TableContainer style={styles.container} component={Paper}>
          <Table stickyHeader>
            <TableHead style={styles.tableHead}>
              <TableRow>
                <TableCell>#</TableCell>
                <TableCell>Title</TableCell>
                <TableCell>Artist</TableCell>
                <TableCell>Album</TableCell>
                <TableCell>Year</TableCell>
                <TableCell>Time</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.state.results.map((item) => this.songRow(item))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    );
  }
}

export default SongsTab;
