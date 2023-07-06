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
function XMLAnalyzer({file}, {filter}){
    //Initialize states
    const [results, setResults ] = useState();
    const [xmltree, setXmltree] = useState();

    //Helper functions
    function count(tree=xmltree, filter=(f)=>f) {
        //compendium of results
        let counts = {};
        //categories to return
        counts["unique"] = {};
        counts["total"] = {};
        //helper object
        let unique_sets = {};
        
        //Count total of each type of elements
        for(let element of Object.values(tree).filter(filter)) {
            //shorthand
            let tag = element.tagName;
            //---Totals---
            counts["total"][tag] = (counts["total"][tag] || 0) + 1;
            
            //--- Unique elements ---
            if(unique_sets[tag] === undefined){
                unique_sets[tag] = new Set();
            }
            unique_sets[tag].add(element.innerHTML.trim());
            //Keep the unique tally
            counts["unique"][tag] = (unique_sets[tag].size || 0) + 1;
        }

        setResults(counts);
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
            
            //Store the nodelist
            let elements = root.querySelectorAll("*");
            setXmltree(elements);
            //xmltrees not ready on first pass
            //filter is manually hardcoded for now
            count(elements, (tag)=>{
                //Search if element contains header characters like: _, ~_ ~- -
                const regex = /_|~_|~- -/g;
                let header = 
                    tag.tagName === "Question" &&
                    regex.test(tag.textContent);
                return (!header);
            });
        }

        //Read the file once we've defined how
        reader.readAsText(file);
    }, [file, filter]);

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