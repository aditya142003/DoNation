import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Style/LoginPage.css";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";

function LoginPage() {
  const auth = getAuth();
  const db = getFirestore();

  const actionCodeSettings = {
    url: "https://donationweb.web.app/",
    handleCodeInApp: true,
    iOS: { bundleId: "com.donation.app" },
    android: {
      packageName: "com.donation.app",
      installApp: true,
      minimumVersion: "12",
    },
    dynamicLinkDomain: "donationweb.page.link",
  };

  const navigate = useNavigate();
  //variables from ngo login
  const [loginemail, setloginemail] = useState();
  const [loginpassword, setloginpassword] = useState();

  //variables from ngo signup
  const [NGOsignupname, setNGOsignupname] = useState();
  const [NGOsignupdescription, setNGOsignupdescription] = useState();
  const [NGOsignuplan, setNGOsignuplan] = useState();
  const [NGOsignuplong, setNGOsignuplong] = useState();
  const [NGOsignupemail, setNGOsignupemail] = useState();
  const [NGOsignuppassword, setNGOsignuppassword] = useState();
  const [NGOsignupaddress, setNGOsignupaddress] = useState();
  const [NGOsignuimage, setNGOsignuimage] = useState();
  const [NGOsigntag, setNGOsigntag] = useState();
  const [NGOsigntagarr, setNGOsigntagarr] = useState();

  function saveNgo(user) {
    const ngoRef = doc(db, "ngo", user.uid);
    const ngouser = {
      name: NGOsignupname,
      address: NGOsignupaddress,
      lat: NGOsignuplan,
      long: NGOsignuplong,
      image: NGOsignuimage,
      totalDonations: 0,
      email: NGOsignupemail,
      tag: NGOsigntagarr,
      description: NGOsignupdescription,
      uid: user.uid,
      campaigns: [],
      createdAt: new Date().getTime(),
      updatedAt: new Date().getTime(),
    };
    setDoc(ngoRef, ngouser)
      .then(() => {
        //setModalVisible(false)
        console.log("Document written with ID: ", user.uid);

        setpositionshift(0);
      })
      .catch((error) => {
        alert("Register", `${error}`);
        console.log(error);
      });
  }

  //functions to control ngo signup
  function submitNGOsignup() {
    setNGOsigntagarr(NGOsigntag.split(","));

    if (
      NGOsignupname &&
      NGOsignupdescription &&
      NGOsignuplan &&
      NGOsignuplong &&
      NGOsignupemail &&
      NGOsignuppassword &&
      NGOsignupaddress &&
      NGOsignuimage &&
      NGOsigntagarr
    ) {
      createUserWithEmailAndPassword(auth, NGOsignupemail, NGOsignuppassword)
        .then((userCred) => {
          const user = userCred.user;
          sendEmailVerification(user, actionCodeSettings)
            .then((res) => {
              alert("Send Succeful");
              saveNgo(user);
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
  }

  //function t o control login
  function submitlogin(e) {
    e.preventDefault();
    if (loginemail && loginpassword) {
      signInWithEmailAndPassword(auth, loginemail, loginpassword)
        .then((userCredential) => {
          const user = userCredential.user;

          if (!user.emailVerified) {
            alert("Please verify your email");
          } else {
            localStorage.setItem("uid", user.uid);
            console.log(user.uid);
            localStorage.setItem("loggedIn", true);
            navigate("/NgoAdmin");
          }
        })
        .catch((error) => {
          const errorCode = error.code;
          if(errorCode=="auth/invalid-email"){
            alert("Invalid email, please try again !")
          }else if(errorCode == "auth/wrong-password"){
            alert("Wrong password, please try again !")
          }else if(errorCode == "auth/user-not-found"){
            alert("No user registered with this email !")
          }else{
            alert('Something went wrong !')
          }
          console.log(error)
          // alert(`${error}`);
        });
    }
  }

  const [positionshift, setpositionshift] = useState(0);
  function toggleposition() {
    if (positionshift === 0) {
      setpositionshift(-25);
      console.log(positionshift);
    } else {
      setpositionshift(0);
      console.log(positionshift);
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
                type="email"
                spellCheck="false"
                onInputCapture={(e) => setloginemail(e.target.value)}
              ></input>
            </div>
            <div className="formFields">
              <h4>Password</h4>
              <input
                type="password"
                onInputCapture={(e) => setloginpassword(e.target.value)}
              ></input>
            </div>
            <div className="formFields">
              <button type="button" class="btn btn-warning  btn-lg" onClick={submitlogin}>
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
                    onInputCapture={(e) => setNGOsignupname(e.target.value)}
                  ></input>
                </div>
                <div>
                  <h4>Address</h4>
                  <input
                    type="text"
                    onInputCapture={(e) => setNGOsignupaddress(e.target.value)}
                  ></input>
                </div>
              </div>
            </div>
            <div className="formFields">
              <div className="doubleinput">
                <div>
                  <h4>Email</h4>
                  <input
                    type="email"
                    spellCheck="false"
                    onInputCapture={(e) => setNGOsignupemail(e.target.value)}
                  ></input>
                </div>
                <div>
                  <h4>Description</h4>
                  <input
                    type="text"
                    spellCheck="false"
                    onInputCapture={(e) =>
                      setNGOsignupdescription(e.target.value)
                    }
                  ></input>
                </div>
              </div>
            </div>
            <div className="formFields">
              <div className="doubleinput">
                <div>
                  <h4>Latitude</h4>
                  <input
                    type="number"
                    step="any"
                    onInputCapture={(e) => setNGOsignuplan(e.target.value)}
                  ></input>
                </div>
                <div>
                  <h4>Longitude</h4>
                  <input
                    type="number"
                    step="any"
                    onInputCapture={(e) => setNGOsignuplong(e.target.value)}
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
                    onInputCapture={(e) => setNGOsignuimage(e.target.value)}
                  ></input>
                </div>
                <div>
                  <h4>Tag</h4>
                  <input
                    type="text"
                    onInputCapture={(e) => setNGOsigntag(e.target.value)}
                  ></input>
                </div>
              </div>
            </div>
            <div className="formFields">
              <h4>Password</h4>
              <input
                type="password"
                onInputCapture={(e) => setNGOsignuppassword(e.target.value)}
              ></input>
            </div>

            <div className="formFields">
              <button  type="button" class="btn btn-warning  btn-lg" onClick={submitNGOsignup}>
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

export default LoginPage;
