import React from "react";
import PropTypes from "prop-types";

import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import Typography from "@material-ui/core/Typography";

import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import Art from "./Art";

import { activeTheme } from "../client/theme";
import { formatTime } from "../client/util";

const ROW_HEIGHT = 64;

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
      activeArrow: {
        height: "42px",
        width: "42px",
        opacity: 0.75,
      },
      title: {
        display: "flex",
        alignItems: "center",
        position: "absolute",
        top: 0,
        bottom: 0,
        left: "12px",
        right: 0,
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis",
      },
      column: {
        art: { width: ROW_HEIGHT },
        title: { position: "relative" },
        time: { width: "64px" },
      },
      row: {
        normal: {},
        hover: { backgroundColor: activeTheme().palette.action.hover },
        selected: { backgroundColor: activeTheme().palette.action.selected },
      },
    };

    const activeStyle =
      this.props.queuePosition === 0 ? { fontWeight: "bold" } : {};

    return (
      <TableRow
        key={this.props.queuePosition}
        style={styles.row[this.rowStatus()]}
        onMouseEnter={() => this.setState({ hover: true })}
        onMouseLeave={() => this.setState({ hover: false })}
        onClick={() => this.handleSelect()}
      >
        <TableCell padding="none" style={styles.column.art}>
          <Art size={ROW_HEIGHT} url={this.props.song.artwork}>
            {this.props.queuePosition === 0 && (
              <PlayArrowIcon
                htmlColor={activeTheme().palette.text.main}
                style={styles.activeArrow}
              />
            )}
          </Art>
        </TableCell>
        <TableCell style={styles.column.title} align="left">
          <Typography
            style={{ ...styles.title, ...activeStyle }}
            title={this.props.song.title}
          >
            {this.props.song.title}
          </Typography>
        </TableCell>
        <TableCell align="right" style={styles.column.time}>
          <Typography variant="caption" style={activeStyle}>
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
