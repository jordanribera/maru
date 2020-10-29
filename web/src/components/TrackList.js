import React from "react";
import PropTypes from "prop-types";

import Box from "@material-ui/core/Box";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

import { darkTheme, lightTheme } from "../client/theme";

const themeStyles = (theme = darkTheme) => {
  return {
    root: {
      width: "100%",
      display: "flex",
      flexDirection: "column",
    },
    item: {
      root: {
        width: "100%",
      },
      art: {
        height: "64px",
        width: "64px",
        padding: "0px",
        textAlign: "center",
      },
    },
  };
};

const styles = themeStyles();

class TrackList extends React.Component {
  listHeader() {
    const showColumns = this.props.showColumns;
    if (showColumns) {
      return (
        <TableHead>
          <TableRow>
            <TableCell>Art</TableCell>
            <TableCell>Title</TableCell>
          </TableRow>
        </TableHead>
      );
    }
  }

  listItem(item, key) {
    let art_style = {
      backgroundImage: `url(${item.artwork_url})`,
      backgroundSize: "100%",
    };

    return (
      <TableRow key={key} style={styles.item.root}>
        <TableCell style={{ ...styles.item.art, ...art_style }} />
        <TableCell style={styles.item.title}>{item.title}</TableCell>
      </TableRow>
    );
  }

  render() {
    const tracks = this.props.tracks || [];

    return (
      <TableContainer style={styles.root} component={Paper}>
        <Table>
          {this.listHeader()}
          <TableBody>
            {tracks.map((value, index) => {
              return this.listItem(value, index);
            })}
          </TableBody>
        </Table>
      </TableContainer>
    );
  }
}

TrackList.propTypes = {
  tracks: PropTypes.array,
  // columns: PropTypes.array,
  showColumns: PropTypes.bool,
};

export default TrackList;
