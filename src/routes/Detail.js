import React, { useState, useEffect } from "react";
import { dbService } from "../fbase";

const Detail = () => {
  //목록에서 클릭된 소스 이름 가져오기
  const detailRecipeName = sessionStorage.getItem("recipeName");
  console.log(detailRecipeName);

  //클릭된 소스 이름에 맞는 레시피와 해시태그 가져오기
  const getRecipe = async () => {
    const dbRecipes = await dbService.collection("source").get();
    dbRecipes.forEach((document) => {
      if (document.data().name === detailRecipeName) {
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

  //링크 공유하기

  return (
    <>
      <h2>Detail</h2>
      <h3>{detailRecipeName}</h3>
      {recipe.map((src) => (
        <div key={src.id}>
          <p>{src.keyword}</p>

          {src.ingredients.map((ing, index) => (
            <li key={index}>{ing}</li>
          ))}

          <hr />
        </div>
      ))}
    </>
  );
};

export default Detail;
