import React from "react";
import { Routes, Route, Link } from "react-router-dom";

import "./App.scss";

import Home from "./views/Home";

import NewsDetail from "./views/NewsDetail";

const App = () => {
  return (
    <>
      <nav>
       <h1>Hacker news</h1>
      </nav>

      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/news/:id" element={<NewsDetail />}></Route>
      </Routes>
    </>
  );
};

export default App;
