import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import Box from "@material-ui/core/Box";
import IconButton from "@material-ui/core/IconButton";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Typography from "@material-ui/core/Typography";

import LowPriorityIcon from "@material-ui/icons/LowPriority";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import QueueMusicIcon from "@material-ui/icons/QueueMusic";

import { addItems } from "../actions/queue";

const styles = {
  root: {
    marginTop: "-16px",
    marginBottom: "-16px",
  },
  button: {},
};

const ITEM_HEIGHT = 48;

class SongsContextMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = { anchorEl: null };
  }

  render() {
    const open = Boolean(this.state.anchorEl);

    const handleClick = (event) => {
      this.setState({ anchorEl: event.currentTarget });
    };

    const handleClose = () => {
      this.setState({ anchorEl: null });
    };

    const handlePlayNext = () => {
      this.props.dispatch(addItems(this.props.songs, 1));
      handleClose();
    };

    const handleAddQueue = () => {
      this.props.dispatch(addItems(this.props.songs));
      handleClose();
    };

    return (
      <Box style={styles.root}>
        <IconButton
          disabled={this.props.songs.length < 1}
          style={styles.button}
          onClick={handleClick}
        >
          <MoreVertIcon />
        </IconButton>
        <Menu
          style={styles.menu}
          anchorEl={this.state.anchorEl}
          keepMounted
          open={open}
          onClose={handleClose}
          PaperProps={{
            style: {
              maxHeight: ITEM_HEIGHT * 4.5,
            },
          }}
        >
          <MenuItem key="playNext" onClick={handlePlayNext}>
            <ListItemIcon>
              <QueueMusicIcon />
            </ListItemIcon>
            <Typography>Play next</Typography>
          </MenuItem>
          <MenuItem key="addQueue" onClick={handleAddQueue}>
            <ListItemIcon>
              <LowPriorityIcon />
            </ListItemIcon>
            <Typography>Add to queue</Typography>
          </MenuItem>
        </Menu>
      </Box>
    );
  }
}

SongsContextMenu.propTypes = {
  label: PropTypes.string,
  description: PropTypes.string,
  icon: PropTypes.node,
};

const mapStateToProps = (state) => {
  return {
    queue: state.queue.primary,
  };
};

export default connect(mapStateToProps)(SongsContextMenu);
