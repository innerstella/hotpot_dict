import React from "react";
import { useState, useEffect } from "react";
import { dbService } from "../fbase";
import { Link, useNavigate } from "react-router-dom";

const Search = () => {
  //DB에서 데이터 가져오기
  const [recipe, setRecipe] = useState([]);
  const [srcDb, setSrcDb] = useState([]);

  const getRecipe = async () => {
    const dbRecipes = await dbService.collection("source").get();
    dbRecipes.forEach((document) => {
      const recipeObject = {
        ...document.data(),
        id: document.id,
      };
      //   console.log(recipeObject.name, recipeObject.id);
      setRecipe((prev) => [recipeObject, ...prev]);
    });
  };
  //   console.log(recipe);

  useEffect(() => {
    getRecipe();
  }, []);

  //소스 목록 배열에 담기
  const list = [];
  recipe.forEach((name, index, array) => {
    let r = recipe[index].name;
    list.push(r);
  });
  //   console.log(list);

  // 검색창
  const [search, setSearch] = useState("");
  const onChange = (e) => {
    setSearch(e.target.value);
    console.log(search);
  };
  const filterSource = list.filter((source) => {
    return source.replace(" ", "").includes(search);
  });

  //   console.log(filterSource);

  //검색창 결과 클릭 및 이동
  const navigate = useNavigate();
  const onSearchClick = (e) => {
    console.log(e.target.innerHTML);
    let result = e.target.innerHTML;
    //키 값 찾기
    // console.log(recipe[0].name);
    const fil = recipe.filter((rec) => rec.name === result);
    // console.log(fil[0].id);
    let id = fil[0].id;
    //이동 시키기
    navigate(`/detail/${id}`);
  };

  return (
    <>
      <input
        onChange={onChange}
        name="search"
        placeholder="소스 이름이 뭐였더라..."
      />
      {search !== "" ? (
        <div>
          {filterSource.map((src) => (
            <div>
              <span onClick={onSearchClick}>{src}</span>
            </div>
          ))}
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default Search;
