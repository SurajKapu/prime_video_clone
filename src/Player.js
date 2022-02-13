import React from "react";
import ReactPlayer from "react-player";
import "./player.css";

function Player({ url, setVideoDetails }) {
  return (
    <div
      className="playerBody"
      onClick={() => {
        setVideoDetails(null);
      }}
    >
      <ReactPlayer url={url} />
    </div>
  );
}

export default Player;
