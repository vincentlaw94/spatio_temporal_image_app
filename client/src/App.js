import React, {useEffect, useState} from 'react';
import './App.css';
import ComponentParent from './components/componentParent/componentParent.js'


function App() {
  const [x, setX] = useState([]);
  useEffect(() => {
    fetch('/a').then(res => res.json()).then(data => {
      console.log(data['h']);
      setX(data['h'])
    });
  }, []);

  return (
    <ComponentParent />
  );
}

export default App;
