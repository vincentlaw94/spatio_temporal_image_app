import React from 'react';
import ReactPlayer from 'react-player';
import './videoPlayer.css';

const VideoPlayer = ({ url }) => {

    return(
        <div className="VideoPlayerInner">
            <ReactPlayer
                className='react-player'
                url={url}
                width='100%'
                height='100%'
                controls='true'
            />
        </div>
    );
}

export default VideoPlayer;