//libraries & frameworks
import React, { useState } from "react";
import { styled } from "styled-components";

//component imports
import Results from "./Results";

/*    STYLES      */
//Group file input & selected list
const InputWrapper = styled.div`
display: flex;
justify-content: center;
align-items: baseline;
flex-wrap: wrap;
`

//XML file paths
const FileNames = styled.ul`
list-style: none;
font-family: monospace;
line-height: 1.5;
text-align: left;
background-color: black;
color: var(--color-contrast);
border: 3px solid var(--color);
border-radius: var(--default-border-radius);
padding: var(--default-padding);
`

//Component for hiding XML file list
const HeaderButton = styled.button`
background-color: black;
color: var(--color);
font-size: 2rem;
margin-left: var(--default-margin);
padding: var(--default-padding);
line-height: .5;
border: 0;
border-radius: var(--default-border-radius);
`
/*      COMPONENTS      */
function Button({children, toggleText=children, onClick}){
  const [label, setLabel] = useState("V");
  return(
    <HeaderButton
      onClick={(event) => {
        setLabel((label === toggleText ? children : toggleText ));
        onClick(event);
    }}>
      {label}
    </HeaderButton>
  );
}

//Receive the file and send it to be processed.
function FileUpload() {
    //Hold our and manipulate selectedFiles as State
    const [selectedFiles, setSelectedFiles] = useState([]);
  
    //Template
    return(
      <>
        <InputWrapper>
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
            <h2>XML Files 
              <Button 
                toggleText={"<"}
                onClick={ event => {      
                  let sibling = event.target.parentNode.nextSibling;
                  //hide the parent's sibling (i.e: FileNames)
                  sibling.style.display = (
                    sibling.style.display === "none" ? 
                      "block" : "none");
                }}
              >
                {'V'}
              </Button>
            </h2>
            <FileNames>
              {selectedFiles.map((file, index) => (
                <li key={index}> {file.name} </li>
              ))}
            </FileNames>
          </div>
        )}
        </InputWrapper>
        {selectedFiles.length > 0 && (
          <Results files={selectedFiles} />
        )}
      </>
    );
}

export default FileUpload;