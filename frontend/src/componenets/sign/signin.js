import React from 'react';
import Navbar from '../home/navbar1';
import Footer from '../home/footer';

export const Signin = () => {
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
            top: '55%',  // Positionne le rectangle au centre vertical
            left: '55%', // Positionne le rectangle au centre horizontal
            transform: 'translate(-50%, -50%)', // Centre le rectangle parfaitement
            width: '80%',
            height: '80%',
            backgroundColor: 'rgba(255, 255, 255, 0.6)',  // Fond blanc semi-transparent
            borderRadius: '15px', // Coins arrondis
            display: 'flex', // Utilise flexbox pour centrer le contenu
            justifyContent: 'center', // Centre horizontalement
            alignItems: 'center', // Centre verticalement
            zIndex: 1,  // S'assure que le rectangle est au-dessus de l'image
          }}>
            <img
              src="../images/lodgini.png"  // Remplacez par l'URL de votre image de logo
              alt="Nom du site"
              style={{
                maxWidth: '60%',  // Vous pouvez ajuster la taille de l'image selon votre préférence
                height: 'auto',
              }}
            />
          </div>
        </div>

        {/* Partie droite pour le formulaire */}
        <div style={{
          flex: 1,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '10px',
          marginRight: '10%',
          position: 'relative',
          zIndex: 2,  // Positionne le formulaire au-dessus de l'image et du rectangle
        }}>
          <form style={{
            width: '100%',
            maxWidth: '400px',
            padding: '20px',
            borderRadius: '8px',
            display: 'flex',
            flexDirection: 'column',  // Permet de gérer les espacements entre les éléments
          }}>
            <h2 style={{ textAlign: 'center' }}>Login Account</h2>
            
            <div style={{ marginBottom: '25px' }}> {/* Augmenter l'espace entre les éléments */}
              <label htmlFor="text" style={{ display: 'block', marginBottom: '5px', textAlign: 'left' }}>Username</label>
              <input type="text" id="text" placeholder="Enter your username" style={{
                width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ccc'
              }} />
            </div>
            
            <div style={{ marginBottom: '25px' }}> {/* Augmenter l'espace entre les éléments */}
              <label htmlFor="password" style={{ display: 'block', marginBottom: '5px', textAlign: 'left' }}>Password</label>
              <input type="password" id="password" placeholder="Enter your password" style={{
                width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ccc'
              }} />
            </div>
            
            <button type="submit" style={{
              width: '100%', padding: '10px', backgroundColor: '#ffc677', border: 'none',
              color: 'white', fontSize: '16px', borderRadius: '4px', cursor: 'pointer', marginBottom: '10%',
            }}>Login</button>
            
            <button type="submit" style={{
              width: '100%', padding: '10px', backgroundColor: '#ffc677', border: 'none', marginBottom: '10%',
              color: 'white', fontSize: '16px', borderRadius: '4px', cursor: 'pointer',
            }}>Login property owner account</button>
            
            <p style={{ textAlign: 'center', margin: '0', padding: '5px 0' }}>
              <a href="../sign_up" style={{ color: 'black', textDecoration: 'none' ,textDecoration: 'underline'}}>Create an Account</a>
            </p>
          </form>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}

export default Signin;
