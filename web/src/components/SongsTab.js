import React from "react";

import Box from "@material-ui/core/Box";
import Checkbox from "@material-ui/core/Checkbox";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import Typography from "@material-ui/core/Typography";

import AvTimerIcon from "@material-ui/icons/AvTimer";

import SongRow from "./SongRow";
import LibraryContextMenu from "./LibraryContextMenu";

import { getTracks } from "../client/api";

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
  title: {
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
  multiCheck: {
    margin: "-12px",
  },
  columns: {
    art: { width: "48px" },
  },
  headerCell: {
    whiteSpace: "nowrap",
    paddingRight: "12px",
  },
  headerText: {
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
    /* TODO: need to use filters, update results on filter change */
    /* TODO: need to load more pages when we scroll down */
    getTracks({}, (result) => {
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

  handleSelect(hash, multi = false) {
    let tempState = this.state;
    let baseline = [];
    if (multi) baseline = tempState.selected.filter((v) => v !== hash);

    if (tempState.selected.includes(hash)) {
      tempState.selected = baseline;
    } else {
      tempState.selected = [...baseline, hash];
    }
    this.setState(tempState);
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
                <TableCell style={styles.columns.art}>
                  <Checkbox
                    color="primary"
                    style={styles.multiCheck}
                    onChange={(e) => this.handleMassSelect(e)}
                  />
                </TableCell>
                <TableCell padding="none">
                  <Typography style={styles.title}>
                    {this.selectionTitle()}
                  </Typography>
                </TableCell>
                <TableCell padding="none">
                  <LibraryContextMenu songs={this.selectedSongs()} />
                </TableCell>
                <TableCell padding="none" style={styles.headerCell}>
                  <Typography style={styles.headerText}>Artist</Typography>
                </TableCell>
                <TableCell padding="none" style={styles.headerCell}>
                  <Typography style={styles.headerText}>Album</Typography>
                </TableCell>
                <TableCell padding="none" style={styles.headerCell}>
                  <Typography style={styles.headerText}>Year</Typography>
                </TableCell>
                <TableCell style={styles.headerCell}>
                  <AvTimerIcon />
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.state.results.map((track, index) => {
                return (
                  <SongRow
                    key={index}
                    track={track}
                    selected={this.state.selected.includes(track.sha1hash)}
                    onSelect={(hash, multi) => {
                      this.handleSelect(hash, multi);
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
