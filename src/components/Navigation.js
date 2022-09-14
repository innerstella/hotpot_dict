import React from "react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { authService } from "../fbase";

const Navigation = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if (user) {
        setIsLoggedIn(true);
        console.log("log in");
      } else {
        setIsLoggedIn(false);
        console.log("log out");
      }
    });
  }, []);

  return (
    <nav>
      <p>
        <Link to="/">Home</Link>
      </p>
      {isLoggedIn ? (
        <p>
          <Link to="/mypage">My Page</Link>
        </p>
      ) : (
        <p>
          <Link to="/auth">Log In</Link>
        </p>
      )}
    </nav>
  );
};

export default Navigation;
