import React from "react";
import { IconContext } from "react-icons";
import { AiFillInfoCircle } from "react-icons/ai";
import './titleFFC.css'

function titleFFC(props) {
  return (
    <IconContext.Provider value={{ color: "#9fa7c2" }}>
      <div className="ffc-title">
        {props.title}&nbsp;
        {/* {props.icon} */}
        <AiFillInfoCircle />
      </div>
    </IconContext.Provider>
  );
}

export default titleFFC;
