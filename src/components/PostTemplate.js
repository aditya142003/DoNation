import React from "react";
import "./Style/PostTemplate.css";
import { useNavigate } from "react-router-dom";

function PostOverviewTemplate(props) {
  let campaignid = props.campaignId;
  const navigate = useNavigate();
  function handleView(e) {
    navigate(`/Post?${campaignid}`);
  }

  let percent = (props.amountRec / props.totalAmount) * 100;

  return (
    <div className="postTemplateContainer">
      <div className="postTemplate">
        <b>{props.title}</b>
        <p className="textoverflow">{props.description}</p>
        <div>
          {props.amountRec} / {props.totalAmount}
        </div>

        <div class="progress">
          <div
            className="progress-bar"
            role="progressbar"
            style={{ width: `${percent}%`, backgroundColor:"#f3c222"}}
            aria-valuenow={`${percent}`}
            aria-valuemin="0"
            aria-valuemax="100"
          ></div>
        </div>
      </div>
      <div>
        <div>
          <button type="button" className="viewButton" onClick={handleView}>
            Tap to view
          </button>
        </div>
      </div>
    </div>
  );
}

export default PostOverviewTemplate;
