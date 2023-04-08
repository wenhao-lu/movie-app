import React from 'react';

const MovieCard = ({movie, selectMovie}) => {

    let POSTER_URL = "https://image.tmdb.org/t/p/w342"

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
            </div>
        </div>
    );
};


export default MovieCard;  