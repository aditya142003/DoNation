import React, { useState, useEffect } from "react";
import "./Style/CreatePost.css";
import { useNavigate } from "react-router-dom";
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
import { getFirestore, updateDoc, getDoc, doc } from "firebase/firestore";
import { async } from "@firebase/util";

function CreatePost() {
  useEffect(() => {
    getNgoData();
  }, []);
  const [createTitle, setcreateTitle] = useState();
  const [createDescription, setcreateDescription] = useState();
  const [createTotalAmount, setcreateTotalAmount] = useState();
  const [TimeDuration, setTimeDuration] = useState();

  const navigate = useNavigate();
  const db = getDatabase();
  const ngoUID = localStorage.getItem("uid");
  const firestore = getFirestore();

  const ngoRef = doc(firestore, "ngo", ngoUID);

  async function handlecross() {
    navigate(-1);
  }

  async function submit(e) {
    e.preventDefault();
    const id = `${ngoUID}_${new Date().getTime()}`;
    let campaignSchema = {
      volunteers: [],
      createdAt: new Date().getTime(),
      updatedAt: new Date().getTime(),
      ngoUID: ngoUID,
      campaignId: id,
      title: createTitle,
      description: createDescription,
      totalAmount: createTotalAmount,
      amountRec: 0,
      duration: TimeDuration,
    };

 
    const reference = ref(db, "campaign/" + `${id}`);
    set(reference, campaignSchema).then(async (res) => {
      const temp = {
        title: campaignSchema.title,
        description: campaignSchema.description,
        totalAmount: campaignSchema.totalAmount,
        campaignId: campaignSchema.campaignId,
      };

      const docSnap = await getDoc(ngoRef);
      if (docSnap.exists()) {
        const ngoDetails = docSnap.data();
        let camp = ngoDetails.campaigns;
        camp.push(temp);
        await updateDoc(ngoRef, {
          campaigns: camp,
        });
      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
      }
    });
  }

  const [ngoemail, setngoemail] = useState();
  const [ngoname, setngoname] = useState();
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
      <div className="createPosttitlecontainer">
        <div className="createPostpageHeading">Alert Board</div>
        <div>
          <div>{ngoname}</div>
          <div>{ngoemail}</div>
        </div>
      </div>
      <div className="createPostdonationContainer">
        <div
          style={{ position: "relative", left: "98%", cursor: "pointer" }}
          onClick={handlecross}
        >
          X
        </div>
        <div className="createPostMainContainer">
          <div className="createPostformContainer">
            <form action="#">
              <div className="createPostformHeading">Create Post</div>
              <div style={{ display: "flex" }}>
                <div>
                  <div className="createPostformFields">
                    <div>Title</div>
                    <input
                      type="text"
                      spellCheck="false"
                      onInputCapture={(e) => setcreateTitle(e.target.value)}
                    ></input>
                  </div>
                  <div className="createPostformFields">
                    <div>Description</div>
                    <input
                      type="text"
                      onInputCapture={(e) =>
                        setcreateDescription(e.target.value)
                      }
                    ></input>
                  </div>
                  <div className="createPostformFields">
                    <div>Total Amount</div>
                    <input
                      type="number"
                      onInputCapture={(e) =>
                        setcreateTotalAmount(e.target.value)
                      }
                    ></input>
                  </div>
                  <div className="createPostformFields">
                    <div>Duration (Days)</div>
                    <input
                      type="number"
                      onInputCapture={(e) => setTimeDuration(e.target.value)}
                    ></input>
                  </div>
                </div>
              </div>
              <div className="createPostformFields">
                <button onClick={submit} className="submit">
                  SUBMIT
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreatePost;
