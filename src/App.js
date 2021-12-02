import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import "./App.css";

import Login from "./pages/Login";
import Header from "./components/Header";
import CreateUser from "./pages/CreateUser";
import UserProfile from "./pages/UserProfile";
import FirebaseConfig from "./components/FirebaseConfig";
import Navigate from "./utils/Navigate";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [userInformation, setUserInformation] = useState({});
  const [appInitialized, setAppInitialized] = useState(false);

  useEffect(() => {
    initializeApp(FirebaseConfig);
    setAppInitialized(true);
  }, []);

  useEffect(() => {
    const auth = getAuth();
    if (appInitialized) {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          setUserInformation(user);
          setLoggedIn(true);
        } else {
          setUserInformation({});
          setLoggedIn(false);
        }
      });
      setLoading(false);
    }
  }, [appInitialized]);

  function logout() {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        setUserInformation({});
        setLoggedIn(false);
      })
      .catch((error) => {
        console.warn(error);
      });
  }

  if (loading) return null;
  return (
    <>
      <Header logout={logout} loggedIn={loggedIn} />
      <Router>
        <Routes>
          <Route
            path="/create"
            element={
              !loggedIn ? (
                <CreateUser
                  setLoggedIn={setLoggedIn}
                  setUserInformation={setUserInformation}
                />
              ) : (
                <Navigate to={`/user/${userInformation.uid}`} />
              )
            }
          />
          <Route
            path="/user/:id"
            element={
              loggedIn ? (
                <UserProfile userInformation={userInformation} />
              ) : (
                <Navigate to="/" />
              )
            }
          />
          <Route
            path="/"
            element={
              !loggedIn ? (
                <Login
                  setLoggedIn={setLoggedIn}
                  setUserInformation={setUserInformation}
                />
              ) : (
                <Navigate to={`/user/${userInformation.uid}`} />
              )
            }
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;
