import React from "react";
import { styled } from "styled-components";

import XMLAnalyzer from "./XMLAnalyzer";

const ResultList = styled.div`
font-size: 1.2rem;
max-width: 100vw;
display: grid;
grid-template-columns: repeat(auto-fit, 35rem);
justify-content: center;
text-align: left;
`;



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
        <ResultList>
            {processed_files}
        </ResultList>
        </>
    );
}

export default Results;