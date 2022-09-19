import React, { useState, useEffect } from "react";
import { dbService } from "../fbase";

const Detail = () => {
  //목록에서 클릭된 소스 이름 가져오기
  const detailRecipeName = sessionStorage.getItem("recipeName");
  // console.log(detailRecipeName);
  let currUrl = window.document.location.href;
  //배포하면, 배포 링크 따라서 다시 잘라주기
  let currId = currUrl.substring(29);
  console.log(currId);

  //클릭된 소스 이름에 맞는 레시피와 해시태그 가져오기
  const getRecipe = async () => {
    const dbRecipes = await dbService.collection("source").doc(currId);
    // dbRecipes.get().then((doc) => {
    //   console.log(doc.data());
    // });
    dbRecipes.get().then((doc) => {
      const recipeObject = {
        ...doc.data(),
        name: doc.name,
        id: doc.id,
      };
      setRecipe((prev) => [recipeObject, ...prev]);
      console.log(dbRecipes.get().name);
    });
  };

  const [recipeName, setRecipeName] = useState("");

  const [recipe, setRecipe] = useState([]);
  useEffect(() => {
    getRecipe();
  }, []);

  //링크 공유하기
  const [url, setUrl] = useState("");
  const onShareClick = () => {
    let textArea = document.createElement("textarea");
    document.body.appendChild(textArea);
    setUrl(window.document.location.href);
    textArea.value = url;
    textArea.select();
    document.execCommand("copy");
    document.body.removeChild(textArea);
    alert("링크가 복사되었습니다.");
  };

  //좋아요
  const [isLiked, setIsLiked] = useState(false);
  const onLikeClick = () => {
    setIsLiked((prev) => !prev);
    console.log("좋아요!");
  };
  const onUnLikeClick = () => {
    setIsLiked((prev) => !prev);
    console.log("싫어요!");
  };

  return (
    <>
      <h2>Detail</h2>
      {isLiked ? (
        <button onClick={onUnLikeClick}>❤</button>
      ) : (
        <button onClick={onLikeClick}>🤍</button>
      )}

      {recipe.map((src) => (
        <div key={src.id}>
          <h3>{src.src_name}</h3>
          <p>{src.keyword}</p>

          {src.ingredients.map((ing, index) => (
            <li key={index}>{ing}</li>
          ))}
        </div>
      ))}
      <button onClick={onShareClick}>🔗 공유하기</button>
    </>
  );
};

export default Detail;
