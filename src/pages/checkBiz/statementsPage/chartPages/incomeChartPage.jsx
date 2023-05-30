import React, { useEffect, useState } from "react";
import CombinationCharts from "../../../../components/statement/charts/combinationCharts";
import BizSidebar from "../../../../components/bizTools/bizSidebar/bizSidebar";
import StatementHearder from "../../../../components/statement/statementHearder";
import "./chartPages.css";
import { AiOutlineDoubleLeft } from "react-icons/ai";
// import "./../../../../components/sensitivity/sensitivityEdit/sidebar/sensitivityEditSidebar.css";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProjectById,
  projectUpdated,
  updateProject,
} from "../../../../features/projectsSlice";
import EditInputOnSidebar from "../../../../components/checkbiz/sidebarEditdata/editInputOnSidebar";
import checkbizFormula from "../../../../components/checkbiz/checkbizFormula/checkbizFormula";


const incomeChartPage = (props) => {

  const cbf = checkbizFormula();
  const { totalRevenue_per_year, totalRevenue, totalRevenue_MIN } = cbf.calculateRevenue();
  const { totalRevenue_year, } = cbf.calculateRevenue_fix();
  const totalFixedCost = cbf.calculateTotalFixdcost();
  const yearRange = cbf.calculateYearRange();

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
    setModelConfig(selectedProject.model_config);
    setTableRevenueData(selectedProject.revenue);
    setTableExpenseData(selectedProject.expense);
  }, [selectedProject]);

  const [modelConfig, setModelConfig] = useState(
    selectedProject.model_config
  );
  const [tableRevenueData, setTableRevenueData] = useState(
    selectedProject.revenue
  );
  const [tableExpenseData, setTableExpenseData] = useState(
    selectedProject.expense
  );

  const onValChange = (tableID, unitID, amountPerUnit) => {
    let shallowServiceTables = JSON.parse(
      JSON.stringify(selectedProject.revenue.service_tables)
    );
    let shallowProductTables = JSON.parse(
      JSON.stringify(selectedProject.revenue.product_tables)
    );
    let shallowFixedCostTables = JSON.parse(
      JSON.stringify(selectedProject.expense.fixed_cost_tables)
    );
    let shallowInvestmentTables = JSON.parse(
      JSON.stringify(selectedProject.expense.investment_tables)
    );

    shallowServiceTables = shallowServiceTables.map((eachTableService) => {
      if (eachTableService._id === tableID) {
        eachTableService.services = eachTableService.services.map(
          (eachService) => {
            if (eachService._id === unitID) {
              if (eachService.revenue_per_service !== amountPerUnit) {
                eachService.revenue_per_service = amountPerUnit;
              }
            }
            return eachService;
          }
        );
      }
      return eachTableService;
    });

    shallowProductTables = shallowProductTables.map((eachTableProduct) => {
      if (eachTableProduct._id === tableID) {
        eachTableProduct.products = eachTableProduct.products.map(
          (eachProduct) => {
            if (eachProduct._id === unitID) {
              if (eachProduct.revenue_per_unit !== amountPerUnit) {
                eachProduct.revenue_per_unit = amountPerUnit;
              }
            }
            return eachProduct;
          }
        );
      }
      return eachTableProduct;
    });

    shallowFixedCostTables = shallowFixedCostTables.map(
      (eachTableFixedCost) => {
        if (eachTableFixedCost._id === tableID) {
          eachTableFixedCost.fixed_costs = eachTableFixedCost.fixed_costs.map(
            (eachFixedCost) => {
              if (eachFixedCost._id === unitID) {
                if (eachFixedCost.amount !== amountPerUnit) {
                  eachFixedCost.amount = amountPerUnit;
                }
              }
              return eachFixedCost;
            }
          );
        }
        return eachTableFixedCost;
      }
    );

    // Find the index of the table with the matching ID
    const tableIndex = shallowInvestmentTables.findIndex((table) => table._id === tableID);

    // Update the investment table if found
    if (tableIndex !== -1) {
      shallowInvestmentTables[tableIndex] = {
        ...shallowInvestmentTables[tableIndex],
        investments: shallowInvestmentTables[tableIndex].investments.map((eachInvestment) => {
          if (eachInvestment._id === unitID) {
            if (eachInvestment.amount !== amountPerUnit) {
              eachInvestment.amount = amountPerUnit;
            }
          }
          return eachInvestment;
        }),
      };
    }

    let shallowSelectedProject = {
      ...selectedProject,
      revenue: {
        service_tables: shallowServiceTables,
        product_tables: shallowProductTables,
      },
      expense: {
        fixed_cost_tables: shallowFixedCostTables,
        investment_tables: shallowInvestmentTables,
      },
    };
    dispatch(projectUpdated(shallowSelectedProject));
    dispatch(
      updateProject({ id: selectedProject._id, data: shallowSelectedProject })
    );
  };

  const [sidebar, setSidebar] = useState(true);
  const showSidebar = () => setSidebar(!sidebar);


  return (
    <div>
      <div className="d-flex sen-sidebar-container">
        <BizSidebar />
        <div
          className={sidebar ? "p-4 chart-pages-body2" : "p-4 chart-pages-body"}
        >
          <StatementHearder
            title="Income Statement"
            type="chart"
            sensitivityPath="/Sensitivity/income"
            listPath="/ProfitLossStatements"
            chartPath="/Chart/incom"
          />
          <div>
            {/* <div>{calculateYearRange()}</div> */}
            <CombinationCharts
              data_type="income"
              totalRevenue={totalRevenue_year}
              total_fixed_cost={totalFixedCost}
              totalRevenue_MIN={totalRevenue_MIN}
              yearRange={yearRange}
            />
          </div>
        </div>

        <div className="">
          {sidebar ? (
            <div className="sen-sidebar">
              <div className="sen-sidebar-show" onClick={showSidebar}>
                {/* <AiOutlineDoubleLeft /> */}
              </div>

              {/* <div className="d-flex">
                <div> วัน/ </div>
                <div> เดือน/ </div>
                <div> ปี/ </div>
              </div> */}

              <div className="table-name-side-text">รายได้ต่อการบริการ</div>
              <div className="">
                {/* <div>
                  <EditInputOnSidebar
                    name="รวมรายได้จากการบริการ/วัน"
                    type="text"
                    defaultValue={calculateRevenue_service()}
                    className="chart-input"
                    resultDisplay={true}
                  />
                </div> */}
              </div>
              {tableRevenueData.service_tables.map((tableService) => (
                <div key={tableService._id}>
                  {/* <div className="total-text">{tableService.name}</div> */}
                  {tableService.services.map((eachService) => (
                    <div key={eachService._id}>
                      {eachService.name !== "" && (
                        <EditInputOnSidebar
                          name={eachService.name}
                          type="text"
                          defaultValue={eachService.revenue_per_service}
                          className="chart-input"
                          onChange={(event) =>
                            onValChange(
                              tableService._id,
                              eachService._id,
                              event.target.value
                            )
                          }
                        />
                      )}
                    </div>
                  ))}
                </div>
              ))}


              <div className="table-name-side-text">
                รายได้การขายสินค้าเฉลี่ย/วัน
              </div>
              {/* <EditInputOnSidebar
                name="รวมรายได้จากการขายสินค้า/วัน"
                type="text"
                defaultValue={calculateRevenue_product()}
                className="chart-input"
                resultDisplay={true}
              /> */}
              {tableRevenueData.product_tables.map((tableProduct) => (
                <div key={tableProduct._id}>
                  {/* <div className="total-text">{tableProduct.name}</div> */}
                  {tableProduct.products.map((eachProduct) => (
                    <div key={eachProduct._id}>
                      {eachProduct.name !== "" && (
                        <EditInputOnSidebar
                          name={eachProduct.name}
                          type="text"
                          defaultValue={eachProduct.revenue_per_unit}
                          className="chart-input"
                          onChange={(event) =>
                            onValChange(
                              tableProduct._id,
                              eachProduct._id,
                              event.target.value
                            )
                          }
                        />
                      )}
                    </div>
                  ))}
                </div>
              ))}


              <div className="table-name-side-text">รายจ่าย/เดือน</div>
              {/* <EditInputOnSidebar
                name="รวมรายจ่าย"
                type="text"
                defaultValue={calculateFixedCost()}
                className="chart-input"
                resultDisplay={true}
              /> */}
              {tableExpenseData.fixed_cost_tables.map((tableFixedCost) => (
                <div key={tableFixedCost._id}>
                  {/* <div className="total-text">{tableFixedCost.name}</div> */}
                  {tableFixedCost.fixed_costs.map((eachFixedCost) => (
                    <div key={eachFixedCost._id}>
                      {eachFixedCost.name !== "" && (
                        <EditInputOnSidebar
                          name={eachFixedCost.name}
                          type="text"
                          defaultValue={eachFixedCost.amount}
                          className="chart-input"
                          onChange={(event) =>
                            onValChange(
                              tableFixedCost._id,
                              eachFixedCost._id,
                              event.target.value
                            )
                          }
                        />
                      )}
                    </div>
                  ))}
                </div>
              ))}

            </div>
          ) : (
            <div className="sen-sidebar2">
              <div className="sen-sidebar-show2" onClick={showSidebar}>
                <AiOutlineDoubleLeft />
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default incomeChartPage;