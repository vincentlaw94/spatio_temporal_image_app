import React, {useEffect, useState} from 'react';
import './App.css';
import axios from 'axios';
import DropZone from './components/dropzone.js';


function App() {
  const [x, setX] = useState([]);
  useEffect(() => {
    fetch('/a').then(res => res.json()).then(data => {
      console.log(data['h']);
      setX(data['h'])
    });
  }, []);

  return (
    <div class="inputBox">
      <DropZone />
    </div>
  );
}

export default App;
