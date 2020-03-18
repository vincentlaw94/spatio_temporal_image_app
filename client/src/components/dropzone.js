import React from 'react'
import Dropzone from 'react-dropzone'

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
            console.log(files);
        }
    }

    render() {
        return(
            <Dropzone 
                onDrop={this.handleOnDrop} accept={acceptedTypes} 
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