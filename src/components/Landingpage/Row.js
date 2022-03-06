import React, { useState, useEffect } from "react";
import axios from "../../axios";
import { Link } from "react-router-dom";
import Header from "./Header";
import "./row.css";
// import PlayArrow from "@mui/icons-material/PlayArrow";
// import AddIcon from "@mui/icons-material/Add";
// import ThumbUpAltOutlinedIcon from "@mui/icons-material/ThumbUpAltOutlined";
// import ThumbUpAltOutlined from "@mui/icons-material/ThumbUpAltOutlined";
// import ThumbDownAltOutlinedIcon from "@mui/icons-material/ThumbDownAltOutlined";
// import ThumbDownAltOutlined from "@mui/icons-material/ThumbDownAltOutlined";

function Row({ title, fetchUrl, isLarge }) {
  const imageUrl = "https://image.tmdb.org/t/p/w1280";

  const [movies, setMovies] = useState([]);

  useEffect(() => {
    console.log(fetchUrl);
    async function fetchData() {
      const request = await axios.get(fetchUrl);
      setMovies(request.data.results);
    }
    fetchData();
  }, [fetchUrl]);

  return (
    <div>
      <div className="movieContainer">
        <h3 className="genre">{title}</h3>
        <div className="movieImgsRow">
          {movies.map((movie) => {
            return (
              <>
                <Link to={`${movie.id}`}>
                  <img
                    className={`movieImg ${isLarge && "largeImg"}`}
                    key={movie.id}
                    src={`${imageUrl}${
                      isLarge ? movie.backdrop_path : movie.poster_path
                    }`}
                    alt="movie"
                  />
                  {/* <div className="itemInfo">
                    <div className="icons">
                      <PlayArrow />
                      <AddIcon />
                      <ThumbUpAltOutlined />
                      <ThumbDownAltOutlined />
                    </div>
                    <div className="itemInfoTop">
                      <span>1hr 1min </span>
                      <span className="limit">+16 </span>
                      <span>1999 </span>
                    </div>
                    <div className="desc">
                      lorem lorem lorem lorem lorem lorem lorem lorem lorem
                      lorem lorem lorem lorem lorem lorem lorem lorem lorem
                      lorem lorem lorem lorem lorem lorem lorem lorem lorem
                      lorem lorem lorem lorem lorem lorem lorem lorem lorem
                      lorem lorem lorem lorem
                    </div>
                  </div> */}
                </Link>
              </>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Row;
