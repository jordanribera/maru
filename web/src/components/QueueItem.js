import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import Box from "@material-ui/core/Box";
import Paper from "@material-ui/core/Paper";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import Typography from "@material-ui/core/Typography";

import PlayArrowIcon from "@material-ui/icons/PlayArrow";

import { activeTheme } from "../client/theme";
import { formatTime } from "../client/util";

class QueueItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hover: false };
  }

  rowStatus() {
    if (this.props.selected) return "selected";
    if (this.state.hover) return "hover";
    return "normal";
  }

  handleSelect(event) {
    const multi = window.event.ctrlKey || window.event.shiftKey;
    this.props.onSelect(this.props.queuePosition, multi);
  }

  render() {
    const styles = {
      root: {},
      art: {
        height: "64px",
        width: "64px",
        padding: "0px",
        margin: "-16px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexShrink: 1,
        backgroundColor: "green",
      },
      activeArrow: {
        height: "42px",
        width: "42px",
        opacity: 0.75,
      },
      title: {
        display: "block",
        position: "absolute",
        lineHeight: "64px",
        top: 0,
        bottom: 0,
        left: "12px",
        right: 0,
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis",
      },
      column: {
        art: { width: "64px" },
        title: { position: "relative" },
        time: { width: "64px" },
      },
      row: {
        normal: {},
        hover: { backgroundColor: activeTheme().palette.action.hover },
        selected: { backgroundColor: activeTheme().palette.action.selected },
      },
    };

    let artStyle = {
      backgroundImage: `url(${this.props.song.artwork_url})`,
      backgroundSize: "100%",
    };

    return (
      <TableRow
        key={this.props.queuePosition}
        style={styles.row[this.rowStatus()]}
        onMouseEnter={() => this.setState({ hover: true })}
        onMouseLeave={() => this.setState({ hover: false })}
        onClick={() => this.handleSelect()}
      >
        <TableCell style={styles.column.art}>
          <Box style={{ ...styles.art, ...artStyle }}>
            {this.props.queuePosition == 0 && (
              <PlayArrowIcon
                htmlColor={activeTheme().palette.text.main}
                style={styles.activeArrow}
              />
            )}
          </Box>
        </TableCell>
        <TableCell style={styles.column.title} align="left">
          <Typography style={styles.title}>{this.props.song.title}</Typography>
        </TableCell>
        <TableCell align="right" style={styles.column.time}>
          <Typography variant="caption">
            {formatTime(this.props.song.length)}
          </Typography>
        </TableCell>
      </TableRow>
    );
  }
}

QueueItem.propTypes = {
  song: PropTypes.object,
  queuePosition: PropTypes.number,
  selected: PropTypes.bool,
  onSelect: PropTypes.func,
};

export default QueueItem;
