import React, { useEffect, useState } from "react";

import "./HomePage.css";
import ListMovies from "./ListMovies";
import axios from "axios";

const Movies = () => {
    const [allMovies, setAllMovies] = useState([]);

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const res = await axios.get("http://localhost:8080/movieApi/movies");
                setAllMovies(res.data);
            } catch (err) {
                console.log("Error fetching movie");
            }
        };
        fetchMovies();
    }, []);

    return (
        <div>
            <div className="mt-4 d-flex justify-content-center">
                <h3>Movies</h3>
                </div>
                <div className="movie-cards mt-4">
                    {allMovies.map(movie => 
                        <ListMovies key={movie._id} movie={movie} />
                    )}
                </div>
            </div>
    )
};

export default Movies;