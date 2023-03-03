import React from "react";
import "./Style/PostTemplate.css";
import { useNavigate } from "react-router-dom";

function PostOverviewTemplate(props) {
  let campaignid = props.campaignId;
  const navigate = useNavigate();
  function handleView(e) {
    navigate(`/Post?${campaignid}`);
  }

  return (
    <div className="postTemplateContainer">
      <div className="postTemplate">
        <b>{props.title}</b>
        <div>{props.description}</div>
        <div> {props.totalAmount}</div>
      </div>
      <div>
        <div>
          <a onClick={handleView}>Tap to view</a>
        </div>
      </div>
    </div>
  );
}

export default PostOverviewTemplate;
