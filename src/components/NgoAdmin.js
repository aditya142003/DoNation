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
  const [totaldonation, settotaldonation] = useState([]);

  const firestore = getFirestore();
  const ngoRef = doc(firestore, "ngo", ngoUID);

  const getNgoData = async () => {
    const docSnap = await getDoc(ngoRef);
    if (docSnap.exists()) {
      const ngoDetails = docSnap.data();
      setngoemail(ngoDetails.email);
      setngoname(ngoDetails.name);
      setngoCampaigns(ngoDetails.campaigns);
      settotaldonation(ngoDetails.totalDonations);
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
        <div className="pageHeading">NGO Admin</div>
        <div className="pagengo">
          <div>{ngoname}</div>
          <div>{ngoemail}</div>
        </div>
      </div>
      <div className="AdminBoxesContainer">
        <div className="AdminBoxes">
          <div>Total Campaigns</div>
          <div>{ngoCampaigns.length}</div>
        </div>
        <div className="AdminBoxes">
          <div>Total Donations</div>
          <div>{totaldonation}</div>
        </div>
        <div className="AdminBoxes">
          <div>NGO Admin</div>
          <button className="Veriftbtn" onClick={Taphandle}>
            Tap to view
          </button>
        </div>
      </div>
      <div className="recentMainContainer">
        <div className="recentContainer">
          <div className="recentContainerTitle">
            <b>Recent Activity</b>
          </div>
          <div className="col-md-4 ">
            {listings?.map((element) => {
              return (
                <div className="userTemplateContainer">
                  <div className="userTemplate">
                    <div>{element.name}</div>
                    <p className="textoverflow">{element.email}</p>
                  </div>
                  {!element.delivered && (
                    <div className="Verify">
                      <button onClick={handleClick} className="logoutbtn">
                        Verify
                      </button>
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
            <button
              onClick={logout}
              style={{ marginTop: "20px" }}
              className="logoutbtn"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NgoAdmin;
