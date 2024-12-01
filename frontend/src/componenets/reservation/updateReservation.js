import React from 'react';
import Calendar from './calendar';
import Navbar from '../home/navbar1';
import Footer from '../home/footer';

const UpdateReservation = () => {
    return (
        <div style={{ backgroundColor: "#F9F3ED" }}>
            <Navbar />
            <div className="main-content" >
                <Calendar />
            </div>
            <Footer />
        </div>
    );
};

export default UpdateReservation;