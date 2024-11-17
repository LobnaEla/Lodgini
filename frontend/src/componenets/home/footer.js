import React from "react";

const Footer = () => {
  return (
    <div id='footer'style={{ backgroundColor: "#ead2ac", padding: "10px 0" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          maxWidth: "1200px",
          margin: "0 auto",
        }}
      >
        {/* Liste à gauche "Follow Us" */}
        <div
          style={{
            flex: 1,
            textAlign: "left",
            color: "#023047",
            paddingLeft: "20px",
          }}
        >
          <h3 style={{ fontSize: "14px", marginBottom: "10px" }}>Follow Us</h3>
          <ul style={{ paddingLeft: "0", listStyleType: "none" }}>
            <li style={{ marginBottom: "5px" }}>
              <span
                style={{
                  display: "inline-block",
                  backgroundColor: "#FAA935",  // Couleur jaune #FAA935
                  borderRadius: "50%",
                  padding: "8px", // Ajuster le padding pour avoir un cercle
                  width: "30px", // Taille fixe
                  height: "30px", // Taille fixe
                  textAlign: "center", // Centrer l'icône
                  lineHeight: "30px", // Centrer l'icône verticalement
                  marginRight: "6px",
                }}
              >
                <i
                  className="fab fa-twitter"
                  style={{
                    color: "#fff",
                    fontSize: "16px", // Ajuster la taille de l'icône
                  }}
                ></i>
              </span>
              Lodgini2024
            </li>
            <li style={{ marginBottom: "5px" }}>
              <span
                style={{
                  display: "inline-block",
                  backgroundColor: "#FAA935",
                  borderRadius: "50%",
                  padding: "8px", // Ajuster le padding
                  width: "30px", // Taille fixe
                  height: "30px", // Taille fixe
                  textAlign: "center", // Centrer l'icône
                  lineHeight: "30px", // Centrer l'icône verticalement
                  marginRight: "6px",
                }}
              >
                <i
                  className="fab fa-facebook"
                  style={{
                    color: "#fff",
                    fontSize: "16px",
                  }}
                ></i>
              </span>
              Lodgini
            </li>
            <li style={{ marginBottom: "5px" }}>
              <span
                style={{
                  display: "inline-block",
                  backgroundColor: "#FAA935",
                  borderRadius: "50%",
                  padding: "8px", // Ajuster le padding
                  width: "30px", // Taille fixe
                  height: "30px", // Taille fixe
                  textAlign: "center", // Centrer l'icône
                  lineHeight: "30px", // Centrer l'icône verticalement
                  marginRight: "6px",
                }}
              >
                <i
                  className="fab fa-instagram"
                  style={{
                    color: "#fff",
                    fontSize: "16px",
                  }}
                ></i>
              </span>
              Lodgini_officiel
            </li>
          </ul>
        </div>

        {/* Logo au centre */}
        <div style={{ flex: 1, textAlign: "center" }}>
          <img
            src="../images/logo.png" // Remplacez par le chemin de votre logo
            alt="Logo"
            style={{ width: "40%", height: "40%" ,marginTop:'5%'}}
          />
            {/* Copyright */}
       <div
        style={{
          textAlign: "center",
          marginTop:'5%',
          fontSize: "12px",
          color: "white",
        }}
      >
        © 2024 All rights reserved
      </div>
        </div>

        {/* Liste à droite "Get in Touch" */}
        <div
          style={{
            flex: 1,
            textAlign: "right",  // Aligné à droite
            color: "#023047",
            paddingRight: "20px", // Assurez-vous qu'il y ait un padding à droite
          }}
        >
          <h3 style={{ fontSize: "14px", marginBottom: "10px", marginRight:'32%' }}>Get in Touch</h3>
          <ul style={{ paddingLeft: "0", listStyleType: "none" }}>
            <li style={{ marginBottom: "5px" , marginRight:'8%'}}>
              <span
                style={{
                  display: "inline-block",
                  backgroundColor: "#FAA935",
                  borderRadius: "50%",
                  padding: "8px", // Ajuster le padding
                  width: "30px", // Taille fixe
                  height: "30px", // Taille fixe
                  textAlign: "center",
                  lineHeight: "30px", // Centrer l'icône verticalement
                  marginRight: "6px",
                }}
              >
                <i
                  className="fas fa-phone"
                  style={{
                    color: "#fff",
                    fontSize: "16px",
                  }}
                ></i>
              </span>
              +126 45 456 789
            </li>
            <li style={{ marginBottom: "5px" ,marginright:'0' }}>
              <span
                style={{
                  display: "inline-block",
                  backgroundColor: "#FAA935",
                  borderRadius: "50%",
                  padding: "8px", // Ajuster le padding
                  width: "30px", // Taille fixe
                  height: "30px", // Taille fixe
                  textAlign: "center",
                  lineHeight: "30px", // Centrer l'icône verticalement
                  marginRight: "6px",
                }}
              >
                <i
                  className="fas fa-envelope"
                  style={{
                    color: "#fff",
                    fontSize: "16px",
                  }}
                ></i>
              </span>
              Lodgini@gmail.com
            </li>
            <li style={{ marginBottom: "5px" , marginRight:'15%'}}>
              <span
                style={{
                  display: "inline-block",
                  backgroundColor: "#FAA935",
                  borderRadius: "50%",
                  padding: "8px", // Ajuster le padding
                  width: "30px", // Taille fixe
                  height: "30px", // Taille fixe
                  textAlign: "center",
                  lineHeight: "30px", // Centrer l'icône verticalement
                  marginRight: "6px",
                }}
              >
                <i
                  className="fas fa-map-marker-alt"
                  style={{
                    color: "#fff",
                    fontSize: "16px",
                  }}
                ></i>
              </span>
              Ariena, Tunis
            </li>
          </ul>
        </div>
      </div>
     
    </div>
  );
};

export default Footer;
