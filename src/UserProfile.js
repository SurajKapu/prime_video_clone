import React from "react";
import "./userProfile.css";
import { Navigate, useNavigate } from "react-router-dom";

import { auth } from "./firebase";
import { signOut } from "firebase/auth";

function UserProfile({ closeProfile }) {
  const navigate = useNavigate();
  return (
    <div>
      <ul
        className="signOutContainer"
        style={{
          position: "fixed",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          height: "100vh",
          width: "100vw",
          top: "10",
          textAlign: "right",
          zIndex: "99",
        }}
        onClick={() => closeProfile(false)}
      >
        <li
          className="signOut"
          style={{
            margin: "3.5rem",
            listStyle: "none",
            display: "inline-block",
            padding: "0.5em",
            color: "white",
            fontSize: "0.99rem",
            fontWeight: "600",
          }}
          onClick={() => {
            signOut(auth);
            navigate("/signin");
          }}
        >
          Sign Out
        </li>
      </ul>
    </div>
  );
}

export default UserProfile;
