import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getFirestore, updateDoc, getDoc, doc } from "firebase/firestore";
import "./Style/NgoAdmin.css";
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

  const firestore = getFirestore();
  const ngoRef = doc(firestore, "ngo", ngoUID);

  const getNgoData = async () => {
    const docSnap = await getDoc(ngoRef);
    if (docSnap.exists()) {
      const ngoDetails = docSnap.data();
      setngoemail(ngoDetails.email);
      setngoname(ngoDetails.name);
      setngoCampaigns(ngoDetails.campaigns);
      console.log(ngoDetails);
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
    const reference = ref(db, "campaign/");
    onValue(reference, (snapshot) => {
      if (snapshot.val()) {
        const values = Object.values(snapshot.val());
        values.forEach((camp, index) => {
          if (camp.ngoUID == ngoUID) {
            if (camp.volunteers) {
              // if (camp.volunteers.deliverd) {
              camp.volunteers.forEach((vol) => {
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
    <div>
      <div className="titlecontainer">
        <div className="pageHeading1">NGO Admin</div>
        {/* <div>
          <button onClick={logout}>Logout</button>
        </div> */}
        <div className="NgoData"> 
          <div className="ngoname">{ngoname}</div>
          <div className="ngoemail">{ngoemail}</div>
        </div>
      </div>
      <div className="AdminBoxesContainer">
        <div className="AdminBoxes">
          <div>Total Campaigns</div>
          <div>{ngoCampaigns.length}</div>
        </div>
        <div className="AdminBoxes">
          <a>Tap to view</a>
        </div>
        <div className="AdminBoxes">
          <div>NGO Admin</div>
          <a onClick={Taphandle}>Tap to view</a>
        </div>
      </div>
      <div className="recentMainContainer">
        <div className="recentContainer">
          <div className="recentContainerTitle">
            <div>Recent Activity</div>
          </div>
          <div className="col-md-4 ">
            {listings?.map((element) => {
              return (
              <div className="intro1">
                <div key={element.uid} className="intro">
                  <div>{element.name}</div>
                  <div>{element.email}</div>
                  <div>{element.amount}</div>
                  </div>
                  {element.delivered && (
                    <div className="Verify">
                    <button onClick={handleClick} className="Veriftbtn">Verify</button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
        <div className="optionsContainer">
          <b>More</b>
          <div>Edit Profile</div>
          <div>Setting</div>
          <div>Inbox</div>
          <div>
          <button onClick={logout} className="logoutbtn">Logout</button>
        </div>
        </div>
      </div>
    </div>
  );
}

export default NgoAdmin;
