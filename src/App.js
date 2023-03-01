import "./App.css";
import React, { useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import axios from "axios";
import LoginPage from "./components/LoginPage";
import Home from "./components/Home";
import DefaultRoute from "./components/DefaultRoute";
import Admin from './components/Admin'
import AlterBoard from "./components/AlterBoard";

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

  function submitusersignup() {
    axios({
      method: "post",
      url: "http://127.0.0.1:5000/users/signUpuser",
      data: {
        usersignupusername: usersignupusername,
        usersignupemail: usersignupemail,
        usersignuppassword: usersignuppassword,
      },
    }).then(function (response) {
      console.log(response);
    });
  }
  function submitNGOsignup() {
    axios({
      method: "post",
      url: "http://127.0.0.1:5000/users/signUpNGO",
      data: {
        NGOsignupname: NGOsignupname,
        NGOsignupdescription: NGOsignupdescription,
        NGOsignuplan: NGOsignuplan,
        NGOsignuplong: NGOsignuplong,
        NGOsignupemail: NGOsignupemail,
        NGOsignuppassword: NGOsignuppassword,
      },
    }).then(function (response) {
      console.log(response);
    });
  }

  function submitlogin() {
    navigate("/Home");
    axios({
      method: "post",
      url: "http://127.0.0.1:5000/users/logIn",
      data: {
        loginemail: loginemail,
        loginpassword: loginpassword,
      },
    }).then((res) => {
      console.log(res.data.currentUser);
      setcurrentUser(res.data.currentUser);

      // {
      //   res.data.currentUser && navigate("/Home");
      // }
    });
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
        <Route path="/Admin" element={<Admin />}></Route>
        {/* { currentUser && <Route path="/Home" element={<Home />}></Route>} */}
        <Route path="*" element={<DefaultRoute />} />
      </Routes>
    </div>
  );
}

export default App;
