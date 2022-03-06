import React from "react";
import { useNavigate } from "react-router-dom";
import "./signup.css";
import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../firebase";
import { updateProfile } from "firebase/auth";
import { useDispatch } from "react-redux";
import { login } from "../../../userSlice";

function Signup() {
  const dispatch = useDispatch();
  let navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState();

  const signup_User = async (e) => {
    e.preventDefault();

    if (email && password) {
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          navigate("/");
          // ...
        })
        .catch((error) => {
          const errorMessage = error.message;
          alert(errorMessage);
          console.log(errorMessage);
          // ..
        });
    } else {
      alert("please enter all details.");
    }
  };
  return (
    <div className="signup_page">
      <div className="signup__container">
        <img
          className="signup__logo"
          src="https://images-na.ssl-images-amazon.com/images/G/01/digital/video/avod/AV_Logo_150._CB430404026_.png"
          alt="logo"
        />
        <div className="signup__body">
          <p className="subtitle">Join Prime Video Now</p>
          <form className="signup_form">
            <label style={{ fontWeight: "600" }}>
              Email address
              <br />
            </label>
            <input
              type="email"
              name="name"
              className="signup_email"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            <br />

            <label style={{ fontWeight: "600" }}>
              Password (6 or more characters)
              <br />
            </label>

            <input
              type="password"
              name="name"
              className="signup_password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            <p className="terms">
              By continuing, you agree to Amazon's
              <span> Conditions of use </span>and<span> Privacy Notice</span>
            </p>
            <input
              type="submit"
              value="Agree & Join"
              className="signup_submit"
              onClick={signup_User}
            />
          </form>

          <p style={{ textAlign: "center" }}>
            Already a Prime Member?
            <span
              onClick={() => {
                navigate("/signin");
              }}
            >
              Sign in
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Signup;
