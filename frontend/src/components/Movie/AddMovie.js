import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AddMovie() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [poster, setPoster] = useState('');
    const [releaseDate, setReleaseDate] = useState('');
    const [actors, setActors] = useState('');

    const navigate = useNavigate();

    async function add() {
        try {
            const token = JSON.parse(window.localStorage.getItem('admin')).token;
            await axios.post('http://localhost:8080/movieApi/movies/add',{
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
            navigate('/movies');
        } catch (error) {
            console.error('Error adding medicine:', error);
        }
    }

    return (
        <div className="container">
            <div className="row mt-5 justify-content-center">
                <div className="col-sm-8 col-lg-5 col-md-6">
                    <div className="card mt-5">
                        <h3 className="card-header text-center">Add Movie</h3>
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
                                    <button type="button" className="btn btn-primary" onClick={add}>Add Movie</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AddMovie;
