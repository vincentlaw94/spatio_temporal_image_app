import React from "react";
import DropZone from "../dropZone/dropzone.js";
import VideoPlayer from "../videoPlayer/videoPlayer.js";
import SelectVideo from "../selectVideo/selectVideo.js";
import { connect } from "react-redux";

class ComponentParent extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <React.Fragment>
        <div className="videoPlayerBox">
          <VideoPlayer url={this.props.URL} />
        </div>
        <div>
          <SelectVideo />
        </div>
        <div className="inputBox">
          <DropZone URLCallback={this.updateURLCallback} />
        </div>
      </React.Fragment>
    );
  }
}
//connect to redux store
function mapStateToProps(state) {
  return {
    URL: state.videoList.URL
  };
}
export default connect(mapStateToProps)(ComponentParent);
