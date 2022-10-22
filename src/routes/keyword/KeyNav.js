import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useRef } from "react";

let Nav = styled.div`
  position: relative;
  top: 5.5rem;
  width: 20rem;

  display: flex;
  justify-content: space-around;
`;

const KeyNav = () => {
  // url 가져오기
  let currUrl = window.document.location.href;
  //로컬 작업용
  // let currKeyWord = currUrl.substring(22);
  //배포용
  let currKeyWord = currUrl.substring(29);

  const spicy = useRef();
  const sweet = useRef();
  const sour = useRef();
  const nutty = useRef();
  const salty = useRef();

  useEffect(() => {
    changeColor();
  });

  const changeColor = () => {
    if (currKeyWord === "spicy") {
      spicy.current.style.color = "#BC1D1B";
    } else if (currKeyWord === "sweet") {
      sweet.current.style.color = "#BC1D1B";
    } else if (currKeyWord === "sour") {
      sour.current.style.color = "#BC1D1B";
    } else if (currKeyWord === "nutty") {
      nutty.current.style.color = "#BC1D1B";
    } else if (currKeyWord === "salty") {
      salty.current.style.color = "#BC1D1B";
    }
  };

  return (
    <Nav>
      <Link
        to="/spicy"
        style={{
          fontWeight: "900",
          color: "black",
          textDecorationLine: "none",
        }}
      >
        <span ref={spicy}>매콤 </span>
      </Link>
      <Link
        to="/sweet"
        style={{
          fontWeight: "900",
          color: "black",
          textDecorationLine: "none",
        }}
      >
        <span ref={sweet}>달콤 </span>
      </Link>
      <Link
        to="/sour"
        style={{
          fontWeight: "900",
          color: "black",
          textDecorationLine: "none",
        }}
      >
        <span ref={sour}>새콤 </span>
      </Link>
      <Link
        to="/nutty"
        style={{
          fontWeight: "900",
          color: "black",
          textDecorationLine: "none",
        }}
      >
        <span ref={nutty}>고소 </span>
      </Link>
      <Link
        to="/salty"
        style={{
          fontWeight: "900",
          color: "black",
          textDecorationLine: "none",
        }}
      >
        <span ref={salty}>짧조름 </span>
      </Link>
    </Nav>
  );
};

export default KeyNav;
