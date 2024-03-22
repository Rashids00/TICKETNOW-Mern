import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./Bookings.css";


const BookMovie = () => {
    const { movieId } = useParams();
    const [movie, setMovie] = useState({
        title: '',
        description: '',
        releaseDate: '',
        poster: '',
        actors: '',
    });
    const [seatNo, setSeatNo] = useState('');
    const [bookDate, setBookDate] = useState('');
    const [showTime, setShowTime] = useState('');
   
    const showTimes = [
        "11:30 AM",
        "2:30 PM",
        "5:00 PM",
        "9:00 PM"
    ];

    const rows = ['A', 'B', 'C', 'D', 'E', 'F'];
    const seats = [];
    for (let i = 0; i < rows.length; i++) {
        for (let j = 1; j <= 10; j++) {
            seats.push(rows[i] + j);
        }
    }

    useEffect(() => {
        const fetchMovie = async () => {
            try {
                const res = await axios.get(`http://localhost:8080/movieApi/movies/${movieId}`);
                setMovie(res.data)
                console.log(res);
            } catch (err) {
                console.log("Error getting movie details!", err);
            }
        };
        fetchMovie();
    }, [movieId]);

    const book = async (e) => {
        e.preventDefault();

        try {
            const userId = JSON.parse(window.localStorage.getItem('user')).id;
            const data = await axios.post("http://localhost:8080/bookingApi/booking", {
                movie: movieId,
                seatNo: seatNo,
                bookDate: bookDate,
                showTime: showTime,
                user: userId

            });
           
            console.log(data)

        } catch (err) {
            console.log('Booking error:', err);
        }
    };


    return (
        <div className="container mt-5">
            
            <div className="row">
                <div className="col-sm-6 ">
                    <div className="card">
                        <img src={movie.poster} alt={movie.title} className="card-img" />
                        <div className="card-body">
                            <h2 className="card-title">{movie.title}</h2>
                            <p className="card-text">{movie.description}</p>
                            <p className="card-text"><strong>Actors:</strong> {movie.actors}</p>
                            <p className="card-text"><strong>Release Date:</strong> {movie.releaseDate}</p>
                        </div>
                    </div>
                </div>
                <div className="col-sm-6">
                    <div className="card booking-card">
                        <div className="card-body">
                            <h2 className="card-title text-center mb-4">Book Tickets</h2>
                            <form>
                                <div className="mb-3">
                                    <label htmlFor="showTime" className="form-label">Show Time:</label>
                                    <select type="text" className="form-control" id="showTime" name="showTime"
                                        value={showTime}
                                        onChange={(event) => setShowTime(event.target.value)}>
                                        <option value="">--Select--</option>

                                        {showTimes.map((time, index) => (
                                            <option key={index} value={time}>{time}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="seatNo" className="form-label">Seat No:</label>
                                    <select type="text" className="form-control" id="seatNo" name="seatNo"
                                        value={seatNo}
                                        onChange={(event) => setSeatNo(event.target.value)}>
                                        <option value="">--Select--</option>

                                        {seats.map((seat, index) => (
                                            <option key={index} value={seat}>{seat}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="date" className="form-label">Book Date:</label>
                                    <input type="date" className="form-control" id="date" name="date"
                                        value={bookDate}
                                        onChange={(event) => setBookDate(event.target.value)} />
                                </div>
                                <button type="button" on className="btn btn-primary btn-lg btn-block" onClick={book}>Book Now</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BookMovie;
