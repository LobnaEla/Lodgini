import React from 'react';
import Navbar from '../home/navbar1';
import Footer from '../home/footer';

export const Created = () => {
  return (
    <div style={{ backgroundColor: '#ede7e3' }}>
      <Navbar />
      
      <div style={{ display: 'flex', height: '100vh' }}>
        {/* Partie gauche pour l'image */}
        <div style={{
          flex: 1,
          position: 'relative',
          height: '100%',
        }}>
          {/* Image de couverture */}
          <img
            src="../images/woman_grey.png"  // Remplacez par l'URL de votre image
            alt="Image de couverture"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',  // Pour que l'image couvre toute la section
              position: 'absolute',
              top: '0',
              left: '0',
            }}
          />
          
          {/* Rectangle semi-transparent centré par-dessus l'image */}
          <div style={{
            position: 'absolute',
            top: '50%',  // Positionne le rectangle au centre vertical
            left: '50%', // Positionne le rectangle au centre horizontal
            transform: 'translate(-50%, -50%)', // Centre le rectangle parfaitement
            width: '80%',
            height: '80%',
            backgroundColor: 'rgba(255, 255, 255, 0.6)',  // Fond blanc semi-transparent
            borderRadius: '15px', // Coins arrondis
            display: 'flex', // Utilise flexbox pour centrer le contenu
            flexDirection: 'column', // Colonne pour empiler les éléments
            justifyContent: 'center', // Centre verticalement
            alignItems: 'center', // Centre horizontalement
            zIndex: 1,  // S'assure que le rectangle est au-dessus de l'image
            padding: '20px',
          }}>
            {/* Conteneur flex pour les logos */}
            <div style={{
              display: 'flex',
              justifyContent: 'center', // Centre les images horizontalement
              alignItems: 'center', // Aligne les images au centre verticalement
              marginBottom: '20px', // Espacement entre les logos et les autres éléments
            }}>
              <img 
                src="../images/logo_seul.png"  // Remplacez par l'URL de votre logo
                alt="Logo"
                style={{
                  width: '100px',  // Ajustez la taille selon votre besoin
                  height: 'auto',
                  marginRight: '10px',  // Espacement entre les deux logos
                }} 
              />
              <img 
                src="../images/lodgini.png"  // Remplacez par l'URL de votre logo
                alt="Logo"
                style={{
                  width: '100px',  // Ajustez la taille selon votre besoin
                  height: 'auto',
                }} 
              />
            </div>
            
            {/* Icône de vérification */}
            <div style={{ margin: '5px', marginTop:'2%' }}>
              <i className="fas fa-check-circle" style={{ color: 'green', fontSize: '80px' }}></i>
            </div>
            
            {/* Message "Account Created Successfully" */}
            <h3 style={{ color: '#023047', fontSize: '36px', marginBottom: '10px' }}>
              Account Created Successfully
            </h3>
            
            {/* Message en petit "Start enjoying the benefits..." */}
            <p style={{ color: '#023047', fontSize: '18px', marginBottom: '20px' }}>
              Start enjoying the benefits of our services
            </p>
            
            {/* Bouton "Book Now" */}
            <button
              style={{
                width: '220px',
                padding: '12px',
                backgroundColor: '#ffc677',
                border: 'none',
                color: 'white',
                fontSize: '18px',
                borderRadius: '4px',
                cursor: 'pointer',
                textAlign: 'center',
              }}
              onClick={() => window.location.href = "/"} // Lien vers la page de réservation
            >
              Book Now
            </button>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}

export default Created;
