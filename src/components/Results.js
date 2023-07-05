import React, { useEffect, useState } from "react";
import { styled } from "styled-components";

const ResultList = styled.div`
font-size: 1.2rem;
max-width: 100vw;
display: grid;
grid-template-columns: repeat(auto-fit, 35rem);
justify-content: center;
text-align: left;
`;

const ResultEntry = styled.div`
margin: var(--default-margin);
padding: var(--default-padding);
background-color: var(--background-output);
border-radius: 8px;
`;

const TemplateHeader = `
padding: var(--default-padding);
margin: 0;
font-family: monospace;
border-radius: var(--default-border-radius);
color: var(--background-color);
`

const EntryHeader = styled.h3`
${TemplateHeader}
background-color: var(--color-contrast);
`

const TagHeader = styled.h4`
${TemplateHeader}
background-color: var(--color-output);
padding: .5rem;
`

//Actual analysis of files
function XMLAnalyzer({file}){
    function count(tree){
        let counts = {};
        
        //Count total of each type of elements
        for(let element of tree) {
            counts[element.tagName] = 
                (counts[element.tagName] || 0) + 1;    //check if null
        }

        return counts;
    }

    const [results, setResults ] = useState();

    //Read the actual file with useEffect, pass [file] so it only renders once
    useEffect( () => {
        //initialize the tools
        const parser = new DOMParser();
        const reader = new FileReader();
        
        //Read the file contents & turn into XML trees
        reader.onload = (event) => {
            //Get contents from the reader passed readAsText(), then parse
            const contents = event.target.result;
            const root = parser.parseFromString(contents, 'application/xml');
            
            //Count the elements
            let counts = count(root.querySelectorAll("*"));

            setResults(counts);
        }

        //Read the file once we've defined how
        reader.readAsText(file);
    }, [file]);

    //Return the JSX template
    return(
        <ResultEntry>
            <EntryHeader>{file.name}</EntryHeader>
            <ul style={{listStyle: "none", lineHeight: "1.8"}}>
                {/*If there's results then iterate through them*/}
                {results && Object.keys(results).map((key, index) => {
                    return(
                        <li key={index} style={{marginTop:"var(--default-margin)"}}>
                            <TagHeader>{key}</TagHeader> 
                            <ul style={{display:"flex", 
                                        justifyContent:"space-between",
                                        listStyle:"none"}}>
                                <li>
                                    Total: {results[key]}{' '}
                                </li>
                                <li><em>Unique: TBD</em></li>
                            </ul>
                        </li>
                    );}
                )}
            </ul>
        </ResultEntry>
    );
}

//Wrapper & default export hook to process the xml file contents
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