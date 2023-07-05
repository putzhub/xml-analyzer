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

const TagEntry = styled.li`
margin-top: var(--default-margin);
`

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

const EntryContent = styled.ul`
list-style: none; 
line-height: 1.8;
`

const TagHeader = styled.h4`
${TemplateHeader}
background-color: var(--color-output);
padding: .5rem;
`

const TagContent = styled.ul`
display: flex;
justify-content: space-between;
list-style: none;
`

//Actual analysis of files
function XMLAnalyzer({file}){
    //Initialize states
    const [results, setResults ] = useState();

    //Helper functions
    function count(tree) {
        //compendium of results
        let counts = {};
        let unique_sets = {};
        //categories to return
        counts["total"] = {};
        counts["unique"] = {};
        
        //Count total of each type of elements
        for(let element of tree) {
            //Totals
            counts["total"][element.tagName] = 
                (counts["total"][element.tagName] || 0) + 1;    //check if null
            
            //Unique # of elements
            if(unique_sets[element.tagName] === undefined){
                unique_sets[element.tagName] = new Set();
            }
            unique_sets[element.tagName].add(element.innerHTML.trim());
            //Keep the unique tally
            counts["unique"][element.tagName] = 
                (unique_sets[element.tagName].size || 0) + 1;
        }

        return counts;
    }

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
            let elements = root.querySelectorAll("*");
            let counts = count(elements);

            setResults(counts);
        }

        //Read the file once we've defined how
        reader.readAsText(file);
    }, [file]);

    //Return the JSX template
    return(
        <ResultEntry>
            <EntryHeader>{file.name}</EntryHeader>
            <EntryContent>
                {/*If there's results then iterate through them*/}
                {results && Object.keys(results.total).map((key, index) => {
                    console.assert( //Relies on this assumption
                        results.total.keys === results.unique.keys, 
                        "results.total & results.unique differ");
                    return(
                        <TagEntry key={index}>
                            <TagHeader>{key}</TagHeader> 
                            <TagContent>
                                <li>Total: {results.total[key]}{' '}</li>
                                <li><em>Unique: {results.unique[key]}{' '}</em></li>
                            </TagContent>
                        </TagEntry>
                    );}
                )}
            </EntryContent>
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