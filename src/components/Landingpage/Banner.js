import React, { useEffect, useState } from "react";
import requests from "../../request";
import axios from "../../axios";
import "./banner.css";
import { Link } from "react-router-dom";

function Banner() {
  const imageUrl = "https://image.tmdb.org/t/p/w780";

  const [movie, setMovie] = useState([]);
  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(requests.fetchActionMovies);
      setMovie(
        request.data.results[
          Math.floor(Math.random() * request.data.results.length - 1) + 1
        ]
      );
    }
    fetchData();
  }, []);
  return (
    <div>
      <div className="banner_body">
        <div className="bannerDetails">
          <h1 style={{ color: "white" }} className="title">
            {movie.title}
          </h1>
          <div className="buttons">
            <Link to={`${movie.id}`}>
              <button className="btn play">Play</button>
            </Link>
            <button
              className="btn list"
              onClick={() => {
                alert("Feature not yet added");
              }}
            >
              My List
            </button>
          </div>
          <div>{movie.overview}</div>
        </div>
        <div
          className="banner"
          style={{
            paddingTop: "8%",
            width: "100%",
            backgroundImage: `linear-gradient(to right,#0f171e,rgba(0, 0, 0, 0.1),rgba(0, 0, 0, 0)),url("${imageUrl}${movie.backdrop_path}")`,
            backgroundSize: "cover",
            backgroundPosition: "center center",
            border: "1px solid #0f171e",
          }}
        ></div>
      </div>
    </div>
  );
}

export default Banner;
