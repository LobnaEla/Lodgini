import React, { useState, useEffect } from "react";
import Card from "./card";
import { Link } from "react-router-dom";
import axios from "axios";

const ApartmentGrid = ({ propertyType }) => {
    const [properties, setProperties] = useState([]);

    useEffect(() => {
        const fetchProperties = async () => {
            try {
                const response = await axios.get("http://localhost:8000/management/properties/");
                const filteredProperties = response.data.filter(
                    (property) => property.property_type === propertyType
                );
                setProperties(filteredProperties);
            } catch (error) {
                console.error("Error fetching properties:", error);
            }
        };

        fetchProperties();
    }, [propertyType]);

    return (
        <div className="apartment-grid" style={gridStyle}>
            {properties.map((property, index) => (
                <Link
                    to="/details"
                    style={{ textDecoration: "none" }}
                    key={index}
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
