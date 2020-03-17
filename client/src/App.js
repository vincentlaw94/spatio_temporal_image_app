import React, {useEffect , useState} from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios'




function App() {
  const [x] = useState([]);
  useEffect(() => {
    fetch('/a').then(res => res.json()).then(data => {
      console.log(data['h']);
    });
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          
        </a>
      </header>
    {x}
    </div>
  );
}

export default App;
