import React from 'react';
import './searchbar.css';
import SearchButton from '../categories/searchButton';

const SearchBar1 = () => {
    return (
        <div className="search-bar-container">
            <div className="search-bar">
                <div className="input-group">
                    <span className="icon">📍</span>
                    <input type="text" placeholder="Where are you going?" className="search-input" />
                </div>
                <div className="input-group">
                    <span className="icon">📅</span>
                    <input type="date" placeholder="Check-in" className="search-input" />
                </div>
                <div className="input-group">
                    <span className="icon">📅</span>
                    <input type="date" placeholder="Check-out" className="search-input" />
                </div>
                <div className="input-group">
                    <span className="icon">👥</span>
                    <input
                        type="number"
                        placeholder="Number of people"
                        className="search-input"
                        min="1"
                        defaultValue="1"
                    />
                </div>
                <SearchButton />
            </div>
        </div>
    );
};

export default SearchBar1;
