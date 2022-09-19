import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../routes/Home";
import React, { useState } from "react";
import Auth from "../routes/Auth";
import Navigation from "./Navigation";
import Total from "../routes/Total";
import Spicy from "../routes/keyword/Spicy";
import Sweet from "../routes/keyword/Sweet";
import Sour from "../routes/keyword/Sour";
import Nutty from "../routes/keyword/Nutty";
import Salty from "../routes/keyword/Salty";
import MyPage from "../routes/MyPage";
import Detail from "../routes/Detail";

const AppRouter = ({ isLoggedIn }) => {
  return (
    <BrowserRouter>
      <Navigation />
      {/* {isLoggedIn && <Navigation />} */}
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
      <Routes>
        <Route path="/mypage" element={<MyPage />} />
      </Routes>
      <Routes>
        <Route path="/auth" element={<Auth />} />
      </Routes>
      <Routes>
        <Route path="/total" element={<Total />} />
      </Routes>
      <Routes>
        <Route path="/spicy" element={<Spicy />} />
      </Routes>
      <Routes>
        <Route path="/sweet" element={<Sweet />} />
      </Routes>
      <Routes>
        <Route path="/sour" element={<Sour />} />
      </Routes>
      <Routes>
        <Route path="/nutty" element={<Nutty />} />
      </Routes>
      <Routes>
        <Route path="/salty" element={<Salty />} />
      </Routes>
      <Routes>
        <Route path="/detail/:id" element={<Detail />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
