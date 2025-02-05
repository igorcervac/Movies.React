import React from "react";

const SearchBox = (props: any) => {
    return (
        <input className='searchbox' type='text' placeholder='Type your movie...'
            value={props.searchValue}
            onChange={props.searchHandler}/>
    );
}

export default SearchBox;