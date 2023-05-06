import React, { useEffect, useState } from "react";

// import "./Style/NgoAdmin.css";
import { useNavigate } from "react-router-dom";
import { getDoc, doc, collection, onSnapshot } from "firebase/firestore";
import db from "../../Firebase/config";
import Loading from "./../CommonComp/Loading";

function Home() {
  const VolunteerID = localStorage.getItem("uid");
  const navigate = useNavigate();
  const [CampaignsFetched, setCampaignsFetched] = useState([]);
  const [VolunteerDetails, setVolunteerDetails] = useState({});
  const [loading, setloading] = useState(false);

  useEffect(() => {
    getCampaigns();
    getVolunteerData();
  }, []);

  const CampaignRef = collection(db, "Campaign");
  const getCampaigns = async () => {
    setloading(true);
    onSnapshot(CampaignRef, (camps) => {
      const items = [];
      camps.forEach((data) => {
        items.push(data.data());
      });
      setCampaignsFetched(items);
      setloading(false);
    });
  };

  const VolunteerRef = doc(db, "Volunteer", VolunteerID);
  const getVolunteerData = async () => {
    setloading(true);
    const docSnap = await getDoc(VolunteerRef);
    setloading(false);
    if (docSnap.exists()) {
      const ngo = docSnap.data();
      setVolunteerDetails(ngo);
    } else {
      console.log("No such Volunteer!");
    }
  };

  function handleView(Camp) {
    navigate(`/VolunteerCampaignDetail?${Camp}`);
  }

  function handleDetail() {
    navigate(`/VolunteerProfile?${VolunteerDetails.uid}`);
  }

  return !loading ? (
    <div>
      <div className="titlecontainer">
        <div className="pageHeading1">Volunteer Admin</div>
        <div class="triangle-down"></div>

        <div className="ngoAbout">
          <div>Hi,{VolunteerDetails.name}</div>
          <div>{VolunteerDetails.email}</div>
        </div>
      </div>
      <div className="donationContainer">
        <div className="donationContainerTitle">
          <div>All Campaigns</div>
          <button type="button" class="btn btn-warning" onClick={handleDetail}>
            Your Profile
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

export default Home;
