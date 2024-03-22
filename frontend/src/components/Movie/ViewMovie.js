import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
import "./ViewMovie.css";
const ViewMovie = () => {

    const user = useSelector((state) => state.user.user);
    const admin = useSelector((state) => state.admin.admin)
    const navigate = useNavigate();
    const { movieId } = useParams();
    const [movie, setMovie] = useState({
        title: '',
        description: '',
        releaseDate: '',
        poster: '',
        actors: '',
    });

    useEffect(() => {
        const fetchMovie = async () => {
            try {
                const res = await axios.get(`http://localhost:8080/movieApi/movies/${movieId}`);
                setMovie(res.data);
            } catch (err) {
                console.log("Error getting movie details!", err);
            }
        };
        fetchMovie();
    }, [movieId]);

    async function deleteMovie() {
        try {
            const token = JSON.parse(window.localStorage.getItem('admin')).token;
            await axios.delete(`http://localhost:8080/movieApi/movies/delete/${movieId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            navigate("/movies")
        } catch (error) {
            console.error('Error deleting movie:', error);
        }
    }

    async function disableMovie() {
        try {
            const token = JSON.parse(window.localStorage.getItem('admin')).token;
            await axios.put(`http://localhost:8080/movieApi/movies/disable/${movieId}`,null, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            navigate("/movies")
        } catch (error) {
            console.error('Error disabling movie:', error);
        }
    }

    async function enableMovie() {
        try {
            const token = JSON.parse(window.localStorage.getItem('admin')).token;
            await axios.put(`http://localhost:8080/movieApi/movies/enable/${movieId}`,null, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            navigate("/movies")
        } catch (error) {
            console.error('Error enbling movie:', error);
        }
    }

    return (
        <div className="container mt-5">
            <div className="view-body">
                <img src={movie.poster} alt={movie.title} className="poster" />
                <h2 className="title">{movie.title}</h2>
                <p className="description">{movie.description}</p>
                <p className="actors" data-label="Actors">: {movie.actors}</p>
                <p className="releaseDate" data-label="Release Date">: {movie.releaseDate}</p>
                <div className="d-flex justify-content-center">
                    {user && (
                        <>
                            <Link to={"/"} className="btn btn-view btn-sm ">Go Home</Link>
                            <Link to={`/bookings/${movieId}`} className="btn btn-book btn-sm">book now</Link>
                        </>
                    )}

                    {admin && (
                        <>
                        
                        <div className="d-flex">
                        <Link to={`/${movieId}/edit`} className="btn btn-sm btn-primary" >Edit</Link>
                        <button className="btn btn-sm btn-primary" onClick={deleteMovie} >Delete</button>
                        {movie.disabled ?

                        <button className="btn btn-sm btn-primary" onClick={enableMovie} >Enable</button>
                        :
                        <button className="btn btn-sm btn-primary" onClick={disableMovie} >Disable</button>
                        }
                        </div>
                        <Link to={"/movies"} className="btn btn-view btn-sm ">Go Home</Link>
                        </>
                    )}

                </div>
            </div>
        </div>

    );
};

export default ViewMovie;
