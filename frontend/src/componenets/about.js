import React from 'react';
import Footer from './home/footer';
import Navbar from './home/navbar1';

const About = () => {
  return (
    <div style={{ backgroundColor: '#ede7e3', paddingBottom: '0' }}>
      <Navbar />
      
      {/* Title Section */}
      <div style={{ textAlign: 'center', paddingTop: '30px', fontSize: '36px', fontWeight: 'bold' }}>
        About Us
      </div>
      
      {/* Content Section */}
      <div style={{ display: 'flex', justifyContent: 'center', padding: '30px', margin: '0 5%', paddingBottom: '0', textAlign: 'left', paddingTop: '5%' }}>
        
        {/* Left Column */}
        <div style={{ flex: 1, maxWidth: '50%' }}>
          <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#16697a' }}>
            <span style={{ color: '#023047' }}>Who</span> We Are?
          </div>
          <p style={{ fontSize: '16px', lineHeight: '1.6' }}>
            We are a dedicated team of travel and hospitality enthusiasts
            committed to connecting travelers with unique and comfortable
            accommodations. Our platform was built to provide a seamless
            booking experience for guests while offering property owners
            the tools they need to showcase and manage their rentals. With
            a diverse range of properties and a commitment to quality service,
            we aim to make every stay memorable and stress-free.
          </p>
          
          <div style={{ fontSize: '24px', fontWeight: 'bold', marginTop: '30px', color: '#16697a' }}>
            <span style={{ color: '#023047' }}>Our</span> Mission
          </div>
          <p style={{ fontSize: '16px', lineHeight: '1.6' }}>
            Our mission is to redefine the way people experience travel by
            providing a trusted platform that bridges the gap between
            travelers and property owners. We strive to offer unparalleled
            convenience, transparency, and personalized service, enabling
            our guests to discover new destinations while feeling right at home.
            Through innovation and a focus on quality, we aim to empower our
            users to make meaningful travel memories, one stay at a time.
          </p>
        </div>
        
        {/* Right Column (Image) */}
        <div style={{ flex: 1, padding: '0', paddingTop: '2%', marginBottom: '2%', display: 'flex', justifyContent: 'center' }}>
          <img 
            src="../images/woman.png" 
            alt="About Us" 
            style={{ width: '30%', height: '100%', borderRadius: '8px' }} 
          />
        </div>
        
      </div>

      {/* New Box Section */}
      <div style={{
        backgroundColor: '#d69e66', 
        borderRadius: '12px', 
        padding: '20px', 
        margin: '20px 5%', 
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'
      }}>
        {/* Main Service Title */}
        
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'left' }}>
            {/* First Service */}
            <div style={{ width: '30%', paddingRight: '20px', paddingLeft:'2%' , paddingTop:'3%'}}>
              <p style={{ fontSize: '25px', fontWeight: 'bold', color: '#ede7e3' , textAlign:'left',fontFamily: 'Baloo 2, sans-serif',}}> We offer our best
              services</p>
              
            </div>
                 {/* First Service */}
          <div style={{ width: '30%', paddingRight: '3%' }}>
            <div style={{ fontSize: '18px', fontWeight: 'bold', color: '#ede7e3' }}>Booking Platform</div>
            <p style={{ color: 'black' , textAlign:'left'}}>
              We provide a user-friendly platform where travelers can browse, compare, and book a variety of accommodations.
            </p>
          </div>

          {/* Second Service */}
          <div style={{ width: '30%', paddingRight: '3%' }}>
            <div style={{ fontSize: '18px', fontWeight: 'bold', color: '#ede7e3' }}>Reservation Management for Property Owners</div>
            <p style={{ color: 'black' , textAlign:'left'}}>
              Our platform equips property owners with intuitive tools to manage reservations, update availability, adjust pricing, and respond to guest inquiries.
            </p>
          </div>

          {/* Third Service */}
          <div style={{ width: '30%' }}>
            <div style={{ fontSize: '18px', fontWeight: 'bold', color: '#ede7e3' }}>24/7 Customer Support</div>
            <p style={{ color: 'black' , textAlign:'left'}}>
              We offer round-the-clock support to both guests and property owners.
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default About;
