import React from "react";
import PostOverviewTemplate from "./PostOverviewTemplate";
import "./Style/NgoPostArea.css";
import { useNavigate } from "react-router-dom";

function NgoPostArea() {
  const navigate = useNavigate();
  function createhandle(){
    navigate("/CreatePost")
  }
  return (
    <div>
      <div className="donationContainerTitle">
        <div>All Donations</div>
        <button className="createButton" onClick={createhandle}>Create+</button>
      </div>
      <div>
        <PostOverviewTemplate />
        <PostOverviewTemplate />
        <PostOverviewTemplate />
        <PostOverviewTemplate />
      </div>
    </div>
  );
}

export default NgoPostArea;
