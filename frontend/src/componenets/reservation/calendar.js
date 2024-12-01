import React, { useState } from 'react';
import './calendar.css'

const Calendar = () => {
    const [reservations, setReservations] = useState([
        { date: '2024-01-05', name: 'John Smith' },
        { date: '2024-01-11', name: 'Jane Doe' },
        { date: '2024-01-18', name: 'Michael Johnson' },
        { date: '2024-01-24', name: 'Sarah Williams' },
        { date: '2024-01-25', name: 'David Lee' },
    ]);
    const [selectedDate, setSelectedDate] = useState(null);

    const handleDateClick = (date) => {
        if (!reservations.some((r) => r.date === date)) {
            setSelectedDate(date);
        }
    };

    const handleConfirm = () => {
        console.log('Reservation confirmed:', selectedDate);
    };

    const handleCancel = () => {
        setSelectedDate(null);
    };

    const getDayStatus = (date) => {
        if (date === selectedDate) {
            return 'Your reservation date';
        } else if (reservations.some((r) => r.date === date)) {
            return 'Non-available';
        } else {
            return 'Available';
        }
    };

    return (
        <div className="calendar-reservation">
            <h2>January</h2>
            <div className="calendar-grid">
                {Array.from({ length: 31 }, (_, i) => i + 1).map((date) => (
                    <div
                        key={date}
                        className={`calendar-day ${getDayStatus(
                            `2024-01-${date.toString().padStart(2, '0')}`
                        )}`}
                        onClick={() => handleDateClick(`2024-01-${date.toString().padStart(2, '0')}`)}
                    >
                        {date}
                    </div>
                ))}
            </div>
            <div className="calendar-legend">
                <div className="legend-item">
                    <div className="legend-color available"></div>
                    <span>Available</span>
                </div>
                <div className="legend-item">
                    <div className="legend-color non-available"></div>
                    <span>Non available</span>
                </div>
                <div className="legend-item">
                    <div className="legend-color your-reservation"></div>
                    <span>Your reservation date</span>
                </div>
            </div>
            <div className="calendar-actions">
                <button className="confirm" onClick={handleConfirm}>
                    Confirm
                </button>
                <button className="cancel" onClick={handleCancel}>
                    Cancel Reservation
                </button>
                <button className="close">Cancel</button>
            </div>
        </div>
    );
};

export default Calendar;