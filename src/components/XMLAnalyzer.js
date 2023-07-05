import React, { useEffect, useState } from "react";
import { styled } from "styled-components";

/*          STYLE           */
//Template
const TemplateHeader = `
padding: var(--default-padding);
margin: 0;
font-family: monospace;
border-radius: var(--default-border-radius);
color: var(--background-color);
`

//Entry
const ResultEntry = styled.div`
margin: var(--default-margin);
padding: var(--default-padding);
background-color: var(--background-output);
border-radius: 8px;
`;
const EntryHeader = styled.h3`
${TemplateHeader}
background-color: var(--color-contrast);
`
const EntryContent = styled.ul`
list-style: none; 
line-height: 1.8;
`

//Tag
const TagEntry = styled.li`
margin-top: var(--default-margin);
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

/*          COMPONENTS          */
//Actual analysis of files
function XMLAnalyzer({file}){
    //Initialize states
    const [results, setResults ] = useState();

    //Helper functions
    function count(tree) {
        //compendium of results
        let counts = {};
        //categories to return
        counts["unique"] = counts["total"] = {};
        //helpers
        let unique_sets = {};
        
        //Count total of each type of elements
        for(let element of tree) {
            //shorthand
            let tag = element.tagName;
            //Totals
            counts["total"][tag] = 
                (counts["total"][tag] || 0) + 1;    //check if null
            
            //Unique # of elements
            if(unique_sets[tag] === undefined){
                unique_sets[tag] = new Set();
            }
            unique_sets[tag].add(element.innerHTML.trim());
            //Keep the unique tally
            counts["unique"][tag] = 
                (unique_sets[tag].size || 0) + 1;
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
            //--APPLY FILTER HERE--
            let elements = root.querySelectorAll("*");
            let counts = count(elements);

            //Store the results
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

export default XMLAnalyzer;