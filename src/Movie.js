import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "./axios";
import { API_KEY } from "./request";
import ReactPlayer from "react-player";
import Header from "./Header";
import "./movieModal.css";
import Player from "./Player";

function Movie() {
  let { movieId } = useParams();
  const [movie, setMovie] = useState([]);
  const [videoDetails, setVideoDetails] = useState([]);
  const [showPlayer, setShowPlayer] = useState(false);
  const imageUrl = "https://image.tmdb.org/t/p/original";

  useEffect(() => {
    movieData();
    async function movieData() {
      const request = await axios.get(`/movie/${movieId}?api_key=${API_KEY}`);
      console.log(request.data);
      setMovie(request.data);
    }
    movieData();
  }, []);

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
              <p>Rating:{movie.vote_average}/10</p>
              <button className="playTrailer" onClick={playTrailer}>
                PLAY
              </button>
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
