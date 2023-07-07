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
function XMLAnalyzer({file, filter}){
    //debugger;
    //Initialize states
    const [results, setResults ] = useState();
    const [nodeList, setNodeList] = useState();

    //Load the file & Extract NodeList when file changes
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
            setNodeList(elements);
            
            //get tags for filter to use
            let tagNames = new Set();
            for(let e of elements){
                tagNames.add(e.tagName);
            }
            filter.updateTagList(Array.from(tagNames));
        }

        //Read the file once we've defined how
        reader.readAsText(file);
    }, [file]); //watching filter while changing it is breaking it

    //Count the file's contents when they're updated
    useEffect( () => {
        function apply_filter(element){
            if(filter.tags.includes(element.tagName)){
                return filter.regex.test(element.textContent);
            } else {
                return true;
            }
        }
        if(nodeList){
            //compendium of results
            let counts = {};
            //categories to return
            counts["unique"] = {};
            counts["total"] = {};
            //helper object
            let unique_sets = {};
            
            //Count total of each type of elements
            //For all the value of each element test if it matches the filter
            for(let element of Object.values(nodeList).filter((e) => apply_filter(e))) {
                //shorthand
                let tag = element.tagName;

                //---Totals---
                counts["total"][tag] = (counts["total"][tag] || 0) + 1;
                
                //--- Unique elements ---
                if(unique_sets[tag] === undefined){
                    unique_sets[tag] = new Set();
                }
                unique_sets[tag].add(element.textContent.trim());
                //Keep the unique tally
                counts["unique"][tag] = (unique_sets[tag].size || 0) + 1;
            }
    
            setResults(counts);
        }
    }, [nodeList, filter]);
    //Read the actual file with useEffect, pass [file] so it only renders once
    /*
    useEffect( () => {
        if(file !== currentFile){
            //initialize the tools
            const parser = new DOMParser();
            const reader = new FileReader();
            setCurrentFile(file);
            //Read the file contents & turn into XML trees
            reader.onload = (event) => {
                //Get contents from the reader passed readAsText(), then parse
                const contents = event.target.result;
                const root = parser.parseFromString(contents, 'application/xml');
                //Store the nodelist
                let elements = root.querySelectorAll("*");

                //get tags for filter to use
                let tagNames = new Set();
                for(let e of elements){
                    tagNames.add(e.tagName);
                }
                filter.updateTagList(Array.from(tagNames));

                //nodeLists not ready on first pass, use elements first.
                count(elements);
                //Save this so we don't have to read the file again for filters.
                setNodeList(elements);
            }

            //Read the file once we've defined how
            reader.readAsText(file);
        } else {
            count();
        }
    }, [file, filter]); //watching filter while changing it is breaking it
    */

    /*          JSX TEMPLATE            */
    return(
        <ResultEntry>
            <EntryHeader>{file.name}</EntryHeader>
            <EntryContent>
                {/*If there's results then iterate through them*/}
                {results && Object.keys(results.total).sort().map((key, index) => {
                    console.assert( //Relies on this assumption
                        results.total.keys === results.unique.keys, 
                        "results.total & results.unique - different keys detected");
                    return(
                        <TagEntry key={index}>
                            <TagHeader>{key}</TagHeader> 
                            <TagContent>
                                <li>Total: {results.total[key]}{' '}</li>
                                <li><em>Unique: {results.unique[key]}{' '}</em></li>
                            </TagContent>
                        </TagEntry>
                    );
                })}
            </EntryContent>
        </ResultEntry>
    );
}

export default XMLAnalyzer;