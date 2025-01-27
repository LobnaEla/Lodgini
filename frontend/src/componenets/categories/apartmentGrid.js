import React, { useState, useEffect } from "react";
import Card from "./card";
import { Link } from "react-router-dom";
import axios from "axios";
import { useLocation } from "react-router-dom";

const ApartmentGrid = ({ propertyType, furnishingType }) => {
    const [properties, setProperties] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const [filteredHouses, setFilteredHouses] = useState([]);
    const { search } = useLocation();
    const queryParams = new URLSearchParams(search);
    const searchName = queryParams.get('name');

    const location = queryParams.get('location');
    const checkIn = queryParams.get('checkIn');
    const checkOut = queryParams.get('checkOut');
    const numberOfPeople = queryParams.get('numberOfPeople');

    useEffect(() => {
        const fetchProperties = async () => {
            try {
                setIsLoading(true);

                // If there are search parameters, use search endpoint
                if (location || checkIn || checkOut || numberOfPeople) {
                    const searchParams = new URLSearchParams({
                        location: location || '',
                        checkIn: checkIn || '',
                        checkOut: checkOut || '',
                        numberOfPeople: numberOfPeople || '',
                        propertyType: propertyType || ''
                    });

                    const response = await axios.get(
                        `http://localhost:8000/management/search-properties/?${searchParams.toString()}`
                    );
                    setProperties(response.data);
                } else {
                    // If no search parameters, fetch all properties
                    const response = await axios.get("http://localhost:8000/management/properties/");
                    setProperties(response.data);
                }

            } catch (error) {
                console.error("Error fetching properties:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchProperties();
    }, [search, propertyType, location, checkIn, checkOut, numberOfPeople, searchName]);

    // Filter properties based on all criteria
    const filteredProperties = properties.filter((property) => {
        const matchesPropertyType = propertyType ? property.property_type === propertyType : true;
        const matchesFurnishing = furnishingType ? property.furnishing_type === furnishingType : true;
        const matchesSearch = searchName
            ? property.name.toLowerCase().includes(searchName.toLowerCase())
            : true;

        return matchesPropertyType && matchesFurnishing && matchesSearch;
    });

    if (isLoading) {
        return (
            <div className="loader-container">
                <section className="dots-container">
                    <div className="dot" />
                    <div className="dot" />
                    <div className="dot" />
                    <div className="dot" />
                    <div className="dot" />
                </section>
            </div>
        );
    }


    return (
        <div className="apartment-grid" style={gridStyle}>
            {filteredProperties.map((property) => (
                <Link
                    to={`/details/${property.id}`}
                    style={{ textDecoration: "none" }}
                    key={property.id}
                >
                    <Card
                        name={property.name}
                        stars={property.number_of_stars}
                        price={property.price_per_night}
                        image={`http://localhost:8000${property.image1}`}
                    />
                </Link>
            ))}
        </div>
    );
};

// Inline CSS for the grid layout
const gridStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
    gap: "1.5rem", // Space between cards
    padding: "2rem",
};

export default ApartmentGrid;