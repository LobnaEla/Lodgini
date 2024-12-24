import React, { useState, useEffect, useRef } from "react";
import Axios from "axios";
import styled from "styled-components";
import "./bookings.css";

const Bookings = () => {
  const [bookings, setBookings] = useState([]);
  const [activeBookingId, setActiveBookingId] = useState(null);
  const [error, setError] = useState("");

  const bookingGridRef = useRef(null); // Référence pour le conteneur principal

  useEffect(() => {
    const fetchBookings = async () => {
      const storedData = localStorage.getItem("loggedInUser");

      try {
        const loggedInUser = storedData ? JSON.parse(storedData) : null;
        const userId = loggedInUser?.id;

        if (!userId) {
          setError("User ID is undefined. Please log in again.");
          return;
        }

        // Request bookings for the user
        const response = await Axios.get(
          `http://localhost:8000/management/bookings/${userId}/`
        );

        if (response.status === 200) {
          setBookings(response.data);
        } else {
          setError("Failed to fetch bookings.");
        }
      } catch (err) {
        console.error("Detailed error:", err);
        setError("An error occurred while fetching bookings.");
      }
    };

    fetchBookings();
  }, []);

  useEffect(() => {
    // Définir un gestionnaire de clic global
    const handleClickOutside = (event) => {
      if (
        bookingGridRef.current &&
        !bookingGridRef.current.contains(event.target)
      ) {
        setActiveBookingId(null); // Réinitialiser l'état actif
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    // Nettoyage
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Handle cancel reservation
  const handleCancelReservation = async (bookingId) => {
    try {
      console.log({ bookingId });
      const response = await Axios.delete(
        `http://localhost:8000/management/bookings/${bookingId}/cancel/`
      );
      if (response.status === 200) {
        setBookings((prevBookings) =>
          prevBookings.filter((booking) => booking.id !== bookingId)
        );
        alert("Reservation successfully canceled.");
        setActiveBookingId(null); // Reset the active state
      } else {
        alert("Failed to cancel reservation.");
      }
    } catch (error) {
      console.error("Error canceling reservation:", error);
      alert("An error occurred while canceling the reservation.");
    }
  };

  return (
    <div
      ref={bookingGridRef} // Associer la référence au conteneur principal
      className="booking-grid"
      style={gridStyle}
    >
      {error && <p style={{ color: "red", textAlign: "left" }}>{error}</p>}

      {bookings.length > 0 ? (
        bookings.map((booking) => (
          <StyledWrapper
            key={booking.id}
            onClick={() => setActiveBookingId(booking.id)} // Set active booking on click
          >
            <div
              className={`booking-card ${
                activeBookingId === booking.id ? "active" : ""
              }`}
            >
              <h3 style={{ color: "#023047" }}>{booking.property.name}</h3>
              <p style={{ color: "black" }}>
                <strong style={{ color: "#023047" }}>Location:</strong>{" "}
                {booking.property.location}
              </p>
              <p style={{ color: "black" }}>
                <strong style={{ color: "#023047" }}>From:</strong>{" "}
                {formatDate(booking.start_date)}{" "}
                <strong style={{ color: "#023047" }}>To:</strong>{" "}
                {formatDate(booking.end_date)}
              </p>
              <p style={{ color: "black" }}>
                <strong style={{ color: "#023047" }}>Days Reserved:</strong>{" "}
                {getDays(booking.start_date, booking.end_date)} days
              </p>
              <p style={{ color: "black" }}>
                <strong style={{ color: "#023047" }}>Total Price:</strong> $
                {booking.total_price}
              </p>
              <p
                style={{
                  color: booking.status === "Confirmed" ? "#43D649" : "#f2002c",
                }}
              >
                <strong>Status:</strong> {booking.status}
              </p>
              {/* Show cancel button only for the active booking and if start_date is in the future */}
              {activeBookingId === booking.id &&
                new Date(booking.start_date) > new Date() && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent triggering parent click event
                      handleCancelReservation(booking.id);
                    }}
                    style={cancelButtonStyle}
                  >
                    Cancel Reservation
                  </button>
                )}
            </div>
          </StyledWrapper>
        ))
      ) : (
        !error && (
          <p style={{ textAlign: "center" }}>You have no bookings yet.</p>
        )
      )}
    </div>
  );
};

// Function to calculate number of days between start and end dates
const getDays = (startDate, endDate) => {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const diffTime = Math.abs(end - start);
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24)); // Convert milliseconds to days
};

// Function to format dates as mm/dd/yyyy
const formatDate = (dateString) => {
  const date = new Date(dateString);
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Months are 0-based
  const year = date.getFullYear();
  return `${month}/${day}/${year}`;
};

// Inline CSS for the grid layout
const gridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
  gap: "1.5rem", // Space between cards
  padding: "2rem",
};

// Inline CSS for the Cancel button
const cancelButtonStyle = {
  width: "100%",
  padding: "10px",
  marginTop: "15px",
  backgroundColor: "#f2002c",
  color: "white",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
  fontSize: "14px",
  textAlign: "center",
};

// Styled-components for the booking cards
const StyledWrapper = styled.div`
  .booking-card {
    width: 300px;
    background: white;
    border-radius: 15px;
    box-shadow: 10px 10px 20px rgba(190, 190, 190, 0.6),
      -10px -10px 20px rgba(255, 255, 255, 0.8);
    transition: 0.3s ease-in-out;
    margin: 10px;
    text-align: left;
    padding: 20px;
    position: relative;
    cursor: pointer;
  }

  .booking-card.active {
    box-shadow: 10px 10px 30px rgba(0, 0, 0, 0.2),
      -10px -10px 30px rgba(255, 255, 255, 0.5);
  }

  .booking-card h3 {
    text-align: center;
  }

  .booking-card p {
    font-size: 14px;
  }

  .booking-card p strong {
    font-weight: bold;
  }
`;

export default Bookings;
