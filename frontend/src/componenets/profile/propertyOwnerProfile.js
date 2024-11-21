import React from "react";
import Navbar from "../home/navbar1";
import Footer from "../home/footer";
import ApartmentGrid from "../categories/apartmentGrid";
import { useNavigate } from "react-router-dom";

const Profile = () => {
    const navigate = useNavigate();
    const handleAddPropertyClick = () => {
        navigate("/add-property");
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
                                    width: "150px",
                                    height: "150px",
                                    borderRadius: "50%",
                                    overflow: "hidden",
                                    border: "3px solid #ddd",
                                    marginBottom: "1.5rem",
                                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                                }}
                            >
                                <img
                                    src="images/farah.jpg" // Update the path if necessary
                                    alt="Profile Avatar"
                                    style={{
                                        width: "100%",
                                        height: "100%",
                                        objectFit: "cover",
                                    }}
                                />
                            </div>
                            <div className="form">
                                <input
                                    type="text"
                                    value="Farah Rebai"
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
                                    value="farah.rebai@supcom.tn"
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
                                    value="Sfax"
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
                        <button className="add-property-button" onClick={() => navigate("/add_property")}>
                            <span> +</span>
                        </button>
                    </div>

                </div>
            </main >

            {/* Footer */}
            < Footer />
        </div >
    );
};

export default Profile;
