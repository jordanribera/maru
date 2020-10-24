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


const styles = {
  root: {
    backgroundColor: "orange",
    minHeight: "100%",
    maxHeight: "calc(100vh - 96px)",
    width: "100%",
    display: "flex",
    flexDirection: "column",
  },
  item: {
    root: {
      backgroundColor: "orange",
      width: "100%",
    },
    art: {
      backgroundColor: "yellow",
      height: "64px",
      width: "64px",
      padding: "0px",
      textAlign: "center",
    },
    grip: {
      backgroundColor: "silver",
      width: "32px",
      padding: "0px",
      textAlign: "center",
    },
    title: {
      backgroundColor: "white",
    },
  }
}

class TrackList extends React.Component {
  listHeader () {
    const showColumns = this.props.showColumns;
    if (showColumns) {
      return(
        <TableHead>
          <TableRow>
            <TableCell>Art</TableCell>
            <TableCell>#</TableCell>
            <TableCell>Title</TableCell>
          </TableRow>
        </TableHead>
      );
    }

  }

  listItem(item) {
    return(
      <TableRow style={styles.item.root}>
        <TableCell style={styles.item.art}>Art</TableCell>
        <TableCell style={styles.item.grip}>#</TableCell>
        <TableCell style={styles.item.title}>{item.title}</TableCell>
      </TableRow>
    )
  }

  listItems(tracks) {
    tracks.forEach({

    });
  }

  render() {
    const tracks = this.props.tracks || [];
    // console.log(tracks);

    return (
      <TableContainer style={styles.root} component={Paper}>
        <Table>
          { this.listHeader() }
          <TableBody>
            {
              tracks.map((value, index) => {
                return this.listItem(value)
              })
            }
          </TableBody>
        </Table>

      </TableContainer>
    )
  }
}

TrackList.propTypes = {
  tracks: PropTypes.array,
  // columns: PropTypes.array,
  showColumns: PropTypes.bool,
};

export default TrackList;
