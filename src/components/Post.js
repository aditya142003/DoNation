import React, { useEffect, useState } from "react";
import { getFirestore, updateDoc, getDoc, doc } from "firebase/firestore";

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

  function handleVerify(uid, amount) {
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

      return update(ref(db), updates);
    }
  }

  return (
    campaigndeatil !== null && (
      <div>
        <div>
          <div>{campaigndeatil.title}</div>
          <div>{campaigndeatil.description}</div>
          <div>{campaigndeatil.duration}</div>
          <div>{campaigndeatil.totalAmount}</div>
          <div>{campaigndeatil.amountRec}</div>
          <h2>Volunteer Info</h2>
          {campaignvolunteers?.map((element) => {
            return (
              <div key={element.uid}>
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
    )
  );
}

export default Post;