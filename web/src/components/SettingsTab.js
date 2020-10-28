import React from "react";
import { connect } from "react-redux";

import Box from "@material-ui/core/Box";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";

import { setDarkMode } from "../actions/shell";

class SettingsTab extends React.Component {
  render() {
    const toggleDarkMode = () => {
      this.props.dispatch(setDarkMode(!this.props.darkMode));
    };

    return (
      <Box>
        <FormGroup>
          <FormControlLabel
            control={
              <Switch checked={this.props.darkMode} onChange={toggleDarkMode} />
            }
            label="Dark Mode"
          />
        </FormGroup>
      </Box>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    darkMode: state.shell.darkMode,
  };
};

export default connect(mapStateToProps)(SettingsTab);
