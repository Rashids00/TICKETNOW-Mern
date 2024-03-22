import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import "./ListMovies.css";

const ListMovies = (props) => {
    const user = useSelector((state) => state.user.user);
    const admin = useSelector((state) => state.admin.admin);

    const cardClass = props.movie.disabled && user && !admin ? "movie-card disabled" :
                  props.movie.disabled && !user && !admin ? "movie-card disabled" :
                  props.movie.disabled && admin ? "movie-card" : "movie-card";
    return (
        <Link to={`/${props.movie._id}`} className={cardClass}>
            <div>
                <img src={props.movie.poster} className="card-img-top" alt={props.movie.title} />
                <div className="card-body">
                    <h5>{props.movie.title}</h5>
                    <p className="card-text">{props.movie.releaseDate}</p>
                    {user && (
                        <>
                            <Link to={`/bookings/${props.movie._id}`} className="btn-card btn-sm">book now</Link>
                        </>
                    )}

                </div>
                {props.movie.disabled && admin && (
                    <>
                    <div className="dis">
                        Disabled
                    </div>
                    </>
                )}
            </div>
        </Link>
    );
};

export default ListMovies;
