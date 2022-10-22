import React from "react";
import { dbService } from "../../fbase";
import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import styled from "styled-components";
import KeyNav from "./KeyNav";

let RedRec = styled.div`
  position: relative;
  width: 23rem;
  height: 10rem;
  top: 0.5rem;

  background: linear-gradient(
    90deg,
    #bc1d1b 18.75%,
    rgba(188, 29, 27, 0.888134) 70.69%,
    rgba(188, 29, 27, 0.85) 100%
  );
  border-radius: 1rem;
`;
let SiteTitle = styled.p`
  position: relative;
  left: -3rem;
  top: 3rem;

  font-family: "SUIT", sans-serif;
  font-style: normal;
  font-weight: 600;
  font-size: 180%;
  line-height: 120%;

  color: #ffffff;
`;

let SubTitle = styled.p`
  position: relative;
  left: -3.3rem;
  top: 1.7rem;

  font-family: "SUIT", sans-serif;
  font-style: normal;
  font-weight: 300;
  font-size: 110%;
  line-height: 120%;

  color: #ffffff;
`;
let Icon = styled.img`
  position: relative;
  width: 6rem;
  height: 6rem;
  left: 7.5rem;
  top: -3.5rem;
`;
let SearchInput = styled.input`
  box-sizing: border-box;

  position: relative;
  width: 22.5rem;
  height: 3.5rem;
  top: 2rem;

  font-family: "SUIT", sans-serif;

  background: #ffffff;
  border: 1px solid #d9d9d9;
  border-radius: 1rem;
`;

let Menu = styled.div`
  position: relative;
  width: 22.5rem;
  top: 4rem;
  display: flex;
  justify-content: space-around;

  font-family: "SUIT", sans-serif;
`;
let List = styled.div`
  position: relative;
  top: 7rem;

  overflow: scroll;
  height: 18rem;
  width: 70%;
`;
let SrcDiv = styled.div`
  display: flex;
  justify-content: space-between;

  padding: 1rem;
`;

let Footer = styled.p`
  position: relative;
  top: 7rem;

  font-family: "Inter";
  font-style: normal;
  font-weight: 300;
  font-size: 14px;
  line-height: 120%;

  color: #bababa;
`;

const Spicy = () => {
  //DB에서 데이터 가져오기

  const getRecipe = async () => {
    const dbRecipes = await dbService.collection("source").get();
    dbRecipes.forEach((document) => {
      if (document.data().keyword === "짧조름") {
        const recipeObject = {
          ...document.data(),
          id: document.id,
        };
        setRecipe((prev) => [recipeObject, ...prev]);
      }
    });
  };

  const [recipe, setRecipe] = useState([]);
  useEffect(() => {
    getRecipe();
  }, []);

  return (
    <div>
      <Link to="/" style={{ textDecorationLine: "none", color: "black" }}>
        <RedRec>
          <SiteTitle>훠궈 소스 백과사전</SiteTitle>
          <SubTitle>Hotpot Source Dictionary</SubTitle>
          <Icon alt="hotpot" src="img/icon.png" />
        </RedRec>
      </Link>
      <Link to="/search">
        <SearchInput placeholder="   🔍  소스 이름 검색하기" />
      </Link>
      <Menu>
        <Link
          to="/total"
          style={{
            color: "black",
            fontWeight: "600",
            textDecorationLine: "underline",
            textUnderlinePosition: "under",
          }}
        >
          <span>전체 소스</span>
        </Link>
        <Link
          to="/popular"
          style={{
            color: "black",
            fontWeight: "600",
            textDecorationLine: "underline",
            textUnderlinePosition: "under",
          }}
        >
          <span>인기 소스</span>
        </Link>
        <span
          style={{
            color: "#BC1D1B",
            fontWeight: "600",
            textDecorationLine: "underline",
            textUnderlinePosition: "under",
          }}
        >
          키워드 검색
        </span>
      </Menu>
      <KeyNav></KeyNav>

      <List>
        {recipe.map((src) => (
          <SrcDiv key={src.id} value={src.name}>
            <Link
              to={`/detail/${src.id}`}
              style={{ textDecorationLine: "none", color: "black" }}
            >
              <span
                style={{ fontWeight: "400", fontFamily: '"SUIT", sans-serif' }}
              >
                {src.name}
                <span style={{ color: "#AE2F1E" }}> # {src.keyword} </span>
              </span>
            </Link>
            <span
              style={{ fontWeight: "400", fontFamily: '"SUIT", sans-serif' }}
            >
              👀 {src.view}
            </span>
          </SrcDiv>
        ))}
      </List>
      <Footer>ver 1.0.0 &copy; inner_stella__</Footer>
    </div>
  );
};

export default Spicy;
