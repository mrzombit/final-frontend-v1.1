import React from "react";
import BizSidebar from "../../../components/bizTools/bizSidebar/bizSidebar";
import BiztoolHeader from "../../../components/investmentProject/biztoolHeader/biztoolHeader";
import StatementCard from "../../../components/subscription/statementCard/statementCard";
import BIZTOOL_PAGE_CONFIG from "../../bizTools/pageConfig";
import { Link } from "react-router-dom";
import "./statementsPage.css";


function StatementsPage() {
  const config = BIZTOOL_PAGE_CONFIG.statement

  return (
    <div className="d-flex ">
      <BizSidebar />
      <div className="p-4 biztool-body-width">
        <BiztoolHeader
          type={config.type}
          title={config.title}
        />
        <div className="statement-body">
          <div className="d-flex flex-column justify-content-center align-items-start">
            <div className="statement-block ">
              {/* <Link to="/CustomStatements"><StatementCard name="Custom Statement" detail="Create you own statement" /></Link> */}
              <Link to="/Chart/cashflow"><StatementCard name="Cash Flow Statement" detail="Create you Cash Flow statement" /></Link>
              <Link to="/Chart/income"><StatementCard name="Profit & Loss Statement" detail="Create you Profit & Loss statement" /></Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default StatementsPage

