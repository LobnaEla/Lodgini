import React from "react";
import styled from "styled-components";

const StyledWrapper = styled.div`
  .card {
    max-width: 400px;
    margin: 1rem 5%;
    padding: 1.5rem;
    border-radius: 8px;
    background: #ffffff;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;
    gap: 1rem;
    text-align: left;
    height: 280px
    
  }

  .header {
    display: flex;
    gap: 1rem;
    align-items: center;
    justify-content: flex-start; /* Aligns the photo on the left */
  }

  .header-left {
    display: flex;
    justify-content: center; /* Centers the image inside its container */
    align-items: center;
  }

  .header-right {
    display: flex;
    flex-direction: column; /* Align name and date in a column */
    justify-content: center;
  }

  .name-wrapper {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .name-image {
    width: 50px;
    height: 50px;
    margin-right: 20px;
    border-radius: 50%;
    object-fit: cover; /* Ensures the image covers the circle without distortion */
  }

  .property-name {
    font-size: 0.9rem;
    color: #555;
    margin-top: 0.2rem;
    font-style: italic;
  }

  .stars {
    display: flex;
    gap: 2px;
    color: #ffc107;
  }

  .stars svg {
    height: 12px;
    width: 12px;
  }

  .name {
    font-weight: bold;
    font-size: 1rem;
    color: #333;
  }

  .date {
    font-size: 0.8rem;
    color: #888;
  }

  .description {
    font-size: 0.9rem;
    color: #555;
    line-height: 1.4;
    text-align: left;
  }
`;

const Review = ({ name, description, stars, date, imageUrl, profileImageUrl }) => {
    // Generate stars dynamically
    const renderStars = () => {
        return Array.from({ length: stars }, (_, index) => (
            <svg
                key={index}
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
                className="w-4 h-4"
            >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
        ));
    };

    const formattedDate = new Date(date).toISOString().split('T')[0];

    return (
        <StyledWrapper>
            <div className="card">
                <div className="header">
                    <div className="header-left">
                        <img
                            className="name-image"
                            src={`http://localhost:8000${profileImageUrl}`}
                            alt="Profile"
                        />
                    </div>
                    <div className="header-right">
                        <div className="name-wrapper">
                            <div className="name">{name}</div>
                        </div>
                        <div className="date">{formattedDate}</div>
                    </div>
                </div>
                <p className="description">{description}</p>
                <div className="stars">{renderStars()}</div>
            </div>
        </StyledWrapper>
    );
};

export default Review;
