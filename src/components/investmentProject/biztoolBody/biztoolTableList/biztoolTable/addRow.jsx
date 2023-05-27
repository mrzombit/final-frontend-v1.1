import React, { useEffect, useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import "./biztoolTable.css";
import BIZTOOL_PAGE_CONFIG from "../../../../../pages/bizTools/pageConfig";
import { useDispatch, useSelector } from "react-redux";
import BizDropdown from "../../../../bizTools/eachCellTableType/bizDropdown";
import BizEachItemPerYear from "../../../../bizTools/eachCellTableType/bizEachItemPerYear";
import { updateProject } from "../../../../../features/projectsSlice";

const AddRow = (props) => {
  const eachTable = props.eachTable;
  const [addRowState, setAddRowState] = useState(false);

  const dispatch = useDispatch();
  const selectedProject = useSelector(
    (state) => state.projects.selectedProject
  );
  const [isLoaded, setIsLoaded] = useState({ user: false, projects: false });
  const columnStyles = props.tableStyle.column.map((each) => ({
    width: each.width,
    color: each.color,
    type: each.type,
    backgroundColor: each.backgroundColor,
  }));

  useEffect(() => {
    const closeAddRow = (e) => {
      if (
        e.srcElement.innerText !== "เพิ่มรายการ" &&
        e.srcElement.nodeName !== "INPUT"
        // no input in add row
      ) {
        setAddRowState(false);
      }
    };
    document.body.addEventListener("click", closeAddRow);
    return () => document.body.removeEventListener("click", closeAddRow);
  }, []);

  const addRowHandle = (tableId) => {
    setAddRowState(true);
  };

  const handleChange = (event) => {
    setInputVal(event.target.value);
  };

  const inputInitial = {
    totalInvestment: {
      name: "",
      amount: 0,
      account_id: "",
      start_date: "",
    },
    operationCost: {
      name: "",
      amount: 0,
      period_id: "",
      cost_increase: 0,
      cost_increase_period_id: "",
    },
    revenue: {
      service: {
        name: "",
        unit: "",
        unit_name: "",
        serve_per_unit: "",
        revenue_per_service: "",
        cost_per_service: "",
        price_increase: 0,
        price_increase_period_id: "",
        cost_increase: 0,
        cost_increase_period_id: "",
        start_date: "",
        seasonal_trends: [],
      },
      product: {
        name: "",
        days_of_inventory: {
          days: 0,
          months: 0,
        },
        revenue_per_unit: "",
        cost_per_service: "",
        price_increase: 0,
        price_increase_period_id: "",
        cost_increase: 0,
        cost_increase_period_id: "",
        start_date: "",
        seasonal_trends: [],
      },
    },
    miscellaneous: {
      equityContribution: {
        name: "",
        amount: 0,
        date: "",
      },
      equityRepayment: {
        name: "",
        share: 0,
        repayment: {
          period_id: "",
          start_date: "",
        }
      },
      debtIssuance: {
        name: "",
        amount: 0,
        apr: "",
        period_id: "",
        payments: [],
      },
    },
  };
  const [inputVal, setInputVal] = useState(inputInitial);

  return (
    <div>
      {addRowState == true && (
        <div className="d-flex">
          {props.tableStyle.column.map((eachColumn, index) => (
            <>
              {index == 0 && (
                <div
                  key={eachColumn.colId}
                  style={{
                    width: `${columnStyles[index].width}px`,
                  }}
                >
                  <input
                    className="column border border-primary"
                    placeholder={eachTable.title}
                    id={eachColumn.colId}
                    name={eachColumn.title}
                    onChange={handleChange}
                    value={inputVal}
                  />

                </div>
              )}
              {index !== 0 && (
                <div
                  key={eachColumn.colId}
                  style={{
                    width: `${columnStyles[index].width}px`,
                  }}
                >
                  <input
                    className="column border border-primary"
                    id={eachColumn.colId}
                    name={eachColumn.title}
                    placeholder={eachColumn.title}
                    onChange={handleChange}
                    value={inputVal}
                  />
                </div>
              )}
            </>
          ))}
        </div>
      )}

      <div
        className="biztool-addrow d-flex align-items-center mx-1"
        style={{
          width: `${columnStyles.reduce(function (previousValue, currentValue) {
            return { width: previousValue.width + currentValue.width };
          }).width
            }px`,
        }}
      >
        <div className="d-flex" onClick={() => addRowHandle(eachTable._id)}>
          <div className="mx-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-plus-circle"
              viewBox="0 0 16 16"
            >
              <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
              <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
            </svg>
          </div>

          <div className=" flex h-100 align-text-center">เพิ่มรายการ</div>
        </div>
      </div>
    </div>
  );
};

export default AddRow;
