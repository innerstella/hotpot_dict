import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { authService, firebaseInstance } from "../fbase";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newAccount, setNewAccount] = useState(true);
  const [error, setError] = useState("");

  const onChange = (e) => {
    const {
      target: { name, value },
    } = e;
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };

  let navigate = useNavigate();
  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      let data;
      if (newAccount) {
        data = await authService.createUserWithEmailAndPassword(
          email,
          password
        );
      } else {
        data = await authService.signInWithEmailAndPassword(email, password);
      }
      console.log(data);
      navigate("/");
    } catch (error) {
      setError(error.message);
    }
  };
  const toggleAccount = () => setNewAccount((prev) => !prev);
  // const onSocialClick = async (e) => {
  //   const {
  //     target: { name },
  //   } = e;
  //   let provider;
  //   if (name === "twitter") {
  //     provider = new firebaseInstance.auth.TwitterAuthProvider();
  //   }
  //   await authService.signInWithPopup(provider);
  // };
  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          name="email"
          type="text"
          placeholder="이메일"
          required
          value={email}
          onChange={onChange}
        />
        <input
          name="password"
          type="password"
          placeholder="비밀번호"
          required
          value={password}
          onChange={onChange}
        />

        <input type="submit" value={newAccount ? "가입" : "로그인"} />
        <br />
        <h5 onClick={toggleAccount}>
          {newAccount
            ? "이미 계정이 있으신가요? [로그인하기]"
            : "처음 오셨나요? [회원 가입하기]"}
        </h5>

        {error}
      </form>
    </div>
  );
};

export default Auth;
