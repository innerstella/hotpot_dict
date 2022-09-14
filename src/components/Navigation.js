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
      <span>
        <Link to="/">Home</Link>
      </span>
      {isLoggedIn ? (
        <span>
          <Link to="/mypage">My Page</Link>
        </span>
      ) : (
        <span>
          <Link to="/auth">Log In</Link>
        </span>
      )}
    </nav>
  );
};

export default Navigation;
