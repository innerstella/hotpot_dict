import React from "react";
import { dbService } from "../../fbase";
import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import KeywordNavigatior from "../../components/KeywordNavigator";

const Nutty = () => {
  //DB에서 데이터 가져오기
  const getRecipe = async () => {
    const dbRecipes = await dbService.collection("source").get();
    dbRecipes.forEach((document) => {
      if (document.data().keyword === "고소") {
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
      <h2>고소</h2>
      {recipe.map((src) => (
        <div key={src.id}>
          <Link to={`/detail/${src.id}`}>
            <p>{src.name}</p>
          </Link>
          <p>{src.keyword}</p>
          <hr />
        </div>
      ))}
    </div>
  );
};

export default Nutty;
