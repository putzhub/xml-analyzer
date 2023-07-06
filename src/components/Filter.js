import React from "react";
import { styled } from "styled-components";

/*          STYLES          */
/*
const FilterSearch = styled.input`
width: 50%;
font-size: 2rem;
`
const FilterCheckbox = styled.input`
font-size: 2rem;
`
*/

/*          COMPONENTS          */
function FilterOptions({onChange}){
    return(
        <div>
            <input 
                type="checkbox" 
                id="headers" 
                name="headers" 
                value="In Progress"
                onChange={onChange}
                checked/>{" "}
            <label htmlFor="headers">Remove Headers from Unique Question count</label>
        </div>
    );
}

function Filter({onChange}){
    return(
        <form>
            <h3 style={{marginBottom: "0"}}>Filter</h3>
            {/*Maybe? <FilterSearch type="search" name="search" />*/}
            <FilterOptions onChange={onChange}/>
        </form>
    );
}

export default Filter;