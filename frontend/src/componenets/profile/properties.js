import React, { useState, useEffect } from "react";
import Card from "../categories/card";
import { Link } from "react-router-dom";
import Axios from "axios";

const Properties = () => {
    const [properties, setProperties] = useState([]);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchProperties = async () => {
            const storedData = localStorage.getItem('loggedInOwner');

            try {
                const loggedInOwner = storedData ? JSON.parse(storedData) : null;
                const ownerId = loggedInOwner?.id;

                if (!ownerId) {
                    setError("Owner ID is undefined. Please log in again.");
                    return;
                }

                const response = await Axios.get(`http://localhost:8000/management/properties/${ownerId}/`);

                if (response.status === 200) {
                    setProperties(response.data);
                } else {
                    setError("Failed to fetch properties.");
                }
            } catch (err) {
                console.error("Detailed error:", err);
                setError("An error occurred while fetching properties.");
            }
        };

        fetchProperties();
    }, []);

    return (
        <div className="apartment-grid" style={gridStyle}>
            {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}

            {properties.length > 0 ? (
                properties.map((property) => (
                    <Link
                        to="/details"
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