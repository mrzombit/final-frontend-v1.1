import React, { useEffect, useState } from "react";
import "../statement.css";
import CHECKBIZ_CONFIG from "../../checkbiz/checkbizData/checkbizConfig";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProjectById,
  projectUpdated,
  updateProject,
} from "../../../features/projectsSlice";
import checkbizFormula from "../../checkbiz/checkbizFormula/checkbizFormula";


const incomeDocument = () => {
  const cbf = checkbizFormula();
  const totalInvestment = cbf.calculateInvestment();
  const { totalRevenue_per_year,eachProduct_list_ss_st, each_service_row_totalRevenue_per_year, each_product_row_totalRevenue_per_year,
    totalRevenue_product_per_year, totalRevenue_service_per_year, each_row_totalRevenue_per_year, totalRevenue,
    totalRevenue_MIN } = cbf.calculateRevenue();
  const { totalRevenue_year, } = cbf.calculateRevenue_fix();
  const { totalIncomeDebt, totalExpendDebt, netDebt } = cbf.calculateMiscellaneous();
  const totalFixedCost = cbf.calculateTotalFixdcost();
  const yearRange = cbf.calculateYearRange();
  const saleTrends = cbf.getSaleTrends();

  const totalCFO = cbf.calculateCFO();
  const totalCFI = cbf.calculateCFI2();
  const totalCFF = cbf.calculateCFF();
  
  let netCashflow = [];
  if (Array.isArray(totalCFF)) {
    let CfoCfi = totalCFO.map((cfo, index) => cfo + totalCFI[index]);
    netCashflow = totalCFF.map((cff, index) => cff + CfoCfi[index]);
  }
  
  let netIncome = totalRevenue_year.map((each, i) => each - totalFixedCost[i]);
  
  let initialInvestment = totalCFI[0];

  const { inv_names, inv_amounts } = cbf.calculateInitialInvestment_for_chart();
  const { expense_names, expense_amounts } = cbf.calculateFixedCost_for_chart();
  const { revenue_service_names, revenue_service_amounts } = cbf.calculateRevenue_service_for_chart();
  const { revenue_product_names, revenue_product_amounts } = cbf.calculateRevenue_product_for_chart();


  // const yearRange = [2565, 2566, 2567, 2568];
  const inittialIncomeData = CHECKBIZ_CONFIG.income

  const dispatch = useDispatch();
  const selectedProject = useSelector(
    (state) => state.projects.selectedProject
  );
  const [isLoaded, setIsLoaded] = useState({ user: false, projects: false });
  const [reload, setReload] = useState(false);


  useEffect(() => {
    if (isLoaded.projects) {
      dispatch(fetchProjectById(selectedProject._id));
      setIsLoaded({ user: true, project: true });
    }
    if (!reload) {
      dispatch(fetchProjectById(selectedProject._id));
      setReload(true);
    }
    setTableRevenueData(selectedProject.revenue);
    setTableExpenseData(selectedProject.expense);
    setTableModelConfigData(selectedProject.model_config);
  }, [selectedProject]);

  const [tableRevenueData, setTableRevenueData] = useState(
    selectedProject.revenue
  );
  const [tableExpenseData, setTableExpenseData] = useState(
    selectedProject.expense
  );
  const [tableModelConfigData, setTableModelConfigData] = useState(
    selectedProject.expense
  );
  
  return (
    <div className="">
      <div>
        <div className="dov-head-cell">งบกำไรขาดทุน</div>
        <div className="dov-name-cell mb-2">การประมาณการในช่วง ปี {yearRange[0]} - {yearRange[yearRange.length-1]} </div>
        <div className="biz-water-mask">create by BIZCHECK</div>
        <table className="table container table-hover">
          <thead>
            <tr className="table">
              <th scope="col" className="dov-name-cell">รายการ</th>
              {yearRange.map((i) => (
                <th scope="col" className="dov-money-cell">{i}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            <th className="dov-name-cell">รายได้จากการขายสินค้าและบริการ</th>
            {tableRevenueData.service_tables.map((table) => (
              <React.Fragment key={table._id}>
                {table.services.map((each) => (
                  <tr key={each._id}>
                    <td className="dov-name-cell">{each.name}</td>
                    {saleTrends.map((st) => (
                      <td scope="col" className="dov-money-cell">{(((each.revenue_per_service*each.unit*each.serve_per_unit)*((100-each.cost_per_service)/100)) * 30 * 12 * st / 100).toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
                    ))}

                  </tr>
                ))}
              </React.Fragment>
            ))}
            {tableRevenueData.product_tables.map((table) => (
              <React.Fragment key={table._id}>
                {table.products.map((each) => (
                  <tr key={each._id}>
                    <td className="dov-name-cell">{each.name}</td>
                    {saleTrends.map((st, i) => {
                      let eachPD_year =  0;
                      each.seasonal_trends.map((ssn, j) => {
                        eachPD_year += (each.revenue_per_unit*((100-each.cost_per_unit)/100)) * 30 * (ssn / 100) 
                      })
                      return (
                        <td scope="col" className="dov-money-cell">
                          {(eachPD_year * st/100).toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                        </td>
                      )
                    })}

                  </tr>
                ))}
              </React.Fragment>
            ))}
            <tr>
              <td scope="row" className="dov-border-cell">รวมรายได้</td>
              {totalRevenue_year.map((data) => (
                <td scope="col" className="dov-money-cell-b">{data.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
              ))}
            </tr>
            <th className="dov-name-cell">รายจ่ายจากต้นทุนขายและบริการ</th>
            {tableExpenseData.fixed_cost_tables.map((tableFixedCost) => (
              <React.Fragment key={tableFixedCost._id}>
                {tableFixedCost.fixed_costs.map((eachFixedCost) => (
                  <tr key={eachFixedCost._id}>
                    <td className="dov-name-cell">{eachFixedCost.name}</td>

                    {saleTrends.map((st,i) => (
                      <td scope="col" className="dov-money-cell">{cbf.moneyDisplay(eachFixedCost.amount * eachFixedCost.unit * 12 * ((100 + (eachFixedCost.cost_increase*i))/100)*(-1))}</td>
                    ))}
                    
                  </tr>
                ))}
              </React.Fragment>
            ))}

            <tr>
              <td scope="row" className="dov-border-cell">รวมรายจ่าย</td>
              {totalFixedCost.map((i) => (
                <td scope="col" className="dov-money-cell-b">{cbf.moneyDisplay(i*(-1))}</td>
              ))}
            </tr>
            <tr>
              <td scope="column" className="dov-border-cell">กำไรก่อนภาษีเงินได้</td>
              {netIncome.map((i) => (
                <td scope="col" className="dov-money-cell-b">{cbf.moneyDisplay(i)}</td>
              ))}
            </tr>
            <tr>
              <td scope="column" className="dov-border-cell">ค่าใช้จ่ายภาษีเงินได้</td>
              {yearRange.map((i) => (
                <td scope="col" className="dov-money-cell-b">0</td>
              ))}
            </tr>
            <tr>
              <td scope="column" className="dov-border-cell">กำไรสุทธิ</td>
              {netIncome.map((i) => (
                <td scope="col" className="dov-money-cell-b">{cbf.moneyDisplay(i)}</td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>

    </div>
  );
};

export default incomeDocument;
