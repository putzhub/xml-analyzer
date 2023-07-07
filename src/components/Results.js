import React, { useState } from "react";
import { styled } from "styled-components";

import XMLAnalyzer from "./XMLAnalyzer";
import Filter from "./Filter";

const ResultList = styled.div`
font-size: 1.2rem;
max-width: 100vw;
display: grid;
grid-template-columns: repeat(auto-fit, 35rem);
justify-content: center;
text-align: left;
`;

// TODO
// Implement filter as regex instead & pass filters by via through <Filter>

//Wrapper & default export hook to process the xml file contents
function Results({files}){
    //Initialize State
    const [ tagNames, setTagNames ] = useState([]);
    const defaultFilter = {
        "text": "^(?!.*_|.*~- -|.*~Perform)",
        "regex": RegExp("^(?!.*_|.*~- -|.*~Perform)"),
        "tags": [],
        "tagNames": tagNames
    };
    //filter object with properties like tags, text, etc
    const [ filter, setFilter ] = useState(defaultFilter);
    
    //Non-state variables
    let processed_files = [];

    function render() {
        //Create list of Results
        for(let i = 0; i < files.length; i++){
            processed_files.push(< XMLAnalyzer 
                                    key={i} 
                                    file={files[i]} 
                                    filter={filter}
                                    setTagNames={setTagNames} />);
        }
    };

    function filterChange(event){
        switch(event.target.type) {
            case "checkbox": {
                if(!filter.tags.includes(event.target.value)){
                    setFilter({...filter, tags: 
                                            [...filter.tags, event.target.value]});
                } else {
                    setFilter({...filter, tags: filter.tags.filter(
                                            (t) => t !== event.target.value)});
                };
                return;
            }
            case "text": {
                setFilter({...filter,
                    "text": event.target.value,
                    "regex": RegExp(event.target.value)});
                return;
            }
            default: {
                return Error("unknown filter option");
            }
        }
    }

    //Make sure it renders the first time
    render();

    return(
        <>
        <h2 style={{margin: "0"}}>Results</h2>
        <Filter onChange={filterChange} filter={filter} tagNames={tagNames}/>
        <ResultList>
            {processed_files}
        </ResultList>
        </>
    );
}

export default Results;