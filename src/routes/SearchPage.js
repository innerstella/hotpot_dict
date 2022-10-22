import React from "react";
import { useState, useEffect } from "react";
import { dbService } from "../fbase";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";

let BackBtn = styled.p`
  position: absolute;
  top: 2rem;
  left: 2.5rem;

  font-family: "SUIT", sans-serif;
`;
let SearchInput = styled.input`
  position: relative;
  width: 85%;
  height: 3rem;
  top: 5rem;

  font-family: "SUIT", sans-serif;
  font-size: 17px;

  background: #f2f2f3;
  border-radius: 1em;
`;
let Result = styled.div`
  position: relative;
  top: 7rem;
  width: 100%;
  overflow: scroll;
  height: 33rem;
`;
let Searched = styled.p`
  position: relative;
  padding: 0.5rem;
  font-family: "SUIT", sans-serif;
  font-size: 17px;
`;
let Footer = styled.p`
  position: relative;
  top: 6rem;
  padding: 1rem;

  font-family: "SUIT", sans-serif;
  font-style: normal;
  font-weight: 300;
  font-size: 14px;
  line-height: 120%;

  color: #bababa;
`;

const SearchPage = () => {
  //DB에서 데이터 가져오기
  const [recipe, setRecipe] = useState([]);

  const getRecipe = async () => {
    const dbRecipes = await dbService.collection("source").get();
    dbRecipes.forEach((document) => {
      const recipeObject = {
        ...document.data(),
        id: document.id,
        view: document.view,
      };
      setRecipe((prev) => [recipeObject, ...prev]);
    });
  };
  //   console.log(recipe);

  useEffect(() => {
    getRecipe();
  }, []);

  // //소스 목록 배열에 담기
  const list = [];

  recipe.forEach((name, index, array) => {
    let n = recipe[index].name;
    list.push(n);
  });
  console.log(list);

  // 검색창
  const [search, setSearch] = useState("");
  const onChange = (e) => {
    setSearch(e.target.value);
    console.log(search);
  };
  const filterSource = list.filter((src) => {
    src = src.toString();
    return src.replace(" ", "").includes(search);
  });

  //검색창 결과 클릭 및 이동
  const onSearchClick = (e) => {
    console.log(e.target.innerHTML);
    let result = e.target.innerHTML;
    //키 값 찾기
    const fil = recipe.filter((rec) => rec.name === result);
    let id = fil[0].id;
    //이동 시키기
    navigate(`/detail/${id}`);
  };
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <>
      <BackBtn onClick={handleGoBack}>◀ 뒤로 가기</BackBtn>

      <SearchInput
        onChange={onChange}
        name="search"
        placeholder="   🔍  소스 이름 검색하기"
      />
      {search !== "" ? (
        <Result>
          {filterSource.map((src) => (
            <div>
              <Searched onClick={onSearchClick}>{src}</Searched>
              <hr />
            </div>
          ))}
        </Result>
      ) : (
        <></>
      )}
      <Footer>ver 1.0.0 &copy; inner_stella__</Footer>
    </>
  );
};

export default SearchPage;
