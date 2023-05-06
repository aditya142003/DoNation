import "./App.css";
import React, { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";

import LandingPage from "./components/CommonComp/LandingPage";
import DefaultRoute from "./components/CommonComp/DefaultRoute";

import NgoAuth from "./components/NGO/NgoAuth";
import DashBoard from "./components/NGO/NgoDashBoard";
import NgoAdmin from "./components/NGO/NgoAdmin";
import CreateCampaign from "./components/NGO/NgoCreateCampaign";
import NgoCampaignDetail from "./components/NGO/NgoCampaignDetail";

import VolunteerAuth from "./components/Volunteer/VolunteerAuth";
import Home from "./components/Volunteer/VolunteerHome";
import VolunteerCampaignDetail from "./components/Volunteer/VolunteerCampaignDetail";
import VolunteerProfile from "./components/Volunteer/VolunteerProfile";

const FireBase = require("./Firebase/config");

function App() {
  console.log(localStorage.getItem("loggedIn"));

  return (
    <div>
      <Routes>
        <Route path="/" element={<LandingPage />}></Route>
        <Route path="*" element={<DefaultRoute />} />

        <Route path="/NgoAuth" element={<NgoAuth />}></Route>
        <Route path="/DashBoard" element={<DashBoard />}></Route>
        <Route path="/NgoAdmin" element={<NgoAdmin />}></Route>
        <Route path="/CreateCampaign" element={<CreateCampaign />}></Route>
        <Route path="/NgoCampaignDetail" element={<NgoCampaignDetail />}></Route>

         <Route path="/VolunteerAuth" element={<VolunteerAuth />}></Route>
        <Route path="/VolunteerCampaignDetail" element={<VolunteerCampaignDetail />}></Route>
        <Route path="/VolunteerProfile" element={<VolunteerProfile />}></Route>
        <Route path="/Home" element={<Home />}></Route>
      </Routes>
    </div>
  );
}

export default App;
