import React from "react";
import Header from "./components/Header/Header";
import Home from "../src/Pages/Home/Home"
import Popular from ".././src/Pages/Popular/Popular"
import TopRated from "../src/Pages/TopRated/TopRated"
import {Route, Routes} from "react-router-dom"
import SinglePage from "./components/SinglePage/SinglePage"
import PersonSinglePage from './components/PersonSinglePage/PersonSinglePage';

import "./Assets/main.css";
// Pictures
function App() {
  return (
    <div className="">
      <Header/>

      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/popular" element={<Popular/>}/>
        <Route path="/top_rated" element={<TopRated/>}/>
        <Route path="/single-pages/:id" element={<SinglePage/>}/>
        <Route path="/single-pages/:id/person/:id" element={<PersonSinglePage/>}/>
      </Routes>
    </div>
  );
}

export default App;
