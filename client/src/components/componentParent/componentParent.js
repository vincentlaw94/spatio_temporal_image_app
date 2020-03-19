import React from 'react';
import DropZone from '../dropZone/dropzone.js';
import VideoPlayer from '../videoPlayer/videoPlayer.js'

class ComponentParent extends React.Component {

    constructor(props) {
        super(props)
        this.state={
            URL: ''
        };
    }

    updateURLCallback = (link) => {
        this.setState({
            URL: 'https://www.youtube.com/watch?v=Yw6u6YkTgQ4' // Dummy URL, needs to be updated with the URL of the upload
        });
    }

    render() {
        return (
            <React.Fragment>
              <div className='videoPlayerBox'>
                <VideoPlayer url={this.state.URL}/>
              </div>
        
              <div className="inputBox">
                <DropZone URLCallback={this.updateURLCallback}/>
              </div>
            </React.Fragment>
        );
    }
}

export default ComponentParent;