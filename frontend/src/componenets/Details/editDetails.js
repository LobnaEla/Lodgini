import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../home/navbar1";
import Footer from "../home/footer";
import OwnerCalendar from './ownerCalendar';
import styled from 'styled-components';

const EditDetails = () => {
    const { id, owner_id } = useParams();
    const navigate = useNavigate();
    const [property, setProperty] = useState(null);
    const [isEditing, setIsEditing] = useState(false);

    // State for form fields
    const [formData, setFormData] = useState({
        name: '',
        location: '',
        description: '',
        price_per_night: 0,
        number_of_stars: 0,
        number_of_bedrooms: 0,
        number_of_living_rooms: 0,
        number_of_bathrooms: 0,
        number_of_dining_rooms: 0,
        wifi_speed: '',
        max_number_guests: 0,
        number_of_refrigerators: 0,
        number_of_tvs: 0,
    });

    // Image states
    const [images, setImages] = useState({
        image1: null,
        image2: null,
        image3: null
    });

    useEffect(() => {
        const fetchPropertyDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/management/properties/${owner_id}/${id}`);
                setProperty(response.data);

                // Populate form data
                setFormData({
                    name: response.data.name,
                    location: response.data.location,
                    description: response.data.description,
                    price_per_night: response.data.price_per_night,
                    number_of_stars: response.data.number_of_stars,
                    number_of_bedrooms: response.data.number_of_bedrooms,
                    number_of_living_rooms: response.data.number_of_living_rooms,
                    number_of_bathrooms: response.data.number_of_bathrooms,
                    number_of_dining_rooms: response.data.number_of_dining_rooms,
                    wifi_speed: response.data.wifi_speed,
                    max_number_guests: response.data.max_number_guests,
                    number_of_refrigerators: response.data.number_of_refrigerators,
                    number_of_tvs: response.data.number_of_tvs,
                });
            } catch (error) {
                console.error("Error fetching property details:", error);
            }
        };

        fetchPropertyDetails();
    }, [id, owner_id]);

    // Handle input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    // Handle image changes
    const handleImageChange = (e) => {
        const { name } = e.target;
        setImages(prev => ({
            ...prev,
            [name]: e.target.files[0]
        }));
    };

    // Submit form
    const handleSubmit = async (e) => {
        e.preventDefault();

        const formDataToSubmit = new FormData();

        // Append all text fields
        Object.keys(formData).forEach(key => {
            // Exclude stars
            if (key !== 'number_of_stars') {
                formDataToSubmit.append(key, formData[key]);
            }
        });

        // Append images if selected
        Object.keys(images).forEach(key => {
            if (images[key]) {
                formDataToSubmit.append(key, images[key]);
            }
        });

        try {
            const response = await axios.put(
                `http://localhost:8000/management/properties/${owner_id}/${id}/update/`,
                formDataToSubmit,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                }
            );

            // Navigate back to details or refresh
            navigate(`/property_details/${owner_id}/${id}`);
        } catch (error) {
            console.error("Error updating property:", error);
            alert("Failed to update property. Please try again.");
        }
    };

    if (!property) {
        return <p>Loading property details...</p>;
    }

    return (
        <StyledWrapper>
            <div style={{ backgroundColor: "#ede7e3", fontFamily: "Arial, sans-serif" }}>
                <Navbar />

                <div style={{ padding: "20px 40px", maxWidth: "1200px", margin: "auto" }}>
                    <form onSubmit={handleSubmit}>
                        {/* Title and Location */}
                        <div style={{ marginBottom: "20px" }}>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                className="title-input"
                                placeholder="Property Name"
                            />
                            <input
                                type="text"
                                name="location"
                                value={formData.location}
                                onChange={handleInputChange}
                                style={{ fontSize: "16px", color: "#6c757d", width: "100%" }}
                                placeholder="Location"
                            />
                        </div>

                        {/* Images Section */}
                        <div style={{ display: "flex", gap: "20px", marginBottom: "30px" }}>
                            {['image1', 'image2', 'image3'].map((imageName, index) => (
                                <div key={imageName} style={{ flex: index === 0 ? 2 : 1 }}>
                                    {property[imageName] && (
                                        <img
                                            src={`http://localhost:8000${property[imageName]}`}
                                            alt={`Room ${index + 1}`}
                                            style={{
                                                borderRadius: "10px",
                                                objectFit: "cover",
                                                width: "100%",
                                                height: index === 0 ? "600px" : "140px",
                                            }}
                                        />
                                    )}
                                    <input
                                        type="file"
                                        name={imageName}
                                        onChange={handleImageChange}
                                        accept="image/*"
                                        style={{ marginTop: "10px" }}
                                    />
                                </div>
                            ))}
                        </div>

                        {/* About the Place */}
                        <div style={{ display: "flex", gap: "20px", marginBottom: "30px" }}>
                            {/* Text Section */}
                            <div style={{ flex: 2 }}>
                                <h2 className="sub-title">About the place</h2>
                                <textarea
                                    name="description"
                                    value={formData.description}
                                    onChange={handleInputChange}
                                    style={{
                                        fontSize: "16px",
                                        color: "#6c757d",
                                        lineHeight: "1.6",
                                        width: "100%",
                                        minHeight: "150px"
                                    }}
                                    placeholder="Description of the property"
                                />
                                <div>
                                    <label>Stars: </label>
                                    <input
                                        type="number"
                                        name="number_of_stars"
                                        value={formData.number_of_stars}
                                        onChange={handleInputChange}
                                        min="0"
                                        max="5"
                                    />
                                </div>
                            </div>

                            {/* Pricing Section */}
                            <div style={{ flex: 1 }}>
                                <div style={{
                                    padding: "20px",
                                    backgroundColor: "#ffffff",
                                    borderRadius: "10px"
                                }}>
                                    <p>Price Per Night</p>
                                    <input
                                        type="number"
                                        name="price_per_night"
                                        value={formData.price_per_night}
                                        onChange={handleInputChange}
                                        style={{
                                            fontSize: "32px",
                                            fontWeight: "bold",
                                            color: "#4291A3",
                                            width: "100%"
                                        }}
                                    />
                                    <button type="submit" className="button1">
                                        Save Changes
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Features Section */}
                        <div style={{
                            display: "grid",
                            gridTemplateColumns: "repeat(4, 1fr)",
                            gap: "10px",
                            backgroundColor: "#f9f9f9",
                            padding: "20px",
                            borderRadius: "10px"
                        }}>
                            {[
                                { name: 'number_of_bedrooms', icon: "🛏️", label: "Bedrooms" },
                                { name: 'number_of_living_rooms', icon: "🛋️", label: "Living Rooms" },
                                { name: 'number_of_bathrooms', icon: "🚿", label: "Bathrooms" },
                                { name: 'number_of_dining_rooms', icon: "🍽️", label: "Dining Rooms" },
                                { name: 'wifi_speed', icon: "📶", label: "Wifi Speed (mbps)" },
                                { name: 'max_number_guests', icon: "🛠️", label: "Max Guests" },
                                { name: 'number_of_refrigerators', icon: "🧊", label: "Refrigerators" },
                                { name: 'number_of_tvs', icon: "📺", label: "Televisions" },
                            ].map((feature) => (
                                <div key={feature.name} style={{ textAlign: "center" }}>
                                    <div style={{ fontSize: "24px", marginBottom: "5px" }}>{feature.icon}</div>
                                    <p>{feature.label}</p>
                                    <input
                                        type="number"
                                        name={feature.name}
                                        value={formData[feature.name]}
                                        onChange={handleInputChange}
                                        style={{ width: "100%" }}
                                    />
                                </div>
                            ))}
                        </div>
                    </form>
                </div>

                <div className="main-content">
                    <OwnerCalendar />
                </div>
                <Footer />
            </div>
        </StyledWrapper>
    );
};

const StyledWrapper = styled.div`
.title-input {
    font-size: 2rem;
    width: 100%;
    margin-bottom: 10px;
    padding: 5px;
}

.button1 {
    width: 100%;
    padding: 10px;
    background-color: #4291A3;
    color: white;
    border: none;
    border-radius: 5px;
    margin-top: 10px;
}

input, textarea {
    border: 1px solid #ddd;
    border-radius: 4px;
    padding: 5px;
}
`;

export default EditDetails;