import React, { Component } from "react";
import { Link } from "react-router-dom";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Snackbar from "@material-ui/core/Snackbar";
import CloseIcon from "@material-ui/icons/Close";
import IconButton from "@material-ui/core/IconButton";
import { withStyles } from "@material-ui/styles";
import styles from "./styles/NavbarStyles";

class Navbar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      format: "hex",
      open: false
    };
    this.handleFormatChange = this.handleFormatChange.bind(this);
    this.closeSnackbar = this.closeSnackbar.bind(this);
  }
  handleFormatChange(e) {
    this.setState({ format: e.target.value, open: true });
    this.props.handleChange(e.target.value);
  }

  closeSnackbar(e) {
    this.setState({ open: false });
  }

  render() {
    const { format } = this.state;
    const { level, changeLevel, showingAllColors, classes } = this.props;
    return (
      <header className={classes.Navbar}>
        <div className={classes.logo}>
          <Link className="logo-color" to="/">
            PickYourColor
          </Link>
        </div>
        {showingAllColors && (
          <div>
            <span>level:{level}</span>
            <div className={classes.slider}>
              <Slider
                defaultValue={level}
                min={100}
                max={900}
                step={100}
                onAfterChange={changeLevel}
              />
            </div>
          </div>
        )}
        <div className={classes.selectContainer}>
          <Select value={this.state.format} onChange={this.handleFormatChange}>
            <MenuItem value="hex">Hex - #ffffff</MenuItem>
            <MenuItem value="rgb">RGB- rgb(255,255,255)</MenuItem>
            <MenuItem value="rgba">RGBA - rgba(255,255,255,1.0)</MenuItem>
          </Select>
        </div>

        <Snackbar
          anchorOrigin={{ vertical: "Bottom", horizontal: "left" }}
          open={this.state.open}
          onClose={this.closeSnackbar}
          autoHideDuration={3000}
          message={
            <span className="message-id">
              {" "}
              format changed to : {format.toUpperCase()}
            </span>
          }
          ContentProps={{ "aria-describedby": "message-id" }}
          action={[
            <IconButton
              key="close"
              color="inherit"
              onClick={this.closeSnackbar}
              aria-label="close"
            >
              <CloseIcon></CloseIcon>
            </IconButton>
          ]}
        />
      </header>
    );
  }
}

export default withStyles(styles)(Navbar);
