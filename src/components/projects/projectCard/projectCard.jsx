import React from "react";
import "./projectCard.css";
import { SiHomeassistantcommunitystore } from "react-icons/si";

function projectCard(props) {
  return (
      <div className="pj-card">
        <div className="pj-card-icon">
          <SiHomeassistantcommunitystore />
        </div>
        <div className="pj-card-box">
          <div className="pj-card-box-icon">
            <SiHomeassistantcommunitystore className="pj-icon" />
          </div>
          <div className="pj-card-box-head">
            <p className="pj-card-box-name">{props.name}</p>
            <p className="pj-card-box-details">{props.lastEdit}</p>
          </div>
        </div>
      </div>
  );
}

export default projectCard;
