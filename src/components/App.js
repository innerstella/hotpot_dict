import { useState, useEffect } from "react";
import { authService } from "../fbase";
import AppRouter from "./Router";
import styled from "styled-components";

function App() {
  const [init, setInit] = useState(false);
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
      setInit(true);
    });
  }, []);

  return (
    <>
      <center>
        {init ? <AppRouter isLoggedIn={isLoggedIn} /> : "Initializing..."}
      </center>
    </>
  );
}

export default App;
