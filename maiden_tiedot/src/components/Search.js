import React from 'react'

const Search = (props) => {
    return (
        <form>
            Search countries 
            <input value={props.newSearch}
            onChange={props.searchChangeListener} />
        </form>
    )
}

export default Search