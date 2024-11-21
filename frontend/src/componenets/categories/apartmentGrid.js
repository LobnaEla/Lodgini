import React from "react";
import Card from "./card";
import { Link } from "react-router-dom";

const apartments = [
    { name: "Flat in Jasmin Building", stars: 4, price: "84", image: "/images/apartement.jpg" },
    { name: "Appart’ Medina", stars: 5, price: "129", image: "/images/apartement.jpg" },
    { name: "La Suite Zembra", stars: 3, price: "64", image: "/images/apartement.jpg" },
    { name: "Le Patio Andalou", stars: 4, price: "156", image: "/images/apartement.jpg" },
    // Add more apartments here
];

const ApartmentGrid = () => {
    return (
        <div className="apartment-grid" style={gridStyle}>
            {apartments.map((apartment, index) => (
                <Link
                    to="/details"
                    style={{ textDecoration: "none" }}
                    key={index}
                >
                    <Card
                        name={apartment.name}
                        stars={apartment.stars}
                        price={apartment.price}
                        image={apartment.image}
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
