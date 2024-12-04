import React, { useEffect, useState } from "react";
import Navbar from "../profile/navbaro";
import Footer from "../home/footer";
import { useNavigate } from "react-router-dom";
import ApartmentGrid from "../categories/apartmentGrid";
import axios from 'axios';  // Import Axios

const Profile = () => {
    const [ownerData, setOwnerData] = useState({
        name: '',
        email: '',
        phoneNumber: '',
        country: '',
        profilePicture: '',
    });
    const navigate = useNavigate();

    useEffect(() => {
        // Get the owner ID from local storage
        const storedData = localStorage.getItem('loggedInOwner');
        if (storedData) {
            const data = JSON.parse(storedData);
            const ownerId = data.id;  // Assuming 'id' is stored in the logged-in data

            // Fetch the profile data from the backend
            axios.get(`http://localhost:8000/owner_profile/${ownerId}/`)  // Adjust the URL as necessary
                .then(response => {
                    setOwnerData(response.data);
                })
                .catch(error => {
                    console.error('Error fetching owner profile:', error);
                    alert('Failed to load profile data');
                });
        } else {
            navigate("/property_owner_profile");
        }
    }, [navigate]);

    const handleAddPropertyClick = () => {
        navigate("/add-property");
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const formData = new FormData();
            formData.append('profile_picture', file); // Append the selected image
            formData.append('email', ownerData.email); // Ensure the email is passed

            // Send the image to the backend using Axios
            axios.post('http://localhost:8000/owner_profile/update_picture/', formData, {  // Replace with your API endpoint
                headers: {
                    'Content-Type': 'multipart/form-data',  // Required for file upload
                }
            })
            .then(response => {
                if (response.data.success) {
                    // If the upload is successful, update the profile picture in state
                    setOwnerData(prevData => ({
                        ...prevData,
                        profilePicture: response.data.profilePictureUrl,  // Update with the URL returned by the backend
                    }));

                    // Optionally, update the localStorage to reflect the new profile picture
                    localStorage.setItem('loggedInOwner', JSON.stringify({
                        ...ownerData,
                        profilePicture: response.data.profilePictureUrl,
                    }));
                } else {
                    // Handle the error case (e.g., show a message to the user)
                    alert('Failed to upload image');
                }
            })
            .catch(error => {
                console.error('Error:', error);
                alert('There was an error uploading the image');
            });
        }
    };

    return (
        <div>
            {/* Navbar */}
            <Navbar />

            {/* Main Profile Section */}
            <main className="profile-page" style={{ backgroundColor: "#F9F3ED" }}>
                <div className="container" style={{ padding: "2rem 1rem" }}>
                    {/* Profile Header */}
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
                            {/* Avatar */}
                            <div
                                className="avatar"
                                style={{
                                    width: "200px",
                                    height: "200px",
                                    borderRadius: "50%",
                                    overflow: "hidden",
                                    border: "3px solid #ddd",
                                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                                    marginLeft: '25%',
                                    position: "relative", 
                                }}
                            >
                                <img
                                    src={ownerData.profilePicture ? `http://127.0.0.1:8000${ownerData.profilePicture}` : "images/default-avatar.jpg"}
                                    alt="Profile Avatar"
                                    style={{
                                        width: "100%",
                                        height: "100%",
                                        objectFit: "cover",
                                    }}
                                />
                                {/* Pen Icon */}
                                <label 
                                    htmlFor="fileInput" 
                                    style={{
                                        position: "absolute",
                                        top: "70%",  // Adjust the top position
                                        right: "15%",  // Adjust the right position
                                        cursor: "pointer",
                                        backgroundColor: "white",
                                        padding: "5px",
                                        borderRadius: "50%",
                                        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
                                    }}
                                >
                                    <i className="fa fa-pen" style={{ fontSize: "20px", color: "#16697A" }}></i>
                                </label>
                                {/* File Input (Hidden) */}
                                <input
                                    id="fileInput"
                                    type="file"
                                    style={{ display: "none" }}
                                    onChange={handleImageChange}
                                />
                            </div>

                            {/* Profile Form */}
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
                                    readOnly
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
                                    value={ownerData.phoneNumber || 'Mobile number not provided'}
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
                                    readOnly
                                />
                            </div>
                        </div>
                    </section>

                    {/* Your Properties */}
                    <h2 className="title">Your properties</h2>
                    <ApartmentGrid />
                    <div className="add-property-wrapper">
                        <button className="add-property-button" onClick={() => navigate("/add-property")}>
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
