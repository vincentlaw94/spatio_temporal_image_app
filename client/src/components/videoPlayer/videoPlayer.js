import React from "react";
import ReactPlayer from "react-player";
import "./videoPlayer.css";
import noSignal from "./NoSignal.gif";
import Container from "@material-ui/core/Container";

const VideoPlayer = ({ url }) => {
  if (url) {
    return (
      <div className="VideoPlayerInner">
        <ReactPlayer
          className="react-player"
          url={url}
          width="100%"
          height="100%"
          controls="true"
        />
      </div>
    );
  } else {
    return <img src={noSignal} style={{ width: "500px", height: "280px" }} />;
  }
};

export default VideoPlayer;
