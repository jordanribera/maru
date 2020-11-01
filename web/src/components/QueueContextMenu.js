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

import DeleteIcon from "@material-ui/icons/Delete";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import PlaylistAddIcon from "@material-ui/icons/PlaylistAdd";
import ShuffleIcon from "@material-ui/icons/Shuffle";
import VerticalAlignTopIcon from "@material-ui/icons/VerticalAlignTop";
import VerticalAlignBottomIcon from "@material-ui/icons/VerticalAlignBottom";

import { addItems, removeItems } from "../actions/queue";

const styles = {
  root: {
    margin: "-16px",
  },
  button: {},
};

const ITEM_HEIGHT = 48;

class QueueContextMenu extends React.Component {
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

    const handleToTop = () => {
      let movingSongs = this.props.songs;
      this.props.dispatch(removeItems(this.props.keys));
      this.props.dispatch(addItems(movingSongs, 1));
      handleClose();
    };

    const handleToBottom = () => {
      let movingSongs = this.props.songs;
      this.props.dispatch(removeItems(this.props.keys));
      this.props.dispatch(addItems(movingSongs));
      handleClose();
    };

    const handleShuffle = () => {
      this.props.dispatch(addItems(this.props.songs));
      handleClose();
    };

    const handleAddPlaylist = () => {
      console.log("add to playlist!");
      console.log(this.props.songs);
      handleClose();
    };

    const handleRemove = () => {
      this.props.dispatch(removeItems(this.props.keys));
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
              maxHeight: ITEM_HEIGHT * 5.5,
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

          <MenuItem key="toTop" onClick={handleToTop}>
            <ListItemIcon>
              <VerticalAlignTopIcon />
            </ListItemIcon>
            <Typography>Send to top</Typography>
          </MenuItem>
          <MenuItem key="shuffle" onClick={handleShuffle}>
            <ListItemIcon>
              <ShuffleIcon />
            </ListItemIcon>
            <Typography>Shuffle</Typography>
          </MenuItem>
          <MenuItem key="toBottom" onClick={handleToBottom}>
            <ListItemIcon>
              <VerticalAlignBottomIcon />
            </ListItemIcon>
            <Typography>Send to bottom</Typography>
          </MenuItem>

          <Divider />

          <MenuItem key="addPlaylist" onClick={handleAddPlaylist}>
            <ListItemIcon>
              <PlaylistAddIcon />
            </ListItemIcon>
            <Typography>Add to playlist</Typography>
          </MenuItem>
          <MenuItem key="remove" onClick={handleRemove}>
            <ListItemIcon>
              <DeleteIcon />
            </ListItemIcon>
            <Typography>Remove from queue</Typography>
          </MenuItem>
        </Menu>
      </Box>
    );
  }
}

QueueContextMenu.propTypes = {
  label: PropTypes.string,
  description: PropTypes.string,
  icon: PropTypes.node,
  songs: PropTypes.array,
  keys: PropTypes.array,
};

const mapStateToProps = (state) => {
  return {
    queue: state.queue.primary,
  };
};

export default connect(mapStateToProps)(QueueContextMenu);
