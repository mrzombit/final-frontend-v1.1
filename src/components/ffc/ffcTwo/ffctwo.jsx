import React from "react";
import TitleFFC from "../titleFFC/titleFFC";
import "../ffcOne/ffcOne.css";
import FFCCard from "../ffcCard/ffcCard";

import "../ffcCard/ffcCard.css"

// import BizTableInvestment from "../../bizTools/bizTable/bizTableInvestment";
// import FFCHeadCard from "../ffcCard/ffcHeadCard";

function ffctwo() {
  return (
    <div className="ffc-content">
      <div className="ffc-body-content">
        <div>
          <div className="text-title-ffc">
            <TitleFFC title="การลงทุน" />
          </div>
          <div className="">
            <FFCCard
              type="total-investment"
              tableName="Capital need"
            />
            <FFCCard
              type="expense"
              tableName="Expense"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ffctwo;
