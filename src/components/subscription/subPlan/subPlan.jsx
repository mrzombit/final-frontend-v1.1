import React from "react";
import "./subPlan.css";
import Bizbtn from "../../bizTools/bizbtn/bizbtn";

function subPlan() {
  return (
    <div>
      <div className="sub                                                                                                                                                                                                           -card">
        <div className="d-flex ">
          <div className="sub-card-logo"> </div>
          <div>Plan</div>
        </div>
        <div className="sub-card">
          <div>$ 0</div>
          <div> / investment project</div>
          <div> / investment project</div>
          <div> / investment project</div>
          <div> / investment project</div>
        </div>

        <Bizbtn name="Start trial" />
      </div>
    </div>
  );
}

export default subPlan;
