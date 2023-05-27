import React from "react";
import TitleFFC from "../titleFFC/titleFFC";
import "../ffcOne/ffcOne.css";
import FFCCard from "../ffcCard/ffcCard";

import "../ffcCard/ffcCard.css"

// import BizTableInvestment from "../../bizTools/bizTable/bizTableInvestment";
// import FFCHeadCard from "../ffcCard/ffcHeadCard";

function ffcFour() {
  return (
    <div className="ffc-content">
      <div className="ffc-body-content">
        <div>
          <div className="text-title-ffc">
            <TitleFFC title="กระแสเงินสด" />
          </div>
          <div className="">
            {/* <FFCCard
              type="revenue"
              tableName="CFO"
            />
            <FFCCard
              type="expense"
              tableName="CFI"
            /> */}
            <FFCCard
              type="cashflow"
              tableName="Cashflows"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default ffcFour;
