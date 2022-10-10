import React, { useState, useEffect } from "react";
import { dbService } from "../fbase";
import { useNavigate, Link } from "react-router-dom";

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

  return (
    <div>
      <h2>전체 목록</h2>
      {recipe.map((src) => (
        <div key={src.id} value={src.name}>
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

export default Total;
