import React from "react";
import { Link } from "react-router-dom";
import Search from "./Search";

const Home = () => {
  return (
    <div>
      <h1>훠궈 소스 백과사전</h1>
      <p>😊베타 서비스 중😉</p>
      <Search />
      <br />
      <Link to="/total">
        <button>전체 목록</button>
      </Link>
      <Link to="/spicy">
        <button>키워드 검색</button>
      </Link>
      <br />
      <h3>인기 소스</h3>
      <p>~~만드는 중~~</p>
    </div>
  );
};

export default Home;
