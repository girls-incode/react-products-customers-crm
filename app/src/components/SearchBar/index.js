import React from 'react';
import './style.scss';

function SearchBar({ searchHandler }) {
    return (
        <div className='m-auto my-5 text-center search-bar'>
            <input
                type='search'
                autoFocus
                autoComplete='off'
                id='search'
                className='search-bar--search form-control'
                placeholder='search customers or quotes...'
                onChange={searchHandler} />
        </div>
    )
}

export default SearchBar
