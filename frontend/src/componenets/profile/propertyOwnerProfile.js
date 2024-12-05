import React, { useEffect, useState } from "react";
import Navbar from "../profile/navbaro";
import Footer from "../home/footer";
import { useNavigate } from "react-router-dom";
import ApartmentGrid from "../categories/apartmentGrid";
import Properties from "./properties";

const Profile = () => {
    const [ownerData, setOwnerData] = useState({
        name: '',
        email: '',
        phone_number: '',
        country: '',
        profilepicture: '',
    });
    const [isEditing, setIsEditing] = useState(false); // To manage the edit mode
    const navigate = useNavigate();

    useEffect(() => {
        // Load owner data from localStorage
        const storedData = localStorage.getItem('loggedInOwner');
        if (storedData) {
            const data = JSON.parse(storedData);
            setOwnerData(data); // Use the data directly from localStorage
        } else {
            navigate("/property_owner_profile"); // Redirect if no data is found
        }
    }, [navigate]);

    // Handle Profile Picture Change
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const formData = new FormData();
            formData.append('profile_picture', file); // Append the selected image
            formData.append('email', ownerData.email); // Ensure the email is passed

            // Simulate a backend call to update the profile picture
            fetch('http://localhost:8000/owner_profile/update_picture/', {
                method: 'POST',
                body: formData,
            })
                .then((response) => response.json())
                .then((data) => {
                    if (data.success) {
                        setOwnerData((prevData) => ({
                            ...prevData,
                            profilePicture: data.profilePictureUrl,
                        }));
                        // Update the localStorage with the new profile picture
                        localStorage.setItem(
                            'loggedInOwner',
                            JSON.stringify({
                                ...ownerData,
                                profilePicture: data.profilePictureUrl,
                            })
                        );
                    } else {
                        alert('Failed to upload image');
                    }
                })
                .catch((error) => {
                    console.error('Error uploading image:', error);
                    alert('There was an error uploading the image');
                });
        }
    };

    // Handle Edit Button Click
    const handleEditClick = () => {
        setIsEditing(true); // Enable editing
    };

    // Handle Save Button Click
    const handleSaveClick = () => {
        // Simulate sending the updated profile data to the backend
        const updatedData = {
            name: ownerData.name,
            phone_number: ownerData.phone_number,
            country: ownerData.country,
            email: ownerData.email, // Always include the email
            profilepicture: ownerData.profilepicture
        };

        fetch('http://localhost:8000/owner_profile/update/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedData),
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.success) {
                    setOwnerData(updatedData); // Update the local state with the new data
                    localStorage.setItem('loggedInOwner', JSON.stringify(updatedData)); // Save updated data to localStorage
                    setIsEditing(false); // Disable editing
                } else {
                    alert('Failed to update profile');
                }
            })
            .catch((error) => {
                console.error('Error updating profile:', error);
                alert('There was an error updating your profile');
            });
    };

    // Handle Cancel Button Click
    const handleCancelClick = () => {
        // Revert changes by reloading the data from localStorage
        const storedData = localStorage.getItem('loggedInOwner');
        if (storedData) {
            setOwnerData(JSON.parse(storedData));
        }
        setIsEditing(false); // Disable editing
    };

    // Handle Input Changes for Profile Data
    const handleInputChange = (e, field) => {
        setOwnerData((prevData) => ({
            ...prevData,
            [field]: e.target.value,
        }));
    };

    // Navigate to Add Property page
    const handleAddPropertyClick = () => {
        navigate("/add-property");
    };

    return (
        <div>
            <Navbar />
            <main className="profile-page" style={{ backgroundColor: "#F9F3ED" }}>
                <div className="container" style={{ padding: "2rem 1rem" }}>
                    <section style={{ marginBottom: "5%" }}>
                        <h1 className="title" style={{ marginBottom: "5%" }}>Your Profile</h1>
                        <div
                            className="profile-info"
                            style={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "space-between",
                                gap: "10%",
                                width: "100%",
                            }}
                        >

                            <div
                                className="avatar"
                                style={{
                                    width: "250px",
                                    height: "250px",
                                    borderRadius: "50%",
                                    overflow: "hidden",
                                    border: "3px solid #ddd",
                                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                                    marginLeft: '25%',
                                    position: "relative",
                                }}
                            >
                                <img
                                    src={ownerData.profilepicture ? `http://localhost:8000${ownerData.profilepicture}` : 'defaultImage.jpg'} alt="Profile Avatar"
                                    style={{
                                        width: "100%",
                                        height: "100%",
                                        objectFit: "cover",
                                    }}
                                />
                                <label
                                    htmlFor="fileInput"
                                    style={{
                                        position: "absolute",
                                        top: "70%",
                                        right: "15%",
                                        cursor: "pointer",
                                        backgroundColor: "white",
                                        padding: "5px",
                                        borderRadius: "50%",
                                        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
                                    }}
                                >
                                    <i className="fa fa-pen" style={{ fontSize: "20px", color: "#16697A" }}></i>
                                </label>
                                <input
                                    id="fileInput"
                                    type="file"
                                    style={{ display: "none" }}
                                    onChange={handleImageChange}
                                />
                            </div>

                            <div className="form" style={{ flex: 1 }}>
                                <input
                                    type="text"
                                    value={ownerData.name}
                                    style={{
                                        display: "block",
                                        width: "100%",
                                        maxWidth: "400px",
                                        padding: "0.8rem",
                                        marginBottom: "1rem",
                                        borderRadius: "8px",
                                        border: "1px solid #ddd",
                                    }}
                                    readOnly={!isEditing}
                                    onChange={(e) => handleInputChange(e, 'name')}
                                />
                                <input
                                    type="email"
                                    value={ownerData.email}
                                    style={{
                                        display: "block",
                                        width: "100%",
                                        maxWidth: "400px",
                                        padding: "0.8rem",
                                        marginBottom: "1rem",
                                        borderRadius: "8px",
                                        border: "1px solid #ddd",
                                    }}
                                    readOnly
                                />
                                <input
                                    type="tel"
                                    value={ownerData.phone_number || 'Mobile number not provided'}
                                    style={{
                                        display: "block",
                                        width: "100%",
                                        maxWidth: "400px",
                                        padding: "0.8rem",
                                        marginBottom: "1rem",
                                        borderRadius: "8px",
                                        border: "1px solid #ddd",
                                    }}
                                    readOnly={!isEditing}
                                    onChange={(e) => handleInputChange(e, 'phoneNumber')}
                                />
                                <input
                                    type="text"
                                    value={ownerData.country || 'Country not provided'}
                                    style={{
                                        display: "block",
                                        width: "100%",
                                        maxWidth: "400px",
                                        padding: "0.8rem",
                                        marginBottom: "1rem",
                                        borderRadius: "8px",
                                        border: "1px solid #ddd",
                                    }}
                                    readOnly={!isEditing}
                                    onChange={(e) => handleInputChange(e, 'country')}
                                />
                                {/* Edit/Save/Cancel buttons */}
                                {!isEditing ? (
                                    <button
                                        onClick={handleEditClick}
                                        style={{
                                            padding: "10px 20px",
                                            backgroundColor: "#16697A", // Same color as your Edit button
                                            color: "white",
                                            border: "none",
                                            borderRadius: "5px",
                                        }}
                                    >
                                        Edit
                                    </button>
                                ) : (
                                    <div style={{ marginTop: "1rem", display: "flex", gap: "15px", justifyContent: "flex-start", paddingLeft: "18%" }}>
                                        {/* Cancel button */}
                                        <button
                                            onClick={handleCancelClick}
                                            style={{
                                                backgroundColor: 'white',
                                                color: 'black',
                                                border: '1px solid #ccc',
                                                padding: '10px 20px',
                                                fontSize: '14px',
                                                borderRadius: '5px',
                                                cursor: 'pointer',
                                            }}
                                            onMouseEnter={(e) => e.target.style.backgroundColor = "#f4f4f4"}
                                            onMouseLeave={(e) => e.target.style.backgroundColor = "white"}
                                        >
                                            Cancel
                                        </button>
                                        {/* Save button */}
                                        <button
                                            onClick={handleSaveClick}
                                            style={{
                                                backgroundColor: '#FFB84D',
                                                color: 'white',
                                                border: 'none',
                                                padding: '10px 20px',
                                                borderRadius: '5px',
                                                cursor: 'pointer',
                                            }}
                                        >
                                            Save
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </section>
                    {/* Your Properties */}
                    <h2 className="title">Your properties</h2>
                    <Properties />
                    <div className="add-property-wrapper">
                        <button className="add-property-button" onClick={() => navigate("/add_property")}>
                            <span> +</span>
                        </button>
                    </div>
                </div>
            </main>

            {/* Footer */}
            <Footer />
        </div>
    );
};

export default Profile;
