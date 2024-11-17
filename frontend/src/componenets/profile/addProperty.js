import React, { useState } from "react";
import Navbar from "../home/navbar1";
import Footer from "../home/footer";
import styled from "styled-components";
import { useNavigate } from "react-router";

const AddProperty = () => {
    const [propertyType, setPropertyType] = useState("Holiday Home");
    const [category, setCategory] = useState("modestly furnished");
    const navigate = useNavigate();

    const handlePropertyTypeSwitch = (type) => {
        setPropertyType(type);
    };

    const handleCancel = () => {
        navigate("/property_owner_profile");
    };

    return (
        <div>
            {/* Navbar */}
            <Navbar />

            {/* Main */}
            <main className="add-property-page" style={{ backgroundColor: "#F9F3ED" }}>
                <div className="form-container">
                    {/* Header */}
                    <div className="form-header">
                        <h2>Add Property</h2>
                        <div className="property-type">
                            <button
                                className={propertyType === "Holiday Home" ? "active" : ""}
                                onClick={() => handlePropertyTypeSwitch("Holiday Home")}
                            >
                                Holiday Home
                            </button>
                            <button
                                className={propertyType === "Apartment" ? "active" : ""}
                                onClick={() => handlePropertyTypeSwitch("Apartment")}
                            >
                                Apartment
                            </button>
                        </div>
                    </div>

                    {/* Form */}
                    <form className="form">
                        <div className="form-group">
                            <label htmlFor="name">Name</label>
                            <input type="text" id="name" placeholder="Property name" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="location">Location</label>
                            <input type="text" id="location" placeholder="Enter location" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="category">Category</label>
                            <div className="radio-group">
                                <label>
                                    <input
                                        type="radio"
                                        name="category"
                                        value="modestly furnished"
                                        checked={category === "modestly furnished"}
                                        onChange={(e) => setCategory(e.target.value)}
                                    />
                                    Modestly Furnished
                                </label>
                                <label>
                                    <input
                                        type="radio"
                                        name="category"
                                        value="luxuriously furnished"
                                        checked={category === "luxuriously furnished"}
                                        onChange={(e) => setCategory(e.target.value)}
                                    />
                                    Luxuriously Furnished
                                </label>
                            </div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="about">About the place</label>
                            <textarea
                                id="about"
                                rows="4"
                                placeholder="Write your description here"
                            ></textarea>
                        </div>
                        <div className="form-group photos">
                            <label htmlFor="photos">Add photos</label>
                            <input type="file" id="photos" multiple />
                        </div>
                        <div className="form-group">
                            <label htmlFor="price">Price per night (TND)</label>
                            <input type="number" id="price" placeholder="Value" />
                        </div>
                        <div className="form-group details">
                            <label>More details: (leave unavailable options empty)</label>
                            <div className="detail-inputs">
                                <div className="detail">
                                    <span className="icon">📺</span>
                                    <label>Television</label>
                                    <input type="number" placeholder="available number" />
                                </div>
                                <div className="detail">
                                    <span className="icon">🏠</span>
                                    <label>Units</label>
                                    <input type="number" placeholder="available number" />
                                </div>
                                <div className="detail">
                                    <span className="icon">🧊</span>
                                    <label>Refrigerator</label>
                                    <input type="number" placeholder="available number" />
                                </div>
                                <div className="detail">
                                    <span className="icon">📶</span>
                                    <label>Wifi</label>
                                    <input type="text" placeholder="mbps" />
                                </div>
                                <div className="detail">
                                    <span className="icon">➕</span>
                                    <label>Other</label>
                                    <input type="text" placeholder="Additional info" />
                                </div>
                            </div>
                        </div>
                        <div className="form-buttons">
                            <button type="button" className="cancel" onClick={handleCancel}>Cancel</button>
                            <button type="submit" className="confirm">Confirm</button>
                        </div>
                    </form>
                </div>
            </main>

            {/* Footer */}
            < Footer />
        </div >
    );
};


export default AddProperty;
