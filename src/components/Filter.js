import React from "react";
import { styled } from "styled-components";

/*          STYLES          */

const FilterSearch = styled.input`
width: 50%;
font-size: 2rem;
`
const FilterCheckbox = styled.input`
font-size: 2rem;
`
const FilterLabel = styled.label`
font-size: 1rem;
margin: var(--default-margin);
`

//TODO
//Searchbar pre-populated with header RegExp
//Filter checkboxes that select which tags to apply the filter to

/*          COMPONENTS          */
function Filter({onChange, filter, tagNames}){
    return(
        <form>
            <h3 style={{marginBottom: "0"}}>Filter</h3>
            <div>
                <label htmlFor="headers">Search Filter: </label>
                <FilterSearch 
                    type="text" 
                    id="headers" 
                    name="headers" 
                    value={filter.text}
                    onChange={onChange}
                    />{" "}
                <br/>
                {tagNames.map((tagName, i) => (
                    <React.Fragment key={i} >
                    <FilterCheckbox
                        key={`checkbox${i}`}
                        type="checkbox" 
                        id={tagName} 
                        name={tagName} 
                        value={tagName}
                        onChange={onChange} />
                    <FilterLabel key={`label${i}`} htmlFor="key">{tagName}</FilterLabel>
                    </React.Fragment>
                ))}
            </div>
        </form>
    );
}

export default Filter;