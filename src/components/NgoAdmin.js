import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getFirestore, updateDoc, getDoc, doc } from "firebase/firestore";
import "./Style/NgoAdmin.css";
import Loading from "./Loading";
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
  const db = getDatabase();
  useEffect(() => {
    getNgoData();
    getListing();
  }, []);

  const navigate = useNavigate();
  const ngoUID = localStorage.getItem("uid");

  const [ngoemail, setngoemail] = useState();
  const [ngoname, setngoname] = useState();
  const [ngoCampaigns, setngoCampaigns] = useState(0);
  const [listings, setlistings] = useState([]);
  const [totaldonation, settotaldonation] = useState([]);
  const [loading, setloading] = useState(false);


  const firestore = getFirestore();
  const ngoRef = doc(firestore, "ngo", ngoUID);

  const getNgoData = async () => {
    setloading(true);
    const docSnap = await getDoc(ngoRef);
    if (docSnap.exists()) {
      const ngoDetails = docSnap.data();
      setngoemail(ngoDetails.email);
      setngoname(ngoDetails.name);
      setngoCampaigns(ngoDetails.campaigns);
      settotaldonation(ngoDetails.totalDonations);
      console.log(ngoDetails);
      setloading(false);
      // console.log(ngoCampaigns.length);
    } else {
      console.log("No such document!");
    }
  };

  function Taphandle() {
    navigate("/AlertBoard");
  }
  function acceptHandle() {
    navigate("/AcceptBoard");
  }
  function logout() {
    localStorage.setItem("loggedIn", false);
    localStorage.setItem("uid", null);
    navigate("/");
  }

  const getListing = async () => {
    let temp = [];
    let donations = 0;
    const reference = ref(db, "campaign/");
    onValue(reference, (snapshot) => {
      if (snapshot.val()) {
        const values = Object.values(snapshot.val());
        values.forEach((camp, index) => {
          if (camp.ngoUID == ngoUID) {
            if (camp.volunteers) {
              // if (camp.volunteers.deliverd) {
              camp.volunteers.forEach((vol) => {
                vol.campaign = camp;
                temp.push(vol);
              });
              // }
            }
          }
        });
      }
      setlistings(temp);
    });
  };
  console.log(listings);
  function handleClick() {
    navigate("/AlertBoard");
  }
  return (
    !loading?
    <div>
      <div className="titlecontainer">
        <div className="pageHeading1">NGO Admin</div>
        <div class="triangle-down"></div>
       
       <div className="headerRightHolder">

       <div className="ngoAbout">
          <div>Hi,{ngoname}</div>
          <div>{ngoemail}</div>
        </div>
        <button onClick={logout} type="button" class="btn btn-warning">Logout</button>
       </div>

      </div>
      <div className="AdminBoxesContainer">
        <div className="AdminBoxes">
          <h3 className="heading">Total Campaigns</h3>
          <h4  className="data">{ngoCampaigns.length}</h4>
        </div>
        <div className="AdminBoxes">
          <h3 className="heading">Total Donations</h3>
          <h4 className="data">{totaldonation}</h4>
        </div>
        <div className="AdminBoxes">
          <h3 className="heading">NGO Admin</h3>
          <button className="Veriftbtn" onClick={Taphandle}>
            Tap to view
          </button>
        </div>
      </div>
      <div className="recentMainContainer">
        <div className="recentContainer">
          <div className="recentContainerTitle">
            <h3 className="heading">Recent Activity</h3>
          </div>
          <div className="col-md-4 ">
            {listings?.map((element) => {
              return (
                <div className="userTemplateContainer">
                  <div className="userTemplate">
                    <h5>{element.name} donated {element.amount} !</h5>
                    <small className="text-muted">Campaign - {element.campaign.title}</small>
                    {!element.delivered && (
                      <button onClick={handleClick} type="button" className="btn btn-warning">
                        Mark As Delivered
                      </button>
                  )}
                  </div>
                  
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
    :
    <div className="loaderContainer">
        <Loading/>
        <h3>Loading....</h3>
    </div>
   
  );
}

export default NgoAdmin;
