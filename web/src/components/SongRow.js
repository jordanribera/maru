import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import Checkbox from "@material-ui/core/Checkbox";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import SongsContextMenu from "./SongsContextMenu";

const styles = {};

const formatTime = (seconds) => {
  return new Date(seconds * 1000).toISOString().substr(11, 8);
};

class SongRow extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hover: false };
  }

  render() {
    const track = this.props.track;
    const toggleSelect = (event) => {
      this.props.onSelectionChange(track.sha1hash, event.target.checked);
    };

    return (
      <TableRow
        key={track.title}
        onMouseEnter={() => this.setState({ hover: true })}
        onMouseLeave={() => this.setState({ hover: false })}
      >
        <TableCell>
          <Checkbox
            color="primary"
            checked={this.props.selected}
            onChange={toggleSelect}
          />
        </TableCell>
        <TableCell>{track.title}</TableCell>
        <TableCell>
          {this.state.hover && <SongsContextMenu songs={[track]} />}
        </TableCell>
        <TableCell>{track.artist}</TableCell>
        <TableCell>{track.album}</TableCell>
        <TableCell>{track.year}</TableCell>
        <TableCell>{formatTime(track.length)}</TableCell>
      </TableRow>
    );
  }
}

SongRow.propTypes = {
  key: PropTypes.number,
  track: PropTypes.object,
  selected: PropTypes.bool,
  onSelectionChange: PropTypes.func,
};

const mapStateToProps = (state) => {
  return {
    queue: state.queue.primary,
  };
};

export default connect(mapStateToProps)(SongRow);
