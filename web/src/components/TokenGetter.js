import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import Box from "@material-ui/core/Box";
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";

import DeleteIcon from "@material-ui/icons/Delete";
import InputIcon from "@material-ui/icons/Input";

import API from "../client/api";
import { setToken } from "../actions/api";

const styles = {
  root: {
    width: "100%",
  },
  credentialWrapper: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
  },
  field: {
    margin: "8px",
    flexGrow: 1,
  },
  button: {
    height: "48px",
    width: "48px",
    flexShrink: 1,
  },
};

const ITEM_HEIGHT = 48;

class FilterMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      pass: null,
    };
  }

  render() {
    const setUser = (e) => {
      let tempState = this.state;
      tempState.user = e.target.value;
      this.setState(tempState);
    };

    const setPass = (e) => {
      let tempState = this.state;
      tempState.pass = e.target.value;
      this.setState(tempState);
    };

    const handleLogin = (e) => {
      const api = new API({ host: "localhost:8080", protocol: "http" });
      api.getToken(this.state.user, this.state.pass).then((response) => {
        if ("token" in response) {
          this.props.dispatch(setToken(response.token));
        }
      });
    };

    const handleLogout = (e) => {
      this.props.dispatch(setToken(null));
    };

    return (
      <Box style={styles.root}>
        {this.props.apiToken && (
          <Box style={styles.credentialWrapper}>
            <TextField
              disabled
              variant="outlined"
              style={styles.field}
              onChange={setUser}
              value={this.props.apiToken}
              label="Token"
            />
            <IconButton style={styles.button} onClick={handleLogout}>
              <DeleteIcon color="primary" />
            </IconButton>
          </Box>
        )}
        {!this.props.apiToken && (
          <Box style={styles.credentialWrapper}>
            <TextField
              variant="outlined"
              style={styles.field}
              onChange={setUser}
              label="Username"
            />
            <TextField
              type="password"
              variant="outlined"
              style={styles.field}
              onChange={setPass}
              label="Password"
            />
            <IconButton style={styles.button} onClick={handleLogin}>
              <InputIcon color="primary" />
            </IconButton>
          </Box>
        )}
      </Box>
    );
  }
}

FilterMenu.propTypes = {
  options: PropTypes.array, // [{ key: "the-sword", label: "The Sword" }]
};

const mapStateToProps = (state) => {
  return {
    apiToken: state.api.token,
  };
};

export default connect(mapStateToProps)(FilterMenu);
