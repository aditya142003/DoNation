import "./App.css";
import React, { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import NgoAuth from "./components/NgoAuth";
import CreateCampaign from "./components/CreateCampaign";
import NgoAdmin from "./components/NgoAdmin";
import DefaultRoute from "./components/DefaultRoute";
import DashBoard from "./components/DashBoard";
import CampaignDetail from "./components/CampaignDetail";
import LandingPage from "./components/LandingPage";
import VolunteerAuth from "./components/VolunteerAuth";
import Home from "./components/Home";

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
            localStorage.getItem("loggedIn") ? <NgoAdmin /> : <AuthPage />
          }
        ></Route> */}
        <Route path="/" element={<LandingPage />}></Route>
        <Route path="/NgoAuth" element={<NgoAuth />}></Route>
        <Route path="/VolunteerAuth" element={<VolunteerAuth />}></Route>
        <Route path="/Home" element={<Home />}></Route>
        <Route path="/DashBoard" element={<DashBoard />}></Route>
        <Route path="/NgoAdmin" element={<NgoAdmin />}></Route>
        <Route path="/CreateCampaign" element={<CreateCampaign />}></Route>
        <Route path="/CampaignDetail" element={<CampaignDetail />}></Route>
        <Route path="*" element={<DefaultRoute />} />
      </Routes>
    </div>
  );
}

export default App;
