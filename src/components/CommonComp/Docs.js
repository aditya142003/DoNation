import NavBar from "./NavBar";
import "./Style/Docs.css";
import React from "react";

function Docs() {
  return (
    <div>
      <NavBar />
      <div className="DocsContainer">
        <div className="DocSideBar">
          <div href="NGODocs">NGO</div>
          <div>Volunteer</div>
          <div>Firebase Auth</div>
          <div>Firestore Database</div>
          <div>Technologies</div>
          <div className="version">Version 2.0</div>
        </div>
        <div className="Docscontent">
          <div id="NGODocs">NGO</div>
        </div>
      </div>
    </div>
  );
}

export default Docs;
