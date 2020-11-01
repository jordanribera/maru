import React from "react";
import PropTypes from "prop-types";

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
import FilterMenu from "./FilterMenu";

import { getTracks } from "../client/api";
import { activeTheme } from "../client/theme";

const styles = {
  root: {
    height: "100vh",
    position: "relative",
  },
  container: {
    height: "100%",
    overflowY: "scroll",
    backgroundColor: activeTheme().palette.background.default,
  },
  tableHead: {},
  title: {
    width: "100%",
    minWidth: "100%",
  },
  columns: {
    art: {
      width: "48px",
      marginLeft: "16px",
    },
  },
  headerCell: {
    whiteSpace: "nowrap",
    paddingRight: "12px",
    fontWeight: "bold",
    backgroundColor: activeTheme().palette.background.paper,
  },
  headerText: {
    fontWeight: "bold",
    display: "inline-block",
  },
};

class SongsTab extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      results: [],
      selected: [],
      filters: [],
    };
  }

  componentDidMount() {
    /* TODO: need to use filters, update results on filter change */
    /* TODO: need to load more pages when we scroll down */
    this.updateResults();
  }

  updateResults() {
    getTracks(this.state.filters, (result) => {
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

  handleFilterSelect(field, key, selected) {
    const filter = `${field}:${key}`;
    let tempState = this.state;
    tempState.filters = tempState.filters.filter((f) => f !== filter);
    if (selected) tempState.filters.push(filter);
    this.setState(tempState);
    this.updateResults();
    console.log(this.state.filters);
  }

  selectedFilterKeys(field) {
    const fieldPrefix = `${field}:`;
    const fieldFilters = this.state.filters.filter((f) =>
      f.startsWith(fieldPrefix)
    );
    return fieldFilters.map((f) => f.substr(fieldPrefix.length));
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

  handleScroll(e) {
    const t = e.currentTarget;
    if (t.scrollHeight - t.scrollTop < 1.25 * t.clientHeight) {
      console.log("less than 2x left, load some.");
    }
  }

  render() {
    const artistFilterOptions = this.props.filterOptions["artist"] || [];
    const albumFilterOptions = this.props.filterOptions["album"] || [];

    const handleFilterSelect = (key, selected) => {
      console.log(`selecting ${key}, ${selected}`);
    };

    return (
      <Box style={styles.root}>
        <TableContainer
          style={styles.container}
          component={Paper}
          square
          onScroll={(e) => this.handleScroll(e)}
        >
          <Table stickyHeader>
            <TableHead>
              <TableRow style={styles.tableHead}>
                <TableCell
                  padding="checkbox"
                  style={{ ...styles.columns.art, ...styles.headerCell }}
                >
                  <Checkbox
                    color="primary"
                    style={styles.multiCheck}
                    onChange={(e) => this.handleMassSelect(e)}
                  />
                </TableCell>
                <TableCell padding="none" style={styles.headerCell}>
                  <Typography style={styles.title}>
                    {this.selectionTitle()}
                  </Typography>
                </TableCell>
                <TableCell padding="none" style={styles.headerCell}>
                  <LibraryContextMenu songs={this.selectedSongs()} />
                </TableCell>
                <TableCell padding="none" style={styles.headerCell}>
                  <Typography style={styles.headerText}>Artist</Typography>
                  <FilterMenu
                    options={artistFilterOptions}
                    selected={this.selectedFilterKeys("artist")}
                    onSelect={(key, selected) =>
                      this.handleFilterSelect("artist", key, selected)
                    }
                  />
                </TableCell>
                <TableCell padding="none" style={styles.headerCell}>
                  <Typography style={styles.headerText}>Album</Typography>
                  <FilterMenu
                    options={albumFilterOptions}
                    selected={this.selectedFilterKeys("album")}
                    onSelect={(key, selected) =>
                      this.handleFilterSelect("album", key, selected)
                    }
                  />
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

SongsTab.propTypes = {
  filterOptions: PropTypes.object, // {field: [{ key: "slug", label: "Slug" }]}
};

export default SongsTab;
