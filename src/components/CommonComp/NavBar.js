import "./Style/NavBar.css";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import logo from "./Images/doNationBlack.png";

function NavBar() {
  const nav = useNavigate();
  useEffect(() => {
    let options = document.querySelectorAll("#optionSel .option");
    console.log(options)
    options.forEach(element => {
      console.log(element)
      element.addEventListener("click", e => {
        e.stopPropagation();
        let value = e.target.dataset.value;
        if (value === "ngo")
          nav("/NgoAuth");
        else if (value === "vol")
          nav("/VolunteerAuth");
        else
          nav("/Guest");
      })
    });
    document.addEventListener("click", e => {
      document.getElementById("optionSel").classList.remove("show");
    })
  }, [])
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
          <div className="loginOption" onClick={e => {
            e.stopPropagation();
            let options = document.getElementById("optionSel");
            if (!options.classList.contains("show"))
              options.classList.add("show");
            else
              options.classList.remove("show");
          }}>
            Login
          </div>
          <div id="optionSel">
            <div className="option" data-value="ngo">
              NGO
            </div>
            <div className="option" data-value="vol">
              Volunteer
            </div>
            <div className="option" data-value="guest">
              Guest
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NavBar;
