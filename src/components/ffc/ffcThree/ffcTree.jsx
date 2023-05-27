import React from "react";
import TitleFFC from "../titleFFC/titleFFC";
import "../ffcOne/ffcOne.css";
import FFCCard from "../ffcCard/ffcCard";

import "../ffcCard/ffcCard.css"

// import FFCHeadCard from "../ffcCard/ffcHeadCard";
// import BizTableInvestment from "../../bizTools/bizTable/bizTableInvestment";


function ffcTree() {
  return (
    <div className="ffc-content">
      <div className="ffc-body-content">
        <div>
          <div className="text-title-ffc">
            <TitleFFC title="สมมติฐาน" />
          </div>
             <div >
             <FFCCard
              type="revenue-service"
              tableName="Revenue Service"
            />
            <FFCCard
              type="revenue-product"
              tableName="Revenue Product"
            />
             </div>
        </div>
      </div>
    </div>
  )
}

export default ffcTree