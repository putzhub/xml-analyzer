//import logo from './logo.svg';
import './App.css';
import React from 'react';
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
  -Text search
  -TagName
  -Regex
* Allow saving user defined filters?
*/

function App() {
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
