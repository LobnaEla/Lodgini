import React, { useEffect, useState } from 'react';
import '../reservation/calendar.css';
import axios from 'axios';

const OwnerCalendar = ({ propertyId }) => {
    const [unavailableDates, setUnavailableDates] = useState([]);
    const [selectedDate, setSelectedDate] = useState(null);
    const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
    const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
    const [showUnavailabilityModal, setShowUnavailabilityModal] = useState(false); // Modal visibility state
    const [datesToMarkUnavailable, setDatesToMarkUnavailable] = useState([]); // Dates to mark as unavailable

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
        if (!unavailableDates.some((d) => d.date === date && d.by_owner)) {
            setSelectedDate(date);
        }
    };

    const getDayStatus = (date) => {
        const unavailableDate = unavailableDates.find((d) => d.date === date);
        if (unavailableDate) {
            return unavailableDate.by_owner ? 'owner-unavailable' : 'user-unavailable';
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

    // Function to handle scheduling unavailability
    const handleScheduleUnavailability = () => {
        setShowUnavailabilityModal(true); // Open the modal
    };

    const handleSelectUnavailabilityDate = (date) => {
        setDatesToMarkUnavailable((prevDates) => {
            if (prevDates.includes(date)) {
                return prevDates.filter((d) => d !== date); // Remove the date if already selected
            } else {
                return [...prevDates, date]; // Add the date if not selected
            }
        });
    };

    const handleSaveUnavailability = async () => {
        try {
            await axios.post(
                `http://localhost:8000/management/properties/${propertyId}/mark-unavailable/`,
                { dates: datesToMarkUnavailable }
            );
            // Add the new dates to the unavailableDates state
            setUnavailableDates((prevDates) => [
                ...prevDates,
                ...datesToMarkUnavailable.map((date) => ({ date, by_owner: true })),
            ]);
            setShowUnavailabilityModal(false); // Close the modal after saving
        } catch (error) {
            console.error('Error saving unavailability:', error);
        }
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

            {showUnavailabilityModal && (
                <div className="unavailability-modal">
                    <h3>Select Unavailable Dates</h3>
                    <div className="unavailability-grid">
                        {Array.from({ length: daysInMonth }, (_, i) => {
                            const date = `${currentYear}-${(currentMonth + 1).toString().padStart(2, '0')}-${(i + 1)
                                .toString()
                                .padStart(2, '0')}`;
                            return (
                                <div
                                    key={date}
                                    className={`calendar-day ${datesToMarkUnavailable.includes(date) ? 'selected' : ''}`}
                                    onClick={() => handleSelectUnavailabilityDate(date)}
                                >
                                    {i + 1}
                                </div>
                            );
                        })}
                    </div>
                    <button className="save-unavailability" onClick={handleSaveUnavailability}>Save Unavailability</button>
                    <button className="cancel" onClick={() => setShowUnavailabilityModal(false)}>Cancel</button>
                </div>
            )}

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
