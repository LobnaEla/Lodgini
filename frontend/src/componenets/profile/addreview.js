import React, { useState } from 'react';
import Footer from '../home/footer';
import Navbar from '../home/navbar1';

export const Addreview = () => {
  const [rating, setRating] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const handleRating = (value) => {
    setRating(value);
  };

  return (
    <div style={{ backgroundColor: '#ede7e3' }}>
      <Navbar />

      <div style={{ marginBottom: '2%' }}>
        <h2 style={{ color: '#023047' }}>Add a Review</h2>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <select style={{ backgroundColor: '#ead2ac', color: '#000', padding: '10px', width: '50%' }}>
          <option>Choose accommodation</option>
          {/* Ajoutez des options pour les différents types d'hébergement */}
        </select>
      </div>

      <div style={{ marginBottom: '20px', textAlign: 'left', marginLeft: '25%' }}>
        <h3 style={{ color: '#023047' }}>Review Details</h3>
      </div>

      <div>
        <textarea
          style={{ width: '50%', height: '150px', padding: '10px', border: '1px solid #ccc', borderRadius: '5px' }}
          placeholder="Write here"
        ></textarea>
      </div>

      {/* Section de notation par étoiles */}
      <div className="rating" style={{ marginTop: '1%', textAlign: 'left', marginLeft: '25%' }}>
        {[1, 2, 3, 4, 5].map((value) => (
          <span
            key={value}
            className={`star ${rating >= value ? 'filled' : ''}`}
            onClick={() => handleRating(value)}
            style={{ cursor: 'pointer', fontSize: '2em', color: rating >= value ? '#D69E66' : '#ccc' }}
          >
            &#9733;
          </span>
        ))}
      </div>

      {/* Ajouter le bouton "Add Review" */}
      <div style={{ textAlign: 'left', marginTop: '20px', marginLeft: '25%', marginBottom: '1%' }}>
        <button
          style={{
            backgroundColor: '#16697a',
            color: '#ede7e3',
            padding: '10px 20px',
            border: 'none',
            borderRadius: '5px',
            fontSize: '16px',
            cursor: 'pointer',

          }}
        >
          Add Review
        </button>
      </div>

      <Footer />
    </div>
  );
};
