// Home.js

import React from 'react';
import Navbar from './navbar1';  // Assurez-vous que le chemin d'importation est correct

const Home = () => {
  return (
    <div style={{ backgroundColor: '#ede7e3' }}>
        <div style={{ position: 'relative' }}>
          <Navbar /> 

          {/* Image de couverture */}
              <img
              src="../images/couverture.png"  // Remplacez par l'URL de votre image
              alt="Image de couverture"
              style={{
      
                width: '50%',  // L'image prend toute la largeur
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
        <p style={{ fontSize: '18px', color: '#023047', maxWidth: '70%', margin: '0 auto', textIndent: '2%'  }}>
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
        <h2 style={{
          fontFamily: 'Baloo 2, sans-serif',
          fontSize: '30px',
          color: '#023047',
          marginBottom: '4%',
          fontWeight: 'bold',  // Ensure the title is bold
        }}>
          Categories
        </h2>

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
          </div>

          {/* Apartments */}
          <div style={{
            textAlign: 'center',
            backgroundColor: 'white',  // White background
            borderRadius: '15px',  // Rounded corners for the div
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', 
            padding: '10px 10px'// Optional: adds subtle shadow for depth
          }}>
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
          </div>
        </div>
      </div>
    </div>
    );
};

export default Home;
