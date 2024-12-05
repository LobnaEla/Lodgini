import React from 'react';
import styled from 'styled-components';

const Card = ({ name, stars, price, image }) => {
  return (
    <StyledWrapper>
      <div className="card">
        <div className="img">
          <img src={image} alt={name} />
        </div>
        <div className="text">
          <p className="h3">{name}</p>
          <div className="stars">
            {Array.from({ length: stars }, (_, index) => (
              <span key={index} className={`star ${index < stars ? 'filled' : ''}`}>&#9733;</span>
            ))}
          </div>
          <p className="price">{price} DT</p>
        </div>
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .card {
    width: 250px;
    height: 280px;
    background: white;
    border-radius: 30px;
    box-shadow: 10px 10px 20px #bebebe, -10px -10px 20px #ffffff;
    transition: 0.2s ease-in-out;
    margin: 10px;
  }

  .img {
    width: 100%;
    height: 50%;
    border-top-left-radius: 30px;
    border-top-right-radius: 30px;
    background: linear-gradient(#e66465, #9198e5);
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .img img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-top-left-radius: 30px;
    border-top-right-radius: 30px;
  }

  .text {
    margin: 20px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }

  .h3 {
    font-family: 'Lucida Sans' sans-serif;
    font-size: 16px;
    font-weight: 600;
    color: black;
    margin-bottom: 5px;
  }

  .stars {
    margin-bottom: 10px;
  }

  .star {
    color: #ffd700;
    font-size: 18px;
  }

  .star.filled {
    color: #ffcd00;
  }

  .price {
    font-family: 'Lucida Sans' sans-serif;
    font-size: 14px;
    font-weight: 500;
    color: #333;
  }

  .card:hover {
    cursor: pointer;
    box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.1);
  }

  .card:hover .save {
    transform: scale(1.1) rotate(10deg);
  }
`;

export default Card;
