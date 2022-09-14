import React, { useState, useEffect } from "react";
import { dbService } from "../fbase";

const Total = () => {
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

  const [recipe, setRecipe] = useState([]);
  useEffect(() => {
    getRecipe();
  }, []);

  console.log(recipe);
  return (
    <div>
      <h2>전체 목록</h2>
      {recipe.map((src) => (
        <div key={src.id}>
          <p>{src.name}</p>
          {/* <li>{src.ingredients[0]}</li> */}
          {src.ingredients.map((ing, index) => (
            <li key={index}>{ing}</li>
          ))}
          <hr />
        </div>
      ))}
    </div>
  );
};

export default Total;
