//import logo from './logo.svg';
import './App.css';
import React, { useEffect } from 'react';
import { styled } from "styled-components";

import FileUpload from "./components/FileUpload";

const AppHeader = styled.header`
border-radius: var(--default-border-radius);
background-color: var(--color-contrast);
padding: var(--default-padding);
color: black;
`

/*
TODO:

Establish workflow
[*] Select xml files 
[*] Collect and analyze contents
[*] Display results to user
[>] Allow user to filter results (i.e: headers)

Filter details:
* Filter should be string search or regex
* Filters:
  -[Text search/Regex]
  -[] TagName
  -(Saved searches)
* Allow saving user defined filters?
* Info structure:
  -tags
  -filter text
*/

function App() {
  useEffect(() => { 
    document.title = "XML Analyzer"
  });
  return (
    <div style={{textAlign: "center"}}>
      <AppHeader>
        <h1 style={{margin: "0"}}>XML Analyzer</h1>
      </AppHeader>
      <FileUpload />
    </div>
  );
}

export default App;
