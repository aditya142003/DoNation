import React from "react";
import "./Style/CreatePost.css";
import { useNavigate } from "react-router-dom";

function CreatePost() {
  const navigate = useNavigate();
  function handlecross() {
    navigate("/NgoAdmin");
  }
  return (
    <div>
      <div className="createPosttitlecontainer">
        <div className="createPostpageHeading">Alert Board</div>
        <div>
          <div>NGO Name</div>
          <div>ngo@gmail.com</div>
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
                    <div>Need</div>
                    <input type="text" spellCheck="false"></input>
                  </div>
                  <div className="createPostformFields">
                    <div>Description</div>
                    <input type="text"></input>
                  </div>
                  <div className="createPostformFields">
                    <div>Quantity</div>
                    <input type="number"></input>
                  </div>
                  <div className="createPostformFields">
                    <div>Tag</div>
                    <input type="text"></input>
                  </div>
                </div>
                <div>
                  <div className="createPostformFields">
                    <div>Image</div>
                    <input type="image"></input>
                  </div>
                </div>
              </div>
              <div className="createPostformFields">
                <button className="submit">SUBMIT</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreatePost;
