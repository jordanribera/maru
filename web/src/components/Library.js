import React from "react";
import { connect } from "react-redux";

import Box from "@material-ui/core/Box";
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import ArtistsTab from "./ArtistsTab";
import AlbumsTab from "./AlbumsTab";
import SongsTab from "./SongsTab";
import PlaylistsTab from "./PlaylistsTab";
import SettingsTab from "./SettingsTab";
import PeopleIcon from "@material-ui/icons/People";
import AlbumIcon from "@material-ui/icons/Album";
import MusicNoteIcon from "@material-ui/icons/MusicNote";
import PlaylistPlayIcon from "@material-ui/icons/PlaylistPlay";
import SettingsIcon from "@material-ui/icons/Settings";

import { getInfo } from "../client/api";
import { activateTab } from "../actions/shell";
import { activeTheme } from "../client/theme";

import TabPanel from "./TabPanel";

const themeStyles = (theme) => {
  return {
    root: {
      backgroundColor: "purple",
      height: "100%",
      flexGrow: "1",
      display: "flex",
      flexDirection: "row",
    },
    tabPanelWrapper: {
      flexGrow: "1",
      minWidth: "512px",
      backgroundColor: theme.palette.background.default,
    },
    tabWrapper: {
      flexShrink: "1",
    },
    tabs: {
      borderLeft: `1px solid ${theme.palette.divider}`,
      backgroundColor: theme.palette.background.paper,
      height: "100%",
    },
    tab: {
      minWidth: "0px",
    },
    icon: {
      height: "48px",
      width: "48px",
    },
    settings: {
      position: "absolute",
      bottom: 0,
    },
  };
};

class Library extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      info: {},
    };
  }

  componentDidMount() {
    getInfo((result) => {
      let tempState = this.state;
      tempState.info = result;
      this.setState(tempState);
    });
  }

  tabLabel(label) {
    if (this.props.showLabels) return label;
  }

  render() {
    const handleTabChange = (event, newValue) => {
      this.props.dispatch(activateTab(newValue));
    };

    const styles = themeStyles(activeTheme());

    return (
      <Box style={styles.root}>
        <Box style={styles.tabPanelWrapper}>
          <TabPanel style={styles.panel} value={this.props.activeTab} index={0}>
            <ArtistsTab />
          </TabPanel>
          <TabPanel style={styles.panel} value={this.props.activeTab} index={1}>
            <AlbumsTab />
          </TabPanel>
          <TabPanel style={styles.panel} value={this.props.activeTab} index={2}>
            <SongsTab filterOptions={this.state.info["filter_options"] || {}} />
          </TabPanel>
          <TabPanel style={styles.panel} value={this.props.activeTab} index={3}>
            <PlaylistsTab />
          </TabPanel>
          <TabPanel style={styles.panel} value={this.props.activeTab} index={4}>
            <SettingsTab />
          </TabPanel>
        </Box>
        <Box style={styles.tabWrapper}>
          <Tabs
            style={styles.tabs}
            orientation="vertical"
            value={this.props.activeTab}
            onChange={handleTabChange}
            indicatorColor="primary"
            textColor="primary"
            TabIndicatorProps={{ style: { left: "0px" } }}
          >
            <Tab
              style={styles.tab}
              icon={<PeopleIcon style={styles.icon} />}
              label={this.tabLabel("Artists")}
            />
            <Tab
              style={styles.tab}
              icon={<AlbumIcon style={styles.icon} />}
              label={this.tabLabel("Albums")}
            />
            <Tab
              style={styles.tab}
              icon={<MusicNoteIcon style={styles.icon} />}
              label={this.tabLabel("Songs")}
            />
            <Tab
              style={styles.tab}
              icon={<PlaylistPlayIcon style={styles.icon} />}
              label={this.tabLabel("Playlists")}
            />
            <Tab
              style={{ ...styles.tab, ...styles.settings }}
              icon={<SettingsIcon style={styles.icon} />}
              label={this.tabLabel("Settings")}
            />
          </Tabs>
        </Box>
      </Box>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    activeTab: state.shell.activeTab,
    showLabels: state.shell.showLabels,
    darkMode: state.shell.darkMode,
  };
};

export default connect(mapStateToProps)(Library);
