import React from "react";
import Dropzone from "react-dropzone";
import axios from "axios";
import "./dropzone.css";
import { connect } from "react-redux";
import { addVideo, toggleMSG } from "../../actions";

const maxVideoSize = 10000000;
const acceptedTypes = "video/mp4";

class DropZone extends React.Component {
  constructor(props) {
    super(props);
  }

  handleRejection = (rejectedFile = null) => {
    const rejectedType = rejectedFile.type;
    const rejectedSize = rejectedFile.size;

    if (!acceptedTypes.includes(rejectedType)) {
      alert("Please ensure that the file is a video");
    } else if (rejectedSize > maxVideoSize) {
      alert("File size is too large. Maximum file size is 10mb");
    }
  };

  handleOnDrop = (files, rejectedFiles) => {
    //Handle Rejections
    if (rejectedFiles && rejectedFiles.length > 0) {
      console.log(rejectedFiles);
      this.handleRejection(rejectedFiles[0]);
    }
    //Handle Videos
    else {
      var fileName = files[0].name;

      //update select video list
      if (this.props.videoList.includes(fileName)) {
        //Do nothing if there's a duplicate filenames
      } else {
        this.props.addVideo(fileName);
      }
      //post file to server
      var formData = new FormData();
      formData.append("file", files[0]);
      axios
        .post("/upload", formData)
        .then(res => this.props.toggleMSG())
        .catch(err => console.warn(err));
    }
  };

  render() {
    return (
      <Dropzone
        onDrop={this.handleOnDrop}
        accept={acceptedTypes}
        multiple={false}
        maxSize={maxVideoSize}
      >
        {({ getRootProps, getInputProps }) => (
          <section className="DropZoneOuter">
            <div className="DropZoneInner" {...getRootProps()}>
              <input {...getInputProps()} />
              <p>Drag 'n' drop some files here, or click to select files</p>
            </div>
          </section>
        )}
      </Dropzone>
    );
  }
}

//connect to redux store
function mapStateToProps(state) {
  return {
    videoList: state.videoList.videoList
  };
}

export default connect(mapStateToProps, { addVideo, toggleMSG })(DropZone);
