import {useEffect, useState} from "react"
import './App.css'
import MovieCard from "./components/MovieCard"
import { MOVIEAPI, GOOGLEAPI } from "./config.js";
import { useAuth } from './Auth';
import Login from './components/Login';
import Signup from './components/Signup';

const MOVIE_API = MOVIEAPI;
const GOOGLE_API = GOOGLEAPI;

function App() {
    const { user } = useAuth();

    const MOVIE_URL = "https://api.themoviedb.org/3/"
    const SEARCH_URL = MOVIE_URL + "search/movie"
    const BACKDROP_PATH = "https://image.tmdb.org/t/p/w1280"
    const youtube_url = "https://www.youtube.com/embed/"
    // Please put your own API keys here

    const [playTrailer, setPlayTrailer] = useState(false)
    const [trailer, setTrailer] = useState(null)
    const [movies, setMovies] = useState([])
    const [searchKey, setSearchKey] = useState("")
    const [movie, setMovie] = useState("")
    const [showMap, setShowMap] = useState(false)


    // fetch all movies info from the database, order by the popularity (default by the API database)
    async function fetchMovies () {
        // the API syntax, take apiKey as a parameter
        let response = await fetch(`${MOVIE_URL}/discover/movie?api_key=${MOVIE_API}`)
        let data = await response.json();
        console.log(data)
        setMovies(data.results);
        setMovie(data.results[0]);
        // if movies data returned from the API call, passing movie id and await to call fetchMovieTrailer function 
        if (data.results.length) {
            await fetchMovieTrailer(data.results[0].id)
        }
    }

    // set fetchMovies() once to update
    useEffect(() => {
        fetchMovies()
    }, [])

    // search for movies
    async function searchMovies(event) {
        // prevent the search form from submitted
        event.preventDefault();
        // get the input value from search bar (DOM) 
        let searchValue = document.getElementById("search").value;
        // when a search string is exist, then call 'search' api 
        if (searchValue) {
            let response = await fetch(
                `${SEARCH_URL}?api_key=${MOVIE_API}&query=${searchValue}`
            );
            let data = await response.json();
            //console.log(data);
            // set state of movie list and selected movie for update
            setMovies(data.results);
            setMovie(data.results[0]);
            // when database returns a movie's data, then ready for fetching its trailer
            if (data.results.length) {
                await fetchMovieTrailer(data.results[0].id);
            }
            // set state of search bar input
            setSearchKey(searchValue);
        } else {
            // if the search bar is empty, in other words, fetching all the movies data from the database
            fetchMovies();
            setSearchKey("");
        }
    }
      
    // fetch trailer function
    const fetchMovieTrailer = async (id) => {
        // fetch the movie data from database using API syntax 
        let response = await fetch(`${MOVIE_URL}movie/${id}?api_key=${MOVIE_API}&append_to_response=videos`);
        // when the connection is ok, get the data in a json format
        // if the movie has videos(trailers), then get the video info, set the Trailer state for update
        // play the first avaliable video 
        if (response.ok) {
            let data = await response.json();
            if (data.videos && data.videos.results) {
                var trailer = data.videos.results[0];
                setTrailer(trailer);
            }
            // set the selected movie state with the fetched data
            setMovie(data);
        } else {
            // if the connection is not ok, then return error message
            throw new Error('Network response was not ok');
        }
    }

    // when click a specific movie card, set the movie and trailer state for update
    // and scroll back to the backdrop(horizontal poster), where user can see the updated movie details and trailer
    const selectMovie = (movie) => {
        fetchMovieTrailer(movie.id)
        setPlayTrailer(false)
        setMovie(movie)
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    }

    // render the movie card, includes basic information such as title, poster and ratings
    const renderMovies = () => {
        // when search result is null, then don't render, return an error message
        if (movies.length === 0) {
          return <p className="errorMsg">No movies found for keyword <strong>"{searchKey}"</strong></p>;
        }
        // render movie cards, details imported from the MovieCard component
        return movies.map((movie) => (
          <MovieCard selectMovie={selectMovie} key={movie.id} movie={movie} />
        ));
    };

    // a button handler to toggle the play trailer button
    function handlePlayTrailer() {
        setPlayTrailer(!playTrailer);
    }



    return (
        <div className="App">
            {/* render the header, including main page(return back when finishing search), app name and the search bar */}
            <header className="header">
                <div className="headerWrap">
                    <Login />
                    <a href='/' className="appName"><p>Your Private Movie Collection</p></a>
                    {/* search bar */}
                    <form className="searchBar" onSubmit={searchMovies}>
                        <input className="search" type="text" id="search" placeholder="Search for a movie" />
                        <button className="searchSubmit" type="submit">Search</button>
                    </form>
                </div>
                {/* when fetehed movie data from the database, then render the movie backdrop */}
                {movie && (
                <div className="backdropImg" 
                    style={movie.backdrop_path ? 
                    {backgroundImage:`url(${BACKDROP_PATH}${movie.backdrop_path})`} :  null}>
                    {console.log(`'${BACKDROP_PATH}${movie.backdrop_path}'`)}
                </div>
                )}
            </header>

            {/* if the movie has trailer data, when click the Play Trailer button will show the video iframe */}
            {/* the button can be toggled play/close */}
            {trailer &&
            <div className="trailerContainer">
                <button className="button play-trailer" onClick={handlePlayTrailer}>{playTrailer ? 'Close Trailer' : 'Play Trailer'}</button>
                {playTrailer && (
                    <iframe 
                        className="trailerIframe"
                        width="1078"
                        height="610"
                        src={`${youtube_url}${trailer.key}`}
                        frameborder="0"
                        allow="autoplay; encrypted-media"
                        allowfullscreen
                    ></iframe>
                )}
            </div>
            }

            {/* embedded Google map section, call api to show nearby theaters */}
            {/* the button can be toggled show/close */}
            <div className="googleMap">
                <button className="button showMap" onClick={() => setShowMap(!showMap)}> 
                    {showMap ? 'Close Map' : 'Theatres'}
                </button>
                {showMap && (
                    <div className="mapContainer">
                        <iframe className="mapIframe" title="Google Maps"
                            src={`https://www.google.com/maps/embed/v1/search?key=${GOOGLE_API}&q=cinemas&zoom=12`}>
                        </iframe>
                    </div>
                )}
            </div>


            {/* render the movie info over the backdrop, including title and overview */}
            {movie ? (
            <div className="movieContainer">
                <h1>{movie.title}</h1>
                <p>{movie.overview}</p>
            </div>
             ) : (
            // when search result is empty, then click the back button to return to the main page
                <button className="button backBtn" onClick={fetchMovies}>Back to Main Page</button>
            )}

            {/* render the movie cards */}
            <div className={"mainContainer"}>
                {renderMovies()}
            </div>
            <div className="footerText">
                <p>&copy; 2023 - Kevin Wenhao Lu</p>
            </div> 
        </div>
    );
}

export default App;

