import "./App.css";
import React, { useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import LoginPage from "./components/LoginPage";
import Home from "./components/Home";
import CreatePost from "./components/CreatePost";
import NgoAdmin from "./components/NgoAdmin";
import DefaultRoute from "./components/DefaultRoute";

function App() {
  const [usersignupusername, setusersignupusername] = useState();
  const [usersignupemail, setusersignupemail] = useState();
  const [usersignuppassword, setusersignuppassword] = useState();
  const [loginemail, setloginemail] = useState();
  const [loginpassword, setloginpassword] = useState();
  const [NGOsignupname, setNGOsignupname] = useState();
  const [NGOsignupdescription, setNGOsignupdescription] = useState();
  const [NGOsignuplan, setNGOsignuplan] = useState();
  const [NGOsignuplong, setNGOsignuplong] = useState();
  const [NGOsignupemail, setNGOsignupemail] = useState();
  const [NGOsignuppassword, setNGOsignuppassword] = useState();
  const [currentUser, setcurrentUser] = useState("");
  const navigate = useNavigate();

  function submitusersignup() {}
  function submitNGOsignup() {}

  function submitlogin() {
    // navigate("/Home");
    navigate("/NgoAdmin");
  }

  return (
    <div>
      <Routes>
        <Route
          path="/"
          element={
            <LoginPage
              setusersignupusername={setusersignupusername}
              setusersignupemail={setusersignupemail}
              setusersignuppassword={setusersignuppassword}
              setloginemail={setloginemail}
              setloginpassword={setloginpassword}
              setNGOsignupname={setNGOsignupname}
              setNGOsignupdescription={setNGOsignupdescription}
              setNGOsignuplan={setNGOsignuplan}
              setNGOsignuplong={setNGOsignuplong}
              setNGOsignupemail={setNGOsignupemail}
              setNGOsignuppassword={setNGOsignuppassword}
              submitusersignup={submitusersignup}
              submitNGOsignup={submitNGOsignup}
              submitlogin={submitlogin}
            />
          }
        ></Route>
        <Route path="/Home" element={<Home />}></Route>
        <Route path="/NgoAdmin" element={<NgoAdmin />}></Route>
        <Route path="/CreatePost" element={<CreatePost />}></Route>
        <Route path="*" element={<DefaultRoute />} />
      </Routes>
    </div>
  );
}

export default App;
