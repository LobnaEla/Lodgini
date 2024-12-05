import React, { useState, useEffect } from "react";
import Card from "../categories/card";
import { Link } from "react-router-dom";
import Axios from "axios";

const Properties = () => {
    const [properties, setProperties] = useState([]);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchProperties = async () => {
            // Debug: Check localStorage contents
            const storedData = localStorage.getItem('loggedInOwner');
            console.log("Stored localStorage data:", storedData);

            try {
                const loggedInOwner = storedData ? JSON.parse(storedData) : null;
                console.log("Parsed loggedInOwner:", loggedInOwner);

                const ownerId = loggedInOwner?.id;
                console.log("Extracted ownerId:", ownerId);

                if (!ownerId) {
                    console.error("Owner ID is undefined. Possible causes:");
                    console.error("1. Login process didn't set localStorage correctly");
                    console.error("2. 'loggedInOwner' key is incorrect");
                    console.error("3. Login response doesn't include an 'id' field");
                    return;
                }

                // Rest of your existing fetch code
                const response = await Axios.get(`http://localhost:8000/management/properties/${ownerId}/`);
                // ... rest of the code
            } catch (err) {
                console.error("Detailed error:", err);
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
