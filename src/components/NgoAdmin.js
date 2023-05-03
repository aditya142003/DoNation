import React, { useEffect, useState } from "react";
import CurrentCampaign from "./CurrentCampaign";
import "./Style/NgoAdmin.css";
import { useNavigate } from "react-router-dom";
import { getDoc, doc, collection, onSnapshot } from "firebase/firestore";
import db from "../Firebase/config";
import Loading from "./Loading";

function NgoAdmin() {
  const NgoUID = localStorage.getItem("uid");
  const navigate = useNavigate();
  const [CampaignsFetched, setCampaignsFetched] = useState([]);
  const [NgoDetails, setNgoDetails] = useState({});
  const [loading, setloading] = useState(false);

  useEffect(() => {
    getCampaigns();
    getNgoData();
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

  const NgoRef = doc(db, "NGO", NgoUID);
  const getNgoData = async () => {
    setloading(true);
    const docSnap = await getDoc(NgoRef);
    setloading(false);
    if (docSnap.exists()) {
      const ngo = docSnap.data();
      setNgoDetails(ngo);
    } else {
      console.log("No such Ngo!");
    }
  };

  function createhandle() {
    navigate("/CreateCampaign");
  }

  return !loading ? (
    <div>
      <div className="titlecontainer">
        <div className="pageHeading1">NGO Admin</div>
        <div class="triangle-down"></div>

        <div className="ngoAbout">
          <div>Hi,{NgoDetails.name}</div>
          <div>{NgoDetails.email}</div>
        </div>
      </div>
      <div className="donationContainer">
        <div className="donationContainerTitle">
          <div>All Campaigns</div>
          <button type="button" class="btn btn-warning" onClick={createhandle}>
            Create New +
          </button>
        </div>
        {CampaignsFetched.map((element) => {
          return (
            <CurrentCampaign
              campaignId={element.uid}
              title={element.title}
              description={element.description}
              totalAmount={element.quantity}
              amountRec={element.received}
            />
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

export default NgoAdmin;
