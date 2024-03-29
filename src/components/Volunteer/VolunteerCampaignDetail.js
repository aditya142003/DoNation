// import "./Style/CampaignDetail.css";

import React, { useEffect, useState } from "react";
import {
  getFirestore,
  getDoc,
  doc,
  setDoc,
  collection,
  onSnapshot,
} from "firebase/firestore";
import db from "../../Firebase/config";
import { uid } from "uid";

function Post() {
  const [campaigndeatil, setcampaigndeatil] = useState(null);
  const [VolunteerDetails, setVolunteerDetails] = useState(null);
  const [amount, setamount] = useState();
  const [currDonation, setcurrDonation] = useState(0);

  const ngoUID = localStorage.getItem("uid");
  const firestore = getFirestore();
  const VolunteerID = localStorage.getItem("uid");

  useEffect(() => {
    getCampaignData();
    getVolunteerData();
    getDonation();
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

  function handleDonation(e) {
    e.preventDefault();
    const uniqueId = uid();
    const DonationRef = doc(db, "Donation", uniqueId);
    const Donationuser = {
      uid: uniqueId,
      NgoId: campaigndeatil.NgoId,
      volunteerId: VolunteerDetails.uid,
      volname: VolunteerDetails.name,
      campaignId: campaigndeatil.uid,
      campaigntitle: campaigndeatil.title,
      amount: parseInt(amount),
      confirmation: false,
      createdAt: new Date().getTime(),
    };
    setDoc(DonationRef, Donationuser).catch((error) => {
      alert("Register", `${error}`);
      console.log(error);
    });
  }

  const DonationRef = collection(db, "Donation");
  const getDonation = async () => {
    onSnapshot(DonationRef, (Donation) => {
      Donation.forEach((data) => {
        if (
          data.data().campaignId === campaignid &&
          data.data().volunteerId === VolunteerID
        ) {
          console.log(data.data().amount);
          setcurrDonation(data.data().amount);
        }
      });
    });
  };
  console.log(currDonation);

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
          {currDonation ? (
            <h5>Your Donation: {currDonation}</h5>
          ) : (
            <div>
              <div>Enter Amount</div>
              <input
                type="number"
                onInputCapture={(e) => setamount(e.target.value)}
              ></input>
              <button
                type="button"
                class="btn btn-warning"
                onClick={handleDonation}
              >
                Donate
              </button>
            </div>
          )}
        </div>
      </div>
    )
  );
}

export default Post;
