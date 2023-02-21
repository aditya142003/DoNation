import React, { useState } from "react";
import "./Style/LoginPage.css";

function LoginPage(props) {
  function submitlogin() {
    props.submitlogin();
  }
  function submitusersignup() {
    props.submitusersignup();
  }
  function submitNGOsignup() {
    props.submitNGOsignup();
  }

  const [positionshift, setpositionshift] = useState(0);
  const [zindexchange, setzindexchange] = useState(1);
  function toggleposition() {
    if (positionshift === 0) {
      setpositionshift(-25);
      console.log(positionshift);
    } else {
      setpositionshift(0);
      console.log(positionshift);
    }
    if (zindexchange === 3) {
      setzindexchange(1);
      console.log(zindexchange);
    }
  }
  function toggleindex() {
    if (positionshift === 0) {
      setpositionshift(-25);
      console.log(positionshift);
    } else {
      setpositionshift(0);
      console.log(positionshift);
    }
    if (zindexchange === 1) {
      setzindexchange(3);
      console.log(zindexchange);
    }
  }

  return (
    <div className="parentContainer">
      <div className="leftContainer">
        <div className="logoConatiner">
          <img src={require("./Images/Logo.jpg")} alt="Logo" />
          <div>Welcome to DoNation</div>
        </div>
      </div>
      <div className="loginContainer" style={{ left: `${positionshift}%` }}>
        <div className="formContainer">
          <form action="#">
            <div className="formHeading">Login</div>
            <div className="formFields">
              <div>Email</div>
              <input
                type="email"
                spellCheck="false"
                onchange={(e) => props.setloginemail(e.target.value)}
              ></input>
            </div>
            <div className="formFields">
              <div>Password</div>
              <input
                type="password"
                onchange={(e) => props.setloginpassword(e.target.value)}
              ></input>
            </div>
            <div className="formFields">
              <button className="submit" onClick={submitlogin}>
                SUBMIT
              </button>
            </div>
            <div className="formFields divertingText">
              <div>Dont have an account?</div>
              <div>
                <div>
                  <a onClick={toggleposition} style={{ cursor: "pointer" }}>
                    Register Now as NGO
                  </a>
                </div>
                <div>
                  <a onClick={toggleindex} style={{ cursor: "pointer" }}>
                    Register Now as User
                  </a>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
      <div
        className="signupuserunteerContainer"
        style={{
          left: `${positionshift}%`,
          zIndex: `${zindexchange}`,
        }}
      >
        <div className="formContainer">
          <form action="#">
            <div className="formHeading">Signup</div>
            <div className="formFields">
              <div>Username</div>
              <input
                type="text"
                onchange={(e) => props.setusersignupusername(e.target.value)}
              ></input>
            </div>
            <div className="formFields">
              <div>Email</div>
              <input
                type="email"
                spellCheck="false"
                onchange={(e) => props.setusersignupemail(e.target.value)}
              ></input>
            </div>
            <div className="formFields">
              <div>Password</div>
              <input
                type="password"
                onchange={(e) => props.setusersignuppassword(e.target.value)}
              ></input>
            </div>
            <div className="formFields">
              <button className="submit" onClick={submitusersignup}>
                SUBMIT
              </button>
            </div>
            <div className="formFields divertingText">
              Already have an account?{" "}
              <a onClick={toggleposition} style={{ cursor: "pointer" }}>
                Login Now
              </a>
            </div>
          </form>
        </div>
      </div>
      <div
        className="signupNGOContainer"
        style={{ left: `${positionshift - 25}%` }}
      >
        <div className="formContainer">
          <form action="#">
            <div className="formHeading">Signup NGO</div>
            <div className="formFields">
              <div>NGO Name</div>
              <input
                type="text"
                id="loginusername"
                onchange={(e) => props.setNGOsignupname(e.target.value)}
              ></input>
            </div>
            <div className="formFields">
              <div className="doubleinput">
                <div>
                  <div>Email</div>
                  <input
                    type="email"
                    spellCheck="false"
                    onchange={(e) => props.setNGOsignupemail(e.target.value)}
                  ></input>
                </div>
                <div>
                  <div>Description</div>
                  <input
                    type="text"
                    spellCheck="false"
                    onchange={(e) =>
                      props.setNGOsignupdescription(e.target.value)
                    }
                  ></input>
                </div>
              </div>
            </div>
            <div className="formFields">
              <div>Latitude Longitude Coordinates</div>
              <div className="doubleinput">
                <input
                  type="number"
                  onchange={(e) => props.setNGOsignuplan(e.target.value)}
                ></input>
                <input
                  type="number"
                  onchange={(e) => props.setNGOsignuplong(e.target.value)}
                ></input>
              </div>
            </div>
            <div className="formFields">
              <div>Password</div>
              <input
                type="password"
                onchange={(e) => props.setNGOsignuppassword(e.target.value)}
              ></input>
            </div>
            <div className="formFields">
              <button className="submit" onClick={submitNGOsignup}>
                SUBMIT
              </button>
            </div>
            <div className="formFields divertingText">
              Already have an account?{" "}
              <a onClick={toggleposition} style={{ cursor: "pointer" }}>
                Login Now
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
