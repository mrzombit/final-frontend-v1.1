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


const cashFlowDocument = () => {

  const cbf = checkbizFormula();
  const totalFixedCost = cbf.calculateTotalFixdcost();
  const { totalRevenue_year, } = cbf.calculateRevenue_fix();
  const yearRange = cbf.calculateYearRange();
  const totalCFO = cbf.calculateCFO();
  const totalCFI = cbf.calculateCFI2();
  const { totalCFF, totalIncomeDebt, totalExpendDebt } = cbf.calculateCFF();
  let netIncome = (totalRevenue_year.map((each, i) => each - totalFixedCost[i]))
  let CfoCfi = netIncome.map((cfo, index) => cfo + totalCFI[index]);
  let netCashflow = totalCFF.map((cff, index) => cff + CfoCfi[index]);
  

  let initialInvestment = totalCFI[0];





  const inittialCashFlowData = CHECKBIZ_CONFIG.cashflow

  let totalInvestment = 0;
  let totalRevenue = [];
  let totalfixedCost = [];

  let mock = [1000, 1000, 1000, 1000]

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
    setprojectName(selectedProject.name)
    setModelConfig(selectedProject.model_config);
    setTableRevenueData(selectedProject.revenue);
    setTableExpenseData(selectedProject.expense);
    setTableMiscellaneousData(selectedProject.miscellaneous);
  }, [selectedProject]);

  const [projectName, setprojectName] = useState(
    selectedProject.name
  );
  const [modelConfig, setModelConfig] = useState(
    selectedProject.model_config
  );
  const [tableRevenueData, setTableRevenueData] = useState(
    selectedProject.revenue
  );
  const [tableExpenseData, setTableExpenseData] = useState(
    selectedProject.expense
  );
  const [tableMiscellaneousData, setTableMiscellaneousData] = useState(
    selectedProject.miscellaneous
  );


  function calculateInitialInvestment() {
    let total = 0
    tableExpenseData.investment_tables.forEach((table) => {
      table.investments.forEach((eachCost) => {
        total += eachCost.amount;
      });
      totalInvestment.unshift(total)
    });


  }
  function calculateCashFlows(initialInvestment, annualGrowthRate, numberOfYears) {
    let cashFlows = [];
    let currentCashFlow = initialInvestment;

    for (let i = 0; i < numberOfYears; i++) {
      cashFlows.push(currentCashFlow);
      currentCashFlow = currentCashFlow * (1 + annualGrowthRate);
    }

    return cashFlows;
  }


  function calculateRevenue_service() {
    let sum_service_revenue = 0;
    tableRevenueData.service_tables.forEach((tableService) => {
      tableService.services.forEach((eachService) => {
        sum_service_revenue += eachService.revenue_per_service;
      });
    });
    return sum_service_revenue;
  }
  function calculateRevenue_product() {
    let sum_product_revenue = 0;
    tableRevenueData.product_tables.forEach((tableProduct) => {
      tableProduct.products.forEach((eachProduct) => {
        sum_product_revenue += eachProduct.revenue_per_unit;
      });
    });
    return sum_product_revenue;
  }

  function calculateRevenue() {
    let totalValue = 0;
    totalValue = calculateRevenue_service() + calculateRevenue_product();
    totalRevenue.push(totalValue);
    return totalValue;
  }

  function calculateFixedCost() {
    let sum_fixed_cost = 0;
    tableExpenseData.fixed_cost_tables.forEach((tableFixedCost) => {
      tableFixedCost.fixed_costs.forEach((eachFixedCost) => {
        sum_fixed_cost += eachFixedCost.amount;
      });
    });
    return sum_fixed_cost;
  }



  function calculateInitialInvestment() {
    tableExpenseData.investment_tables.forEach((table) => {
      table.investments.forEach((eachCost) => {
        totalInvestment += eachCost.amount;
      });
    });
  }



  function calculateCashFlows(initialInvestment, annualGrowthRate, numberOfYears) {
    let cashFlows = [];
    let currentCashFlow = initialInvestment;

    for (let i = 0; i < numberOfYears; i++) {
      cashFlows.push(currentCashFlow);
      currentCashFlow = currentCashFlow * (1 + annualGrowthRate);
    }

    return cashFlows;
  }



  return (
    <div className="">
      <div>
        <div className="dov-head-cell mb-3">บริษัท {projectName}</div>
        <div className="dov-head-cell">งบกระแสเงินสด</div>
        <div className="dov-name-cell">การประมาณการในช่วง ปี {yearRange[0]} - {yearRange[-1]}</div>
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
            <th className="dov-name-cell">กระแสเงินสดจากกิจกรรมดำเนินงาน</th>
            {/* <div>{total_income()}</div>
            <div>{total_CFO()}</div>
            <div>{total_CFI()}</div>
            <div>{total_CFF()}</div> */}
            <tr>
              <td className="dov-name-cell">ต้นทุนทางการเงิน</td>
              {totalFixedCost.map((i) => (
                <td scope="col" className="dov-money-cell">{cbf.moneyDisplay(i*(-1))}</td>
              ))}
            </tr>
            <tr>
              <td className="dov-name-cell">รายได้ทางการเงิน</td>
              {totalRevenue_year.map((i) => (
                <td scope="col" className="dov-money-cell">{cbf.moneyDisplay(i)}</td>
              ))}
            </tr>
            <th className="dov-name-cell">กระแสเงินสดจากกิจกรรมลงทุน</th>
            <tr>
              <td className="dov-name-cell">ค่าใช้จ่ายการลงทุน</td>
              {totalCFI.map((i) => (
                <td scope="col" className="dov-money-cell">{cbf.moneyDisplay(i)}</td>
              ))}
            </tr>
            <th className="dov-name-cell">กระแสเงินสดจากกิจกรรมจัดหาเงิน</th>
            <tr>
              <td className="dov-name-cell">เงินสดรับจากการกู้ยืม</td>
              {totalIncomeDebt.map((i) => (
                <td scope="col" className="dov-money-cell">{cbf.moneyDisplay(i)}</td>
              ))}
            </tr>
            <tr>
              <td className="dov-name-cell">เงินสดจ่ายจากการชำระเงินกู้</td>
              {totalExpendDebt.map((i) => (
                <td scope="col" className="dov-money-cell">{cbf.moneyDisplay(i)}</td>
              ))}
            </tr>
            {/* <tr>
              <td className="dov-name-cell">เงินสดจ่ายจากเงินปันผล</td>
              {(calculateCashFlows(totalInvestment, 0.7, 4)).map(eachYear => (
                // yearRange.map((i) => (
                <td scope="col" className="dov-money-cell">{eachYear.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
                // ))
              ))}
            </tr> */}
            <tr>
              <th className="dov-name-cell">กระแสเงินสดสุทธิ</th>
              {netCashflow.map((i) => (
                <td scope="col" className="dov-money-cell">{cbf.moneyDisplay(i)}</td>
              ))}
            </tr>


          </tbody>

        </table>
      </div>

    </div>
  );
};

export default cashFlowDocument;
