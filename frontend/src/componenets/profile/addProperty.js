import React, { useState, useEffect } from "react";
import Navbar from "../profile/navbaro";
import Footer from "../home/footer";
import { useNavigate } from "react-router";
import axios from "axios";

const AddProperty = () => {
    const [propertyType, setPropertyType] = useState("Vacation House");
    const [category, setCategory] = useState("Modestly Furnished");
    const [formData, setFormData] = useState({
        name: "",
        property_type: "Vacation House", 
        location: "",
        description: "",
        price_per_night: "",
        number_of_tvs: "",
        number_of_refrigerators: "",
        wifi_speed: "",
        number_of_bedrooms: "",
        number_of_living_rooms: "",
        number_of_bathrooms: "",
        number_of_dining_rooms: "",
        max_number_guests: "",
        furnishing_type: "", // Default value
        number_of_stars: "",
    });
    const navigate = useNavigate();

    useEffect(() => {
        setFormData((prevData) => ({
            ...prevData,
            property_type: propertyType,
        }));
    }, [propertyType]);

    const handlePropertyTypeSwitch = (type) => {
        setPropertyType(type);
        setFormData((prev) => ({
            ...prev,
            property_type: type === "Vacation House" ? "Vacation House" : "Apartment",
        }));
    };

    const handleCancel = () => {
        navigate("/property_owner_profile");
    };

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [id]: id === "price_per_night" ? parseFloat(value) || "" : value,
        }));
    };

    const handleFileChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            image1: e.target.files[0], // Changed to store single file (assuming only one image is uploaded)
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const payload = new FormData();
        payload.append("property_type", formData.property_type);
        payload.append("furnishing_type", formData.furnishing_type); // Send the selected furnishing type
        payload.append("name", formData.name);
        payload.append("location", formData.location);
        payload.append("description", formData.description);
        payload.append("price_per_night", formData.price_per_night);
        payload.append("number_of_tvs", formData.number_of_tvs);
        payload.append("number_of_refrigerators", formData.number_of_refrigerators);
        payload.append("wifi_speed", formData.wifi_speed);
        payload.append("number_of_bedrooms", formData.number_of_bedrooms);
        payload.append("number_of_living_rooms", formData.number_of_living_rooms);
        payload.append("number_of_bathrooms", formData.number_of_bathrooms);
        payload.append("number_of_dining_rooms", formData.number_of_dining_rooms);
        payload.append("max_number_guests", formData.max_number_guests);
        payload.append("furnishing_type", formData.furnishing_type);
        payload.append("number_of_stars", formData.number_of_stars);

        // Get the logged-in owner's email from localStorage
        const loggedInOwner = JSON.parse(localStorage.getItem("loggedInOwner"));
       

        try {
            // Axios POST request to the backend
            const response = await axios.post("http://localhost:8000/management/add_property/", payload, {
                headers: {
                    "Content-Type": "multipart/form-data", // Ensures that files are sent as multipart
                },
            });

            if (response.status === 200) {
                alert("Property added successfully!");
                navigate("/property_owner_profile");
            } else {
                alert("Failed to add property. Please try again.");
            }
        } catch (error) {
            console.error("Error:", error);
            alert("An error occurred while adding the property.");
        }
    };

    const handleCategoryChange = (e) => {
        const selectedCategory = e.target.value;
        setCategory(selectedCategory);  // Set the selected category to category state
        setFormData((prev) => ({
            ...prev,
            furnishing_type: selectedCategory,  // Update furnishing_type to the selected category
        }));
    };

    return (
        <div>
            <Navbar />
            <main className="add-property-page" style={{ backgroundColor: "#F9F3ED" }}>
                <div className="form-container">
                    <div className="form-header">
                        <h2>Add Property</h2>
                        <div className="property-type">
                            <button
                                className={propertyType === "Vacation House" ? "active" : ""}
                                onClick={() => handlePropertyTypeSwitch("Vacation House")}
                            >
                                Vacation House
                            </button>
                            <button
                                className={propertyType === "Apartment" ? "active" : ""}
                                onClick={() => handlePropertyTypeSwitch("Apartment")}
                            >
                                Apartment
                            </button>
                        </div>
                    </div>
                    <form className="form" onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="name" style={{ textAlign: 'left', fontSize: "20px", marginBottom: '3%' }}>Name</label>
                            <input
                                type="text"
                                id="name"
                                placeholder="Property name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="location" style={{ textAlign: 'left', fontSize: "20px", marginBottom: '3%' }}>Location</label>
                            <input
                                type="text"
                                id="location"
                                placeholder="Enter location"
                                value={formData.location}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="category" style={{ textAlign: 'left', fontSize: "20px", marginBottom: '3%' }}>Category</label>
                            <div className="radio-group">
                                <label>
                                    <input
                                        type="radio"
                                        name="category"
                                        value="Modestly Furnished"
                                        checked={formData.furnishing_type === "Modestly Furnished"}
                                        onChange={handleCategoryChange}
                                    />
                                    Modestly Furnished
                                </label>
                                <label>
                                    <input
                                        type="radio"
                                        name="category"
                                        value="Luxuriously Furnished"
                                        checked={formData.furnishing_type === "Luxuriously Furnished"}
                                        onChange={handleCategoryChange}
                                    />
                                    Luxuriously Furnished
                                </label>
                            </div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="description" style={{ textAlign: 'left', fontSize: "20px", marginBottom: '3%' }}>About the place</label>
                            <textarea
                                id="description"
                                rows="4"
                                placeholder="Write your description here"
                                value={formData.description}
                                onChange={handleChange}
                            ></textarea>
                        </div>
 
                        <div className="form-group">
                            <label htmlFor="price_per_night" style={{ textAlign: 'left', fontSize: "20px", marginBottom: '3%' }}>Price per night (TND)</label>
                            <input
                                type="number"
                                id="price_per_night"
                                placeholder="Value"
                                value={formData.price_per_night}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="number_of_stars" style={{ textAlign: 'left', fontSize: "20px", marginBottom: '3%' }}>Number of Stars</label>
                            <input
                                type="number"
                                id="number_of_stars"
                                min="1"
                                max="6"
                                placeholder="1 - 6"
                                value={formData.number_of_stars}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group details">
                            <label style={{ textAlign: "left", fontSize: "20px", marginBottom: "3%" }}>
                                More details:
                            </label>
                            <div className="detail-inputs">
                                <div className="detail">
                                    <span className="icon">📺</span>
                                    <label>Television</label>
                                    <input
                                        type="number"
                                        id="number_of_tvs"
                                        placeholder="Available number"
                                        value={formData.number_of_tvs}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="detail">
                                    <span className="icon">🧊</span>
                                    <label>Refrigerator</label>
                                    <input
                                        type="number"
                                        id="number_of_refrigerators"
                                        placeholder="Available number"
                                        value={formData.number_of_refrigerators}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="detail">
                                    <span className="icon">📶</span>
                                    <label>Wifi</label>
                                    <input
                                        type="text"
                                        id="wifi_speed"
                                        placeholder="Mbps"
                                        value={formData.wifi_speed}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="detail">
                                    <span className="icon">🛏️</span>
                                    <label>Bedrooms</label>
                                    <input
                                        type="number"
                                        id="number_of_bedrooms"
                                        placeholder="Number of bedrooms"
                                        value={formData.number_of_bedrooms}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="detail">
                                    <span className="icon">🛋️</span>
                                    <label>Living Rooms</label>
                                    <input
                                        type="number"
                                        id="number_of_living_rooms"
                                        placeholder="Number of living rooms"
                                        value={formData.number_of_living_rooms}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="detail">
                                    <span className="icon">🚿</span>
                                    <label>Bathrooms</label>
                                    <input
                                        type="number"
                                        id="number_of_bathrooms"
                                        placeholder="Number of bathrooms"
                                        value={formData.number_of_bathrooms}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="detail">
                                    <span className="icon">🍽️</span>
                                    <label>Dining Rooms</label>
                                    <input
                                        type="number"
                                        id="number_of_dining_rooms"
                                        placeholder="Number of dining rooms"
                                        value={formData.number_of_dining_rooms}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="detail">
                                    <span className="icon">👥</span>
                                    <label>Number of Guests</label>
                                    <input
                                        type="number"
                                        id="max_number_guests"
                                        placeholder="Max number of guests"
                                        value={formData.max_number_guests}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="form-buttons">
                            <button type="button" className="cancel" onClick={handleCancel}>
                                Cancel
                            </button>
                            <button type="submit" className="confirm">
                                Confirm
                            </button>
                        </div>
                    </form>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default AddProperty;
