import React, { useEffect, useState } from "react";

// import "./Style/NgoAdmin.css";
import { useNavigate } from "react-router-dom";
import { getDoc, doc, collection, onSnapshot } from "firebase/firestore";
import db from "../../Firebase/config";
import Loading from "./../CommonComp/Loading";

function Guest() {
  const navigate = useNavigate();
  const [CampaignsFetched, setCampaignsFetched] = useState([]);

  useEffect(() => {
    getCampaigns();
  }, []);

  const CampaignRef = collection(db, "Campaign");
  const getCampaigns = async () => {
    onSnapshot(CampaignRef, (camps) => {
      const items = [];
      camps.forEach((data) => {
        items.push(data.data());
      });
      setCampaignsFetched(items);
    });
  };

  function handleView(Camp) {
    navigate(`/GuestDetail?${Camp}`);
  }

  return (
    <div>
      <div className="titlecontainer">
        <div className="pageHeading1">Volunteer Admin</div>
        <div class="triangle-down"></div>

        <div className="ngoAbout">
          <div>Hi,</div>
        </div>
      </div>
      <div className="donationContainer">
        <div className="donationContainerTitle">
          <div>All Campaigns</div>
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
  );
}

export default Guest;
