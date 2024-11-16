import React from 'react';
import Categories from './categories';

const SearchBar = () => {
    return (
        <div className="search-bar">
            <input type="text" placeholder="Destination" />
            <input type="date" placeholder="Check-in" />
            <input type="date" placeholder="Check-out" />
            <input type="number" placeholder="Number of people" />
            <Categories />
            <button>Search</button>
        </div>
    );
};

export default SearchBar;
