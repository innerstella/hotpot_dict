import { useState, useEffect } from "react";
import { authService } from "../fbase";
import AppRouter from "./Router";
import styled from "styled-components";

function App() {
  const [init, setInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    alert("더이상 사용되지 않는 페이지입니다. 트위터 맛집 검색기 내에서 이용해주세요 :)");
    window.location.href = "https://twitter-michelin.web.app/hotpot";
  }, []);

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
