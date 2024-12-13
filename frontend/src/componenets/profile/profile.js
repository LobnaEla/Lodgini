import React, { useState, useEffect } from "react";
import Navbar from "../home/navbar1";
import Footer from "../home/footer";
import { useNavigate } from "react-router-dom";
import Review1 from "./reviews1";
import Bookings from "./bookings";

const Profile = () => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);

    // State to store user data
    const [userData, setUserData] = useState(null);
    const [isEditing, setIsEditing] = useState(false); // To manage the edit mode

    // Get user data from localStorage if the user is logged in
    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem('loggedInUser'));
        if (storedUser) {
            setUserData(storedUser);
        } else {
            navigate('/Sign_in'); // Redirect to login if not logged in
        }
    }, [navigate]);

    const handleAddReviewClick = () => {
        navigate("/Profile/Add_review");
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const formData = new FormData();
            formData.append('profile_picture', file); 
            formData.append('email', userData.email); 

            // Simulate a backend call to update the profile picture
            fetch('http://localhost:8000/update_profile_picture/', {
                method: 'POST',
                body: formData,
            })
                .then((response) => response.json())
                .then((data) => {
                    if (data.success) {
                        setUserData((prevData) => ({
                            ...prevData,
                            profile_picture: data.profilePictureUrl,
                        }));
                        localStorage.setItem(
                            'loggedInUser',
                            JSON.stringify({
                                ...userData,
                                profile_picture: data.profilePictureUrl,
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
        const updatedData = {
            name: userData.name,
            phone_number: userData.phone_number,
            country: userData.country,
            email: userData.email, // Always include the email
        };

        // Simulate sending the updated profile data to the backend
        fetch('http://localhost:8000/user_profile/update/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedData),
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.success) {
                    setUserData((prevData) => ({
                        ...prevData,
                        profile_picture: data.profilePictureUrl || prevData.profile_picture, // Assurez-vous de conserver l'image si elle n'a pas changé
                    }));
                    localStorage.setItem('loggedInUser', JSON.stringify({
                        ...updatedData,
                        profile_picture: data.profilePictureUrl || userData.profile_picture, // Assurez-vous de conserver l'image
                    }));
                    setIsEditing(false); // Désactiver l'édition
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
        const storedData = localStorage.getItem('loggedInUser');
        if (storedData) {
            setUserData(JSON.parse(storedData));
        }
        setIsEditing(false); // Disable editing
    };

    // Handle Input Changes for Profile Data
    const handleInputChange = (e, field) => {
        setUserData((prevData) => ({
            ...prevData,
            [field]: e.target.value,
        }));
    };

    if (!userData) {
        return <div>Loading...</div>; // Loading state until user data is available
    }

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
                                    src={userData.profile_picture ? `http://localhost:8000${userData.profile_picture}`  : '../../../public/images/default-avatar.jpg'} 
                                    alt="Profile Avatar"
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
                                    value={userData.name}
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
                                    value={userData.email}
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
                                    value={userData.phone_number || 'Mobile number not provided'}
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
                                    value={userData.country || 'Country not provided'}
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

                    {/* Booking History */}
                    <h2 className="title">Booking History</h2>
                    <Bookings />

                    {/* Reviews History */}
                    <section style={{ marginBottom: "2rem" }}>
                        <h2 className="title">Reviews History</h2>
                        <div className="reviews">
                            <Review1 userId={userData.id} />
                        </div>
                        <button onClick={handleAddReviewClick} className="button1">
                            Write Review
                        </button>
                    </section>
                </div>
            </main>

            {/* Footer */}
            <Footer />
        </div>
    );
};

export default Profile;
