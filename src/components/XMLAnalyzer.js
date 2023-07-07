import React, { useEffect, useState } from "react";
import { styled } from "styled-components";

/*          STYLE           */
//Template
const TemplateHeader = `
max-width: 100%;
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
const FileHeader = styled.h3`
${TemplateHeader}
background-color: var(--color-contrast);
`
const FileContent = styled.div`
display: grid;
grid-template-columns: auto auto;
list-style: none; 
line-height: 1.5;
`

//Tag
const TagEntry = styled.div`
max-height: 4.5rem;
`
const TagHeader = styled.h4`
${TemplateHeader}
display: inline-block;
margin: var(--default-margin);
margin-bottom: 0;
padding: 0;
background-color: var(--color-output);
padding: .5rem;
max-height: 2rem;
`
const TagContent = styled.ul`
margin: var(--default-margin) 0;
padding: 0;
display: flex;
justify-content: space-evenly;
list-style: none;
`

/*          COMPONENTS          */
//Actual analysis of files
function XMLAnalyzer({file, filter, updateTagList}){
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
            //convert for setter
            tagNames = Array.from(tagNames);
            //Call setFilter on Results through a prop to update the TagList
            updateTagList(f => ({...f, "tagList": 
                                    [...f.tagList, 
                                    ...tagNames.filter((tag) => !f.tagList.includes(tag))]
                                }));
        }
        //Read the file once we've defined how
        reader.readAsText(file);
    }, [file, updateTagList]); //watching filter while changing it is breaking it

    //Count the file's contents whenever filter is update or a new file is loaded
    useEffect( () => {
        function apply_filter(element){
            if(filter.tags.includes(element.tagName)){
                return filter.regex.test(element.textContent);
            } else {
                return true;
            }
        }
        //Make sure nodelist isn't empty
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

    /*          JSX TEMPLATE            */
    return(
        <ResultEntry>
            <FileHeader>{file.name}</FileHeader>
            <FileContent>
                {/*If there's results then iterate through them*/}
                {results && Object.keys(results.total).sort().map((key, index) => {
                    console.assert( //Relies on this assumption
                        results.total.keys === results.unique.keys, 
                        "results.total & results.unique - different keys detected");
                    return(
                        <React.Fragment key={index}>
                        <TagHeader>{key}</TagHeader> 
                        <TagEntry>
                            <TagContent>
                                <li><strong>Total:</strong><br/> {results.total[key]}{' '}</li>
                                <li><em>Unique:<br/> {results.unique[key]}{' '}</em></li>
                            </TagContent>
                        </TagEntry>
                        </React.Fragment>
                    );
                })}
            </FileContent>
        </ResultEntry>
    );
}

export default XMLAnalyzer;