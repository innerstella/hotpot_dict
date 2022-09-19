import React from "react";
import { Link } from "react-router-dom";
import Search from "./Search";

const Home = () => {
  return (
    <div>
      <h1>훠궈 소스 백과사전</h1>
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
    </div>
  );
};

export default Home;
