import { useState, useEffect } from "react";
import { authService } from "../fbase";
import Navigation from "./Navigation";
import AppRouter from "./Router";

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
      {init ? <AppRouter isLoggedIn={isLoggedIn} /> : "Initializing..."}
      {/* <Navigation isLoggedIn={isLoggedIn} /> */}
      <footer>
        {new Date().getFullYear()}.{new Date().getMonth() + 1}.
        {new Date().getDate()} &copy; inner_stella__
      </footer>
    </>
  );
}

export default App;
