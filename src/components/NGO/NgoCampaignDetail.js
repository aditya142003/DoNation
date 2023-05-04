import "./Style/CampaignDetail.css";

import React, { useEffect, useState } from "react";
import {
  getFirestore,
  getDoc,
  doc,
  collection,
  onSnapshot,
  setDoc,
} from "firebase/firestore";
import db from "../../Firebase/config";

function Post() {
  const [campaigndeatil, setcampaigndeatil] = useState(null);
  const [donationFetched, setdonationFetched] = useState([]);
  const [volunteerFetched, setvolunteerFetched] = useState([]);
  const [donatorDetails, setdonatorDetails] = useState([]);

  const ngoUID = localStorage.getItem("uid");
  const firestore = getFirestore();
  const ngoRef = doc(firestore, "ngo", ngoUID);

  useEffect(() => {
    getNgoData();
    getDonation();
  }, []);

  useEffect(() => {
    rerender();
  }, [volunteerFetched]);

  const campaignid = window.location.search.split("?")[1];
  const CampaignRef = doc(db, "Campaign", campaignid);
  const getNgoData = async () => {
    const docSnap = await getDoc(CampaignRef);
    if (docSnap.exists()) {
      const Campaign = docSnap.data();
      setcampaigndeatil(Campaign);
    } else {
      console.log("No such Campaign!");
    }
  };

  const DonationRef = collection(db, "Donation");
  const VolunteerRef = collection(db, "Volunteer");
  const getDonation = async () => {
    onSnapshot(DonationRef, (Donation) => {
      const items = [];
      Donation.forEach((data) => {
        items.push(data.data());

        onSnapshot(VolunteerRef, (Volunteer) => {
          const items2 = [];
          Volunteer.forEach((e) => {
            if (data.data().volunteerId == e.data().uid) {
              items2.push(e.data());
            }
          });
          setvolunteerFetched(items2);
        });
        setdonationFetched(items);
      });
    });
  };
  let donobject = { name: "", uid: "", amount: 0, confirmation: false };
  let donarr = [];
  function rerender() {
    donationFetched.map((don) => {
      volunteerFetched.map((vol) => {
        if (don.volunteerId == vol.uid) {
          console.log(vol.name);
          donobject = {
            name: vol.name,
            uid: don.uid,
            amount: don.amount,
            confirmation: don.confirmation,
          };
          donarr.push(donobject);
        }
      });
    });
    setdonatorDetails(donarr);
  }

  function handleConfirm(don_uid, don_amount) {
    const volRef = doc(db, "Donation", `${don_uid}`);
    const capmRef = doc(db, "Campaign", `${campaigndeatil.uid}`);
    console.log(don_uid);
    setDoc(volRef, { confirmation: true }, { merge: true })
      .then(alert("updated"))
      .catch((err) => {
        console.log(err);
      }).then(
        setDoc(capmRef, { received: don_amount}, { merge: true })
      )
    alert("done");
  }

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

          <div className="detailHolder">
            <h5>Volunteers -</h5>
            {donatorDetails.map((e) => (
              <div>
                <div>{e.name}</div>
                <div>{e.amount}</div>
                {e.confirmation ? (
                  <></>
                ) : (
                  <button onClick={(event) => handleConfirm(e.uid,e.amount, event)}>
                    Confirm
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  );
}

export default Post;
