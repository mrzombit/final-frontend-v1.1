import React from "react";
import { IconContext } from "react-icons";
import { AiFillInfoCircle } from "react-icons/ai";
import { BsFillBarChartFill } from "react-icons/bs";
import { FaThList } from "react-icons/fa";
import { Link } from "react-router-dom";
import "./statement.css";

const statementHearder = (props) => {
  return (
    <div className="d-flex p-2">
      <div>
        <div className="col d-flex biztool-header-text-div mb-2">
          <div className="d-flex">
            <div className="biztool-header-text">{props.title}</div>
            <Link to={props.infoPath}>
              &nbsp;
              <IconContext.Provider value={{ color: "#9fa7c2" }}>
                <AiFillInfoCircle />
              </IconContext.Provider>
            </Link>
          </div>

          <div className={props.type == "chart" ? "statement-header-chart" : "statement-header"}>
            <IconContext.Provider value={{ color: "#9fa7c2" }}>
              <Link to={props.sensitivityPath} >
                {/* <button>sensitivity</button> */}
              </Link>
              <div>
                {/* &nbsp;
                <Link to={props.listPath}>
                  Income
                </Link>
                &nbsp;
                <Link to={props.listPath}>
                  CashFlow
                </Link> */}
                &nbsp;
                <Link to={props.listPath}>
                  <FaThList />
                </Link>
                &nbsp;
                <Link to={props.chartPath}>
                  <BsFillBarChartFill />
                </Link>
              </div>
            </IconContext.Provider>
          </div>
        </div>

        <div className="line-hr mt-2 mb-2"></div>
      </div>
    </div>
  );
};

export default statementHearder;
