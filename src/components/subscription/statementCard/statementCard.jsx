import React from "react";
import "./statementCard.css";
import { HiOutlineDotsVertical } from "react-icons/hi";

function statementCard(props) {
  return (
    <div>
      <div className="statement-card">
        <div className="statement-icon p-3 align-items-end justify-content-end link-text">
          <HiOutlineDotsVertical />
        </div>
        <div className="statement-card-header stm-link-text">
        <span className="statement-title stm-link-text">{props.name}</span>
        <span className="statement-detail stm-link-text">{props.detail}</span>
      </div>
      </div>
      
    </div>
  );
}

export default statementCard;
