import React from "react";
import { Carousel } from 'react-bootstrap';

const UpcomingMovies = (props) => {
    return (
        <div>
            <div className="row">
                <div className="col mt-2">
                    
                            <img src={props.movie.upcomingPoster} className="d-block w-100" alt={props.movie.UpcomingTitle} style={{ maxHeight: "400px", minHeight:"300px", width: "auto" }} />
                            <Carousel.Caption>
                                <h5>{props.movie.upcomingTitle}</h5>
                                <p>Coming Soon...</p>
                            </Carousel.Caption>
                       
                </div>
            </div>
        </div>
    )
}

export default UpcomingMovies;