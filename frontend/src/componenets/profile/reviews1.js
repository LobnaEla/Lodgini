import React, { useState, useEffect } from "react";
import Axios from "axios";

const Review1 = ({ userId }) => {
    const [reviews, setReviews] = useState([]);
    const [error, setError] = useState("");

    // Fetch reviews from backend
    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const response = await Axios.get(`http://localhost:8000/management/user_reviews/${userId}/`);

                if (response.status === 200) {
                    setReviews(response.data);
                } else {
                    setError("Failed to fetch reviews.");
                }
            } catch (err) {
                console.error("Detailed error:", err);
                setError("An error occurred while fetching reviews.");
            }
        };

        fetchReviews();
    }, [userId]);

    // Style for the grid layout
    const gridStyle = {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
        gap: "1.5rem", // Space between cards
        padding: "2rem",
    };

    return (
        <div>
            {error && <p style={{ color: 'red' }}>{error}</p>}

            <div style={gridStyle}> 

                {reviews.length > 0 ? (
                    reviews.map((review) => {
                        const formattedDate = new Date(review.created_at).toISOString().split('T')[0];

                        return (
                            <div 
                                className="review" 
                                style={{ 
                                    padding: "15px", 
                                    marginBottom: "1rem", 
                                    border: "1px solid #ddd", 
                                    borderRadius: "8px", 
                                    backgroundColor: "#fff", 
                                    height: "auto", 
                                }}
                                key={review.id}
                            >
                                <div className="review-header" style={{ display: "flex", alignItems: "center", gap: "15px", width: "100%" }}>
                                    <div style={{ width: "100%" }}>
                                        <h4 style={{ margin: 0, color: "#16697A", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                                            {review.name}
                                        </h4>
                                    </div>
                                </div>
                                <div className="review-body" style={{ marginTop: "10px", width: "100%" }}>
                                    <h5 style={{ marginBottom: "5px", width: "100%" , color:'#023047', fontSize:'18px'}}>{review.property}</h5>
                                    <small style={{ marginTop: "0" }}>{formattedDate}</small>

                                    <p style={{ wordWrap: "break-word", maxHeight: "100px", overflow: "hidden" }}>
                                        {review.review}
                                    </p>

                                    <div className="review-rating" style={{ color: "#FFD700" }}>
                                        {"★".repeat(review.stars)}{"☆".repeat(5 - review.stars)}
                                    </div>
                                </div>
                            </div>
                        );
                    })
                ) : (
                    !error && <p style={{ textAlign: "center" }}>No reviews found.</p>
                )}
            </div>
        </div>
    );
};

export default Review1;
