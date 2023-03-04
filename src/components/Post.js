import React, { useEffect, useState } from "react";
import {
  getFirestore,
  updateDoc,
  getDoc,
  doc,
  increment,
} from "firebase/firestore";
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

  async function handleVerify(uid, amount,donationId) {
    const reference = ref(db, `campaign/${campaignid}/volunteers`);
    const userRef = doc(firestore, "mobileUsers", uid);
    const timeStamp = new Date().getTime();
    const userSnap = await getDoc(userRef)
    let userDonationsNew = []
    let user = userSnap.data()
    let userDonations = JSON.parse(user.donations)

    userDonations.forEach(donation=>{
      if(donation.donationId==donationId){
        donation.delivered = true;
        donation.deliveredOn = timeStamp
        userDonationsNew.push(donation)
      }else{
        userDonationsNew.push(donation)
      }
    })

   

    let temp = [];
    onValue(reference, (snapshot) => {
      snapshot.val().forEach((vol) => {
        temp.push(vol);
      });
    });

    const userIndex = temp.findIndex((user) => user.uid == uid && user.donationId==donationId);
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
      ] = timeStamp

      await updateDoc(ngoRef, { totalDonations: increment(amount) });
      if(userDonationsNew.length==userDonations.length){
        await updateDoc(userRef,{donations:JSON.stringify(userDonationsNew)})
      }
      

      return update(ref(db), updates);
    }
  }

  return (
    campaigndeatil !== null && (
      <div>
         <div className="titlecontainer">
        <div className="pageHeading1">Campaign Detail</div>
        <div class="triangle-down"></div>

       
       
      </div>
        <div className="postContainer">
          <div className="detailHolder">
            <h5>Title</h5>
            <small class="text-muted">{campaigndeatil.title}</small>
          </div>
          <div className="detailHolder">
            <h5>Description</h5>
            <small class="text-muted">{campaigndeatil.description}</small>
          </div>

          <div className="detailHolder">
            <h5>Duration</h5>
            <small class="text-muted">{campaigndeatil.duration} Days</small>
          </div>

          <div className="detailHolder">
            <h5>Donations</h5>
            <small class="text-muted">{campaigndeatil.amountRec}/{campaigndeatil.totalAmount} Items</small>
          </div>

          <div className="detailHolder">
            <h5 >Volunteers - </h5>
           {campaignvolunteers && campaignvolunteers.length>0?
            campaignvolunteers.map((user,index)=>(
              <div className="volHolder">
                <span>{user.name}</span>
                <span>Donated - {user.amount}</span>
                {!user.delivered && (
                      <button  onClick={() =>
                          handleVerify(user.uid, user.amount,user.donationId)
                        } type="button" className="btn btn-warning btn-sm">
                        Mark As Delivered
                      </button>
                  )}
              </div>
            ))
            :
            (<small class="text-muted">No Volunteers right Now !</small>)
           }
      
         
          </div>


          
        </div>
        
      </div>
    )
  );
}

export default Post;
