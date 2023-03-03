import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getFirestore, updateDoc, getDoc, doc } from "firebase/firestore";
import RecentActivity from "./RecentActivity.js";
import "./Style/NgoAdmin.css";

function NgoAdmin() {
  useEffect(() => {
    getNgoData();
  }, []);

  const navigate = useNavigate();
  const ngoUID = localStorage.getItem("uid");

  const [ngoemail, setngoemail] = useState();
  const [ngoname, setngoname] = useState();
  const [ngoCampaigns, setngoCampaigns] = useState(0);

  const firestore = getFirestore();
  const ngoRef = doc(firestore, "ngo", ngoUID);

  const getNgoData = async () => {
    const docSnap = await getDoc(ngoRef);
    if (docSnap.exists()) {
      const ngoDetails = docSnap.data();
      setngoemail(ngoDetails.email);
      setngoname(ngoDetails.name);
      setngoCampaigns(ngoDetails.campaigns);
      console.log(ngoDetails);
      // console.log(ngoCampaigns.length);
    } else {
      console.log("No such document!");
    }
  };

  function Taphandle() {
    navigate("/AlertBoard");
  }
  function acceptHandle() {
    navigate("/AcceptBoard");
  }
  function logout() {
    localStorage.setItem("loggedIn", false);
    localStorage.setItem("uid", null);
    navigate("/");
  }

  return (
    <div>
      <div className="titlecontainer">
        <div className="pageHeading">Alert Board</div>
        <div>
          <button onClick={logout}>Logout</button>
        </div>
        <div>
          <div>{ngoname}</div>
          <div>{ngoemail}</div>
        </div>
      </div>
      <div className="AdminBoxesContainer">
        <div className="AdminBoxes">
          <div>Total Campaigns</div>
          <div>{ngoCampaigns.length}</div>
        </div>
        <div className="AdminBoxes">
          <div>Pending Acceptation</div>
          <a onClick={acceptHandle}>Tap to view</a>
        </div>
        <div className="AdminBoxes">
          <div>Alert Board</div>
          <a onClick={Taphandle}>Tap to view</a>
        </div>
      </div>
      <div className="recentMainContainer">
        <div className="recentContainer">
          <div className="recentContainerTitle">
            <div>Recent Activity</div>
          </div>
          <div className="col-md-4 ">
            <RecentActivity />
          </div>
          <div className="col-md-4 ">
            <RecentActivity />
          </div>
          <div className="col-md-4 ">
            <RecentActivity />
          </div>
        </div>
        <div className="optionsContainer">
          <b>More</b>
          <div>Edit Profile</div>
          <div>Setting</div>
          <div>Inbox</div>
        </div>
      </div>
    </div>
  );
}

export default NgoAdmin;
