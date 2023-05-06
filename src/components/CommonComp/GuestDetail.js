// import "./Style/CampaignDetail.css";

import React, { useEffect, useState } from "react";
import { getFirestore, getDoc, doc, setDoc } from "firebase/firestore";
import db from "../../Firebase/config";
import { uid } from "uid";

function GuestDetail() {
  const [campaigndeatil, setcampaigndeatil] = useState(null);
  const [VolunteerDetails, setVolunteerDetails] = useState(null);
  const [amount, setamount] = useState();

  const ngoUID = localStorage.getItem("uid");
  const firestore = getFirestore();
  const VolunteerID = localStorage.getItem("uid");

  useEffect(() => {
    getCampaignData();
    getVolunteerData();
  }, []);

  const campaignid = window.location.search.split("?")[1];
  const CampaignRef = doc(db, "Campaign", campaignid);
  const getCampaignData = async () => {
    const docSnap = await getDoc(CampaignRef);
    if (docSnap.exists()) {
      const Campaign = docSnap.data();
      setcampaigndeatil(Campaign);
    } else {
      console.log("No such Campaign!");
    }
  };
  console.log(campaigndeatil);

  const VolunteerRef = doc(db, "Volunteer", VolunteerID);
  const getVolunteerData = async () => {
    const docSnap = await getDoc(VolunteerRef);
    if (docSnap.exists()) {
      const ngo = docSnap.data();
      setVolunteerDetails(ngo);
    } else {
      console.log("No such Volunteer!");
    }
  };

  return (
    campaigndeatil !== null && (
      <div>
        <div className="CampaignDetailtitlecontainer">
          <div className="pageHeading1">Campaign Detail</div>
          <div class="triangle-down"></div>
        </div>
        <div className="campaignDetailContainer">
          <div className="detailHolder">
            <h5>Title</h5>
            <small class="text-muted">{campaigndeatil.title}</small>
          </div>
          <div className="detailHolder">
            <h5>Description</h5>
            <small class="text-muted">{campaigndeatil.description}</small>
          </div>

          <div className="detailHolder">
            <h5>Duration</h5>
            <small class="text-muted">{campaigndeatil.duration} Days</small>
          </div>

          <div className="detailHolder">
            <h5>Donations</h5>
            <small class="text-muted">
              {campaigndeatil.received}/{campaigndeatil.quantity} Items
            </small>
          </div>
        </div>
      </div>
    )
  );
}

export default GuestDetail;
