import React from "react";
import PropTypes from "prop-types";

import Box from "@material-ui/core/Box";
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";

import CheckBoxIcon from "@material-ui/icons/CheckBox";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import FilterListIcon from "@material-ui/icons/FilterList";

const styles = {
  root: {
    display: "inline-block",
    width: "48px",
  },
  label: {
    padding: "8px",
  },
};

const ITEM_HEIGHT = 48;

class FilterMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      anchorEl: null,
      searching: false,
      mFilter: "",
    };
  }

  render() {
    const open = Boolean(this.state.anchorEl);

    const handleClick = (event) => {
      let tempState = this.state;
      tempState.anchorEl = event.currentTarget;
      this.setState(tempState);
    };

    const handleClose = () => {
      let tempState = this.state;
      tempState.anchorEl = null;
      tempState.mFilter = "";
      this.setState(tempState);
    };

    const handleSearchFocus = (e) => {
      console.log("searching...");
      let tempState = this.state;
      tempState.searching = true;
      this.setState(tempState);
    };

    const handleSearchBlur = (e) => {
      console.log("not searching...");
      let tempState = this.state;
      tempState.searching = false;
      this.setState(tempState);
    };

    const handleSearch = (e) => {
      let tempState = this.state;
      tempState.mFilter = e.currentTarget.value;
      this.setState(tempState);
    };

    const active = this.props.selected.length > 0;

    return (
      <Box style={styles.root}>
        <IconButton style={styles.button} onClick={handleClick}>
          <FilterListIcon color={active ? "primary" : "inherit"} />
        </IconButton>
        <Menu
          style={styles.menu}
          transitionDuration={0}
          anchorEl={this.state.anchorEl}
          keepMounted
          open={open}
          onClose={handleClose}
          PaperProps={{
            style: {
              maxHeight: ITEM_HEIGHT * 8.5,
            },
          }}
        >
          <MenuItem key="search" autoFocus={false}>
            <TextField
              variant="outlined"
              label="Yo Dawg"
              value={this.state.mFilter}
              onChange={handleSearch}
              onFocus={handleSearchFocus}
              onBlur={handleSearchBlur}
            />
          </MenuItem>
          {this.props.options.map((option, index) => {
            const selected = this.props.selected.includes(option.key);
            if (option.label.toLowerCase().includes(this.state.mFilter)) {
              return (
                <MenuItem
                  key={option.key}
                  disabled={this.state.searching}
                  onClick={() => this.props.onSelect(option.key, !selected)}
                >
                  {selected ? (
                    <CheckBoxIcon color="primary" />
                  ) : (
                    <CheckBoxOutlineBlankIcon />
                  )}
                  <Typography style={styles.label}>{option.label}</Typography>
                </MenuItem>
              );
            }
          })}
        </Menu>
      </Box>
    );
  }
}

FilterMenu.propTypes = {
  options: PropTypes.array, // [{ key: "the-sword", label: "The Sword" }]
  selected: PropTypes.array, // ["the-sword", "radiohead"]
  onSelect: PropTypes.func, // (key, selected)
};

export default FilterMenu;
