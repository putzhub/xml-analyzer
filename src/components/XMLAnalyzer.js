import React, { useState } from "react";

class XMLHandler{
    constructor(elements){
        this.elements = elements;
    }
    count(){
        for(let element of this.elements){
            console.log(element);
        }
    }
}

function XMLAnalyzer({files}){
    //initialize tools
    const reader = new FileReader();
    const parser = new DOMParser();
    let XMLTrees = [];

    //Parse the .xml files
    reader.onload = (event) => {
        //Get contents from the reader passed readAsText(), then parse
        const contents = event.target.result;
        const root = parser.parseFromString(contents, 'application/xml');
        //Select all elements to be analyzed
        XMLTrees.push(new XMLHandler(root.querySelectorAll('*')));

        XMLTrees[0].count();
    }

    //Read the files
    reader.readAsText(files[0]);

    return(
        <p>Submitted</p>
    );
}

export default XMLAnalyzer;