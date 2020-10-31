import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import Box from "@material-ui/core/Box";
import Card from "@material-ui/core/Card";
import Checkbox from "@material-ui/core/Checkbox";
import Divider from "@material-ui/core/Divider";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import Typography from "@material-ui/core/Typography";

import ScheduleIcon from "@material-ui/icons/Schedule";

import QueueContextMenu from "./QueueContextMenu";
import QueueItem from "./QueueItem";

import { getArtists, getAlbums, getTracks } from "../client/api";
import { activeTheme } from "../client/theme";
import { formatTime } from "../client/util";

class Queue extends React.Component {
  constructor(props) {
    super(props);
    this.target = props.target || "primary";
    this.state = { selected: [] };
  }

  targetQueue() {
    return this.props.queue[this.target];
  }

  handleSelect(index, multi = false) {
    console.log(`selecting ${index}`);
    let tempState = this.state;
    let baseline = [];
    if (multi) baseline = tempState.selected.filter((v) => v != index);

    if (tempState.selected.includes(index)) {
      tempState.selected = baseline;
    } else {
      tempState.selected = [...baseline, index];
    }
    this.setState(tempState);
  }

  handleMassSelect(event) {
    let tempState = this.state;
    if (event.target.checked) {
      tempState.selected = [...Array(this.targetQueue().length).keys()];
      console.log("checked");
    } else {
      tempState.selected = [];
      console.log("unchecked");
    }
    this.setState(tempState);
    console.log(this.state);
  }

  selectedSongs() {
    const selectedSongs = this.state.selected.map((v) => this.targetQueue()[v]);
    return selectedSongs;
  }

  selectionTitle() {
    if (this.state.selected.length > 0) {
      return `${this.state.selected.length} selected`;
    }
    return `${this.targetQueue().length} songs`;
  }

  selectionTime() {
    const totalTime = (songs) =>
      songs.reduce((total, song) => {
        return total + parseInt((song && song.length) || 0);
      }, 0);
    if (this.state.selected.length > 0) {
      return totalTime(this.selectedSongs());
    }
    return totalTime(this.targetQueue());
  }

  render() {
    const styles = {
      root: {
        overflow: "auto",
        height: "100%",
        display: "flex",
        flexDirection: "column",
      },
      container: {
        flexGrow: "1",
        backgroundColor: activeTheme().palette.background.default,
      },
      footer: {
        display: "flex",
        flexDirection: "row",
      },
      foot: {
        select: {
          width: "64px",
          display: "flex",
          justifyContent: "center",
        },
        note: {
          flexGrow: 1,
          display: "flex",
          alignItems: "center",
          paddingLeft: "16px",
        },
        control: {
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          paddingTop: "16px",
          paddingBottom: "16px",
        },
        time: {
          marginRight: "24px",
          width: "64px",
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
        },
      },
      tableBody: {
        backgroundColor: activeTheme().palette.background.paper,
      },
    };

    return (
      <Box style={styles.root}>
        <Divider />
        <TableContainer style={styles.container}>
          <Table>
            <TableBody style={styles.tableBody}>
              {this.targetQueue().map((song, index) => {
                return (
                  <QueueItem
                    song={song}
                    key={index}
                    queuePosition={index}
                    selected={this.state.selected.includes(index)}
                    onSelect={(index, multi) => {
                      this.handleSelect(index, multi);
                    }}
                  />
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
        <Box style={styles.footer}>
          <Divider />
          <Box style={styles.foot.select}>
            <Checkbox
              color="primary"
              onChange={(e) => this.handleMassSelect(e)}
            />
          </Box>
          <Box style={styles.foot.note}>
            <Typography variant="caption">{this.selectionTitle()}</Typography>
          </Box>
          <Box style={styles.foot.control}>
            <QueueContextMenu
              songs={this.selectedSongs()}
              keys={this.state.selected}
            />
          </Box>
          <Box style={styles.foot.time}>
            <Typography variant="caption">
              {formatTime(this.selectionTime())}
            </Typography>
          </Box>
        </Box>
      </Box>
    );
  }
}

Queue.propTypes = {
  target: PropTypes.string,
};

const mapStateToProps = (state) => {
  return {
    queue: state.queue,
    darkMode: state.shell.darkMode,
  };
};

export default connect(mapStateToProps)(Queue);
