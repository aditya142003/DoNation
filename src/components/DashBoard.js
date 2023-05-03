import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getDoc, doc, collection } from "firebase/firestore";
import "./Style/DashBoard.css";
import Loading from "./Loading";
import db from "../Firebase/config";

function DashBoard() {
  useEffect(() => {
    getNgoData();
    // getCampaignData();
  }, []);

  const navigate = useNavigate();
  const NgoUID = localStorage.getItem("uid");

  const [NgoDetails, setNgoDetails] = useState({});
  const [CampaignDetails, setCampaignDetails] = useState([]);
  const [loading, setloading] = useState(false);

  const NgoRef = doc(db, "NGO", NgoUID);
  const getNgoData = async () => {
    setloading(true);
    const docSnap = await getDoc(NgoRef);
    if (docSnap.exists()) {
      const ngo = docSnap.data();
      setNgoDetails(ngo);
      setloading(false);
    } else {
      console.log("No such Ngo!");
    }
  };

  

  function Taphandle() {
    navigate("/NgoAdmin");
  }

  function logout() {
    localStorage.setItem("loggedIn", false);
    localStorage.setItem("uid", null);
    navigate("/");
  }

  function handleClick() {
    navigate("/AlertBoard");
  }

  return !loading ? (
    <div>
      <div className="titlecontainer">
        <div className="pageHeading1">Dash Board</div>
        <div class="triangle-down"></div>

        <div className="headerRightHolder">
          <div className="ngoAbout">
            <div>Hi,{NgoDetails.name}</div>
            <div>{NgoDetails.email}</div>
          </div>
          <button onClick={logout} type="button" class="btn btn-warning">
            Logout
          </button>
        </div>
      </div>
      <div className="AdminBoxesContainer">
        <div className="AdminBoxes">
          <h3 className="heading">Total Campaigns</h3>
          <h4 className="data">{CampaignDetails.length}</h4>
        </div>
        <div className="AdminBoxes">
          <h3 className="heading">Total Donations</h3>
          <h4 className="data">Null</h4>
        </div>
        <div className="AdminBoxes">
          <h3 className="heading">NGO Admin</h3>
          <button className="Veriftbtn" onClick={Taphandle}>
            Tap to view
          </button>
        </div>
      </div>
      <div className="recentMainContainer">
        <div className="recentContainer">
          <div className="recentContainerTitle">
            <h3 className="heading">Recent Activity</h3>
          </div>
          <div className="col-md-4 ">
            {/* {CampaignDetails?.map((element) => {
              return (
                <div className="userTemplateContainer">
                  <div className="userTemplate">
                    <h5>
                      {element.name} donated {element.amount} !
                    </h5>
                    <small className="text-muted">
                      Campaign - {element.campaign.title}
                    </small>
                    {!element.delivered && (
                      <button
                        onClick={handleClick}
                        type="button"
                        className="btn btn-warning"
                      >
                        Mark As Delivered
                      </button>
                    )}
                  </div>
                </div>
              );
            })} */}
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div className="loaderContainer">
      <Loading />
      <h3>Loading....</h3>
    </div>
  );
}

export default DashBoard;
