import React from "react";
import PropTypes from "prop-types";
import Measure from "react-measure";

import Box from "@material-ui/core/Box";
import AlbumIcon from "@material-ui/icons/Album";

class Art extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dimensions: {
        height: -1,
        width: -1,
      },
    };
  }

  render() {
    const { height, width } = this.state.dimensions;
    const dimension =
      this.props.size || (this.props.fit === "width" ? width : height);

    // determine dimensions
    const styles = {
      root: {
        height: "100%",
        width: "100%",
        position: "relative",
      },
      art: {
        height: dimension,
        width: dimension,
      },
      noArt: {
        position: "absolute",
        height: "100%",
        width: "100%",
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
      },
      childWrapper: {
        position: "absolute",
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      },
    };

    const url = this.props.url || "";
    const artStyle = {
      backgroundImage: `url(${url})`,
      backgroundSize: "100%",
    };

    return (
      <Measure
        bounds
        onResize={(rect) => {
          this.setState({ dimensions: rect.bounds });
        }}
      >
        {({ measureRef }) => (
          <Box ref={measureRef} style={styles.root}>
            <Box style={{ ...styles.art, ...artStyle }}>
              &nbsp;
              {url === "" && (
                // TODO: render this behind, and always
                <AlbumIcon color="disabled" style={styles.noArt} />
              )}
              <Box style={styles.childWrapper}>{this.props.children}</Box>
            </Box>
          </Box>
        )}
      </Measure>
    );
  }
}

Art.propTypes = {
  url: PropTypes.string,
  fit: PropTypes.oneOf(["height", "width"]),
  size: PropTypes.number,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

export default Art;
