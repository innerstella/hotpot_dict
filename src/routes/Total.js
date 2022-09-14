import React, { useState, useEffect } from "react";
import { dbService } from "../fbase";
import { useNavigate } from "react-router-dom";

const Total = () => {
  //DB에서 데이터 가져오기
  const [recipe, setRecipe] = useState([]);

  const getRecipe = async () => {
    const dbRecipes = await dbService.collection("source").get();
    dbRecipes.forEach((document) => {
      const recipeObject = {
        ...document.data(),
        id: document.id,
      };
      setRecipe((prev) => [recipeObject, ...prev]);
    });
  };

  useEffect(() => {
    getRecipe();
  }, []);

  //클릭된 소스 이름 저장하고 디테일 페이지 이동
  const navigate = useNavigate();
  const [recipeName, setRecipeName] = useState("");
  const onRecipeClick = (e) => {
    sessionStorage.clear();
    setRecipeName(e.target.innerHTML);
  };
  sessionStorage.setItem("recipeName", recipeName);

  if (recipeName !== "") {
    navigate("/detail");
  }

  return (
    <div>
      <h2>전체 목록</h2>
      {recipe.map((src) => (
        <div key={src.id}>
          <p onClick={onRecipeClick}>{src.name}</p>
          <p>{src.keyword}</p>
          <hr />
        </div>
      ))}
    </div>
  );
};

export default Total;
