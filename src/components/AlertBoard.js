import React, { useEffect, useState } from "react";
import PostTemplate from "./PostTemplate";
import "./Style/AlertBoard.css";
import { useNavigate } from "react-router-dom";
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

function NgoAdmin() {
  const [listings, setlistings] = useState([]);

  // let listings = [];

  useEffect(() => {
    getListing();
    getNgoData();
  }, []);

  const db = getDatabase();
  const ngoUID = localStorage.getItem("uid");
  console.log(ngoUID);
  const navigate = useNavigate();
  function createhandle() {
    navigate("/CreatePost");
  }

  const getListing = async () => {
    const reference = ref(db, "campaign/");
    onValue(reference, (snapshot) => {
      if (snapshot.val()) {
        const values = Object.values(snapshot.val());
        values.forEach((camp, index) => {
          if (camp.ngoUID == ngoUID) {
            setlistings((oldArray) => [...oldArray, camp]);
          }
        });
      }
    });
    console.log(listings);
  };

  const [ngoemail, setngoemail] = useState();
  const [ngoname, setngoname] = useState();
  const firestore = getFirestore();
  const ngoRef = doc(firestore, "ngo", ngoUID);

  const getNgoData = async () => {
    const docSnap = await getDoc(ngoRef);
    if (docSnap.exists()) {
      const ngoDetails = docSnap.data();
      setngoemail(ngoDetails.email);
      setngoname(ngoDetails.name);
    } else {
      console.log("No such document!");
    }
  };

  return (
    <div>
      <div className="titlecontainer">
        <div className="pageHeading">Alert Board</div>
        <div className="pagengo">
          <div >{ngoname}</div>
          <div >{ngoemail}</div>
        </div>
      </div>
      <div className="donationContainer">
        <div className="donationContainerTitle">
          <div>All Donations</div>
          <button type="button" className="createButton" onClick={createhandle}>
            Create+
          </button>
        </div>
        {listings.map((element) => {
          return (
            <div key={element.campaignId}>
              <PostTemplate
                campaignId={element.campaignId}
                title={element.title}
                description={element.description}
                totalAmount={element.totalAmount}
                amountRec={element.amountRec}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default NgoAdmin;
