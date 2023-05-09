import React from "react";
import { useNavigate } from "react-router-dom";
import logo from "./Images/doNationBlack.png";
import NavBar from "./NavBar";
import Initiative from "./Initiative";
import Docs from "./Docs";

function LandingPage() {
  return (
    <div>
      <NavBar />
      <Initiative />
      <Docs />
    </div>
  );
}

export default LandingPage;
