import React, { useState, useEffect } from "react";
import Navbar from "../home/navbar1";
import Footer from "../home/footer";
import ApartmentGrid from "../categories/apartmentGrid";
import { useNavigate } from "react-router-dom";
import Review from "./review";

const Profile = () => {
    const navigate = useNavigate();
    
    // State to store user data
    const [userData, setUserData] = useState(null);

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

    const reviews = [
        {
            name: "Lobna Elabed",
            propertyName: "Luxury Apartment Downtown",
            description: "This place is absolutely amazing! Highly recommended.",
            stars: 5,
            date: "2 days ago",
            imageUrl: "images/apartment.jpg",
            profileImageUrl: "images/lobna.jpeg",
        },
        {
            name: "Lobna Elabed",
            propertyName: "Cozy Cottage Near the Lake",
            description: "Not bad, but could be better. The staff was helpful.",
            stars: 3,
            date: "1 week ago",
            imageUrl: "images/vacation.jpg",
            profileImageUrl: "images/lobna.jpeg",
        },
        {
            name: "Lobna Elabed",
            propertyName: "Beachside Villa",
            description: "Terrible experience. Would not recommend.",
            stars: 1,
            date: "1 month ago",
            imageUrl: "images/vacation.jpg",
            profileImageUrl: "images/lobna.jpeg",
        },
    ];

    if (!userData) {
        return <div>Loading...</div>; // Loading state until user data is available
    }

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
                            justifyContent: "space-between",  // Aligne les éléments sur la ligne
                            alignItems: "center",  // Centrer verticalement
                            gap: "10%",
                            width: "100%",  // Espace entre les éléments
                        }}
                    >
                        {/* Photo (à gauche) */}
                        <div
                            className="avatar"
                            style={{
                                width: "200px",
                                height: "200px",
                                borderRadius: "50%",
                                overflow: "hidden",
                                border: "3px solid #ddd",
                                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                                marginLeft:'25%',
                            }}
                        >
                            <img
                                src={userData.profile_picture || "images/default-avatar.jpg"} // Photo de profil dynamique
                                alt="Profile Avatar"
                                style={{
                                    width: "100%",
                                    height: "100%",
                                    objectFit: "cover", // S'assurer que l'image couvre toute la zone
                                }}
                            />
                        </div>

                        {/* Formulaire (à droite) */}
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
                                readOnly
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
                                value={userData.phone_number || "+216 ••• •••"}
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
                                value={userData.country || "Tunis"}
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


                    {/* Booking History */}
                    <h2 className="title">Booking History</h2>

                    <ApartmentGrid />

                    {/* Reviews History */}
                    <section style={{ marginBottom: "2rem" }}>
                        <h2 className="title">Reviews History</h2>
                        <div className="reviews">
                            {reviews.map((review, index) => (
                                <Review
                                    key={index}
                                    name={review.propertyName}
                                    description={review.description}
                                    stars={review.stars}
                                    date={review.date}
                                    imageUrl={review.imageUrl}
                                    profileImageUrl={userData.profile_picture || "images/default-avatar.jpg"}
                                />
                            ))}
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
