import React from "react";
import { IconContext } from "react-icons";
import { AiFillInfoCircle } from "react-icons/ai";
import { Link } from "react-router-dom";

function bizTextInfo(props) {
  return (
    <div>
      <IconContext.Provider value={{ color: "#9fa7c2" }}>
        {props.title}&nbsp;
        <Link to={props.infoPath}>
          <AiFillInfoCircle />
        </Link>
      </IconContext.Provider>
    </div>
  );
}

export default bizTextInfo;
