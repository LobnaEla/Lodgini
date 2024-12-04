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
                const loggedInOwner = JSON.parse(localStorage.getItem('loggedInOwner'));
                const ownerId = loggedInOwner?.id;

                if (!ownerId) {
                    setError("Owner ID not found.");
                    return;
                }

                const response = await Axios.get(`http://localhost:8000/properties/${ownerId}/`);
                if (response.status === 200) {
                    setProperties(response.data);
                } else {
                    setError("Failed to fetch properties.");
                }
            } catch (err) {
                setError("An error occurred while fetching properties.");
            }
        };

        fetchProperties();
    }, []);


    return (
        <div className="apartment-grid" style={gridStyle}>

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
                <p>You do not have any properties yet.</p>
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
