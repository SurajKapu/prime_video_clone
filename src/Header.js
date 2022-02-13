import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./header.css";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import UserProfile from "./UserProfile";

import { signOut } from "firebase/auth";
import { auth } from "./firebase";

function Header() {
  const navigate = useNavigate();
  const [showProfile, setShowProfile] = useState(false);
  const displayProfile = () => {
    setShowProfile(!showProfile);
  };

  return (
    <>
      <div className="header">
        <div className="header_left">
          <img
            onClick={() => {
              navigate("/");
            }}
            className="logo"
            src="https://www.hiventy.com/wp-content/uploads/2021/06/certif_amazon_small-1.png"
            alt="logo"
          />
          <ul className="navigationMenu">
            <li className="home">Home</li>
            <li>TV Shows</li>
            <li>Movies</li>
            <li>Channels</li>
            <li>Categories</li>
          </ul>
        </div>
        <AccountCircleIcon
          className="userProfile"
          onClick={displayProfile}
          style={{ color: "#1ca9c9", fontSize: "2.5rem" }}
        />
      </div>
      {showProfile && <UserProfile closeProfile={setShowProfile} />}
    </>
  );
}

export default Header;
