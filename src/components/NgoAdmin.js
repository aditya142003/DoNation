import React from "react";
import NgoPostArea from "./NgoPostArea";
import CreatePost from "./CreatePost";
import "./Style/NgoAdmin.css";

function NgoAdmin() {
  return (
    <div>
      <div className="titlecontainer">
        <div className="pageHeading">Alert Board</div>
        <div>
          <div>NGO Name</div>
          <div>ngo@gmail.com</div>
        </div>
      </div>
      <div className="donationContainer">
        <NgoPostArea />
      </div>
    </div>
  );
}

export default NgoAdmin;
