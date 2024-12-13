import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Navbar from "../home/navbar1";
import Footer from "../home/footer";
import styled from 'styled-components';

const Details = () => {
    const { id } = useParams();
    const [property, setProperty] = useState(null);
    const [isLoading, setIsLoading] = useState(true);


    useEffect(() => {
        // Fetch property details from the API
        const fetchPropertyDetails = async () => {
            try {
                setIsLoading(true);
                const response = await axios.get(`http://localhost:8000/management/properties/${id}`);
                setProperty(response.data);
            } catch (error) {
                console.error("Error fetching property details:", error);
            }
            finally {
                setIsLoading(false);
            }
        };

        fetchPropertyDetails();
    }, [id]);

    if (isLoading) {
        return (
            <div className="loader-container">
                <section className="dots-container">
                    <div className="dot" />
                    <div className="dot" />
                    <div className="dot" />
                    <div className="dot" />
                    <div className="dot" />
                </section>
            </div>
        );
    }

    const stars = property.number_of_stars;

    return (
        <StyledWrapper >
            <div style={{ backgroundColor: "#ede7e3", fontFamily: "Arial, sans-serif" }}>
                {/* Navbar */}
                <Navbar />

                {/* Apartment Details Section */}
                <div style={{ padding: "20px 40px", maxWidth: "1200px", margin: "auto" }}>
                    {/* Title and Location */}
                    <div style={{ marginBottom: "20px" }}>
                        <h1 className="title">
                            {property.name}
                        </h1>
                        <p style={{ fontSize: "16px", color: "#6c757d" }}> {property.location}</p>
                    </div>

                    {/* Images Section */}
                    <div style={{ display: "flex", gap: "20px", marginBottom: "30px" }}>
                        <img
                            src={`http://localhost:8000${property.image1}`} // Replace with your main image URL
                            alt="Main Room"
                            style={{
                                flex: 2,
                                borderRadius: "10px",
                                objectFit: "cover",
                                width: "70%",
                                height: "600px",
                            }}
                        />
                        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "20px" }}>
                            <img
                                src={`http://localhost:8000${property.image2}`} // Replace with your side image 1 URL
                                alt="Room 1"
                                style={{
                                    flex: 1,
                                    borderRadius: "10px",
                                    objectFit: "cover",
                                    height: "140px",
                                }}
                            />
                            <img
                                src={`http://localhost:8000${property.image3}`} // Replace with your side image 2 URL
                                alt="Room 2"
                                style={{
                                    flex: 1,
                                    borderRadius: "10px",
                                    objectFit: "cover",
                                    height: "140px",
                                }}
                            />
                        </div>
                    </div>

                    {/* About the Place */}
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                            marginBottom: "30px",
                            gap: "20px",
                        }}
                    >
                        {/* Text Section */}
                        <div style={{ flex: 2 }}>
                            <h2 className="sub-title">
                                About the place
                            </h2>
                            <p style={{ fontSize: "16px", color: "#6c757d", lineHeight: "1.6" }}>
                                {property.description}
                            </p>
                            <div className="stars">
                                {Array.from({ length: stars }, (_, index) => (
                                    <span key={index} className={`star ${index < stars ? 'filled' : ''}`}>&#9733;</span>
                                ))}
                            </div>
                        </div>

                        {/* Booking Section */}
                        <div
                            style={{
                                flex: 1,
                                padding: "20px 20px 40px 20px",
                                backgroundColor: "#ffffff",
                                borderRadius: "10px",
                                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                                textAlign: "center",
                                alignItems: "center",
                                justifyItems: "center",
                            }}
                        >
                            <p style={{ fontSize: "18px", fontWeight: "bold", color: "#023047", fontFamily: 'Baloo Bhaijaan 2' }}>
                                Start Booking
                            </p>
                            <p
                                style={{
                                    fontSize: "32px",
                                    fontWeight: "bold",
                                    color: "#4291A3",
                                    margin: "10px 0",
                                }}
                            >
                                {property.price_per_night} DT
                            </p>
                            <p style={{ fontSize: "16px", color: "#6c757d", marginBottom: "20px" }}>
                                per night
                            </p>
                            <button
                                className="button1"
                                onClick={() => {
                                    const isLoggedIn = localStorage.getItem("loggedInUser");
                                    if (isLoggedIn) {
                                        window.location.href = `/booking/${id}`; // Pass actual params
                                    } else {
                                        window.location.href = "/Sign_in";
                                    }
                                }}
                            >
                                Book Now!
                            </button>
                        </div>
                    </div>

                    {/* Features Section */}
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "space-around",
                            padding: "20px",
                            backgroundColor: "#f9f9f9",
                            borderRadius: "10px",
                        }}
                    >
                        {[
                            { icon: "🛏️", label: `${property.number_of_bedrooms} bedroom` },
                            {
                                icon: "🛋️", label: `${property.number_of_living_rooms} living room`
                            },
                            { icon: "🚿", label: `${property.number_of_bathrooms} bathroom` },
                            {
                                icon: "🍽️", label: `${property.number_of_dining_rooms} dining room`
                            },
                            { icon: "📶", label: `${property.wifi_speed} mbp / s` },
                            {
                                icon: "🛠️", label: `${property.max_number_guests} guest`
                            },
                            { icon: "🧊", label: `${property.number_of_refrigerators} refrigerator` },
                            {
                                icon: "📺", label: `${property.number_of_tvs} television`
                            },
                        ].map((feature, index) => (
                            <div key={index} style={{ textAlign: "center" }}>
                                <div style={{ fontSize: "24px", marginBottom: "5px" }}>{feature.icon}</div>
                                <p style={{ fontSize: "14px", color: "#6c757d" }}>{feature.label}</p>
                            </div>
                        ))}
                    </div>
                </div>

                <Footer />
            </div>
        </StyledWrapper >
    );
};


const StyledWrapper = styled.div`
.stars {
    margin-bottom: 10px;
  }

.star {
    color: #FAA935;
    font - size: 18px;
}
.star.filled {
    color: #FAA935;
  }
`;

export default Details;
