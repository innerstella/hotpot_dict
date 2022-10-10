import React from "react";
import { Link } from "react-router-dom";
import Search from "./Search";
import { dbService } from "../fbase";
import { useEffect, useState } from "react";

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

  // 소스명과 조회수 배열에 담기
  let i = 0;
  let srcList = [];
  while (i < recipe.length) {
    // console.log(recipe[i].src_name, recipe[i].view_cnt);
    if (recipe[i].view_cnt !== undefined) {
      srcList.push({
        name: recipe[i].src_name,
        view: recipe[i].view_cnt,
        id: i,
      });
    } else if (recipe[i].view_cnt === undefined) {
      srcList.push({ name: recipe[i].src_name, view: 0, id: i });
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
  console.log(srcList);

  useEffect(() => {
    getRecipe();
  }, []);

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
      <ol>
        {srcList.map((src) => (
          <li key={src.id}>
            {src.name} ({src.view})
          </li>
        ))}
      </ol>

      <br />
      <iframe
        width="330"
        height="186"
        src="https://www.youtube.com/embed/gRnuFC4Ualw?rel=0&amp;autoplay=1&mute=1&amp;loop=1;playlist=영상키값"
        frameBorder="0"
      ></iframe>
      <br />
      <button onClick={onClickGoogleForm}>소스 제보 및 문의 사항</button>
    </div>
  );
};

export default Home;
