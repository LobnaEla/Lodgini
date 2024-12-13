import React, { useState, useEffect } from "react";
import Card from "../categories/card";
import { Link } from "react-router-dom";
import Axios from "axios";

const Properties = () => {
    const [properties, setProperties] = useState([]);
    const [ownerId, setOwnerId] = useState(null);
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const storedData = localStorage.getItem('loggedInOwner');
        const fetchProperties = async () => {
            try {
                setIsLoading(true);

                const loggedInOwner = storedData ? JSON.parse(storedData) : null;
                setOwnerId(loggedInOwner?.id);

                if (!loggedInOwner?.id) {
                    setError("Owner ID is undefined. Please log in again.");
                    return;
                }

                const response = await Axios.get("http://localhost:8000/management/properties/");
                if (response.status === 200) {
                    setProperties(response.data);  // Save all properties
                } else {
                    setError("Failed to fetch properties.");
                }
            } catch (error) {
                console.error("Detailed error:", error);
                setError("An error occurred while fetching properties.");
            } finally {
                setIsLoading(false);
            }
        };

        fetchProperties();
    }, []);

    // Filter properties based on owner id
    const OwnerProperties = ownerId
        ? properties.filter((property) => property.owner === ownerId)
        : []; // If no owner, return all properties

    console.log("Owner properties:", OwnerProperties);

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
            {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}

            {OwnerProperties.length > 0 ? (
                OwnerProperties.map((property) => (
                    <Link
                        to={`/property_details/${property.id}`}
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
                ))
            ) : (
                !error && <p style={{ textAlign: "center" }}>You do not have any properties yet.</p>
            )}
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

export default Properties;
