import React from 'react';
import Navbar2 from './navbar2';
import Navbar from '../home/navbar1';
import Footer from '../home/footer';
import SearchBar from './searchBar';
import ApartmentGrid from './apartmentGrid';
import Radio from './radio';

const VacationHouses = () => {
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
                                <input type="radio" id="Luxuriously furnished" name="option" defaultChecked />
                                <label htmlFor="Luxuriously furnished">Luxuriously furnished</label>
                            </div>
                            <div className="options-group">
                                <input type="radio" id="Modestly furnished" name="option" />
                                <label htmlFor="Modestly furnished">Modestly furnished</label>
                            </div>
                        </fieldset>
                    </div>
                    <ApartmentGrid />
                </main>
            </div>
            <Footer />
        </div>
    );
}

export default VacationHouses;
