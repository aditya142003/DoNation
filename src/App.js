import "./App.css";
import React, { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import LoginPage from "./components/LoginPage";
import CreatePost from "./components/CreatePost";
import NgoAdmin from "./components/NgoAdmin";
import DefaultRoute from "./components/DefaultRoute";
import AlertBoard from "./components/AlertBoard";
import Post from "./components/Post";

const FireBase = require("./Firebase/config");

function App() {
  const [campaignid, setcampaignid] = useState();
   console.log(localStorage.getItem("loggedIn"));

  return (
    <div>
      <Routes>
        {/* <Route
          path="/"
          element={
            localStorage.getItem("loggedIn") ? <NgoAdmin /> : <LoginPage />
          }
        ></Route> */}
        <Route path="/" element={<LoginPage />}></Route>
        <Route path="/AlertBoard" element={<AlertBoard />}></Route>
        <Route path="/NgoAdmin" element={<NgoAdmin />}></Route>
        <Route path="/CreatePost" element={<CreatePost />}></Route>
        <Route path="/Post" element={<Post />}></Route>
        <Route path="*" element={<DefaultRoute />} />
      </Routes>
    </div>
  );
}

export default App;
