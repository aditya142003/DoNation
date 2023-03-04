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
    <div key={campaignid} className="postTemplateContainer">
      <div className="postTemplate">
        <b>{props.title}</b>
        <small class="text-muted textoverflow">{props.description}</small>
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
          <button type="button" class="btn btn-outline-dark" onClick={handleView}>
            View Details
          </button>
        </div>
      </div>
    </div>
  );
}

export default PostOverviewTemplate;
