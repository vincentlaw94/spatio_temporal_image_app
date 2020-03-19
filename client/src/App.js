import React, {useEffect, useState} from 'react';
import './App.css';
import axios from 'axios';
import DropZone from './components/dropZone/dropzone.js';
import VideoPlayer from './components/videoPlayer/videoPlayer.js'


function App() {
  const [x, setX] = useState([]);
  useEffect(() => {
    fetch('/a').then(res => res.json()).then(data => {
      console.log(data['h']);
      setX(data['h'])
    });
  }, []);

  return (
    <React.Fragment>
      <div className='videoPlayerBox'>
        <VideoPlayer />
      </div>

      <div className="inputBox">
        <DropZone />
      </div>
    </React.Fragment>
  );
}

export default App;
