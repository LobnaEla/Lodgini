import Footer from './footer';
import React from 'react';
import Navbar from './navbar1';
import { Link } from 'react-router-dom';
import Card from '../categories/card';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Review from '../profile/review';
import SearchBar1 from './searchBar1';
import '../home/sliderStyles.css';
const Home = () => {
  const handleSearch = (query) => {
    console.log("Search query:", query);
    // Add logic to handle the search query
  };


  const discounts = [
    {
      id: 1,
      image: "/images/apartement.jpg", // Replace with your image URLs
      title: "20% Off on Luxury Hotels",
      description: "Enjoy premium stays at discounted rates.",
      validity: "Valid until 30th Nov 2024",
    },
    {
      id: 2,
      image: "/images/apartement.jpg",
      title: "15% Off on Family Packages",
      description: "Perfect for group and family trips.",
      validity: "Valid until 15th Dec 2024",
    },
    {
      id: 3,
      image: "/images/apartement.jpg",
      title: "Last Minute Deals - 25% Off",
      description: "Book now and save big on your next trip!",
      validity: "Limited-time offer",
    },
  ];

  const popularAccommodations = [
    { name: "Flat in Jasmin Building", stars: 4, price: "84", image: "/images/apartement.jpg" },
    { name: "Appart’ Medina", stars: 5, price: "129", image: "/images/apartement.jpg" },
    { name: "La Suite Zembra", stars: 3, price: "64", image: "/images/apartement.jpg" },
    { name: "Le Patio Andalou", stars: 4, price: "156", image: "/images/apartement.jpg" },
  ];

  const sliderSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4.5,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  const reviews = [
    {
      name: "Lobna Elabed",
      description: "Lodgini is the best",
      stars: 5,
      date: "2 days ago",
      profileImageUrl: "images/lobna.jpeg",
    },
    {
      name: "Lobna Elabed",
      description: "Lodgini is the best",
      stars: 3,
      date: "1 week ago",
      profileImageUrl: "images/lobna.jpeg",
    },
    {
      name: "Lobna Elabed",
      description: "Lodgini is the best",
      stars: 1,
      date: "1 month ago",
      profileImageUrl: "images/lobna.jpeg",
    },
  ];

  return (
    <div style={{ backgroundColor: '#ede7e3' }}>
      <div style={{ position: 'relative' }}>
        <Navbar />

        {/* Image de couverture */}
        <img
          src="../images/cover.png"  // Remplacez par l'URL de votre image
          alt="Image de couverture"
          style={{

            width: '100% ',  // L'image prend toute la largeur
            height: '10%',  // Pour garder l'aspect de l'image
          }}
        />


        {/* Image welcome positionnée devant l'image de couverture */}
        <img
          src="../images/welcome.png"  // Remplacez par l'URL de votre image
          style={{
            position: 'absolute',
            top: '15%',  // Ajustez pour la position verticale
            left: '25%',  // Centré horizontalement
            transform: 'translateX(-50%)',  // Centrer précisément
            width: '25%',  // Taille de l'image welcome
            height: '25%', // Pour garder l'aspect de l'image
          }}
        />
      </div>

      <SearchBar1 onSearch={handleSearch} />

      {/* New Section with Photo and Paragraph */}
      <div style={{ textAlign: 'center', paddingTop: '2%' }}>
        <img
          src="../images/why.png"  // Remplacez par l'URL de votre nouvelle image
          alt="New Image"
          style={{
            width: '10%',  // Adjust the size of the image as needed
            height: '10%',
            marginBottom: '20px', // Space between image and text
          }}
        />
        <p style={{ fontSize: '18px', color: '#023047', maxWidth: '70%', margin: '0 auto', textIndent: '2%' }}>
          At Lodgini, we offer luxurious vacation houses and furnished apartments. Our easy booking process ensures a seamless experience, allowing you to serve with confidence.
          Choose Lodgini for a secure and luxurious stay, where every property feels like a home away from home.
        </p>
      </div>
      <div style={{
        backgroundColor: '#ead2ac',
        padding: '2%',
        marginTop: '3%',
        marginBottom: '1%',
        display: 'grid',  // Utilisation de la grille CSS
        gridTemplateColumns: 'repeat(3, 1fr)',  // Crée trois colonnes égales
        justifyItems: 'center',  // Centre les éléments horizontalement
        alignItems: 'center',  // Centre les éléments verticalement
        gap: '20px',  // Espacement entre les éléments
      }}>

        {/* Première Image */}
        <div style={{ textAlign: 'center' }}>
          <img
            src="../images/money-management.png"  // Remplacez par l'URL de votre image
            alt="Best Service"
            style={{
              width: '100px',  // Ajustez la taille de l'image
              height: '100px',
              marginBottom: '5px', // Espacement entre l'image et le texte
            }}
          />
          <p style={{ color: '#16697a', fontSize: '20px', fontWeight: 'bold' }}>Best Service</p>
        </div>

        {/* Deuxième Image */}
        <div style={{ textAlign: 'center' }}>
          <img
            src="../images/chat-en-direct.png"  // Remplacez par l'URL de votre image
            alt="Client Service"
            style={{
              width: '100px',  // Ajustez la taille de l'image
              height: '100px',
              marginBottom: '5px', // Espacement entre l'image et le texte
            }}
          />
          <p style={{ color: '#16697a', fontSize: '20px', fontWeight: 'bold' }}>Client Service</p>
        </div>

        {/* Troisième Image */}
        <div style={{ textAlign: 'center' }}>
          <img
            src="../images/serveur-securise.png"  // Remplacez par l'URL de votre image
            alt="Secure Payment"
            style={{
              width: '100px',  // Ajustez la taille de l'image
              height: '100px',
              marginBottom: '5px', // Espacement entre l'image et le texte
            }}
          />
          <p style={{ color: '#16697a', fontSize: '20px', fontWeight: 'bold' }}>Secure Payment</p>
        </div>

      </div>

      {/* Categories Section */}
      <div style={{ textAlign: 'center', marginTop: '2%' }}>
        {/* Title "Categories" */}
        <h1 className='title'>
          Categories
        </h1>

        {/* Categories Section */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '150px',
          marginTop: '20px',

        }}>
          {/* Vacation Houses */}
          <div style={{
            textAlign: 'center',
            backgroundColor: 'white',  // White background
            borderRadius: '15px',  // Rounded corners for the div
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            padding: '10px 10px' // Optional: adds subtle shadow for depth
          }}>
            <Link to="/vacation_houses" style={{ textDecoration: 'none' }}>
              <img
                src="../images/vacation.jpg"  // Replace with the actual URL of your image
                alt="Vacation Houses"
                style={{
                  width: '150px',  // Adjust the image size
                  height: '150px',
                  borderRadius: '15px',  // Rounded corners for the image

                }}
              />
              <p style={{ fontSize: '18px', fontWeight: 'bold', color: '#000' }}>Vacation Houses</p>
            </Link>
          </div>

          {/* Apartments */}
          <div style={{
            textAlign: 'center',
            backgroundColor: 'white',  // White background
            borderRadius: '15px',  // Rounded corners for the div
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            padding: '10px 10px'// Optional: adds subtle shadow for depth
          }}>
            <Link to="/apartments" style={{ textDecoration: 'none' }}>
              <img
                src="../images/apartement.jpg"  // Replace with the actual URL of your image
                alt="Apartments"
                style={{
                  width: '150px',  // Adjust the image size
                  height: '150px',
                  borderRadius: '15px',  // Rounded corners for the image

                }}
              />

              <p style={{ fontSize: '18px', fontWeight: 'bold', color: '#000' }}>Apartments</p>
            </Link>
          </div>
        </div>
      </div>

      {/* Discounts */}
      <div className="discounts-section">
        <h2 className='title'>Exclusive Discounts</h2>
        <div className="discounts-container">
          {discounts.map((discount) => (
            <div className="discount-card" key={discount.id}>
              <img src={discount.image} alt={discount.title} className="discount-image" />
              <div className="discount-info">
                <h3 className="discount-title">{discount.title}</h3>
                <p className="discount-description">{discount.description}</p>
                <p className="discount-validity">{discount.validity}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Popular accommodations */}
      <section className="popular-accommodations" style={{ marginBottom: "2rem", padding:'0', height: '450px'}}>
        <h1 className='title'>Popular Accommodations</h1>
        <Slider {...sliderSettings}>
          {popularAccommodations.map((accommodation) => (
            <Card key={accommodation.id} {...accommodation} />
          ))}
        </Slider>
      </section>

      {/* Reviews */}
      <section style={{ marginBottom: "2rem", marginTop:'0' }}>
        <div className="sub-title" style={{ display:'flex', textAlign:'center' , marginLeft:'35%'}}>
          <h2 className="sub-title"  style={{ color: "#16697A" , marginRight:'1%'}}> What  </h2>
          <h2 className="sub-title" style ={{marginRight:'1%'}}> Lodgini</h2>
          <h2 className="sub-title" style={{ color: "#16697A" }}> users are saying ?</h2>
        </div>
       <div className="reviews">
          {reviews.map((review, index) => (
            <Review
              key={index}
              description={review.description}
              stars={review.stars}
              date={review.date}
              profileImageUrl={review.profileImageUrl}
            />
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;
