import React, { useState, useEffect } from "react";
import Card from "../categories/card";
import { Link } from "react-router-dom";
import Axios from "axios";

const Properties = () => {
    const [properties, setProperties] = useState([]);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchProperties = async () => {
            try {
                // Fetch logged-in owner data from localStorage
                const loggedInOwner = JSON.parse(localStorage.getItem('loggedInOwner'));
                const ownerId = loggedInOwner?.id;

                // If ownerId is not found in localStorage, log and stop execution
                if (!ownerId) {
                    console.log("Owner ID not found.");
                    setError("Owner not logged in.");
                    return;
                }

                // Request properties for the owner
                const response = await Axios.get(`http://localhost:8000/management/properties/${ownerId}/`);

                if (response.status === 200) {
                    setProperties(response.data);
                } else {
                    console.log("Failed to fetch properties.");
                    setError("Failed to fetch properties.");
                }
            } catch (err) {
                console.log("An error occurred while fetching properties.");
                console.log(err);
                setError("An error occurred while fetching properties.");
            }
        };

        fetchProperties();
    }, []);

    return (
        <div className="apartment-grid" style={gridStyle}>
            {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}

            {properties.length > 0 ? (
                properties.map((apartment, index) => (
                    <Link
                        to="/details"
                        style={{ textDecoration: "none" }}
                        key={index}
                    >
                        <Card
                            name={apartment.title} // Adjust property name based on your API response
                            stars={apartment.stars || 4} // Add default value or adapt if `stars` exist
                            price={apartment.price}
                            image={apartment.image || "/images/default.jpg"} // Add default image if `image` doesn't exist
                        />
                    </Link>
                ))
            ) : (
                <p style={{ textAlign: "center" }}>You do not have any properties yet.</p>
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
