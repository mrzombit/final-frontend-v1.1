import React from "react";
import { Link } from "react-router-dom";
import "./bizbtn.css";

function bizbtn(props) {
  return (
    <div>
      <Link to={props.path} style={{ textDecoration: "none" }}>
        <button type="button" className="btn biz-button" style={{background: props.color}}>
          {props.name}
        </button>
      </Link>
    </div>
  );
}

export default bizbtn;
