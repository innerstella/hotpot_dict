import React from "react";
import { authService } from "../fbase";
import { Link } from "react-router-dom";

const MyPage = () => {
  const user = authService.currentUser.email;
  console.log(user);
  const onLogOutClick = () => {
    authService.signOut();
  };
  return (
    <>
      <h2>My Page</h2>
      <p>{user}</p>
      <h3>좋아요 한 소스 목록</h3>
      <Link to="/">
        <button onClick={onLogOutClick}>로그아웃</button>
      </Link>
    </>
  );
};

export default MyPage;
