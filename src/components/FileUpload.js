//libraries & frameworks
import React, { useState } from "react";
import { styled } from "styled-components";

//components
import Results from "./Results";

const FileNames = styled.ul`
list-style: none;
font-family: monospace;
line-height: 1.5;
text-align: left;
background-color: var(--background-output);
color: var(--color-ouput);
border: 3px solid var(--color);
border-radius: 8px;
padding: var(--default-padding);
`

function FileUpload() {
    //Hold our and manipulate selectedFiles as State
    const [selectedFiles, setSelectedFiles] = useState([]);
  
    //Template
    return(
      <>
        <input 
          type="file" 
          name="files"
          multiple 
          onChange={ (event) => {
            let files = event.target.files;
            //Update file list, only if .xml
            setSelectedFiles([...files].filter(
                file => file.name.slice(-3) === "xml"
            ));
          }
        }/>
        {selectedFiles.length > 0 && (
          <div>
            <h2>XML Files:</h2>
            <FileNames className="file-names">
              {selectedFiles.map((file, index) => (
                <li key={index}> {file.name} </li>
              ))}
            </FileNames>
            <Results files={selectedFiles} />
          </div>
        )}
      </>
    );
}

export default FileUpload;