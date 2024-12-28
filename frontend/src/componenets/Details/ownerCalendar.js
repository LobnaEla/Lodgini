import React, { useEffect, useState } from 'react';
import '../reservation/calendar.css';
import axios from 'axios';

const OwnerCalendar = ({ propertyId }) => {
    const [unavailableDates, setUnavailableDates] = useState([]);
    const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
    const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
    const [showUnavailabilityModal, setShowUnavailabilityModal] = useState(false);
    const [datesToMarkUnavailable, setDatesToMarkUnavailable] = useState([]);
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        fetchUnavailableDates();
    }, [propertyId]);

    const fetchUnavailableDates = async () => {
        try {
            const response = await axios.get(
                `http://localhost:8000/management/properties/${propertyId}/unavailable-dates/`
            );
            setUnavailableDates(response.data);
        } catch (error) {
            console.error('Error fetching unavailable dates:', error);
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

    const handleSelectUnavailabilityDate = (date) => {
        setDatesToMarkUnavailable(prev => {
            if (prev.includes(date)) {
                return prev.filter(d => d !== date);
            }
            return [...prev, date];
        });
    };

    const handleSaveUnavailability = async () => {
        if (datesToMarkUnavailable.length === 0) return;

        setIsSubmitting(true);
        try {
            await axios.post(
                `http://localhost:8000/management/properties/${propertyId}/mark-unavailable/`,
                { dates: datesToMarkUnavailable }
            );

            await fetchUnavailableDates();
            setShowUnavailabilityModal(false);
            setDatesToMarkUnavailable([]);
        } catch (error) {
            console.error('Error saving unavailability:', error);
            alert('Failed to save unavailable dates. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const getDayStatus = (date) => {
        const unavailableDate = unavailableDates.find(d => d.date === date);
        if (unavailableDate) {
            return unavailableDate.by_owner ? 'owner-unavailable' : 'user-unavailable';
        }
        return 'not-booked';
    };

    const monthName = new Date(currentYear, currentMonth).toLocaleString('default', { month: 'long' });
    const daysInMonth = getDaysInMonth(currentYear, currentMonth);

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
                        const date = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(i + 1).padStart(2, '0')}`;
                        const status = getDayStatus(date);
                        return (
                            <div
                                key={date}
                                className={`calendar-day ${status}`}
                            >
                                {i + 1}
                            </div>
                        );
                    })}
                </div>
            </div>

            {showUnavailabilityModal && (
                <div className="unavailability-modal">
                    <div className="modal-content">
                        <h3>Select Dates to Mark as Unavailable</h3>
                        <div className="calendar-grid">
                            {Array.from({ length: daysInMonth }, (_, i) => {
                                const date = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(i + 1).padStart(2, '0')}`;
                                const isSelected = datesToMarkUnavailable.includes(date);
                                const isUnavailable = unavailableDates.some(d => d.date === date);

                                return (
                                    <div
                                        key={date}
                                        className={`calendar-day ${isSelected ? 'selected' : ''} ${isUnavailable ? 'unavailable' : ''}`}
                                        onClick={() => !isUnavailable && handleSelectUnavailabilityDate(date)}
                                    >
                                        {i + 1}
                                    </div>
                                );
                            })}
                        </div>
                        <div className="modal-actions">
                            <button
                                className="save-unavailability"
                                onClick={handleSaveUnavailability}
                                disabled={isSubmitting || datesToMarkUnavailable.length === 0}
                            >
                                {isSubmitting ? 'Saving...' : 'Save'}
                            </button>
                            <button
                                className="cancel"
                                onClick={() => {
                                    setShowUnavailabilityModal(false);
                                    setDatesToMarkUnavailable([]);
                                }}
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
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
                <button
                    className="schedule-btn"
                    onClick={() => setShowUnavailabilityModal(true)}
                >
                    Schedule Unavailability
                </button>
            </div>
        </div>
    );
};

export default OwnerCalendar;
