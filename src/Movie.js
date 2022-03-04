import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "./axios";
import { API_KEY } from "./request";
import ReactPlayer from "react-player";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import Header from "./Header";
import "./movieModal.css";
import Player from "./Player";
import { act } from "@testing-library/react";

function Movie() {
  let { movieId } = useParams();
  const [movie, setMovie] = useState([]);
  const [credits, setCredits] = useState([]);
  let hours;
  let min;
  let directors = [];
  let actors = [];
  let genres = [];
  const [videoDetails, setVideoDetails] = useState([]);
  const [showPlayer, setShowPlayer] = useState(false);
  const imageUrl = "https://image.tmdb.org/t/p/original";

  useEffect(() => {
    async function movieData() {
      const request = await axios.get(`/movie/${movieId}?api_key=${API_KEY}`);
      console.log(request.data);
      setMovie(request.data);
    }
    movieData();

    async function movieCredits() {
      const credits = await axios.get(
        `/movie/${movieId}/credits?api_key=${API_KEY}`
      );
      console.log(credits.data);
      setCredits(credits.data);
    }
    movieCredits();
  }, []);

  {
    hours = Math.floor(movie.runtime / 60);
    min = movie.runtime % 60;

    if (credits.crew) {
      credits.crew.map((artist) => {
        if (artist.known_for_department == "Directing") {
          directors.push(artist.name);
        }
      });
    }

    if (credits.cast) {
      credits.cast.map((actor) => {
        if (actor.known_for_department == "Acting" && actor.name) {
          actors.push(actor.name);
        }
      });
    }

    if (movie.genres) {
      movie.genres.map((genre) => {
        genres.push(genre.name);
      });
    }
  }

  const playTrailer = async () => {
    const videoData = await axios.get(
      `/movie/${movie.id}/videos?api_key=${API_KEY}`
    );
    setVideoDetails(videoData.data.results[0].key);
    setShowPlayer(true);
  };
  const youtubeUrl = `https://www.youtube.com/watch?v=${videoDetails}`;

  return (
    <div>
      <div className="modalContainer">
        <Header />
        <div className="modalMiddle">
          <div
            className="moviedetailsRight"
            style={{
              backgroundImage: `linear-gradient(to right,#0f171e,#0f171e,rgba(0, 0, 0, 0.1),rgba(0, 0, 0, 0.1),rgba(0, 0, 0, 0.1)),url("${imageUrl}${movie.backdrop_path}")`,
              backgroundSize: "cover",
              backgroundPosition: "center center",
              border: "1px solid #0f171e",
            }}
          >
            <div className="moviedetailsLeft">
              <h1>{movie.original_title}</h1>
              <p>{movie.overview}</p>

              <div className="rating_date">
                <p>IMDB : {movie.vote_average}</p>
                <p>{`${hours}hrs ${min}min`}</p>
                <p>
                  {movie.release_date ? movie.release_date.substr(0, 4) : ""}
                </p>
                <p
                  style={{
                    border: "1px solid rgb(190, 190, 190)",
                    padding: "0 0.25em",
                  }}
                >
                  {movie.adult ? "18+" : "ALL"}
                </p>
              </div>

              <button className="playTrailer" onClick={playTrailer}>
                <p>
                  <PlayArrowIcon />
                </p>
                <p>WATCH TRAILER</p>
              </button>
            </div>

            <div className="cast">
              <div className="cast_details">
                <div>Director</div>
                {directors.map((director) => {
                  return <span>{director}</span>;
                })}
              </div>

              <div className="cast_details">
                <div>Starring</div>
                <span>{actors[0]}</span>
                <span>{actors[1]}</span>
                <span>{actors[2]}</span>
                <span>{actors[3]}</span>
                <span>{actors[4]}</span>
              </div>

              <div className="cast_details">
                <div>Genres</div>
                {genres.map((genre) => {
                  return <span>{genre}</span>;
                })}
              </div>
            </div>
          </div>
        </div>
        {videoDetails && showPlayer && (
          <div>
            <Player url={youtubeUrl} setVideoDetails={setVideoDetails} />
          </div>
        )}
      </div>
    </div>
  );
}

export default Movie;
