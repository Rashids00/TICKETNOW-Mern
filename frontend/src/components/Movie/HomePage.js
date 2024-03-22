import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./HomePage.css";
import UpcomingMovies from "./UpcomingMovies";
import ListMovies from "./ListMovies";
import axios from "axios";
import { Carousel } from "react-bootstrap";

const HomePage = () => {
    const [listMovies, setListMovies] = useState([]);
    const [upcomingMovies, setUpcomingMovies] = useState([]);

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const res = await axios.get("http://localhost:8080/movieApi/movies");
                setListMovies(res.data);
            } catch (err) {
                console.log("Error fetching movie");
            }
        };
        fetchMovies();
    }, []);

    useEffect(() => {
        const fetchUpcoming = async () => {
            try {
                const res = await axios.get("http://localhost:8080/movieApi/upcoming");
                setUpcomingMovies(res.data);
            } catch (err) {
                console.log("Error fetching movie");
            }
        };
        fetchUpcoming();
    }, []);

    return (
        <div>
        <div className="container-fluid">
            <div className="mt-3">
                <h3>Upcoming Movies</h3>
            </div>
            <div className="mt-3">
                <Carousel className="custom-carousel">
                    {upcomingMovies.map((movie) => (
                        <Carousel.Item key={movie._id}>
                            <UpcomingMovies key={movie._id} movie={movie} />
                        </Carousel.Item>
                    ))}
                </Carousel>
            </div>

            <div className="mt-5 d-flex justify-content-center">
                <h3>Latest Releases</h3>
            </div>
            <div>
                <div className="movie-cards mt-5">
                    {listMovies.map(movie => 
                        <ListMovies key={movie._id} movie={movie} />
                    )}
                </div>
            </div>
            </div>

            <div className="d-flex justify-content-center mt-5 mb-3">
                <Link to="/movies" className=" view ">
                    View all Movies
                </Link>
            </div>
            </div>
    
    );
};

export default HomePage;
