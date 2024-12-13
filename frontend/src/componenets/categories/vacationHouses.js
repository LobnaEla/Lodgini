import React, { useEffect, useState } from "react";
import Navbar2 from './navbar2';
import Navbar from '../home/navbar1';
import Footer from '../home/footer';
import SearchBar from './searchBar';
import ApartmentGrid from './apartmentGrid';
import Radio from './radio';

const VacationHouses = () => {
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
                    <section className="hero_vac" style={{ padding: '200px 0' }}>
                        <h1 className="discover" >
                            Discover Sophisticated Living in Our Vacation Houses
                        </h1>
                    </section>
                    <SearchBar defaultCategory="vacationHouses" />
                    <div
                        className="categories"
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center', // Center horizontally
                            marginTop: '20px', // Optional spacing above
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
                    <ApartmentGrid propertyType="Vacation House" furnishingType={selectedCategory} />
                </main>
            </div>
            <Footer />
        </div>
    );
}

export default VacationHouses;
