import React from "react";
import "./biztoolConfirmPopup.css";
import onClickOutside from "react-onclickoutside";
import BizTextInfo from "../bizTools/bizTextInfo/bizTextInfo";
import { AiOutlineClose } from "react-icons/ai";

function BiztoolConfirmPopup(props) {

  return props.trigger ? (
    <div className="confirm-popup-overlay">
      <div className="confirm-popup-card">
        <div className="d-flex justify-content-between">
            <div style={{width: '200px'}}>{props.preTitle}</div>
        <div className="d-flex justify-content-end mx-1"> <AiOutlineClose className="close-popup-icon" onClick={props.close} /></div>
        </div>
        <hr></hr>
        {props.title &&
          <div className=" d-flex justify-content-center align-items-center text-align-center confirm-title-header-style ">
            {props.title}
          </div>}
        <div className="align-items-center confirm-popup-content">
          {props.content}
        </div>
        <div className="d-flex justify-content-between mx-2 mb-2">
            {props.leftButton}
            {props.rightButton}
        </div>
      </div>
    </div>
  ) : null;
}

export default onClickOutside(BiztoolConfirmPopup);
