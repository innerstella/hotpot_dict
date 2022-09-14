import React from "react";
import { dbService } from "../../fbase";
import { useState, useEffect } from "react";
import KeywordNavigatior from "../../components/KeywordNavigator";
import { useNavigate } from "react-router-dom";

const Salty = () => {
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
      <KeywordNavigatior />
      <h2>짧조름</h2>
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

export default Salty;
