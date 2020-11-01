import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import Box from "@material-ui/core/Box";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import Typography from "@material-ui/core/Typography";
import LibraryContextMenu from "./LibraryContextMenu";

import { activeTheme } from "../client/theme";
import { formatTime } from "../client/util";

const ROW_HEIGHT = "48px";

class SongRow extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hover: false };
  }

  rowStatus() {
    if (this.props.selected) return "selected";
    if (this.state.hover) return "hover";
    return "normal";
  }

  render() {
    const track = this.props.track;
    const styles = {
      row: {
        normal: {},
        hover: { backgroundColor: activeTheme().palette.action.hover },
        selected: { backgroundColor: activeTheme().palette.action.selected },
      },
      column: {
        title: { position: "relative", width: "100%" },
        text: { whiteSpace: "nowrap", paddingRight: "12px" },
      },
      art: {
        height: ROW_HEIGHT,
        width: ROW_HEIGHT,
      },
      title: {
        display: "block",
        position: "absolute",
        lineHeight: ROW_HEIGHT /* TODO: this is a hack */,
        top: 0,
        bottom: 0,
        left: "12px",
        right: 0,
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis",
      },
    };

    const artStyle = {
      backgroundImage: `url(${track.artwork_url})`,
      backgroundSize: "100%",
    };

    const handleSelect = (event) => {
      const multi = window.event.ctrlKey || window.event.shiftKey;
      this.props.onSelect(track.sha1hash, multi);
    };

    return (
      <TableRow
        key={track.title}
        style={styles.row[this.rowStatus()]}
        onMouseEnter={() => this.setState({ hover: true })}
        onMouseLeave={() => this.setState({ hover: false })}
        onClick={handleSelect}
      >
        <TableCell padding="none">
          <Box style={{ ...artStyle, ...styles.art }} />
        </TableCell>
        <TableCell padding="none" style={styles.column.title}>
          <Typography role="text" style={styles.title} ariaLabel={track.title}>
            {track.title}
          </Typography>
        </TableCell>
        <TableCell>
          {this.state.hover && <LibraryContextMenu songs={[track]} />}
        </TableCell>
        <TableCell padding="none" style={styles.column.text}>
          <Typography>{track.artist}</Typography>
        </TableCell>
        <TableCell padding="none" style={styles.column.text}>
          <Typography>{track.album}</Typography>
        </TableCell>
        <TableCell padding="none" style={styles.column.text}>
          <Typography>{track.year}</Typography>
        </TableCell>
        <TableCell padding="none" align="right" style={styles.column.text}>
          <Typography>{formatTime(track.length)}</Typography>
        </TableCell>
      </TableRow>
    );
  }
}

SongRow.propTypes = {
  key: PropTypes.number,
  track: PropTypes.object,
  selected: PropTypes.bool,
  onSelect: PropTypes.func,
};

const mapStateToProps = (state) => {
  return {
    queue: state.queue.primary,
  };
};

export default connect(mapStateToProps)(SongRow);
