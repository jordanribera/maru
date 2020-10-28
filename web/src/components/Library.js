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

import { activateTab } from "../actions/shell";
import { darkTheme, lightTheme } from "../client/theme";

import TabPanel from "./TabPanel";

const themeStyles = (theme = darkTheme) => {
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
    settings: {
      position: "absolute",
      bottom: 0,
    },
  };
};

class Library extends React.Component {
  tabLabel(label) {
    if (this.props.showLabels) return label;
  }

  activeTheme() {
    return this.props.darkMode ? darkTheme : lightTheme;
  }

  render() {
    const handleTabChange = (event, newValue) => {
      this.props.dispatch(activateTab(newValue));
    };

    const styles = themeStyles(this.activeTheme());

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
            <SongsTab />
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
          >
            <Tab
              style={styles.tab}
              icon={<PeopleIcon />}
              label={this.tabLabel("Artists")}
            />
            <Tab
              style={styles.tab}
              icon={<AlbumIcon />}
              label={this.tabLabel("Albums")}
            />
            <Tab
              style={styles.tab}
              icon={<MusicNoteIcon />}
              label={this.tabLabel("Songs")}
            />
            <Tab
              style={styles.tab}
              icon={<PlaylistPlayIcon />}
              label={this.tabLabel("Playlists")}
            />
            <Tab
              style={{ ...styles.tab, ...styles.settings }}
              icon={<SettingsIcon />}
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
