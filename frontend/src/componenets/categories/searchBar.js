import React from 'react';
import { useNavigate } from 'react-router-dom';
import SearchButton from './searchButton';

const SearchBar = ({ defaultCategory }) => {
    const navigate = useNavigate();

    const handleCategoryChange = (category) => {
        if (category === 'apartments') {
            navigate('/apartments');
        } else if (category === 'vacationHouses') {
            navigate('/vacation_houses');
        }
    };

    return (
        <div className="search-bar">
            <input type="text" placeholder="Destination" className="search-input" />
            <input type="date" placeholder="Check-in" className="search-input" />
            <input type="date" placeholder="Check-out" className="search-input" />
            <input
                type="number"
                placeholder="Number of people"
                className="search-input"
            />
            <div className="categories">
                <fieldset>
                    <div className="button-group">
                        <input
                            type="radio"
                            id="apartments"
                            name="category"
                            defaultChecked={defaultCategory === 'apartments'}
                            onChange={() => handleCategoryChange('apartments')}
                        />
                        <label htmlFor="apartments">Apartments</label>
                    </div>
                    <div className="button-group">
                        <input
                            type="radio"
                            id="vacationHouses"
                            name="category"
                            defaultChecked={defaultCategory === 'vacationHouses'}
                            onChange={() => handleCategoryChange('vacationHouses')}
                        />
                        <label htmlFor="vacationHouses">Vacation Houses</label>
                    </div>
                </fieldset>
            </div>
            <SearchButton />
        </div>
    );
};

export default SearchBar;
