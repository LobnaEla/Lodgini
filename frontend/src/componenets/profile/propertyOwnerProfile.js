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

                    {/* Your Properties */}
                    <h2 className="title">Your properties</h2>
                    <ApartmentGrid />
                    <div className="add-property-wrapper">
                        <button className="add-property-button" onClick={() => navigate("/add-property")}>
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
