import React from "react";
import { Link } from "react-router-dom";

const KeywordNavigatior = () => {
  return (
    <nav>
      <span>
        <Link to="/spicy">매콤</Link>
      </span>
      <span>
        <Link to="/sweet">달콤</Link>
      </span>
      <span>
        <Link to="/sour">새콤</Link>
      </span>
      <span>
        <Link to="/nutty">고소</Link>
      </span>
      <span>
        <Link to="/salty">짧조름</Link>
      </span>
    </nav>
  );
};

export default KeywordNavigatior;
