import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as emptyHeart } from "@fortawesome/free-regular-svg-icons";

const MovieCard = ({movie, selectMovie}) => {

    let POSTER_URL = "https://image.tmdb.org/t/p/w342"

    const [isLiked, setIsLiked] = useState(false);

    const handleLikeClick = (event) => {
        event.stopPropagation();
        setIsLiked(!isLiked);
    };

    return (
        <div onClick={() => selectMovie(movie)} className={"movieCard"}>
            <div className="movieTitle">
                {movie.poster_path &&
                <img src={POSTER_URL + movie.poster_path} alt={movie.title}/>
                }
                <div className={"movieInfo"}>
                    <h5 className={"movie-title1"}>{movie.title}</h5>
                    {movie.vote_average ? <span className={"ratings"}>{movie.vote_average}</span> : null}
                </div>
                {
          isLiked ?
            <button onClick={(event) => handleLikeClick(event)} className="heart active"><FontAwesomeIcon icon={faHeart} /></button>
            :
            <button onClick={(event) => handleLikeClick(event)} className="heart"><FontAwesomeIcon icon={emptyHeart} /></button>

        }
            </div>
        </div>
    );
};


export default MovieCard;  