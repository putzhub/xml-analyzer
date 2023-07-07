import React from "react";
import { styled } from "styled-components";

/*          STYLES          */
//Groups
const FilterForm = styled.form`
background-color: var(--background-output);
border-radius: var(--default-border-radius);
padding: var(--default-padding);
`
const FilterGroup = styled.ul`
list-style:none;
margin-top: 0;
text-align: left;
`
const FilterItem = styled.li`
display: inline-block;
`
//Inputs
const FilterSearch = styled.input`
width: 50%;
font-size: 1.6rem;
`
const FilterCheckbox = styled.input`
font-size: 1.6rem;
`
const FilterLabel = styled.label`
font-size: 1rem;
margin-right: var(--default-margin);
`

//TODO
//Searchbar pre-populated with header RegExp
//Filter checkboxes that select which tags to apply the filter to

/*          COMPONENTS          */
function Filter({onChange, filter}){
    return(
        <FilterForm>
            <h3 style={{margin: "0"}}>Filter</h3>
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
                <FilterGroup>
                <h4 style={{fontSize: "1rem", marginBottom: "0"}}>Apply filter to these tags:</h4>
                {filter.tagList.map((tagName, i) => (
                    <FilterItem key={i} >
                    <FilterCheckbox
                        key={`checkbox${i}`}
                        type="checkbox" 
                        id={tagName} 
                        name={tagName} 
                        value={tagName}
                        onChange={onChange} />
                    <FilterLabel key={`label${i}`} htmlFor={tagName}>{tagName}</FilterLabel>
                    </FilterItem>
                ))}
                </FilterGroup>
            </div>
        </FilterForm>
    );
}

export default Filter;