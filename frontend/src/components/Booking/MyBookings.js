import React, { useEffect, useState } from "react";
import axios from "axios";
import "./MyBookings.css"; 

const MyBookings = () => {
    const [bookings, setBookings] = useState([]);

    const formatDate = (date) => {
        const options = { weekday: 'short', year: 'numeric', month: 'short', day: '2-digit' };
        return date.toLocaleDateString('en-US', options);
    };

    useEffect(() => {
        const getBookings = async () => {
            try {
                const id = JSON.parse(window.localStorage.getItem('user')).id;
                const res = await axios.get(`http://localhost:8080/userApi/getbookings/${id}`)
                setBookings(res.data.bookings);
                console.log(res.data.bookings);
            } catch (err) {
                console.error('Error fetching bookings:', err);
            }
        };

        getBookings();
    }, []);

    return (
        <div className="container">
            <h3 className="text-center mt-5 mb-4">My Bookings</h3>
            <div className="row justify-content-center">
                {bookings.map((booking, index) => (
                    <div key={index} className="col-md-4 mb-4">
                        <div className="card booking-card">
                            <div className="card-body">
                                <h5 className="card-title"><strong>{booking.movie.title}</strong></h5>
                                <p className="card-text"><strong>Seat No:</strong> {booking.seatNo}</p>
                                <p className="card-text"><strong>Show Time:</strong> {booking.showTime}</p>
                                <p className="card-text"><strong>Date:</strong> {formatDate(new Date(booking.bookDate))}</p>
                            </div>
                        </div>
                    </div>
                ))}
                {bookings.length === 0 && (
                    <div className="col text-center">
                        <p className="text-muted">No bookings found.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MyBookings;
