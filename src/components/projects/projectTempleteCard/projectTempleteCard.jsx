import React from "react";
import "./projectTempleteCard.css";
import { SiHomeassistantcommunitystore } from "react-icons/si";

function projectTempleteCard(props) {

  return (
    <div>
    {
      props.data.projectData.name !== "เทมเพลตเปล่า" ?
        <div id={`this-card-${props.data._id}`} className='pjt-card'>
          <div>
            <div id={`this-icon-${props.data._id}`} className="pjt-icon d-flex justify-content-center align-items-center mb-1 ">
              <SiHomeassistantcommunitystore />
            </div>
            <div id={`this-title-${props.data._id}`} className="pjt-title d-flex justify-content-center align-items-center">
              {props.data.projectData.name}
            </div>
          </div>
        </div>
        : <div id={`this-card-${props.data._id}`} className='pjt-card-2'>
          <div>
            <div id={`this-icon-${props.data._id}`} className="pjt-icon-2 d-flex justify-content-center align-items-center mb-1 ">
              <SiHomeassistantcommunitystore />
            </div>
            <div id={`this-title-${props.data._id}`} className="pjt-title-2 d-flex justify-content-center align-items-center">
              {props.data.projectData.name}
            </div>
          </div>
        </div>
    }
    </div>
  );
}

export default projectTempleteCard;
