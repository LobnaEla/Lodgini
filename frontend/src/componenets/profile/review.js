import React from "react";
import styled from "styled-components";

const StyledWrapper = styled.div`
  .card {
    max-width: 400px;
    margin: 1rem auto;
    padding: 1.5rem;
    border-radius: 8px;
    background: #ffffff;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;
    gap: 1rem;
    text-align: left; /* Ensures all text aligns to the left */
  }

  .header {
    display: flex;
    gap: 1rem;
    align-items: flex-start; /* Aligns image and text at the top */
  }

  .name-wrapper {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .name-image {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    background-size: cover;
    background-position: center;
  }

  .property-name {
    font-size: 0.9rem;
    color: #555;
    margin-top: 0.2rem;
    font-style: italic;
  }

  .stars {
    display: flex;
    gap: 2px; /* Smaller gap for smaller stars */
    color: #ffc107;
  }

  .stars svg {
    height: 12px; /* Smaller height */
    width: 12px; /* Smaller width */
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
    text-align: left; /* Ensures the description is left-aligned */
  }
`;

const Review = ({ name, propertyName, description, stars, date, imageUrl, profileImageUrl }) => {
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

    return (
        <StyledWrapper>
            <div className="card">
                <div className="header">
                    <div
                        className="image"
                        style={{
                            backgroundImage: `url(${imageUrl || "https://source.unsplash.com/100x100/?portrait"})`,
                        }}
                    />
                    <div>
                        <div className="name-wrapper">
                            <div
                                className="name-image"
                                style={{
                                    backgroundImage: `url(${profileImageUrl || "https://source.unsplash.com/50x50/?face"})`,
                                }}
                            />
                            <div className="name">{name}</div>
                        </div>
                        <div className="property-name">{propertyName}</div>
                        <div className="date">{date}</div>
                    </div>
                </div>
                <div className="stars">{renderStars()}</div>
                <p className="description">{description}</p>
            </div>
        </StyledWrapper>
    );
};

export default Review;
