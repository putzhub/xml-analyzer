import React, { useState, useEffect } from "react";
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
    //What filter objects hold
    const defaultFilter = {
        "invert": false,
        "text": "^(?!.*_|.*~- -|.*~Perform)",
        "regex": RegExp("^(?!.*_|.*~- -|.*~Perform)"),
        "tags": [], //tags active for filtering
        "tagList": [],
        //"updateTagList": updateTagList
    };
    //filter object with properties like tags, text, etc
    const [ filter, setFilter ] = useState(defaultFilter);
    
    function filterChange(event){
        switch(event.target.type) {
            case "checkbox": {
                //Toggle the tag for filtering
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
                //Turn the filter bar into regex, or disable if broken
                try{
                    setFilter({...filter,
                        "text": event.target.value,
                        "regex": RegExp(event.target.value)});
                }catch(e){
                    if(e.name === "SyntaxError"){
                        setFilter({...filter,
                            "text": event.target.value,
                            "regex": RegExp()});
                    }
                }
                return;
            }
            default: {
                return Error("unknown filter option");
            }
        }
    }

    /*          RENDER          */
    //Create list of Results
    let processed_files = [];
    for(let i = 0; i < files.length; i++){
        processed_files.push(< XMLAnalyzer 
                                key={i} 
                                file={files[i]} 
                                filter={filter}
                                updateTagList={setFilter} />);
    }

    useEffect(() => (
        files.onload = setFilter((f) => ({...f, tagList:[]}))
    ), [files]);

    return(
        <>
        <h2 style={{margin: "0"}}>Results</h2>
        <Filter onChange={filterChange} filter={filter}/>
        <ResultList>
            {processed_files}
        </ResultList>
        </>
    );
}

export default Results;