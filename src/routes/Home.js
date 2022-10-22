import React from "react";
import { Link } from "react-router-dom";
import { dbService } from "../fbase";
import { useEffect, useState } from "react";
import styled from "styled-components";

// 스타일
let RedRec = styled.div`
  position: absolute;
  width: 100%;
  height: 16rem;

  top: 0;
  left: 0;
  overflow-x: hidden;
  background: linear-gradient(180deg, #dd423e 0%, #a20000 83.12%);
`;

let SiteTitle = styled.div`
  position: relative;
  left: 2.6rem;
  top: 3em;

  font-family: "SUIT", sans-serif;
  font-style: normal;
  font-weight: 600;
  font-size: 180%;
  line-height: 120%;

  color: #ffffff;
`;

let SubTitle = styled.p`
  position: relative;
  left: 2.3rem;
  top: 4.5rem;

  font-family: "SUIT", sans-serif;
  font-style: normal;
  font-weight: 300;
  font-size: 110%;
  line-height: 120%;

  color: #ffffff;
`;

let Icon = styled.img`
  position: absolute;
  width: 20%;
  left: 2.8em;
  top: 4.5rem;
`;
let SearchInput = styled.input`
  position: relative;
  width: 12rem;
  height: 3rem;
  left: 0em;
  top: 5.5rem;

  font-family: "SUIT", sans-serif;

  background: #f2f2f3;
  border-radius: 1rem;
`;

let KeywordBtn = styled.button`
  position: relative;
  width: 6rem;
  height: 3.3rem;
  left: 0.5rem;
  top: 5.5rem;

  font-family: "SUIT", sans-serif;
  font-size: 95%;
  color: black;

  background: #f2f2f3;
  border-radius: 1em;
`;

let TodayPopular = styled.p`
  position: relative;
  top: 16.5rem;

  font-family: "SUIT", sans-serif;
  font-style: normal;
  font-weight: 700;
  font-size: 130%;
  line-height: 120%;

  color: #ae2f1e;
`;

let PopularList = styled.div`
  position: relative;
  width: 40%;
  top: 17rem;

  font-family: "SUIT", sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 110%;
  line-height: 160%;

  color: #3d3d3d;
`;
let Ordered = styled.ol`
  display: flex;
  flex-direction: column;
`;
let Pops = styled.li`
  text-align: left;
`;
let ViewAllBtn = styled.button`
  position: relative;
  width: 10rem;
  height: 3rem;

  // left: -0.5rem;
  top: 17rem;

  font-family: "SUIT", sans-serif;
  font-size: 95%;
  margin: 0.5rem;

  color: white;
  background: #a20000;
  border-radius: 0.8em;
`;

let NewBtn = styled.button`
  box-sizing: border-box;

  position: relative;
  width: 10rem;
  height: 3rem;
  // left: rem;
  top: 17rem;
  margin: 0.5rem;

  font-family: "SUIT", sans-serif;
  font-size: 95%;

  border: 1px solid #a20000;
  border-radius: 0.8em;
  color: #ae2f1e;
  background: white;
`;

let Video = styled.div`
  position: relative;
  width: 80%;
  top: 18rem;
`;

let Footer = styled.p`
  position: relative;
  top: 18rem;

  font-family: "Inter";
  font-style: normal;
  font-weight: 300;
  font-size: 14px;
  line-height: 120%;

  color: #bababa;
`;

const Home = () => {
  // 구글폼 이동
  const onClickGoogleForm = () => {
    window.open(
      "https://docs.google.com/forms/d/e/1FAIpQLSfXe-v33BWkFiZHqkrcAnR_CjtkBEBORtW3vlrCyo8k4ut92Q/viewform?usp=sharing",
      "_blank"
    );
  };

  // 조회수 top 5
  //DB에서 데이터 가져오기
  const [recipe, setRecipe] = useState([]);

  const getRecipe = async () => {
    const dbRecipes = await dbService.collection("source").get();
    dbRecipes.forEach((document) => {
      const recipeObject = {
        ...document.data(),
        id: document.id,
        view: document.view,
        name: document.name,
      };
      setRecipe((prev) => [recipeObject, ...prev]);
    });
  };

  // 소스명, 조회수, id 배열에 담기
  let i = 0;
  let srcList = [];
  while (i < recipe.length) {
    // console.log(recipe[i].src_name, recipe[i].view_cnt);
    if (recipe[i].view_cnt !== undefined) {
      srcList.push({
        name: recipe[i].src_name,
        view: recipe[i].view_cnt,
        id: recipe[i].id,
      });
    } else if (recipe[i].view_cnt === undefined) {
      srcList.push({ name: recipe[i].src_name, view: 0, id: recipe[i].id });
    }
    i++;
  }
  // console.log(srcList);

  // 높은 조회수 순 정렬
  srcList.sort(function (a, b) {
    if (a.view > b.view) {
      return -1;
    }
    if (a.view < b.view) {
      return 1;
    }
    // a must be equal to b
    return 0;
  });

  // 조회수 top 5 자르기
  srcList = srcList.slice(0, 5);

  useEffect(() => {
    getRecipe();
  }, []);

  return (
    <div>
      <center>
        <RedRec>
          <Icon alt="profile" src="img/icon.png" />
          <SiteTitle>훠궈 소스 백과사전</SiteTitle>
          <SubTitle>Hotpot Source Dictionary</SubTitle>
          <Link to="/search">
            <SearchInput placeholder="   🔍  소스 이름 검색하기" />{" "}
          </Link>

          <Link to="/spicy">
            <KeywordBtn>키워드</KeywordBtn>
          </Link>
        </RedRec>

        <TodayPopular>🥢 오늘의 인기 소스 🥢</TodayPopular>
      </center>
      <PopularList>
        <Ordered>
          {srcList.map((src) => (
            <Link
              to={`/detail/${src.id}`}
              style={{ textDecorationLine: "none", color: "black" }}
            >
              <Pops style={{ padding: "0.3rem" }} key={src.id}>
                {src.name}
              </Pops>
            </Link>
          ))}
        </Ordered>
      </PopularList>
      <center>
        <Link to="/total">
          <ViewAllBtn>모든 소스</ViewAllBtn>
        </Link>
        <NewBtn onClick={onClickGoogleForm}>소스 제보</NewBtn>

        <Video>
          <iframe
            title="video"
            width="330"
            height="186"
            src="https://www.youtube.com/embed/gRnuFC4Ualw?rel=0&amp;autoplay=1&mute=1&amp;loop=1;playlist=영상키값"
            frameBorder="0"
          ></iframe>
        </Video>
        <Footer>ver 1.0.0 &copy; inner_stella__</Footer>
      </center>
    </div>
  );
};

export default Home;
