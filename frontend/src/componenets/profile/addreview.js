import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Footer from '../home/footer';
import Navbar from '../home/navbar1';

export const Addreview = () => {
  const [rating, setRating] = useState(0);
  const [properties, setProperties] = useState([]);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [reviewText, setReviewText] = useState('');
  const [message, setMessage] = useState(''); // État pour afficher un message après soumission

  const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
  const userId = loggedInUser?.id;

  const handlePropertyChange = (event) => {
    setSelectedProperty(event.target.value);
  };

  const handleRating = (value) => {
    setRating(value);
  };

  const handleReviewTextChange = (event) => {
    setReviewText(event.target.value);
  };

  const submitReview = async () => {
    if (!selectedProperty || !reviewText || !rating) {
      setMessage('All fields are required!');
      return;
    }

    try {
      const response = await axios.post('http://localhost:8000/management/create_review/', {
        user_id: userId,
        property_id: selectedProperty,
        review: reviewText,
        stars: rating,
      });

      setMessage('Review added successfully!');
      setReviewText('');
      setRating(0);
      setSelectedProperty(null);
    } catch (error) {
      console.error('Error creating review:', error);
      setMessage('Failed to add review. Please try again.');
    }
  };

  useEffect(() => {
    const fetchReservedProperties = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/management/reserved_properties/${userId}/`);
        setProperties(response.data);
      } catch (error) {
        console.error('Error fetching reserved properties:', error);
      }
    };

    if (userId) {
      fetchReservedProperties();
    }
  }, [userId]);

  return (
    <div style={{ backgroundColor: '#ede7e3' }}>
      <Navbar />
  
      {/* Message at the top */}
      {message && (
        <div style={{ textAlign: 'center', marginTop: '20px', color: message.includes('success') ? '#43D649' : '#f2002c' }}>
          {message}
        </div>
      )}
  
      <div style={{ marginBottom: '2%' }}>
        <h2 style={{ color: '#023047' }}>Add a Review</h2>
      </div>
  
      <div style={{ marginBottom: '20px' }}>
        <select
          style={{ backgroundColor: '#ead2ac', color: '#000', padding: '10px', width: '50%' }}
          onChange={handlePropertyChange}
          value={selectedProperty || ''}
        >
          <option value="">Choose accommodation</option>
          {properties.map((property) => (
            <option key={property.id} value={property.id}>
              {property.name}
            </option>
          ))}
        </select>
      </div>
  
      <div style={{ marginBottom: '20px', textAlign: 'left', marginLeft: '25%' }}>
        <h3 style={{ color: '#023047' }}>Review Details</h3>
      </div>
  
      <div>
        <textarea
          style={{
            width: '50%',
            height: '150px',
            padding: '10px',
            border: '1px solid #ccc',
            borderRadius: '5px',
          }}
          placeholder="Write here"
          value={reviewText}
          onChange={handleReviewTextChange}
        ></textarea>
      </div>
  
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
  
      <div style={{ textAlign: 'left', marginTop: '20px', marginLeft: '25%', marginBottom: '1%' }}>
        <button
          onClick={submitReview}
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