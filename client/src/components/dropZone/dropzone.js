import React from 'react';
import Dropzone from 'react-dropzone';
import axios from 'axios';
import './dropzone.css'

const maxVideoSize = 1000000;
const acceptedTypes = "video/mp4";

class DropZone extends React.Component {
    
    handleRejection = (rejectedFile = null) => {
        const rejectedType = rejectedFile.type;
        const rejectedSize = rejectedFile.size;

        if(!acceptedTypes.includes(rejectedType)) {
            alert("Please ensure that the file is a video");
        }
        else if(rejectedSize > maxVideoSize) {
            alert("File size is too large. Maximum file size is 10mb");
        }
    }

    handleOnDrop = (files, rejectedFiles) => {

        //Handle Rejections
        if(rejectedFiles && rejectedFiles.length > 0) {
            console.log(rejectedFiles);
            this.handleRejection(rejectedFiles[0]);
        }
        //Handle Videos
        else {
            var formData = new FormData()
            formData.append("file", files[0])
            axios
                .post('/upload', formData)
                .then(res => console.log(res))
                .catch(err => console.warn(err))
            console.log(files);
            this.props.URLCallback(files[0]);
        }
    }

    render() {
        return(
            <Dropzone 
                onDrop={this.handleOnDrop} 
                accept={acceptedTypes} 
                multiple={false} 
                maxSize={maxVideoSize}
            >
                {({getRootProps, getInputProps}) => (
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

export default DropZone;