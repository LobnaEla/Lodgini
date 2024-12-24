import React, { useEffect, useState } from 'react';
import '../reservation/calendar.css';
import axios from 'axios';

const OwnerCalendar = ({ propertyId }) => {
    const [unavailableDates, setUnavailableDates] = useState([]);
    const [selectedDate, setSelectedDate] = useState(null);
    const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
    const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

    // Fetch unavailable dates
    useEffect(() => {
        const fetchUnavailableDates = async () => {
            try {
                const response = await axios.get(
                    `http://localhost:8000/management/properties/${propertyId}/unavailable-dates/`
                );
                setUnavailableDates(response.data); // Assuming the API returns an array of unavailable dates
            } catch (error) {
                console.error('Error fetching unavailable dates:', error);
            }
        };

        fetchUnavailableDates();
    }, [propertyId]);

    const handleDateClick = (date) => {
        if (!unavailableDates.includes(date)) {
            setSelectedDate(date);
        }
    };

    const getDayStatus = (date) => {
        if (unavailableDates.includes(date)) {
            return 'booked';
        } else if (date === selectedDate) {
            return 'your-reservation';
        } else {
            return 'not-booked';
        }
    };

    const handleMonthChange = (direction) => {
        const newDate = new Date(currentYear, currentMonth + direction, 1);
        setCurrentMonth(newDate.getMonth());
        setCurrentYear(newDate.getFullYear());
    };

    const getDaysInMonth = (year, month) => {
        return new Date(year, month + 1, 0).getDate();
    };

    const daysInMonth = getDaysInMonth(currentYear, currentMonth);
    const monthName = new Date(currentYear, currentMonth).toLocaleString('default', { month: 'long' });

    const handleScheduleUnavailability = () => {
        // Functionality to schedule unavailability (e.g., open a modal, etc.)
        alert('Schedule Unavailability clicked');
    };

    return (
        <div className="calendar-reservation">
            <div className="calendar-container">
                <div className="calendar-header">
                    <button className="month-nav" onClick={() => handleMonthChange(-1)}>&lt;</button>
                    <h2>{`${monthName} ${currentYear}`}</h2>
                    <button className="month-nav" onClick={() => handleMonthChange(1)}>&gt;</button>
                </div>
                <div className="calendar-grid">
                    {Array.from({ length: daysInMonth }, (_, i) => {
                        const date = `${currentYear}-${(currentMonth + 1).toString().padStart(2, '0')}-${(i + 1)
                            .toString()
                            .padStart(2, '0')}`;
                        return (
                            <div
                                key={date}
                                className={`calendar-day ${getDayStatus(date)}`}
                                onClick={() => handleDateClick(date)}
                            >
                                {i + 1}
                            </div>
                        );
                    })}
                </div>
            </div>
            <div className="calendar-legend">
                <div className="legend-item">
                    <div className="legend-color not-booked"></div>
                    <span>Not Booked</span>
                </div>
                <div className="legend-item">
                    <div className="legend-color booked"></div>
                    <span>Booked</span>
                </div>
                <div className="legend-item">
                    <div className="legend-color nnbooked"></div>
                    <span>Not available to book</span>
                </div>
                <button className="schedule-btn" onClick={handleScheduleUnavailability}>Schedule Unavailability</button>

            </div>
        </div>
    );
};

export default OwnerCalendar;
