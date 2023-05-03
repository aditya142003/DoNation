import React, { useState, useEffect } from "react";
import "./Style/CreateCampaign.css";
import { useNavigate } from "react-router-dom";
import { doc, setDoc, getDoc } from "firebase/firestore";
import db from "../Firebase/config";

function CreateCampaign() {
  useEffect(() => {
    getNgoData();
  }, []);
  const [loading, setloading] = useState(false);
  const [NgoDetails, setNgoDetails] = useState({});
  const [Campaign, setCampaign] = useState({
    title: "",
    description: "",
    Quantity: 0,
    Duration: 0,
  });

  const navigate = useNavigate();
  const NgoUID = localStorage.getItem("uid");

  async function handlecross() {
    navigate(-1);
  }

  function submit(e) {
    e.preventDefault();
    const NgoRef = doc(db, "Campaign", `${NgoUID}_${new Date().getTime()}`);
    const Ngouser = {
      uid: `${NgoUID}_${new Date().getTime()}`,
      NgoId: NgoUID,
      title: Campaign.title,
      description: Campaign.description,
      quantity: Campaign.Quantity,
      duration: Campaign.Duration,
      createdAt: new Date().getTime(),
    };
    setDoc(NgoRef, Ngouser).catch((error) => {
      alert("Register", `${error}`);
      console.log(error);
    });
    navigate(-2);
  }

  const NgoRef = doc(db, "NGO", NgoUID);
  const getNgoData = async () => {
    const docSnap = await getDoc(NgoRef);
    if (docSnap.exists()) {
      const ngo = docSnap.data();
      setNgoDetails(ngo);
    } else {
      console.log("No such Ngo!");
    }
  };
  console.log(NgoDetails);

  return (
    <div>
      <div className="titlecontainer">
        <div className="pageHeading1">New Campaign</div>
        <div class="triangle-down"></div>

        <div className="ngoAbout">
          <div>Hi,{NgoDetails.name}</div>
          <div>{NgoDetails.email}</div>
        </div>
      </div>
      <div className="CreateCampaigndonationContainer">
        <button
          onClick={handlecross}
          style={{
            position: "relative",
            left: "92%",
            top: "3%",
            cursor: "pointer",
          }}
          type="button"
          class="btn btn-outline-danger"
        >
          Close
        </button>
        <div
          className="CreateCampaignMainContainer"
          style={{ left: "119px", top: "26px" }}
        >
          <div className="CreateCampaignformContainer">
            <form action="#">
              <div style={{ display: "flex" }}>
                <div>
                  <div className="CreateCampaignformFields">
                    <h5>Title</h5>
                    <input
                      type="text"
                      spellCheck="false"
                      onInputCapture={(e) =>
                        setCampaign({ ...Campaign, title: e.target.value })
                      }
                    ></input>
                  </div>
                  <div className="CreateCampaignformFields">
                    <h5>Description</h5>
                    <input
                      type="text"
                      onInputCapture={(e) =>
                        setCampaign({
                          ...Campaign,
                          description: e.target.value,
                        })
                      }
                    ></input>
                  </div>
                  <div className="CreateCampaignformFields">
                    <h5>Total Amount</h5>
                    <input
                      type="number"
                      onInputCapture={(e) =>
                        setCampaign({ ...Campaign, Quantity: e.target.value })
                      }
                    ></input>
                  </div>
                  <div className="CreateCampaignformFields">
                    <h5>Duration (Days)</h5>
                    <input
                      type="number"
                      onInputCapture={(e) =>
                        setCampaign({ ...Campaign, Duration: e.target.value })
                      }
                    ></input>
                  </div>
                </div>
              </div>
              <div className="CreateCampaignformFields">
                <button
                  onClick={submit}
                  type="button"
                  class="btn btn-warning  btn-lg"
                >
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

export default CreateCampaign;
