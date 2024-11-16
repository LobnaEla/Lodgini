import React from 'react';
import Navbar2 from './navbar2';
import Navbar from '../home/navbar1';
import Footer from '../home/footer';
import SearchBar from './searchBar';
import ApartmentGrid from './apartmentGrid';
import Radio from './radio';

const Apartments = () => {
    return (
        <div style={{ backgroundColor: '#ede7e3', padding: '0 15px' }}>
            <div>
                <Navbar2 />
                <main>
                    <section className="hero" style={{ padding: '50px 0' }}>
                        <h1 style={{ textAlign: 'center', fontSize: '2rem', color: '#333' }}>
                            Discover Sophisticated Living in Our Modern Apartments
                        </h1>
                    </section>
                    <SearchBar />
                    <div style={{ margin: '20px 0', textAlign: 'center' }}>
                        <Radio option1="Luxuriously furnished" option2="Modestly furnished" />
                    </div>
                    <ApartmentGrid />
                </main>
            </div>
            <Footer />
        </div>
    );
}

export default Apartments;
