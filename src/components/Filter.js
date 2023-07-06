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

//TODO
//Searchbar pre-populated with header RegExp
//Filter checkboxes that select which tags to apply the filter to

/*          COMPONENTS          */
function FilterOptions({onChange}){
    return(
        <div>
            <label htmlFor="headers">Search Filter</label>
            <input 
                type="text" 
                id="headers" 
                name="headers" 
                value={/_|~_|~- -/g}
                onChange={onChange}
                />{" "}
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