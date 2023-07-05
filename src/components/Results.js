import React, { useEffect, useState } from "react";
import { styled } from "styled-components";

const ResultList = styled.div`
font-size: 1.2rem;
max-width: 100vw;
display: grid;
grid-template-columns: repeat(auto-fill, 35rem);
text-align: left;
`;

const ResultEntry = styled.div`
margin: var(--default-margin);
padding: var(--default-padding);
background-color: var(--background-output);
border-radius: 8px;
`;

//Actual analysis of files
function XMLAnalyzer({file}){
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
        <ResultEntry>
            <h3 style={{margin: "0", fontFamily: "monospace"}}>{file.name}</h3>
            <ul>
                {results && Object.keys(results).map((key, index) => {
                    return(
                        <li key={index}>
                            {'<'}{key}{'>'}: {results[key]}{' '}
                        </li>
                    );}
                )}
            </ul>
        </ResultEntry>
    );
}

//Wrapper & hook to process the xml file contents
function Results({files}){
    let processed_files = [];

    //Create list of Results
    for(let i = 0; i < files.length; i++){
        processed_files.push(< XMLAnalyzer key={i} file={files[i]} />);
    }

    return(
        <>
        <h2>Results</h2>
        <ResultList className="results">
            {processed_files}
        </ResultList>
        </>
    );
}

export default Results;