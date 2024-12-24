import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SearchButton from './searchButton';
import './searchbar.css';

const locations = [
    "Ariana", "Beja", "Ben Arous", "Bizerte", "Gabes", "Gafsa", "Jendouba",
    "Kairouan", "Kasserine", "Kebili", "La Manouba", "Le Kef", "Mahdia",
    "Medenine", "Monastir", "Nabeul", "Sfax", "Sidi Bouzid", "Siliana",
    "Sousse", "Tataouine", "Tozeur", "Tunis", "Zaghouan"
];

const SearchBar = ({ defaultCategory }) => {
    const [formData, setFormData] = useState({
        location: '',
        checkIn: '',
        checkOut: '',
        numberOfPeople: '',
        category: defaultCategory || 'apartments',
    });
    const [filteredLocations, setFilteredLocations] = useState(locations);
    const navigate = useNavigate();
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [isInteractingWithSuggestions, setIsInteractingWithSuggestions] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        // Update form data
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));

        // Filter location suggestions
        if (name === 'location') {
            const filtered = locations.filter((loc) =>
                loc.toLowerCase().startsWith(value.toLowerCase())
            );
            setFilteredLocations(filtered);
        }
    };

    const handleCategoryChange = (category) => {
        setFormData((prevData) => ({
            ...prevData,
            category,
        }));

        // Navigate to the appropriate page with the selected category
        const route = category === 'vacationHouses' ? 'vacation_houses' : category;
        navigate(`/${route}`);
    };

    const handleSearch = () => {
        const { location, checkIn, checkOut, numberOfPeople, category } = formData;

        if (!location || !locations.includes(location)) {
            alert("Please select a valid location from the suggestions.");
            return;
        }

        const query = new URLSearchParams({
            location,
            checkIn,
            checkOut,
            numberOfPeople,
        }).toString();

        // Navigate to the appropriate page with search criteria
        navigate(`/${category}?${query}`);
    };

    const handleLocationSelect = (location) => {
        setFormData((prevData) => ({
            ...prevData,
            location,
        }));
        setShowSuggestions(false);
    };

    const handleBlur = () => {
        // Only hide suggestions if not interacting with them
        if (!isInteractingWithSuggestions) {
            setTimeout(() => setShowSuggestions(false), 100);
        }
    };

    const handleSuggestionMouseEnter = () => {
        setIsInteractingWithSuggestions(true);
    };

    const handleSuggestionMouseLeave = () => {
        setIsInteractingWithSuggestions(false);
    };

    return (
        <div className="search-bar-container">
            <div className="search-bar">
                <div className="input-group">
                    <span className="icon">📍</span>
                    <select
                        name="location"
                        value={formData.location}
                        onChange={handleInputChange}
                        className="search-input"
                    >
                        <option value="">Select a location</option>
                        {locations.map((loc, index) => (
                            <option key={index} value={loc}>
                                {loc}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="input-group">
                    <span className="icon">📅</span>
                    <input
                        type="date"
                        name="checkIn"
                        value={formData.checkIn}
                        onChange={handleInputChange}
                        placeholder="Check-in"
                        className="search-input"
                    />
                </div>
                <div className="input-group">
                    <span className="icon">📅</span>
                    <input
                        type="date"
                        name="checkOut"
                        value={formData.checkOut}
                        onChange={handleInputChange}
                        placeholder="Check-out"
                        className="search-input"
                    />
                </div>
                <div className="input-group" style={{ width: "130px" }}>
                    <span className="icon">👥</span>
                    <input
                        type="number"
                        name="numberOfPeople"
                        value={formData.numberOfPeople}
                        onChange={handleInputChange}
                        placeholder="Number"
                        className="search-input"
                    />
                </div>
                <div className="categories">
                    <fieldset>
                        <div className="button-group">
                            <input
                                type="radio"
                                id="apartments"
                                name="category"
                                checked={formData.category === 'apartments'}
                                onChange={() => handleCategoryChange('apartments')}
                            />
                            <label htmlFor="apartments">Apartments</label>
                        </div>
                        <div className="button-group">
                            <input
                                type="radio"
                                id="vacationHouses"
                                name="category"
                                checked={formData.category === 'vacationHouses'}
                                onChange={() => handleCategoryChange('vacationHouses')}
                            />
                            <label htmlFor="vacationHouses">Vacation Houses</label>
                        </div>
                    </fieldset>
                </div>
                <SearchButton onClick={handleSearch} />
            </div>
        </div>
    );
};

export default SearchBar;
