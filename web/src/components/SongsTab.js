import React from "react";

import Box from "@material-ui/core/Box";
import Checkbox from "@material-ui/core/Checkbox";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import Table from "@material-ui/core/Table";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import ArtistCard from "./ArtistCard";
import SongRow from "./SongRow";
import SongsContextMenu from "./SongsContextMenu";

import MoreVertIcon from "@material-ui/icons/MoreVert";

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

class SongsTab extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      results: [],
      selected: [],
    };
  }

  componentDidMount() {
    let artists = getTracks({}, (result) => {
      let tempState = this.state;
      tempState.results = result;
      this.setState(tempState);
    });
  }

  handleMassSelect(event) {
    let tempState = this.state;
    if (event.target.checked) {
      const resultHashes = this.state.results.map((r) => r.sha1hash);
      tempState.selected = resultHashes;
    } else {
      tempState.selected = [];
    }
    this.setState(tempState);
    console.log(this.state);
  }

  handleSelectionChange(hash, selected) {
    let tempState = this.state;
    tempState.selected = tempState.selected.filter((value) => value != hash);
    if (selected) {
      tempState.selected = [...tempState.selected, hash];
    }
    this.setState(tempState);

    console.log(this.selectedSongs());
  }

  selectedSongs() {
    const selectedSongs = this.state.results.filter((r) => {
      if (this.state.selected.includes(r.sha1hash)) return r;
    });
    return selectedSongs;
  }

  selectionTitle() {
    if (this.state.selected.length > 0) {
      return `${this.state.selected.length} selected`;
    }
  }

  render() {
    return (
      <Box style={styles.root}>
        <TableContainer style={styles.container} component={Paper}>
          <Table stickyHeader>
            <TableHead style={styles.tableHead}>
              <TableRow>
                <TableCell>
                  <Checkbox
                    color="primary"
                    onChange={(e) => {
                      this.handleMassSelect(e);
                    }}
                  />
                </TableCell>
                <TableCell>{this.selectionTitle()}</TableCell>
                <TableCell>
                  <SongsContextMenu songs={this.selectedSongs()} />
                </TableCell>
                <TableCell>Artist</TableCell>
                <TableCell>Album</TableCell>
                <TableCell>Year</TableCell>
                <TableCell>Time</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.state.results.map((track, index) => {
                return (
                  <SongRow
                    key={index}
                    track={track}
                    selected={this.state.selected.includes(track.sha1hash)}
                    onSelectionChange={(hash, selected) => {
                      this.handleSelectionChange(hash, selected);
                    }}
                  />
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    );
  }
}

export default SongsTab;
