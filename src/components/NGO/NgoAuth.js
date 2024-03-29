import "./Style/AuthPage.css";

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import db from "../../Firebase/config";

function NgoAuth() {
  const auth = getAuth();
  const navigate = useNavigate();
  const actionCodeSettings = {
    url: "https://donation-web-ideathon.web.app/",
    handleCodeInApp: true,
  };

  const [positionshift, setpositionshift] = useState(0);
  const [NgoReg, setNgoReg] = useState({
    name: "",
    description: "",
    lat: 0,
    long: 0,
    email: "",
    password: "",
    address: "",
    image: "",
    tag: "",
  });
  const [NgoLogin, setNgoLogin] = useState({ email: "adityabhatnagar142003@gmail.com", password: "Code123" });

  const handleReg = () => {
    if (
      NgoReg.name &&
      NgoReg.address &&
      NgoReg.lat &&
      NgoReg.long &&
      NgoReg.image &&
      NgoReg.email &&
      NgoReg.tag &&
      NgoReg.description
    ) {
      console.log(NgoReg);
      createUserWithEmailAndPassword(auth, NgoReg.email, NgoReg.password)
        .then((userCred) => {
          const user = userCred.user;
          sendEmailVerification(user, actionCodeSettings)
            .then((res) => {
              alert("Send Succeful");
              saveNgo(user, NgoReg);
            })
            .catch((err) => {
              alert("Error in send");
              console.log(err);
            });
        })
        .catch((err) => {
          alert("Error in Create");
          console.log(err);
        });
    }

    function saveNgo(user, NgoReg) {
      const NgoRef = doc(db, "NGO", user.uid);
      const Ngouser = {
        uid: user.uid,
        name: NgoReg.name,
        address: NgoReg.address,
        lat: NgoReg.lat,
        long: NgoReg.long,
        image: NgoReg.image,
        email: NgoReg.email,
        tag: NgoReg.tag,
        description: NgoReg.description,
        createdAt: new Date().getTime(),
      };
      setDoc(NgoRef, Ngouser)
        .then(() => {
          console.log("Document written with ID: ", user.uid);
          setpositionshift(0);
        })
        .catch((error) => {
          alert("Register", `${error}`);
          console.log(error);
        });
    }
  };

  function handleLogin(e) {
    e.preventDefault();
    if (NgoLogin.email && NgoLogin.password) {
      signInWithEmailAndPassword(auth, NgoLogin.email, NgoLogin.password)
        .then((userCredential) => {
          const user = userCredential.user;
          if (!user.emailVerified) {
            alert("Please verify your email");
          } else {
            localStorage.setItem("uid", user.uid);
            localStorage.setItem("loggedIn", true);
            navigate("/DashBoard");
          }
        })
        .catch((error) => {
          const errorCode = error.code;
          if (errorCode === "auth/invalid-email") {
            alert("Invalid email, please try again !");
          } else if (errorCode === "auth/wrong-password") {
            alert("Wrong password, please try again !");
          } else if (errorCode === "auth/user-not-found") {
            alert("No user registered with this email !");
          } else {
            alert("Something went wrong !");
          }
          console.log(error);
        });
    }
  }

  const toggleposition = () => {
    if (positionshift === 0) {
      setpositionshift(-25);
    } else {
      setpositionshift(0);
    }
  };
  function saveLoc(e) {
    setNgoReg({ ...NgoReg, lat: e.coords.latitude, long: e.coords.longitude });
  }
  console.log(NgoReg);

  function getLocation() {
    if (navigator.geolocation) {
      window.navigator.geolocation.getCurrentPosition((e) => {
        saveLoc(e);
      });
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  }

  return (
    <div className="parentContainer">
      <div className="leftContainer">
        <div className="logoConatiner">
          <img src={require("./Images/doNationWhite.png")} alt="Logo" />
          <div>Welcome to DoNation</div>
        </div>
      </div>
      <div className="loginContainer" style={{ left: `${positionshift}%` }}>
        <div className="formContainer">
          <form action="#">
            <div className="formHeading">Login</div>
            <div className="formFields">
              <h4>Email</h4>
              <input
                value={NgoLogin.email}
                type="email"
                spellCheck="false"
                onInputCapture={(e) =>
                  setNgoLogin({ ...NgoLogin, email: e.target.value })
                }
              ></input>
            </div>
            <div className="formFields">
              <h4>Password</h4>
              <input
                value={NgoLogin.password}
                type="password"
                onInputCapture={(e) =>
                  setNgoLogin({ ...NgoLogin, password: e.target.value })
                }
              ></input>
            </div>
            <div className="formFields">
              <button
                type="button"
                class="btn btn-warning  btn-lg"
                onClick={handleLogin}
              >
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
              </div>
            </div>
          </form>
        </div>
      </div>
      <div className="signupNGOContainer" style={{ left: `${positionshift}%` }}>
        <div className="formContainer">
          <form action="#">
            <h4 className="formHeading">Signup NGO</h4>
            <div className="formFields">
              <div className="doubleinput">
                <div>
                  <h4>NGO Name</h4>
                  <input
                    type="text"
                    onInputCapture={(e) =>
                      setNgoReg({ ...NgoReg, name: e.target.value })
                    }
                  ></input>
                </div>
                <div>
                  <h4>Email</h4>
                  <input
                    type="email"
                    onInputCapture={(e) =>
                      setNgoReg({ ...NgoReg, email: e.target.value })
                    }
                  ></input>
                </div>
              </div>
            </div>
            <div className="formFields">
              <div className="doubleinput">
                <div>
                  <h4>Image</h4>
                  <input
                    type="text"
                    spellCheck="false"
                    onInputCapture={(e) =>
                      setNgoReg({ ...NgoReg, image: e.target.value })
                    }
                  ></input>
                </div>
                <div>
                  <h4>Description</h4>
                  <input
                    type="text"
                    spellCheck="false"
                    onInputCapture={(e) =>
                      setNgoReg({ ...NgoReg, description: e.target.value })
                    }
                  ></input>
                </div>
              </div>
            </div>

            <div className="formFields">
              <div className="doubleinput">
                <div>
                  <h4>Tag</h4>
                  <input
                    type="text"
                    onInputCapture={(e) =>
                      setNgoReg({ ...NgoReg, tag: e.target.value })
                    }
                  ></input>
                </div>
                <div>
                  <h4>Password</h4>
                  <input
                    type="password"
                    onInputCapture={(e) =>
                      setNgoReg({ ...NgoReg, password: e.target.value })
                    }
                  ></input>
                </div>
              </div>
            </div>
            <div className="formFields">
              <div className="doubleinput">
                <div>
                  <h4>Address</h4>
                  <input
                    className="address"
                    type="text"
                    onInputCapture={(e) =>
                      setNgoReg({ ...NgoReg, address: e.target.value })
                    }
                  ></input>
                </div>
                <div>
                  <button
                    onClick={getLocation}
                    type="button"
                    class="btn btn-primary location"
                  >
                    Use My Location
                  </button>
                </div>
              </div>
            </div>
            <div className="formFields">
              <button
                type="button"
                class="btn btn-warning  btn-lg"
                onClick={handleReg}
              >
                SUBMIT
              </button>
            </div>
          </form>
          <div className="formFields divertingText">
            Already have an account?{" "}
            <a onClick={toggleposition} style={{ cursor: "pointer" }}>
              Login Now
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NgoAuth;
