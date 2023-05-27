import React from "react";
import "./biztoolPopup.css";
import onClickOutside from "react-onclickoutside";
import BizTextInfo from "../bizTools/bizTextInfo/bizTextInfo";
import { AiOutlineClose } from "react-icons/ai";

function BiztoolPopup(props) {
  return props.trigger ? (
    <div className="popup-overlay">
      <div className="popup-card">

        {props.leftTitle &&
          <div className="d-flex flex-col align-items-center justify-content-between">

            <BizTextInfo title={props.leftTitle} />
            <AiOutlineClose onClick={props.close} />

          </div>}
        <hr></hr>

        {props.preTitle &&
          <div className=" flex-col justify-content-center  d-flex">
            <div className="preTitle-header-style">{props.preTitle}</div>
            <div className="justify-content-end">
              <AiOutlineClose onClick={props.close} />
            </div>
          </div>}
        {props.title &&
          <div className=" flex-col justify-content-center title-header-style d-flex">
            {props.title}
          </div>}
        <div className="align-items-center popup-content">
          {props.content}
        </div>
      </div>
    </div>
  ) : null;
}

export default onClickOutside(BiztoolPopup);
