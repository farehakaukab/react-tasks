import React from 'react'
import "./../css/styles.css";


const SearchForm = ({inputValue,getBooks,onNavigateSearch})=>{
    return(
        <div>
            <input value={inputValue} onChange={getBooks}  placeholder="Search for..."/>
            <button onClick={onNavigateSearch}>Search</button>
        </div>
    );
}

export default SearchForm;