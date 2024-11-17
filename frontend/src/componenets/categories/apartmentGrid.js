import React from 'react';
import Card from './card';
import { Link } from 'react-router-dom';

const apartments = [
    { name: 'Flat in Jasmin Building', stars: 4, price: '84', image: '/images/apartement.jpg' },
    { name: 'Appart’ Medina', stars: 5, price: '129', image: '/images/apartement.jpg' },
    { name: 'La Suite Zembra', stars: 3, price: '64', image: '/images/apartement.jpg' },
    { name: 'Le Patio Andalou', stars: 4, price: '156', image: '/images/apartement.jpg' },
    // Add more apartments here
];

const ApartmentGrid = () => {
    return (
        <div className="apartment-grid">
            <Link to="/details" style={{ textDecoration: 'none' }}>
                {apartments.map((apartment, index) => (
                    <Card
                        key={index}
                        name={apartment.name}
                        stars={apartment.stars}
                        price={apartment.price}
                        image={apartment.image}
                    />
                ))}
            </Link>

        </div>
    );
};

export default ApartmentGrid;
