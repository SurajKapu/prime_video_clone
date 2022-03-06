import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./homepage.css";
import Signin from "../Login/Signin";

function Homepage() {
  let [signin, setsignin] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="login">
      {signin ? (
        <Signin />
      ) : (
        <>
          <div className="backgroundImg">
            <div className="login_container">
              <div className="loginHeader">
                <img
                  className="loginLogo"
                  src="https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcSfvgkwBs_TAxrnph9a5uNQdKGU-uZf3KIPg7OE-Ps0r6HED48B"
                  alt="logo"
                />
              </div>
              <div className="welcomeText">
                <h1>Welcome to Prime Video</h1>
                <p>
                  Join Prime to watch the latest movies, TV shows and
                  award-winning Amazon Originals
                </p>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    setsignin(true);
                  }}
                  className="landingPage_btn"
                >
                  Sign In
                </button>
                <button
                  className="landingPage_btn"
                  onClick={() => {
                    navigate("/signup");
                  }}
                >
                  Join prime
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Homepage;
