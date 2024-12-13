import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Footer from '../home/footer';
import Navbar from '../home/navbar1';
import { useNavigate } from 'react-router-dom';

export const Addreview = () => {
  const [rating, setRating] = useState(0);
  const [properties, setProperties] = useState([]);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [reviewText, setReviewText] = useState('');
  const [message, setMessage] = useState('');
  const [reviewType, setReviewType] = useState(''); // Initialisé avec une valeur vide pour ne pas avoir de sélection par défaut

  const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
  const userId = loggedInUser?.id;

  const navigate = useNavigate();

  const handlePropertyChange = (event) => {
    setSelectedProperty(event.target.value);
  };

  const handleRating = (value) => {
    setRating(value);
  };

  const handleReviewTextChange = (event) => {
    setReviewText(event.target.value);
  };

  const handleReviewTypeChange = (event) => {
    setReviewType(event.target.value);
    setSelectedProperty(null); // Réinitialiser la propriété sélectionnée si on choisit Lodgini
  };

  const submitReview = async () => {
    if (!reviewType || reviewType === '') {
      setMessage('You must choose a review type: "Review about Lodgini" or "Review about a property."');
      return;
    }
    if (!reviewText || !rating) {
      setMessage('All fields are required!');
      return;
    }

    const reviewData = {
      user_id: userId,
      review: reviewText,
      stars: rating,
      about_lodgini: reviewType === 'lodgini', // Si le type est Lodgini, on met à true
    };

    if (reviewType === 'property') {
      if (!selectedProperty) {
        setMessage('You must select a property for the review.');
        return;
      }
      reviewData.property_id = selectedProperty;
    } else {
      reviewData.property_id = null;
    }

    try {
      const response = await axios.post('http://localhost:8000/management/create_review/', reviewData);

      setMessage('Review added successfully!');
      setReviewText('');
      setRating(0);
      setSelectedProperty(null);
      setTimeout(() => {
        navigate(-1);
      }, 1000);
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
<<<<<<< HEAD

=======
  
      {/* Message at the top */}
      {message && (
        <div style={{ textAlign: 'center', marginTop: '20px', color: message.includes('success') ? '#43D649' : '#f2002c' }}>
          {message}
        </div>
      )}
  
>>>>>>> 6bb00d02a7a6bc884f4c3af990d341b34c3815da
      <div style={{ marginBottom: '2%' }}>
        <h2 style={{ color: '#023047' }}>Add a Review</h2>
      </div>
  <div style={{width:'85%', marginLeft: '8%', marginBottom: '2%'}}>
      <div style={{ marginBottom: '20px' }}>
        {/* Première liste déroulante : About Lodgini or about a property */}
        <select
          style={{ backgroundColor: '#ead2ac', color: '#000', padding: '10px', width: '50%' }}
          onChange={handleReviewTypeChange}
          value={reviewType}
        >
          <option value="">Choose a review type</option>
          <option value="property">Review about a property</option>
          <option value="lodgini">Review about Lodgini</option>
        </select>
      </div>
  
      {/* Affichage de la deuxième liste déroulante seulement si le type de review est "property" */}
      {reviewType === 'property' && (
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
      )}
  
      <div style={{ marginBottom: '20px', textAlign: 'left', marginLeft: '25%' }}>
        <h3 style={{ color: '#023047' }}>Review Details</h3>
      </div>
  
      <div>
        <textarea
<<<<<<< HEAD
          style={{ width: '50%', height: '150px', padding: '10px', border: '1px solid #ccc', borderRadius: '5px' }}
=======
          style={{
            width: '50%',
            height: '150px',
            padding: '10px',
            border: '1px solid #ccc',
            borderRadius: '5px',
          }}
>>>>>>> 6bb00d02a7a6bc884f4c3af990d341b34c3815da
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
<<<<<<< HEAD

  {/* Ajouter le bouton "Add Review" */ }
  <div style={{ textAlign: 'left', marginTop: '20px', marginLeft: '25%', marginBottom: '1%' }}>
    <button
=======

      <div style={{ textAlign: 'left', marginTop: '20px', marginLeft: '25%', marginBottom: '1%' }}>
        <button
          onClick={submitReview}
>>>>>>> 6bb00d02a7a6bc884f4c3af990d341b34c3815da
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
      </div >
  <Footer />
    </div >
  );
};
