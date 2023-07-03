import React, { useState } from "react";

class XMLHandler{
    constructor(elements){
        this.filepath = "tbd";
        this.elements = elements;
        this.counts = {};
        
        //Count all elements
        for(let element of this.elements){
            this.counts[element.tagName] = 
                (this.counts[element.tagName] || 0) + 1;    //check if null
        }
    }
}

/* 

SEE IF THIS HELPS: 
https://developer.mozilla.org/en-US/docs/Web/API/FileReader/load_event

*/

function XMLAnalyzer({files}){
    //initialize state
    const [XMLTrees, setXMLTrees] = useState([]);
    //initialize tools
    const reader = new FileReader();
    const parser = new DOMParser();
    //let XMLTrees = [];      //change to useState

    //Parse the .xml files
    reader.onload = (event) => {
        //Get contents from the reader passed readAsText(), then parse
        const contents = event.target.result;
        const root = parser.parseFromString(contents, 'application/xml');
        //Select all elements to be analyzed
        //XMLTrees.push(new XMLHandler(root.querySelectorAll('*')));
    }

    //Read the files
    reader.readAsText(files[0]);

    return(
        <>
        <p>Submitted</p>
        {/* Create report views */}
        </>
    );
}

export default XMLAnalyzer;