import React, { useEffect, useState } from "react";
import { getFirestore, updateDoc, getDoc, doc } from "firebase/firestore";

import {
  getDatabase,
  ref,
  onValue,
  set,
  orderByValue,
  orderByChild,
  orderByKey,
  orderByPriority,
  child,
  remove,
} from "firebase/database";

function Post() {
  const [campaigndeatil, setcampaigndeatil] = useState(null);
  const [campaigntitle, setcampaigntitle] = useState(null);
  const [campaigndescription, setcampaigndescription] = useState(null);
  const [campaignduration, setcampaignduration] = useState(null);
  const [campaigntotalamount, setcampaigntotalamount] = useState(null);
  const [campaignvolunteers, setcampaignvolunteers] = useState([]);
  const db = getDatabase();
  useEffect(() => {
    getNgoData();
  }, []);

  const campaignid = window.location.search.split("?")[1];

  const getNgoData = async () => {
    const reference = ref(db, `campaign/${campaignid}`);
    onValue(reference, (snapshot) => {
      setcampaigndeatil(snapshot.val());
      setcampaigntitle(snapshot.val().title);
      setcampaigndescription(snapshot.val().description);
      setcampaignduration(snapshot.val().duration);
      setcampaigntotalamount(snapshot.val().totalAmount);
      const values = Object.values(snapshot.val().volunteers);
      values.forEach((uid, index) => {
        setcampaignvolunteers((oldArray) => [...oldArray, uid]);
      });
    });
  };
  console.log(campaignvolunteers);

  return (
    <div>
      <div>
        <div>{campaigntitle}</div>
        <div>{campaigndescription}</div>
        <div>{campaignduration}</div>
        <div>{campaigntotalamount}</div>
        <h2>Volunteer Info</h2>
        {campaignvolunteers.map((element) => {
          return (
            <div key={element.uid}>
              <div>{element.name}</div>
              <div>{element.email}</div>
              <div>{element.amount}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Post;
