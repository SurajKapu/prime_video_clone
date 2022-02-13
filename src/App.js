import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homepage from "./Homepage";
import Signup from "./Signup";
import Signin from "./Signin";
import { useEffect } from "react";
import { auth } from "./firebase";
import { useDispatch, useSelector } from "react-redux";
import { login, logout, selectUser } from "./userSlice";
import Header from "./Header";
import MainPage from "./MainPage";
import Movie from "./Movie";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((userAuth) => {
      if (userAuth) {
        dispatch(
          login({
            uid: userAuth.uid,
            email: userAuth.email,
            displayName: userAuth.displayName,
          })
        );
      } else {
        dispatch(logout());
      }
    });
    return unsubscribe;
  }, [dispatch]);

  const user = useSelector(selectUser);
  return (
    <Routes>
      {user ? (
        <>
          <Route exact path="/" element={<MainPage />}></Route>
          <Route exact path="/:movieId" element={<Movie />}></Route>
        </>
      ) : (
        <>
          <Route path="/" element={<Homepage />}></Route>
          <Route exact path="/signin" element={<Signin />}></Route>
          <Route exact path="/signup" element={<Signup />}></Route>
        </>
      )}
    </Routes>
  );
}

export default App;
