/* eslint-disable jsx-a11y/alt-text */
import React from "react";
import "./bizButton.css";

function bizButton(props) {
  
  return (
    <button onClick={props.onClick} className="btn biz-butt" >
        <div className="biz-butt-icon">
          {props.icon}
        </div>
        <div className="biz-butt-block">
          <p className="biz-butt-name">{props.name}</p>
          <p className="biz-butt-details">{props.details}</p>
        </div>
        <div>{props.add}</div>
    </button>
  );
}

export default bizButton;
