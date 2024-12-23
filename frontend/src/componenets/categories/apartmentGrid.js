import React, { useState, useEffect } from "react";
import Card from "./card";
import { Link } from "react-router-dom";
import axios from "axios";

const ApartmentGrid = ({ propertyType, furnishingType }) => {
    const [properties, setProperties] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const [filteredHouses, setFilteredHouses] = useState([]);
    const { search } = useLocation();
    const queryParams = new URLSearchParams(search);

    const location = queryParams.get('location');
    const checkIn = queryParams.get('checkIn');
    const checkOut = queryParams.get('checkOut');
    const numberOfPeople = queryParams.get('numberOfPeople');

    useEffect(() => {
        const fetchProperties = async () => {
            try {
                setIsLoading(true);
                const response = await axios.get("http://localhost:8000/management/properties/");
                setProperties(response.data);  // Save all properties
                console.log(response.data)
            } catch (error) {
                console.error("Error fetching properties:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchProperties();
    }, []);

    // Filter properties based on propertyType and furnishingType
    const filteredProperties = properties.filter(
        (property) =>
            (propertyType ? property.property_type === propertyType : true) &&
            (furnishingType ? property.furnishing_type === furnishingType : true)
    );
    console.log("filtered:", filteredProperties);
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
