import React, { useEffect, useState } from "react";
import { styled } from "styled-components";

const ResultList = styled.div`
font-size: 1.2rem;
max-width: 100vw;
display: grid;
grid-template-columns: repeat(auto-fit, 35rem);
align-content: center;
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

    //Read the actual file with useEffect
    useEffect( () => {
        let counts = {};

        //initialize the tools
        const parser = new DOMParser();
        const reader = new FileReader();
        
        //Read the file contents & turn into XML trees
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

        //Read the file once we've defined how
        reader.readAsText(file);
    }, [file]);

    //Return the JSX template
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