//import logo from './logo.svg';
import './App.css';
import React from 'react';

import FileUpload from "./components/FileUpload";

/*
TODO:

Establish workflow
1. Upload xml files
2. Collect and analyze contents
3. Display results to user
*/

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>XML Analyzer</h1>
        <FileUpload />
      </header>
    </div>
  );
}

export default App;
