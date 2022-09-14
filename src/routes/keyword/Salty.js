import React from "react";
import { dbService } from "../../fbase";
import { useState, useEffect } from "react";
import KeywordNavigatior from "../../components/KeywordNavigator";

const Salty = () => {
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

  console.log(recipe);
  return (
    <div>
      <KeywordNavigatior />
      <h2>짧조름</h2>
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

export default Salty;
