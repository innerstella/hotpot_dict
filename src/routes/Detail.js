import React, { useState, useEffect } from "react";
import { dbService } from "../fbase";
import { FieldValue } from "../fbase";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

let Wrapper = styled.div`
  position: relative;
  width: 22rem;
  height: 10rem;
  top: 1rem;

  background: linear-gradient(
    90deg,
    #bc1d1b 18.75%,
    rgba(188, 29, 27, 0.888134) 70.69%,
    rgba(188, 29, 27, 0.85) 100%
  );
  border-radius: 1rem;
`;

let SrcName = styled.p`
  position: relative;
  top: 2.5rem;
  left: -5rem;

  font-family: "SUIT", sans-serif;
  font-style: normal;
  font-weight: 600;
  font-size: 180%;
  line-height: 120%;

  color: #ffffff;
`;
let KeywordName = styled.p`
  position: relative;
  left: -8rem;
  top: 2.5rem;

  font-family: "SUIT", sans-serif;
  font-style: normal;
  font-weight: 300;
  font-size: 120%;
  line-height: 120%;

  color: rgba(255, 255, 255, 0.8);
`;

let RecipeText = styled.p`
  position: relative;
  top: 1.5rem;

  font-family: "SUIT", sans-serif;
  font-style: normal;
  font-weight: 700;
  font-size: 160%;
  line-height: 120%;

  color: #ae2f1e;
`;

let ExplainText = styled.p`
  position: relative;
  top: 1rem;

  font-family: "SUIT", sans-serif;
  font-style: normal;
  font-weight: 500;
  font-size: 90%;
  line-height: 120%;
  /* identical to box height, or 17px */

  color: rgba(61, 61, 61, 0.6);
`;

let Ingredients = styled.div`
  position: relative;

  font-family: "SUIT", sans-serif;

  top: 2.5rem;
`;

let ShareBtn = styled.button`
  box-sizing: border-box;

  position: relative;
  width: 10rem;
  height: 4rem;
  top: 4rem;

  font-family: "SUIT", sans-serif;

  background: #ffffff;
  border: 1px solid #bc1d1b;
  border-radius: 2rem;
`;
let BackBtn = styled.p`
  position: relative;
  top: 1.5em;
  left: -8.5em;

  font-family: "SUIT", sans-serif;
`;
let Footer = styled.p`
  position: relative;
  top: 4rem;
  padding: 1rem;

  font-family: "SUIT", sans-serif;
  font-style: normal;
  font-weight: 300;
  font-size: 14px;
  line-height: 120%;

  color: #bababa;
`;

const Detail = () => {
  //목록에서 클릭된 소스 이름 가져오기
  let currUrl = window.document.location.href;
  //로컬 작업용
  // let currId = currUrl.substring(29);
  //배포용
  let currId = currUrl.substring(36);
  console.log(currId);

  //클릭된 소스 이름에 맞는 레시피와 해시태그 가져오기
  const getRecipe = async () => {
    const dbRecipes = await dbService.collection("source").doc(currId);
    dbRecipes.get().then((doc) => {
      const recipeObject = {
        ...doc.data(),
        name: doc.name,
        id: doc.id,
        view_cnt: doc.view,
      };
      setRecipe((prev) => [recipeObject, ...prev]);
      console.log(recipeObject.view);
    });
    // 페이지 방문 시, view 1 증가
    const increment = FieldValue.increment(1);

    dbRecipes.update({ view: increment });
    dbRecipes.update({ view_cnt: increment });
  };

  const [recipe, setRecipe] = useState([]);
  useEffect(() => {
    getRecipe();
  }, []);

  //링크 공유하기
  let url = document.location.href;
  const onShareClick = () => {
    let textArea = document.createElement("textarea");
    document.body.appendChild(textArea);
    textArea.value = url;
    textArea.select();
    document.execCommand("copy");
    document.body.removeChild(textArea);
    alert("링크가 복사되었습니다.");
  };

  // 소스 재료 클릭시 취소선
  const onSourceSelected = (e) => {
    const delLine = e.target.style.textDecoration;
    if (delLine === "") {
      e.target.style.textDecoration = "line-through";
    } else if (delLine === "line-through") {
      e.target.style.textDecoration = "";
    }
  };

  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };
  console.log(recipe);
  return (
    <>
      <BackBtn onClick={handleGoBack}>◀ 뒤로 가기</BackBtn>
      <Wrapper>
        {recipe.map((src) => (
          <div key={src.id}>
            <SrcName>{src.src_name}</SrcName>
            <KeywordName># {src.keyword}</KeywordName>
          </div>
        ))}
      </Wrapper>
      <center>
        <RecipeText>🥢 RECIPE 🥢</RecipeText>
        <ExplainText>넣은 재료는 헷갈리지 않게 체크하기</ExplainText>
        <Ingredients>
          {recipe.map((src) => (
            <div key={src.id}>
              {src.ingredients.map((ing, index) => (
                <div onClick={onSourceSelected} key={index}>
                  <p>{ing}</p>
                </div>
              ))}
            </div>
          ))}
        </Ingredients>
        <ShareBtn onClick={onShareClick}>🔗 공유하기</ShareBtn>
        <Footer>ver 1.0.0 &copy; inner_stella__</Footer>
      </center>
    </>
  );
};

export default Detail;
