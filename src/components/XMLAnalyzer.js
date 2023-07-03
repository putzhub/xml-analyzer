import React from "react";

class XMLHandler{
    constructor(elements){
        this.elements = elements;
        this.counts = {};
        
        //Count all elements
        for(let element of this.elements){
            this.counts[element.tagName] = 
                (this.counts[element.tagName] || 0) + 1;    //check if null
        }
    }
    count(){
        

        /*let element_counts = {};
        
        for(let element of this.elements){
            if(element_counts[element.name]){
                element_counts[element.name] += 1;
            } else{
                element_counts[element.name] = 1;
            }
            console.log(element_counts);
        }*/
    }
}

function XMLAnalyzer({files}){
    //initialize tools
    const reader = new FileReader();
    const parser = new DOMParser();
    let XMLTrees = [];      //change to useState?

    //Parse the .xml files
    reader.onload = (event) => {
        //Get contents from the reader passed readAsText(), then parse
        const contents = event.target.result;
        const root = parser.parseFromString(contents, 'application/xml');
        //Select all elements to be analyzed
        XMLTrees.push(new XMLHandler(root.querySelectorAll('*')));

        console.log(XMLTrees[0].counts);
    }

    //Read the files
    reader.readAsText(files[0]);

    return(
        <p>Submitted</p>
    );
}

export default XMLAnalyzer;