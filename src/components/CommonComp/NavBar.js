import "./Style/NavBar.css";
import React from "react";
import { useNavigate } from "react-router-dom";
import logo from "./Images/doNationBlack.png";

function NavBar() {
  const nav = useNavigate();
  function handleLogin() {
    if (document.getElementById("optionSel").value == "NGO") {
      nav("/NgoAuth");
    } else if (document.getElementById("optionSel").value == "Vol") {
      nav("/VolunteerAuth");
    } else if (document.getElementById("optionSel").value == "Guest") {
      nav("/Guest");
    }
  }
  return (
    <div>
      <div className="navBar">
        <div className="left">
          <img src={logo} className="logo"></img>
          <span>Intiative</span>
          <span>Docs</span>
          <span>Developer</span>
          <span>Contact</span>
        </div>
        <div className="right">
          <span>
            <select onChange={handleLogin} id="optionSel">
              <option hidden className="loginOption">
                Login
              </option>
              <option className="option" value="NGO">
                NGO
              </option>
              <option className="option" value="Vol">
                Volunteer
              </option>
              <option className="option" value="Guest">
                Guest
              </option>
            </select>
          </span>
        </div>
      </div>
    </div>
  );
}

export default NavBar;
