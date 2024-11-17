import React from "react";
import Navbar from "../home/navbar1";
import Footer from "../home/footer";
import ApartmentGrid from "../categories/apartmentGrid";
import { useNavigate } from "react-router-dom";

const Profile = () => {
    const navigate = useNavigate();
    const handleAddReviewClick = () => {
        navigate("/Profile/Add_review");
    };

    return (
        <div>
            {/* Navbar */}
            <Navbar />

            {/* Main Profile Section */}
            <main className="profile-page" style={{ backgroundColor: "#F9F3ED" }}>
                <div className="container" style={{ padding: "2rem 1rem" }}>
                    {/* Profile Header */}
                    <section style={{ marginBottom: "2rem" }}>
                        <h1 className="title">
                            Your Profile
                        </h1>
                        <div
                            className="profile-info"
                            style={{
                                display: "flex",
                                alignItems: "center",
                                flexDirection: "column",
                                gap: "1rem",
                            }}
                        >
                            <div
                                className="avatar"
                                style={{
                                    width: "100px",
                                    height: "100px",
                                    borderRadius: "50%",
                                    backgroundColor: "#CCC",
                                }}
                            ></div>
                            <div className="form">
                                <input
                                    type="text"
                                    value="John Doe"
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
                                    value="example@gmail.com"
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
                                    value="+216 ••• •••"
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
                                    value="Nabeul"
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
                            <div
                                className="review-card"
                                style={{
                                    background: "#FFF",
                                    border: "1px solid #ddd",
                                    padding: "1rem",
                                    borderRadius: "8px",
                                    boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                                    maxWidth: "400px",
                                }}
                            >
                                <div
                                    className="review-header"
                                    style={{ display: "flex", alignItems: "center", marginBottom: "1rem" }}
                                >
                                    <div
                                        className="avatar"
                                        style={{
                                            width: "50px",
                                            height: "50px",
                                            borderRadius: "50%",
                                            backgroundColor: "#CCC",
                                            marginRight: "1rem",
                                        }}
                                    ></div>
                                    <div>
                                        <p style={{ fontWeight: "700", marginBottom: "0.2rem" }}>John Doe</p>
                                        <p style={{ fontSize: "0.9rem", color: "#555" }}>Royal Azur Thalassa</p>
                                    </div>
                                </div>
                                <p style={{ fontSize: "0.9rem", color: "#555" }}>
                                    Royal Azur is excellent. I'd definitely recommend it to a friend.
                                </p>
                            </div>
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
