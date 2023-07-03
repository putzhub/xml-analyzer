import React, { useState } from "react";

import XMLAnalyzer from "./XMLAnalyzer";

function FileUpload() {
    //Hold our and manipulate selectedFiles as State
    const [selectedFiles, setSelectedFiles] = useState([]);
  
    
    //Update which files have been selected
    const handleFileChange = (event) => {
        let files = event.target.files;
        //Update file list, only if .xml
        setSelectedFiles([...files].filter(
            file => file.name.slice(-3) === "xml"
        ));
    }
  
    //Template
    return(
      <>
        < input type="file" name="files" onChange={handleFileChange} multiple/>
        {selectedFiles.length > 0 && (
          <div>
            <h2>Selected Files:</h2>
            <ul className="file-names">
              {selectedFiles.map((file, index) => (
                <li key={index}> {file.name} </li>
              ))}
            </ul>
            <XMLAnalyzer files={selectedFiles} />
          </div>
        )}
      </>
    );
}

export default FileUpload;