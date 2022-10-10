import React, { useState, useEffect } from "react";
import { dbService } from "../fbase";

const Detail = () => {
  //목록에서 클릭된 소스 이름 가져오기
  let currUrl = window.document.location.href;
  //로컬 작업용
  let currId = currUrl.substring(29);
  //배포용
  // let currId = currUrl.substring(36);
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
    console.log(e.target);
    const delLine = e.target.style.textDecoration;
    // {
    //   delLine === "" ? (delLine = "line-through") : (delLine = "");
    // }
    console.log(delLine);
    if (delLine === "") {
      console.log("yet");
      e.target.style.textDecoration = "line-through";
    } else if (delLine === "line-through") {
      e.target.style.textDecoration = "";
    }
  };

  return (
    <>
      <h2>Detail</h2>
      {recipe.map((src) => (
        <div key={src.id}>
          <h3>{src.src_name}</h3>
          <p>{src.keyword}</p>

          {src.ingredients.map((ing, index) => (
            <div onClick={onSourceSelected} key={index}>
              <p>{ing}</p>
            </div>
          ))}
        </div>
      ))}
      <button onClick={onShareClick}>🔗 공유하기</button>
    </>
  );
};

export default Detail;
