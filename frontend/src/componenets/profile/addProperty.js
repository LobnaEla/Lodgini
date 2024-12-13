import React, { useState, useEffect } from "react";
import Navbar from "../profile/navbaro";
import Footer from "../home/footer";
import { useNavigate } from "react-router";
import axios from "axios";

const AddProperty = () => {
    const [isLoading, setIsLoading] = useState(true);

    const [propertyType, setPropertyType] = useState("Vacation House");
    const [category, setCategory] = useState("Modestly Furnished");
    const [formData, setFormData] = useState({
        name: "",
        property_type: "Vacation House",
        location: "",
        description: "",
        price_per_night: "",
        number_of_tvs: "",
        number_of_refrigerators: "",
        wifi_speed: "",
        number_of_bedrooms: "",
        number_of_living_rooms: "",
        number_of_bathrooms: "",
        number_of_dining_rooms: "",
        max_number_guests: "",
        furnishing_type: "",
        number_of_stars: "",
        images: [], // Initialize images as an empty array
    });
    const navigate = useNavigate();

    useEffect(() => {
        setFormData((prevData) => ({
            ...prevData,
            property_type: propertyType,
        }));
    }, [propertyType]);

    const handlePropertyTypeSwitch = (type) => {
        setPropertyType(type);
        setFormData((prev) => ({
            ...prev,
            property_type: type === "Vacation House" ? "Vacation House" : "Apartment",
        }));
    };

    const handleCancel = () => {
        navigate("/property_owner_profile");
    };

    const handleChange = (e) => {
        const { id, value } = e.target;

        // Ensure positive numbers for relevant fields
        const updatedValue = id.includes("number") || id === "price_per_night"
            ? Math.abs(value)  // Make sure the value is positive
            : value;

        setFormData((prev) => ({
            ...prev,
            [id]: id === "price_per_night" ? parseFloat(updatedValue) || "" : updatedValue,
        }));
    };

    // Handle file input change with a limit of 3 images
    const handleFileChange = (e) => {
        const files = e.target.files;

        // Ensure we don't exceed the maximum number of files (e.g., 3 images)
        if (files.length + formData.images.length > 3) {
            alert("You can only upload a maximum of 3 images.");
            return;
        }

        // Add the selected files to the state (only up to 3 files)
        setFormData((prev) => ({
            ...prev,
            images: [...prev.images, ...Array.from(files)].slice(0, 3), // Ensure no more than 3 files
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const payload = new FormData();
        payload.append("property_type", formData.property_type);
        payload.append("furnishing_type", formData.furnishing_type); // Send the selected furnishing type
        payload.append("name", formData.name);
        payload.append("location", formData.location);
        payload.append("description", formData.description);
        payload.append("price_per_night", formData.price_per_night);
        payload.append("number_of_tvs", formData.number_of_tvs);
        payload.append("number_of_refrigerators", formData.number_of_refrigerators);
        payload.append("wifi_speed", formData.wifi_speed);
        payload.append("number_of_bedrooms", formData.number_of_bedrooms);
        payload.append("number_of_living_rooms", formData.number_of_living_rooms);
        payload.append("number_of_bathrooms", formData.number_of_bathrooms);
        payload.append("number_of_dining_rooms", formData.number_of_dining_rooms);
        payload.append("max_number_guests", formData.max_number_guests);
        payload.append("furnishing_type", formData.furnishing_type);
        payload.append("number_of_stars", formData.number_of_stars);

        // Append images to FormData if they exist
        formData.images.forEach((image, index) => {
            payload.append(`image${index + 1}`, image);
        });

        // Get the logged-in owner's email from localStorage
        const loggedInOwner = JSON.parse(localStorage.getItem("loggedInOwner"));
        payload.append("owner_email", loggedInOwner.email);

        if (!loggedInOwner || !loggedInOwner.email) {
            alert("Please log in to continue.");
            navigate("/login");
            return;
        }

        try {
            // Axios POST request to the backend
            const response = await axios.post("http://localhost:8000/management/add_property/", payload, {
                headers: {
                    "Content-Type": "multipart/form-data", // Ensures that files are sent as multipart
                },
            });

            if (response.status === 201) {
                alert("Property added successfully!");
                navigate("/property_owner_profile");
            } else {
                alert("Failed to add property. Please try again.");
            }
        } catch (error) {
            console.error("Error:", error);
            alert("An error occurred while adding the property.");
        }
    };

    const handleCategoryChange = (e) => {
        const selectedCategory = e.target.value;
        setCategory(selectedCategory);  // Set the selected category to category state
        setFormData((prev) => ({
            ...prev,
            furnishing_type: selectedCategory,  // Update furnishing_type to the selected category
        }));
    };


    return (
        <div>
            <Navbar />
            <main className="add-property-page" style={{ backgroundColor: "#F9F3ED" }}>
                <div className="form-container">
                    <div className="form-header">
                        <h2>Add Property</h2>
                        <div className="property-type">
                            <button
                                className={propertyType === "Vacation House" ? "active" : ""}
                                onClick={() => handlePropertyTypeSwitch("Vacation House")}
                            >
                                Vacation House
                            </button>
                            <button
                                className={propertyType === "Apartment" ? "active" : ""}
                                onClick={() => handlePropertyTypeSwitch("Apartment")}
                            >
                                Apartment
                            </button>
                        </div>
                    </div>
                    <form className="form" onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="name" style={{ textAlign: 'left', fontSize: "20px", marginBottom: '3%' }}>Name</label>
                            <input
                                type="text"
                                id="name"
                                placeholder="Property name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label
                                htmlFor="location"
                                style={{ textAlign: 'left', fontSize: "20px", marginBottom: '3%' }}
                            >
                                Location
                            </label>
                            <select
                                id="location"
                                value={formData.location}
                                onChange={handleChange}
                                required
                                style={{
                                    width: '100%',
                                    padding: '10px',
                                    fontSize: '16px',
                                    border: '2px solid #ccc',
                                    borderRadius: '5px',
                                    backgroundColor: '#f9f9f9',
                                    color: '#333',
                                    outline: 'none',
                                    appearance: 'none',
                                    WebkitAppearance: 'none',
                                    MozAppearance: 'none',
                                    backgroundImage: "url('data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 20 20%22 fill=%22none%22%3E%3Cpath fill-rule=%22evenodd%22 clip-rule=%22evenodd%22 d=%22M5 7a1 1 0 011.707-.707L10 9.586l3.293-3.293A1 1 0 1114.707 7l-5 5a1 1 0 01-1.414 0l-5-5z%22 fill=%22%23222%22/%3E%3C/svg%3E')",
                                    backgroundRepeat: 'no-repeat',
                                    backgroundPosition: 'right 10px center',
                                    backgroundSize: '20px',

                                }}
                            >
                                <option value="">Select Location</option>
                                <option value="Ariana">Ariana</option>
                                <option value="Beja">Beja</option>
                                <option value="Ben Arous">Ben Arous</option>
                                <option value="Bizerte">Bizerte</option>
                                <option value="Gabes">Gabes</option>
                                <option value="Gafsa">Gafsa</option>
                                <option value="Jendouba">Jendouba</option>
                                <option value="Kairouan">Kairouan</option>
                                <option value="Kasserine">Kasserine</option>
                                <option value="Kebili">Kebili</option>
                                <option value="La Manouba">La Manouba</option>
                                <option value="Le Kef">Le Kef</option>
                                <option value="Mahdia">Mahdia</option>
                                <option value="Medenine">Medenine</option>
                                <option value="Monastir">Monastir</option>
                                <option value="Nabeul">Nabeul</option>
                                <option value="Sfax">Sfax</option>
                                <option value="Sidi Bouzid">Sidi Bouzid</option>
                                <option value="Siliana">Siliana</option>
                                <option value="Sousse">Sousse</option>
                                <option value="Tataouine">Tataouine</option>
                                <option value="Tozeur">Tozeur</option>
                                <option value="Tunis">Tunis</option>
                                <option value="Zaghouan">Zaghouan</option>
                            </select>
                        </div>

                        <div className="form-group">
                            <label htmlFor="category" style={{ textAlign: 'left', fontSize: "20px", marginBottom: '3%' }}>Category</label>
                            <div className="radio-group">
                                <label>
                                    <input
                                        type="radio"
                                        name="category"
                                        value="Modestly Furnished"
                                        checked={formData.furnishing_type === "Modestly Furnished"}
                                        onChange={handleCategoryChange}
                                    />
                                    Modestly Furnished
                                </label>
                                <label>
                                    <input
                                        type="radio"
                                        name="category"
                                        value="Luxuriously Furnished"
                                        checked={formData.furnishing_type === "Luxuriously Furnished"}
                                        onChange={handleCategoryChange}
                                    />
                                    Luxuriously Furnished
                                </label>
                            </div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="description" style={{ textAlign: 'left', fontSize: "20px", marginBottom: '3%' }}>About the place</label>
                            <textarea
                                id="description"
                                rows="4"
                                placeholder="Write your description here"
                                value={formData.description}
                                onChange={handleChange}
                            ></textarea>
                        </div>

                        <div className="form-group">
                            <label htmlFor="price_per_night" style={{ textAlign: 'left', fontSize: "20px", marginBottom: '3%' }}>Price per night (TND)</label>
                            <input
                                type="number"
                                id="price_per_night"
                                placeholder="Value"
                                value={formData.price_per_night}
                                onChange={handleChange}
                                required
                                min="0"
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="number_of_stars" style={{ textAlign: 'left', fontSize: "20px", marginBottom: '3%' }}>Number of Stars</label>
                            <input
                                type="number"
                                id="number_of_stars"
                                min="1"
                                max="6"
                                placeholder="1 - 6"
                                value={formData.number_of_stars}
                                onChange={handleChange}
                                required

                            />
                        </div>
                        <div className="form-group">
                            <label
                                htmlFor="images"
                                style={{ textAlign: "left", fontSize: "20px", marginBottom: "3%" }}
                            >
                                Photos (min 2 , max 3)
                            </label>
                            <div style={{ position: 'relative', display: 'inline-block' }}>
                                {/* Masque l'input file réel */}
                                <input
                                    type="file"
                                    id="images"
                                    accept="image/*"
                                    onChange={handleFileChange}
                                    required
                                    style={{
                                        position: 'absolute',
                                        top: '0',
                                        left: '0',
                                        width: '100%',
                                        height: '100%',
                                        opacity: '0', // Masque l'input de manière transparente
                                        cursor: 'pointer', // Change le curseur au survol
                                    }}
                                    multiple
                                />
                                {/* Bouton personnalisé avec l'icône */}
                                <button
                                    type="button"
                                    style={{
                                        padding: '10px 20px',
                                        fontSize: '16px',
                                        border: '2px solid #ccc',
                                        borderRadius: '5px',
                                        backgroundColor: '#f9f9f9',
                                        color: '#333',
                                        cursor: 'pointer',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '10px',
                                    }}
                                    onClick={() => document.getElementById('images').click()} // Fait "cliquer" l'input file
                                >
                                    <i className="fa fa-camera" style={{ fontSize: '20px' }}></i> {/* Icône de caméra */}
                                    Ajouter des images
                                </button>
                            </div>
                        </div>


                        <div className="form-group details">
                            <label style={{ textAlign: "left", fontSize: "20px", marginBottom: "3%" }}>
                                More details:
                            </label>
                            <div className="detail-inputs">
                                <div className="detail">
                                    <span className="icon">📺</span>
                                    <label>Television</label>
                                    <input
                                        type="number"
                                        id="number_of_tvs"
                                        placeholder="Available number"
                                        value={formData.number_of_tvs}
                                        onChange={handleChange}
                                        min="0"
                                    />
                                </div>
                                <div className="detail">
                                    <span className="icon">🧊</span>
                                    <label>Refrigerator</label>
                                    <input
                                        type="number"
                                        id="number_of_refrigerators"
                                        placeholder="Available number"
                                        value={formData.number_of_refrigerators}
                                        onChange={handleChange}
                                        min="0"
                                    />
                                </div>
                                <div className="detail">
                                    <span className="icon">📶</span>
                                    <label>Wi-Fi speed </label>
                                    <input
                                        type="number"
                                        id="wifi_speed"
                                        placeholder=" in Mbps"
                                        value={formData.wifi_speed}
                                        onChange={handleChange}
                                        min="0"
                                    />
                                </div>
                                <div className="detail">
                                    <span className="icon">🛏️</span>
                                    <label>Bedrooms</label>
                                    <input
                                        type="number"
                                        id="number_of_bedrooms"
                                        placeholder="Value"
                                        value={formData.number_of_bedrooms}
                                        onChange={handleChange}
                                        min="0"
                                    />
                                </div>
                                <div className="detail">
                                    <span className="icon">🛋️</span>
                                    <label>Living Rooms</label>
                                    <input
                                        type="number"
                                        id="number_of_living_rooms"
                                        placeholder="Value"
                                        value={formData.number_of_living_rooms}
                                        onChange={handleChange}
                                        min="0"
                                    />
                                </div>
                                <div className="detail">
                                    <span className="icon">🚿</span>
                                    <label>Bathrooms</label>
                                    <input
                                        type="number"
                                        id="number_of_bathrooms"
                                        placeholder="Value"
                                        value={formData.number_of_bathrooms}
                                        onChange={handleChange}
                                        min="0"
                                    />
                                </div>
                                <div className="detail">
                                    <span className="icon">🍽️</span>
                                    <label>Dining Rooms</label>
                                    <input
                                        type="number"
                                        id="number_of_dining_rooms"
                                        placeholder="Value"
                                        value={formData.number_of_dining_rooms}
                                        onChange={handleChange}
                                        min="0"
                                    />
                                </div>
                                <div className="detail">
                                    <span className="icon">👥</span>
                                    <label>Max Guests</label>
                                    <input
                                        type="number"
                                        id="max_number_guests"
                                        placeholder="Value"
                                        value={formData.max_number_guests}
                                        onChange={handleChange}
                                        min="0"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="form-buttons">
                            <button type="button" className="cancel" onClick={handleCancel}>
                                Cancel
                            </button>
                            <button type="submit" className="confirm">
                                Confirm
                            </button>
                        </div>
                    </form>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default AddProperty;
