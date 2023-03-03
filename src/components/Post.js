import React, { useEffect, useState } from "react";
import { getFirestore, updateDoc, getDoc, doc, increment } from "firebase/firestore";
import "./Style/Post.css";

import {
  getDatabase,
  ref,
  onValue,
  child,
  push,
  update,
} from "firebase/database";

function Post() {
  const [campaigndeatil, setcampaigndeatil] = useState(null);
  const [campaignvolunteers, setcampaignvolunteers] = useState([]);

  const ngoUID = localStorage.getItem("uid");
  const firestore = getFirestore();
  const ngoRef = doc(firestore, "ngo", ngoUID);

  useEffect(() => {
    getNgoData();
  }, []);

  const campaignid = window.location.search.split("?")[1];
  const db = getDatabase();

  const getNgoData = async () => {
    const reference = ref(db, `campaign/${campaignid}`);
    onValue(reference, (snapshot) => {
      setcampaigndeatil(snapshot.val());
      if (snapshot.val().volunteers) {
        console.warn(snapshot.val().volunteers);
        setcampaignvolunteers(snapshot.val().volunteers);
      }
    });
  };

  async function handleVerify(uid, amount) {
    const reference = ref(db, `campaign/${campaignid}/volunteers`);



    let temp = [];
    onValue(reference, (snapshot) => {
      snapshot.val().forEach((vol) => {
        temp.push(vol);
      });
    });

    const userIndex = temp.findIndex((user) => user.uid == uid);
    if (userIndex !== -1) {
      const updates = {};
      updates["/campaign/" + campaignid + "/amountRec"] = parseInt(
        parseInt(campaigndeatil.amountRec) + parseInt(amount)
      );
      updates[
        "/campaign/" + campaignid + "/volunteers/" + userIndex + "/delivered"
      ] = true;
      updates[
        "/campaign/" + campaignid + "/volunteers/" + userIndex + "/deliveredOn"
      ] = new Date().getTime();

      await updateDoc(ngoRef,{totalDonations:increment(amount)})

      return update(ref(db), updates);
    }



  }

  return (
    campaigndeatil !== null && (
      <div className="campaing">
        <div>
          <div className="Campaing1">{campaigndeatil.title}</div>
          <div className="Donate">
            <div className="CampaingD">{campaigndeatil.description}</div>
            <div className="Duration">{campaigndeatil.duration}</div>
            <div className="amount">{campaigndeatil.totalAmount}</div>
          </div>
          <div className="infom">
            <div>{campaigndeatil.amountRec}</div>
            <h2 className="Volunteer">Volunteer Info</h2>
            {campaignvolunteers?.map((element) => {
              return (
                <div className="Info" key={element.uid}>
                  <div>{element.name}</div>
                  <div>{element.email}</div>
                  <div>{element.amount}</div>
                  {!element.delivered && (
                    <button
                      onClick={() => handleVerify(element.uid, element.amount)}
                    >
                      Verify
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    )
  );
}

export default Post;
