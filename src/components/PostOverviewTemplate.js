import React from "react";
import "./Style/PostOverviewTemplate.css";

function PostOverviewTemplate() {
  return (
    <div className="postTemplateContainer">
      <div className="postTemplate">
        <b>Urgent Need of 1000 clothes</b>
        <div>We need 1000 clothes by tomorrow</div>
        <div>Progress Bar 100/1000</div>
      </div>
      <div>
        <div><a>Tap to view</a></div>
      </div>
    </div>
  );
}

export default PostOverviewTemplate;
