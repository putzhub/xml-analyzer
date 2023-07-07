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
    //so we can update tagList from XMLAnalyzer (and elsewhere if needed)
    function updateTagList(setter_function){
        /*setFilter({...filter, tagList: 
                        [...filter.tagList, 
                        ...tagArray.filter((tag) => !filter.tagList.includes(tag))]})*/
        //setFilter({...filter, tagList: [ ...tagArray]})
        debugger;
        setFilter(setter_function);
    }
    //What filter objects hold
    const defaultFilter = {
        "text": "^(?!.*_|.*~- -|.*~Perform)",
        "regex": RegExp("^(?!.*_|.*~- -|.*~Perform)"),
        "tags": [], //tags active for filtering
        "tagList": [],
        "updateTagList": updateTagList
    };
    //filter object with properties like tags, text, etc
    const [ filter, setFilter ] = useState(defaultFilter);
    
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