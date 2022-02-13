import React from "react";
import "./signin.css";
import { Navigate, useNavigate } from "react-router-dom";
import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebase";
import { useDispatch } from "react-redux";
import { login } from "./userSlice";

function Signin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const signIn = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        dispatch(
          login({
            email: user.email,
            uid: user.uid,
            displayName: user.displayName,
          })
        );
        navigate("/");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  };
  return (
    <div className="signin_page">
      <div className="signin__container">
        <img
          className="signin__logo"
          src="https://images-na.ssl-images-amazon.com/images/G/01/digital/video/avod/AV_Logo_150._CB430404026_.png"
          alt="logo"
        />
        <div className="signin__body">
          <p className="signin_subtitle_dark">Sign in</p>
          <form className="signin_form">
            <label style={{ fontWeight: "600" }}>
              Email or phone number
              <br />
            </label>
            <input
              type="email"
              name="name"
              className="signin_email"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            <br />

            <label style={{ fontWeight: "600" }}>
              Password
              <br />
            </label>
            <input
              type="password"
              name="name"
              className="signin_password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />

            <input
              type="submit"
              value="Sign in"
              className="signin_submit"
              onClick={signIn}
            />
          </form>

          <p style={{ textAlign: "center" }}>
            New to prime video?
            <span
              onClick={() => {
                navigate("/signup");
              }}
            >
              Join now
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Signin;
