import React, { useEffect, useState } from "react";

/*
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
*/
/* 

SEE IF THIS HELPS: 
https://developer.mozilla.org/en-US/docs/Web/API/FileReader/load_event

*/

function Results({file}){
    const [results, setResults ] = useState();

    useEffect( () => {
        let counts = {};

        const parser = new DOMParser();
        const reader = new FileReader();
        
        reader.onload = (event) => {
            //Get contents from the reader passed readAsText(), then parse
            const contents = event.target.result;
            const root = parser.parseFromString(contents, 'application/xml');
            
            //Count all elements
            for(let element of root.querySelectorAll("*")){
                counts[element.tagName] = 
                    (counts[element.tagName] || 0) + 1;    //check if null
            }

            setResults(counts);
        }
        reader.readAsText(file);
    }, [file]);
    if(results){
        console.log(Object.keys(results));
    }
    return(
        <>
            <h3>{file.name}</h3>
            <div className="file-names">
                {results && Object.keys(results).map((key, index) => {
                    return(
                        <li key={index}>
                            {key}: {results[key]}{' '}

                        </li>
                    );}
                )}
            </div>
        </>
    );
}

function XMLAnalyzer({files}){
    let processed_files = [];

    //Create list of Results
    for(let i = 0; i < files.length; i++){
        processed_files.push(< Results key={i} file={files[i]} />);
    }

    return(
        <>
        <h2>Results</h2>
        {processed_files}
        </>
    );
}

export default XMLAnalyzer;