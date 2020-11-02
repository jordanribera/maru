import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import Box from "@material-ui/core/Box";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Typography from "@material-ui/core/Typography";

import LowPriorityIcon from "@material-ui/icons/LowPriority";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import PlaylistAddIcon from "@material-ui/icons/PlaylistAdd";
import QueueMusicIcon from "@material-ui/icons/QueueMusic";

import { addItems, removeItems } from "../actions/queue";

const styles = {
  root: {},
  button: {},
};

const ITEM_HEIGHT = 48;

class LibraryContextMenu extends React.Component {
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

    const handlePlay = () => {
      this.props.dispatch(removeItems());
      this.props.dispatch(addItems(this.props.songs));
      handleClose();
    };

    const handlePlayNext = () => {
      this.props.dispatch(addItems(this.props.songs, 1));
      handleClose();
    };

    const handleAddQueue = () => {
      this.props.dispatch(addItems(this.props.songs));
      handleClose();
    };

    const handleAddPlaylist = () => {
      console.log("add to playlist!");
      console.log(this.props.songs);
      handleClose();
    };

    return (
      <Box style={styles.root}>
        <IconButton
          disabled={this.props.songs.length < 1}
          style={styles.button}
          onClick={handleClick}
        >
          <MoreVertIcon color={this.props.color} />
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
          <MenuItem key="play" onClick={handlePlay}>
            <ListItemIcon>
              <PlayArrowIcon />
            </ListItemIcon>
            <Typography>Play</Typography>
          </MenuItem>

          <Divider />

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

          <Divider />

          <MenuItem key="addPlaylist" onClick={handleAddPlaylist}>
            <ListItemIcon>
              <PlaylistAddIcon />
            </ListItemIcon>
            <Typography>Add to playlist</Typography>
          </MenuItem>
        </Menu>
      </Box>
    );
  }
}

LibraryContextMenu.propTypes = {
  label: PropTypes.string,
  description: PropTypes.string,
  icon: PropTypes.node,
};

const mapStateToProps = (state) => {
  return {
    queue: state.queue.primary,
  };
};

export default connect(mapStateToProps)(LibraryContextMenu);
