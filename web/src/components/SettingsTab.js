import React from "react";
import { connect } from "react-redux";

import Box from "@material-ui/core/Box";
import Checkbox from "@material-ui/core/Checkbox";
import Container from "@material-ui/core/Container";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormGroup from "@material-ui/core/FormGroup";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Switch from "@material-ui/core/Switch";
import Typography from "@material-ui/core/Typography";

import Brightness3Icon from "@material-ui/icons/Brightness3";
import Brightness7Icon from "@material-ui/icons/Brightness7";
import GitHubIcon from "@material-ui/icons/GitHub";
import HelpIcon from "@material-ui/icons/Help";
import InvertColorsIcon from "@material-ui/icons/InvertColors";
import PinDropIcon from "@material-ui/icons/PinDrop";
import SortIcon from "@material-ui/icons/Sort";
import LinkIcon from "@material-ui/icons/Link";
import LinkOffIcon from "@material-ui/icons/LinkOff";
import ViewColumnIcon from "@material-ui/icons/ViewColumn";

import ColorSelector from "./ColorSelector";
import LabeledSetting from "./LabeledSetting";
import TokenGetter from "./TokenGetter";

import { setDarkMode, setThemeColor } from "../actions/shell";

const styles = {
  root: {
    padding: "16px",
    height: "100vh",
    overflow: "auto",
  },
  page: {
    padding: "16px",
    height: "100%",
  },
  pageHeading: {
    display: "flex",
    flexDirection: "row",
  },
  pageTitle: {
    padding: "none",
    paddingLeft: "8px",
  },
  icon: {
    height: "48px",
    width: "48px",
  },
};

class SettingsTab extends React.Component {
  render() {
    const toggleDarkMode = () => {
      this.props.dispatch(setDarkMode(!this.props.darkMode));
    };

    const handleColorChange = (colorKey) => {
      this.props.dispatch(setThemeColor(colorKey));
    };

    return (
      <Box style={styles.root}>
        <Container maxWidth="lg">
          <Grid container spacing={2} justify="center">
            <Grid item xs={12} sm={12} md={12} lg={6} xl={6}>
              <Paper style={styles.page}>
                <Box style={styles.pageHeading}>
                  <Typography
                    variant="h4"
                    color="primary"
                    style={styles.pageTitle}
                  >
                    Information
                  </Typography>
                </Box>
                <LabeledSetting
                  label="Connect"
                  description="Connect to API..."
                  icon={
                    this.props.apiToken ? (
                      <LinkIcon style={{ height: "42px", width: "42px" }} />
                    ) : (
                      <LinkOffIcon style={{ height: "42px", width: "42px" }} />
                    )
                  }
                >
                  <TokenGetter />
                </LabeledSetting>
                <LabeledSetting
                  label="GitHub"
                  description="Link to GitHub..."
                  icon={
                    <GitHubIcon style={{ height: "42px", width: "42px" }} />
                  }
                ></LabeledSetting>
                <LabeledSetting
                  label="Oh no"
                  description="None of these do anything yet..."
                  icon={<HelpIcon style={styles.icon} />}
                ></LabeledSetting>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={6} xl={6}>
              <Paper style={styles.page}>
                <Box style={styles.pageHeading}>
                  <Typography
                    variant="h4"
                    color="primary"
                    style={styles.pageTitle}
                  >
                    Queue
                  </Typography>
                </Box>
                <LabeledSetting
                  label="Consumption"
                  description="With repeat off, songs are removed when they end"
                  icon={<PinDropIcon style={styles.icon} />}
                >
                  <FormControlLabel
                    color="primary"
                    control={<Checkbox />}
                    label="I hunger"
                  />
                </LabeledSetting>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={6} xl={6}>
              <Paper style={styles.page}>
                <Box style={styles.pageHeading}>
                  <Typography
                    variant="h4"
                    color="primary"
                    style={styles.pageTitle}
                  >
                    Library
                  </Typography>
                </Box>
                <LabeledSetting
                  label="Sort"
                  description="Choose default sort behavior..."
                  icon={<SortIcon style={styles.icon} />}
                ></LabeledSetting>
                <LabeledSetting
                  label="Columns"
                  description="Choose columns to display in list views..."
                  icon={<ViewColumnIcon style={styles.icon} />}
                >
                  <FormGroup>
                    {/* make it so the user can reorder these */}
                    <FormControlLabel control={<Checkbox />} label="Title" />
                    <FormControlLabel control={<Checkbox />} label="Artist" />
                    <FormControlLabel control={<Checkbox />} label="Album" />
                    <FormControlLabel control={<Checkbox />} label="Year" />
                    <FormControlLabel control={<Checkbox />} label="Genre" />
                    <FormControlLabel control={<Checkbox />} label="Time" />
                  </FormGroup>
                </LabeledSetting>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={6} xl={6}>
              <Paper style={styles.page}>
                <Box style={styles.pageHeading}>
                  <Typography
                    variant="h4"
                    color="primary"
                    style={styles.pageTitle}
                  >
                    Interface
                  </Typography>
                </Box>
                <LabeledSetting
                  label="Theme"
                  description="Change the player theme..."
                  icon={<InvertColorsIcon style={styles.icon} />}
                >
                  <ColorSelector
                    style={{ marginTop: "16px" }}
                    activeColor={this.props.themeColor}
                    onChange={handleColorChange}
                  />
                  <Grid
                    component="label"
                    container
                    alignItems="center"
                    spacing={1}
                  >
                    <Grid item>
                      <Brightness7Icon color="action" />
                    </Grid>
                    <Grid item>
                      <Switch
                        checked={this.props.darkMode}
                        color="primary"
                        onChange={toggleDarkMode}
                      />
                    </Grid>
                    <Grid item>
                      <Brightness3Icon color="action" />
                    </Grid>
                  </Grid>
                </LabeledSetting>
                {/*}
                <LabeledSetting
                  label="Post-drag selection"
                  description="Change the click&drag behavior..."
                  icon={<SelectAllIcon style={styles.icon} />}
                >
                  <RadioGroup
                    name="postDragSelection"
                    onChange={setPostDragSelection}
                  >
                    <FormControlLabel
                      value="both"
                      control={<Radio />}
                      label="Maintain selection."
                    />
                    <FormControlLabel
                      value="destination"
                      control={<Radio />}
                      label="Maintain selection at destination."
                    />
                    <FormControlLabel
                      value="source"
                      control={<Radio />}
                      label="Maintain selection at source."
                    />
                    <FormControlLabel
                      value="none"
                      control={<Radio />}
                      label="Clear selection."
                    />
                  </RadioGroup>
                </LabeledSetting>
                {*/}
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Box>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    darkMode: state.shell.darkMode,
    themeColor: state.shell.themeColor,
    apiToken: state.api.token,
  };
};

export default connect(mapStateToProps)(SettingsTab);
