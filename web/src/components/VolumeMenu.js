import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import Box from "@material-ui/core/Box";
import Slider from "@material-ui/core/Slider";
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";

import VolumeDownIcon from "@material-ui/icons/VolumeDown";

const ITEM_HEIGHT = 48;

class VolumeMenu extends React.Component {
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

    const orientation = this.props.orientation || "vertical";
    const length = this.props.length || 128;

    const styles = {
      button: {
        height: "56px",
        width: "56px",
      },
      menu: {
        marginLeft: "-12px",
        marginTop: "-12px",
      },
      slider: {
        vertical: {
          height: length,
          margin: 8,
        },
        horizontal: {
          width: length,
          margin: 8,
        },
      },
    };

    return (
      <Box style={styles.root}>
        <IconButton style={styles.button} onClick={handleClick}>
          <VolumeDownIcon color={this.props.color} />
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
          <Slider
            style={styles.slider[orientation]}
            orientation="vertical"
            min={0}
            max={100}
            defaultValue={75}
            onChangeCommitted={this.props.onChangeCommitted}
          />
        </Menu>
      </Box>
    );
  }
}

VolumeMenu.propTypes = {
  orientation: PropTypes.oneOf(["horizontal", "vertical"]),
  length: PropTypes.number,
  onChangeCommitted: PropTypes.func,
};

const mapStateToProps = (state) => {
  return {
    volume: state.shell.volume,
  };
};

export default connect(mapStateToProps)(VolumeMenu);
