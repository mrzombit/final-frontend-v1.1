import React from "react";
import "./bizLogo.css";
import { GiCoffeeCup} from "react-icons/gi";
import { MdFitnessCenter , MdOutlineStorefront, MdGolfCourse} from "react-icons/md";

function bizLogo() {
  return (
    <div className="biz-logo-body">
      <div className="d-flex flex-col">
        <div className="biz-logo-card">
          <div className="biz-logo">
            <GiCoffeeCup />
          </div>
        </div>
        <div className="biz-logo-select">
          <div className="circle-test"></div>
          <div className="can-scroll">
            <div className="litBox-test">
              <div className="biz-logo-2">
                <GiCoffeeCup />

              </div>
            </div>
            <div className="litBox-test">
              <div className="biz-logo-2">
                <MdOutlineStorefront />
              </div>
            </div>
            <div className="litBox-test">
              <div className="biz-logo-2">
              <MdFitnessCenter />
              </div>
            </div>
            <div className="litBox-test">
              <div className="biz-logo-2">
              <MdGolfCourse />

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default bizLogo;
