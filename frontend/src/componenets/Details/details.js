import React from "react";
import Navbar from "../home/navbar1";
import Footer from "../home/footer";

const Details = () => {
    return (
        <div style={{ backgroundColor: "#ede7e3", fontFamily: "Arial, sans-serif" }}>
            {/* Navbar */}
            <Navbar />

            {/* Breadcrumbs */}
            <div
                style={{
                    padding: "10px 20px",
                    backgroundColor: "#f9f9f9",
                    fontSize: "14px",
                    color: "#6c757d",
                }}
            >
                <span>Home / Appartement Details</span>
            </div>

            {/* Apartment Details Section */}
            <div style={{ padding: "20px 40px", maxWidth: "1200px", margin: "auto" }}>
                {/* Title and Location */}
                <div style={{ marginBottom: "20px" }}>
                    <h1 className="title">
                        Flat in Jasmin Building
                    </h1>
                    <p style={{ fontSize: "16px", color: "#6c757d" }}>Sousse</p>
                </div>

                {/* Images Section */}
                <div style={{ display: "flex", gap: "20px", marginBottom: "30px" }}>
                    <img
                        src="/images/apartement.jpg" // Replace with your main image URL
                        alt="Main Room"
                        style={{
                            flex: 2,
                            borderRadius: "10px",
                            objectFit: "cover",
                            width: "100%",
                            height: "300px",
                        }}
                    />
                    <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "20px" }}>
                        <img
                            src="/images/apartement.jpg" // Replace with your side image 1 URL
                            alt="Room 1"
                            style={{
                                flex: 1,
                                borderRadius: "10px",
                                objectFit: "cover",
                                height: "140px",
                            }}
                        />
                        <img
                            src="/images/apartement.jpg" // Replace with your side image 2 URL
                            alt="Room 2"
                            style={{
                                flex: 1,
                                borderRadius: "10px",
                                objectFit: "cover",
                                height: "140px",
                            }}
                        />
                    </div>
                </div>

                {/* About the Place */}
                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        marginBottom: "30px",
                        gap: "20px",
                    }}
                >
                    {/* Text Section */}
                    <div style={{ flex: 2 }}>
                        <h2 className="sub-title">
                            About the place
                        </h2>
                        <p style={{ fontSize: "16px", color: "#6c757d", lineHeight: "1.6" }}>
                            Located in a vibrant neighborhood, the flat in Jasmin Building offers a modern
                            and comfortable stay with all the amenities you need for a convenient getaway.
                            This stylish apartment features spacious rooms, a fully equipped kitchen, and a
                            cozy living area, making it perfect for both short visits and extended stays.
                            With easy access to local shops, restaurants, and popular attractions, the
                            Jasmin Building provides an ideal home base for exploring the area while
                            enjoying a welcoming, homely atmosphere. Whether you're traveling for leisure
                            or business, this flat ensures a pleasant and memorable experience.
                        </p>
                    </div>

                    {/* Booking Section */}
                    <div
                        style={{
                            flex: 1,
                            padding: "20px",
                            backgroundColor: "#ffffff",
                            borderRadius: "10px",
                            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                            textAlign: "center",
                        }}
                    >
                        <p style={{ fontSize: "18px", fontWeight: "bold", color: "#023047", fontFamily: 'Baloo Bhaijaan 2' }}>
                            Start Booking
                        </p>
                        <p
                            style={{
                                fontSize: "32px",
                                fontWeight: "bold",
                                color: "#4291A3",
                                margin: "10px 0",
                            }}
                        >
                            99 DT
                        </p>
                        <p style={{ fontSize: "16px", color: "#6c757d", marginBottom: "20px" }}>
                            per night
                        </p>
                        <button className="button1">
                            Book Now!
                        </button>
                    </div>
                </div>

                {/* Features Section */}
                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-around",
                        padding: "20px",
                        backgroundColor: "#f9f9f9",
                        borderRadius: "10px",
                    }}
                >
                    {[
                        { icon: "🛏️", label: "3 bedroom" },
                        { icon: "🛋️", label: "1 living room" },
                        { icon: "🚿", label: "2 bathroom" },
                        { icon: "🍽️", label: "1 dining room" },
                        { icon: "📶", label: "10 mbp/s" },
                        { icon: "🛠️", label: "7 unit ready" },
                        { icon: "🧊", label: "1 refrigerator" },
                        { icon: "📺", label: "2 television" },
                    ].map((feature, index) => (
                        <div key={index} style={{ textAlign: "center" }}>
                            <div style={{ fontSize: "24px", marginBottom: "5px" }}>{feature.icon}</div>
                            <p style={{ fontSize: "14px", color: "#6c757d" }}>{feature.label}</p>
                        </div>
                    ))}
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default Details;
