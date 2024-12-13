import React, { useEffect, useState } from "react";
import Navbar2 from './navbar2';
import Navbar from '../home/navbar1';
import Footer from '../home/footer';
import SearchBar from './searchBar';
import ApartmentGrid from './apartmentGrid';

const Apartments = () => {
    // State to track selected furnishing type
    const [selectedCategory, setSelectedCategory] = useState("Modestly Furnished");

    // Handler for category change
    const handleCategoryChange = (event) => {
        setSelectedCategory(event.target.id);
    };

    return (
        <div style={{ backgroundColor: '#ede7e3', padding: '0 15px' }}>
            <div>
                <Navbar2 />
                <main>
                    <section className="hero_apt" style={{ padding: '200px 0' }}>
                        <h1 className='discover'>
                            Discover Sophisticated Living in Our Modern Apartments
                        </h1>
                    </section>
                    <SearchBar defaultCategory="apartments" />
                    <div
                        className="categories"
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginTop: '20px',
                        }}
                    >
                        <fieldset style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center' }}>
                            <div className="options-group">
                                <input
                                    type="radio"
                                    id="Modestly Furnished"
                                    name="option"
                                    checked={selectedCategory === "Modestly Furnished"}
                                    onChange={handleCategoryChange}
                                />
                                <label htmlFor="Modestly Furnished">Modestly Furnished</label>
                            </div>
                            <div className="options-group">
                                <input
                                    type="radio"
                                    id="Luxuriously Furnished"
                                    name="option"
                                    checked={selectedCategory === "Luxuriously Furnished"}
                                    onChange={handleCategoryChange}
                                />
                                <label htmlFor="Luxuriously Furnished">Luxuriously Furnished</label>

                            </div>
                        </fieldset>
                    </div>
                    {/* ApartmentGrid */}
                    <ApartmentGrid propertyType="Apartment" furnishingType={selectedCategory} />
                </main>
            </div>
            <Footer />
        </div>
    );
};

export default Apartments;
