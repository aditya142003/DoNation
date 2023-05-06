import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  getFirestore,
  getDoc,
  doc,
  collection,
  onSnapshot,
  setDoc,
} from "firebase/firestore";
import db from "../../Firebase/config";

function VolunteerProfile() {
  useEffect(() => {
    getVolunteer();
    getDonation();
  }, []);

  const navigate = useNavigate();
  const volunteerId = window.location.search.split("?")[1];

  const [volunteerDetail, setvolunteerDetail] = useState([]);
  const [campaignNumber, setcampaignNumber] = useState([]);
  const [DonationFetched, setDonationFetched] = useState([]);
  const [totalDonation, settotalDonation] = useState([]);

  const VolRef = doc(db, "Volunteer", volunteerId);
  const getVolunteer = async () => {
    const docSnap = await getDoc(VolRef);
    if (docSnap.exists()) {
      const vol = docSnap.data();
      setvolunteerDetail(vol);
    } else {
      console.log("No such Volunteer!");
    }
  };

  const DonationRef = collection(db, "Donation");
  const getDonation = async () => {
    onSnapshot(DonationRef, (Don) => {
      const items = [];
      let totalD = 0;
      let count = 0;
      Don.forEach((data) => {
        if (
          data.data().volunteerId == volunteerId &&
          data.data().confirmation == true
        ) {
          // console.log(data.data().volunteerId )
          items.push(data.data());
          totalD = totalD + data.data().amount;
          count++;
        }
      });
      settotalDonation(totalD);
      setDonationFetched(items);
      setcampaignNumber(count);
    });
  };

  //   const DonationRef = collection(db, "Donation");
  //   const VolunteerRef = collection(db, "Volunteer");
  //   const getDonation = async () => {
  //     onSnapshot(DonationRef, (Donation) => {
  //       const items = [];
  //       Donation.forEach((data) => {
  //         if (data.data().NgoId == NgoUID) {
  //           items.push(data.data());
  //         }

  //         onSnapshot(VolunteerRef, (Volunteer) => {
  //           const items2 = [];
  //           Volunteer.forEach((e) => {
  //             items.map((ele) => {
  //               if (ele.volunteerId == e.data().uid) {
  //                 items2.push(e.data());
  //               }
  //             });
  //           });
  //           setvolunteerFetched(items2);
  //         });
  //         setdonationFetched(items);
  //       });
  //     });
  //   };

  //   function Taphandle() {
  //     navigate("/NgoAdmin");
  //   }

    function handleDetail(Camp) {
      navigate(`/NgoCampaignDetail?${Camp}`);
    }

  function logout() {
    localStorage.setItem("loggedIn", false);
    localStorage.setItem("uid", null);
    navigate("/");
  }

  return (
    <div>
      <div className="titlecontainer">
        <div className="pageHeading1">Profile</div>
        <div class="triangle-down"></div>

        <div className="headerRightHolder">
          <div className="ngoAbout">
            <div>Hi,{volunteerDetail.name}</div>
            <div>{volunteerDetail.email}</div>
          </div>
          <button onClick={logout} type="button" class="btn btn-warning">
            Logout
          </button>
        </div>
      </div>
      <div className="AdminBoxesContainer">
        <div className="AdminBoxes">
          <h3 className="heading">Number of Campaign Donated</h3>
          <h4 className="data">{campaignNumber}</h4>
        </div>
        <div className="AdminBoxes">
          <h3 className="heading">Total Amount Donated</h3>
          <h4 className="data">{totalDonation}</h4>
        </div>
      </div>
      <div className="recentMainContainer">
        <div className="recentContainer">
          <div className="recentContainerTitle">
            <h3 className="heading">Recent Activity</h3>
          </div>
          {DonationFetched.map((donations) => {
            return (
              <div>
                <div>{donations.campaigntitle}</div>
                <div>{donations.volname}</div>
                <div>{donations.amount}</div>
                <div>
                  <button
                    onClick={(event) =>
                      handleDetail(donations.campaignId, event)
                    }
                  >
                    Detail
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default VolunteerProfile;
