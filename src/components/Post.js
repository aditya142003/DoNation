import React, { useEffect, useState } from "react";
import { getFirestore, updateDoc, getDoc, doc } from "firebase/firestore";
import "./Style/Post.css"

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
      <div className="campaing">
        <div className="Campaing1">{campaigntitle}</div>
        <div className="Donate">
        <div className="CampaingD" >{campaigndescription}</div>
        <div className="Duration">{campaignduration}</div>
        <div className="amount">{campaigntotalamount}</div>
        </div>
        <div className="infom">
        <h2 className="Volunteer">Volunteer Info</h2>
        {campaignvolunteers.map((element) => {
          return (
            <div  className="Info" key={element.uid}>
              <div>{element.name}</div>
              <div>{element.email}</div>
              <div>{element.amount}</div>
            </div>
          );
        })}
        </div>
      </div>
    </div>
  );
}

export default Post;
