import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

function EditMovie() {
    const {movieId} = useParams();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [poster, setPoster] = useState('');
    const [releaseDate, setReleaseDate] = useState('');
    const [actors, setActors] = useState('');

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const year = date.getFullYear();
        let month = (1 + date.getMonth()).toString().padStart(2, '0');
        let day = date.getDate().toString().padStart(2, '0');
    
        return `${year}-${month}-${day}`;
    };

    const navigate = useNavigate();

    useEffect(() => {
        const fetchMovie = async () => {
            try {
                const token = JSON.parse(window.localStorage.getItem('admin')).token;
                const res = await axios.get(`http://localhost:8080/movieApi/movies/${movieId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
    
                setTitle(res.data.title);
                setDescription(res.data.description);
                setPoster(res.data.poster);
                setReleaseDate(formatDate(res.data.releaseDate));
                setActors(res.data.actors);
            } catch (error) {
                console.error('Error fetching movie:', error);
            }
        };
        fetchMovie();
    }, [movieId]);

    async function edit(event) {
        event.preventDefault();
        try {
            const token = JSON.parse(window.localStorage.getItem('admin')).token;
            const res = await axios.put(`http://localhost:8080/movieApi/movies/edit/${movieId}`,{
                title: title,
                description: description,
                poster: poster,
                releaseDate: releaseDate,
                actors: actors
        }, {
             headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            alert(res.data.message);
            navigate('/movies');
        } catch (error) {
            console.error('Error updating movie:', error);
        }
    }

    return (
        <div className="container">
            <div className="row mt-5 justify-content-center">
                <div className="col-sm-8 col-lg-5 col-md-6">
                    <div className="card mt-5">
                        <h3 className="card-header text-center">Edit Movie</h3>
                        <div className="card-body">
                            <form>
                                <div className="mb-3">
                                    <label htmlFor="title" className="form-label">Title:</label>
                                    <input
                                    name="title"
                                        type="text"
                                        className="form-control"
                                        id="title"
                                        value={title}
                                        onChange={(event) => setTitle(event.target.value)}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="description" className="form-label">Description:</label>
                                    <input
                                    name="description"
                                        type="text"
                                        className="form-control"
                                        id="description"
                                        value={description}
                                        onChange={(event) => setDescription(event.target.value)}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="poster" className="form-label">Poster Url:</label>
                                    <input
                                    name="poster"
                                        type="text"
                                        className="form-control"
                                        id="poster"
                                        value={poster}
                                        onChange={(event) => setPoster(event.target.value)}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="date" className="form-label">Release Date:</label>
                                    <input
                                    name="releaseDate"
                                        type="date"
                                        className="form-control"
                                        id="releaseDate"
                                        value={releaseDate}
                                        onChange={(event) => setReleaseDate(event.target.value)}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="actors" className="form-label">Actors:</label>
                                    <input
                                    name="actors"
                                        type="text"
                                        className="form-control"
                                        id="actors"
                                        value={actors}
                                        onChange={(event) => setActors(event.target.value)}
                                    />
                                </div>
                                <div className="text-end">
                                    <button type="button" className="btn btn-primary" onClick={edit}>Update Movie</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EditMovie;
