import React from "react";
import DropZone from "../dropZone/dropzone.js";
import VideoPlayer from "../videoPlayer/videoPlayer.js";
import SelectVideo from "../select/selectVideo.js";
import SelectSTI from "../select/selectSTI.js";
import { connect } from "react-redux";
import Axios from "axios";

import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  paper: {
    padding: theme.spacing(2),
    margin: "auto",
    maxWidth: 500
  },
  img: {
    margin: "auto"
  },
  button: {
    margin: 10
  }
});

class ComponentParent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sti: undefined
    };
    this.handleClick.bind(this);
  }
  handleClick = e => {
    e.preventDefault();
    const url = "/sti_feed/" + e.currentTarget.value;

    Axios.get(url).then(res => console.log(res));
    this.setState({ sti: url });
  };
  render() {
    const { classes } = this.props;
    return (
      <Container>
        <Grid container spacing={2} alignItems="flex-start" justify="center">
          <Grid item>
            <Paper className={classes.paper}>
              <VideoPlayer url={this.props.URL} />
              <img className={classes.img} src={this.state.sti} />
            </Paper>
          </Grid>

          <Grid item>
            <Paper className={classes.paper}>
              <SelectVideo />
              <SelectSTI />
              <DropZone URLCallback={this.updateURLCallback} />
            </Paper>
            <Button
              className={classes.button}
              variant="contained"
              color="primary"
              onClick={this.handleClick}
              value={this.props.fileName}
            >
              GENERATE STI
            </Button>
          </Grid>
        </Grid>
      </Container>
    );
  }
}
//connect to redux store
function mapStateToProps(state) {
  return {
    URL: state.videoList.URL,
    fileName: state.videoList.fileName
  };
}

export default withStyles(styles)(connect(mapStateToProps)(ComponentParent));
