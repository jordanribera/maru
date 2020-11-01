import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import Box from "@material-ui/core/Box";
import Checkbox from "@material-ui/core/Checkbox";
import Divider from "@material-ui/core/Divider";
import Table from "@material-ui/core/Table";
import TableContainer from "@material-ui/core/TableContainer";
import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import Typography from "@material-ui/core/Typography";

import QueueContextMenu from "./QueueContextMenu";
import QueueItem from "./QueueItem";

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
    if (multi) baseline = tempState.selected.filter((v) => v !== index);

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
        backgroundColor: activeTheme().palette.background.default,
      },
      emptyState: {
        padding: "32px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      },
      container: {
        flexGrow: "1",
      },
      end: {
        padding: "4px",
      },
      footer: {
        display: "flex",
        flexDirection: "row",
        backgroundColor: activeTheme().palette.background.paper,
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

    let menuSongs = this.selectedSongs();
    let menuKeys = this.state.selected;
    if (menuSongs.length < 1) {
      menuSongs = this.targetQueue();
      menuKeys = [...Array(this.targetQueue().length).keys()];
    }

    return (
      <Box style={styles.root}>
        <Divider />
        {this.targetQueue().length === 0 && (
          <Typography color="textSecondary" style={styles.emptyState}>
            the queue is empty
          </Typography>
        )}
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
              {this.props.showEnd && (
                <TableRow>
                  <TableCell padding="none" colSpan={3} style={styles.end}>
                    <Divider />
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <Divider />
        <Box style={styles.footer}>
          <Divider />
          <Box style={styles.foot.select}>
            <Checkbox
              color="primary"
              onChange={(e) => this.handleMassSelect(e)}
            />
          </Box>
          <Box style={styles.foot.note}>
            <Typography variant="caption" color="textSecondary">
              {this.selectionTitle()}
            </Typography>
          </Box>
          <Box style={styles.foot.control}>
            <QueueContextMenu songs={menuSongs} keys={menuKeys} />
          </Box>
          <Box style={styles.foot.time}>
            <Typography variant="caption" color="textSecondary">
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
