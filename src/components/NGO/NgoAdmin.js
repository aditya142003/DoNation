import "./Style/NgoAdmin.css";

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getDoc, doc, collection, onSnapshot } from "firebase/firestore";

import db from "../../Firebase/config";
import Loading from "../CommonComp/Loading";

function NgoAdmin() {
  const NgoUID = localStorage.getItem("uid");
  const navigate = useNavigate();

  const [CampaignsFetched, setCampaignsFetched] = useState([]);
  const [NgoDetails, setNgoDetails] = useState({});
  const [loading, setloading] = useState(false);

  useEffect(() => {
    getCampaigns();
    getNgoData();
  }, []);

  const CampaignRef = collection(db, "Campaign");
  const getCampaigns = async () => {
    setloading(true);
    onSnapshot(CampaignRef, (camps) => {
      const items = [];
      camps.forEach((data) => {
        if (data.data().NgoId===NgoUID) {
          items.push(data.data());
        }
      });
      setCampaignsFetched(items);
      setloading(false);
    });
  };

  const NgoRef = doc(db, "NGO", NgoUID);
  const getNgoData = async () => {
    setloading(true);
    const docSnap = await getDoc(NgoRef);
    setloading(false);
    if (docSnap.exists()) {
      const ngo = docSnap.data();
      setNgoDetails(ngo);
    } else {
      console.log("No such Ngo!");
    }
  };

  function createhandle() {
    navigate("/CreateCampaign");
  }

  function handleView(Camp) {
    navigate(`/NgoCampaignDetail?${Camp}`);
  }

  return !loading ? (
    <div>
      <div className="titlecontainer">
        <div className="pageHeading1">NGO Admin</div>
        <div class="triangle-down"></div>

        <div className="ngoAbout">
          <b>{NgoDetails.name}</b>
          <b>{NgoDetails.email}</b>
        </div>
      </div>
      <div className="donationContainer">
        <div className="donationContainerTitle">
          <div>All Campaigns</div>
          <button type="button" class="btn btn-warning" onClick={createhandle}>
            Create New +
          </button>
        </div>
        {CampaignsFetched.map((e) => {
          return (
            <div key={e.campaignid} className="CurrentCampaignContainer">
              <div className="CurrentCampaign">
                <b>{e.title}</b>
                <small class="text-muted textoverflow">{e.description}</small>
                <div>
                  {e.received} / {e.quantity}
                </div>

                <div class="progress">
                  <div
                    className="progress-bar"
                    role="progressbar"
                    style={{
                      width: `${(e.received / e.quantity) * 100}%`,
                      backgroundColor: "#f3c222",
                    }}
                    aria-valuenow={`${(e.received / e.quantity) * 100}`}
                    aria-valuemin="0"
                    aria-valuemax="100"
                  ></div>
                </div>
              </div>
              <div>
                <div>
                  <button
                    type="button"
                    class="btn btn-outline-dark"
                    onClick={(event) => handleView(e.uid, event)}
                  >
                    View Details
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  ) : (
    <div className="loaderContainer">
      <Loading />
      <h3>Loading....</h3>
    </div>
  );
}

export default NgoAdmin;
