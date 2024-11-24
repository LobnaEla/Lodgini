import React, { useEffect, useState } from "react";
import Navbar from "../profile/navbaro";
import Footer from "../home/footer";
import { useNavigate } from "react-router-dom";
import ApartmentGrid from "../categories/apartmentGrid";

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
        // Charger les données du propriétaire depuis localStorage
        const storedData = localStorage.getItem('loggedInOwner');
        if (storedData) {
            setOwnerData(JSON.parse(storedData));
        } else {
            // Si pas de données, rediriger l'utilisateur
            navigate("/login");  // Remplacez par la bonne route de connexion
        }
    }, [navigate]);

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
                    <section style={{ marginBottom: "5%" }}>
                        <h1 className="title" style={{ marginBottom: "5%" }}>Your Profile</h1>
                        <div
                            className="profile-info"
                            style={{
                                display: "flex",          // Utilisation de flexbox pour aligner horizontalement
                                alignItems: "center",     // Aligne les éléments verticalement au centre
                                justifyContent: "space-between", // Espaces égaux entre avatar et form
                                gap: "10%",              // Espacement entre l'avatar et le formulaire
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
                                    marginLeft:'25%',
                                }}
                            >
                                <img
                                    src={ownerData.profilePicture || "images/default-avatar.jpg"}  // Avatar par défaut
                                    alt="Profile Avatar"
                                    style={{
                                        width: "100%",
                                        height: "100%",
                                        objectFit: "cover",
                                    }}
                                />
                            </div>

                            {/* Formulaire */}
                            <div className="form" style={{ flex: 1 }}> {/* Utilisation de flex pour occuper le reste de l'espace */}
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
                                    value={ownerData.phoneNumber || 'Not provided'}
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
                                    value={ownerData.country || 'Not provided'}
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
            </main>

            {/* Footer */}
            <Footer />
        </div>
    );
};

export default Profile;
