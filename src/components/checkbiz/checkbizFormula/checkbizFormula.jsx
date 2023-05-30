import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProjectById } from "../../../features/projectsSlice"

export default function checkbizFormula() {

  const dispatch = useDispatch();
  const selectedProject = useSelector((state) => state.projects.selectedProject);
  const [isLoaded, setIsLoaded] = useState({ user: false, projects: false });
  const [reload, setReload] = useState(false)

  const [newRevenuePerService, setNewRevenuePerService] = useState(null);

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
    setTableMiscellaneousData(selectedProject.miscellaneous);
    setTableSaleTrendsData(selectedProject.sale_trends);
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
  const [tableMiscellaneousData, setTableMiscellaneousData] = useState(
    selectedProject.miscellaneous
  );
  const [tableSaleTrendsData, setTableSaleTrendsData] = useState(
    selectedProject.sale_trends
  );

  const yearList = []
  const yearNum = []
  let yearStart = parseInt(modelConfig.start_date.slice(0, 4));
  for (let i = 0; i < modelConfig.projection_period; i++) {
    yearList.push(yearStart);
    yearNum.push(i + 1)
    yearStart += 1;
  }
  const saleTrends = []
  tableSaleTrendsData.map((d) => {
    saleTrends.push(d.trend)
  })

  function getSaleTrends() {
    const saleTrends = []
    tableSaleTrendsData.map((d) => {
      saleTrends.push(d.trend)
    })
    return saleTrends
  }

  function calculateRevenue() {
    let totalRevenue_per_year = [];
    let each_service_row_totalRevenue_per_year = [];
    let each_product_row_totalRevenue_per_year = [];
    let row_revenue_service_per_year = []
    let row_revenue_product_per_year = []

    const totalRevenue = [];
    let total_revenue_service_per_day = 0;
    let total_revenue_service_per_month = 0;
    let total_revenue_product_per_month = 0;
    let totalRevenue_service_per_year = [];
    let totalRevenue_product_per_year = [];


    const totalRevenue_per_month = [];

    const totalRevenue_MIN = [];
    const totalFixedCost_MIN = [];
    let totalValue = 0;
    let totalValue_MIN = 0;

    let sum_product_revenue = 0; //max
    let sum_product_revenue_MIN = 0;

    let sum_service_revenue = 0;
    let sum_service_revenue_MIN = 0;

    tableRevenueData.product_tables.forEach((tableProduct) => {
      tableProduct.products.forEach((eachProduct) => {
        if (eachProduct.revenue_per_unit && typeof eachProduct.revenue_per_unit === "string") {
          if (eachProduct.revenue_per_unit.includes("-")) {
            let [min, max] = eachProduct.revenue_per_unit.split("-").map(Number);
            sum_product_revenue += max
            sum_product_revenue_MIN += min
            console.log("G")
          } else {
            sum_product_revenue_MIN += eachProduct.revenue_per_unit
            sum_product_revenue += (eachProduct.revenue_per_unit - (eachProduct.revenue_per_unit * eachProduct.cost_per_unit / 100))
            eachProduct.seasonal_trends.map((d) => {
              total_revenue_product_per_month += (sum_product_revenue * d / 100)

            })
          }
        }
      });
    });
    tableRevenueData.service_tables.forEach((tableService) => {
      tableService.services.forEach((eachService) => {
        let revenue_per_row = eachService.unit * eachService.revenue_per_service * eachService.serve_per_unit
        let revenue_per_row_minus_their_cost = revenue_per_row * (100 - eachService.cost_per_service) / 100
        total_revenue_service_per_day += revenue_per_row_minus_their_cost
        row_revenue_service_per_year.push(revenue_per_row_minus_their_cost * 30)
        // sum_service_revenue += ((eachService.revenue_per_service - (eachService.revenue_per_service * eachService.cost_per_service / 100)));

      });
    });


    total_revenue_service_per_month = total_revenue_service_per_day * 30

    saleTrends.map((d) => {
      totalRevenue_service_per_year.push(total_revenue_service_per_month * 12 * (d / 100))
      totalRevenue_product_per_year.push(total_revenue_product_per_month * (d / 100))
    })

    // each_service_row_totalRevenue_per_year = saleTrends.map((d, i) => (d/100) * totalRevenue_service_per_year[i])
    // each_product_row_totalRevenue_per_year = saleTrends.map((d, i) => (d/100) * totalRevenue_product_per_year[i])

    totalRevenue_per_year = totalRevenue_service_per_year.map((element, i) => element + totalRevenue_product_per_year[i])


    ////////////////////////
    totalValue = sum_product_revenue + sum_service_revenue
    totalValue_MIN = sum_product_revenue_MIN + sum_service_revenue

    totalRevenue.push(totalValue);
    totalRevenue_MIN.push(totalValue_MIN);

    for (let i = 1; i < modelConfig.projection_period; i++) {
      // totalValue += totalValue*(increase / 100)
      // increase += increase
      totalRevenue.push(totalValue);
      totalRevenue_MIN.push(totalValue_MIN);
    }

    return {
      totalRevenue: totalRevenue,
      totalRevenue_MIN: totalRevenue_MIN,
      total_revenue_service_per_day: total_revenue_service_per_day,
      total_revenue_service_per_month: total_revenue_service_per_month,
      totalRevenue_per_year: totalRevenue_per_year,
      each_service_row_totalRevenue_per_year: each_service_row_totalRevenue_per_year,
      each_product_row_totalRevenue_per_year: each_product_row_totalRevenue_per_year,
      totalRevenue_service_per_year: totalRevenue_service_per_year,
      totalRevenue_product_per_year: totalRevenue_product_per_year
    }
  }
  function calculateRevenue_fix() {
    let totalRevenue_per_year = [];
    let each_service_row_totalRevenue_per_year = [];
    let each_product_row_totalRevenue_per_year = [];
    let row_revenue_service_per_year = []
    let row_revenue_product_per_year = []

    const totalRevenue = [];
    let total_revenue_service_per_day = 0;
    let total_revenue_service_per_month = 0;
    let total_revenue_product_per_month = 0;
    let totalRevenue_service_per_year = [];
    let totalRevenue_product_per_year = [];


    const totalRevenue_per_month = [];

    const totalRevenue_MIN = [];
    const totalFixedCost_MIN = [];
    let totalValue = 0;
    let totalValue_MIN = 0;

    let sum_product_revenue = 0; //max
    let sum_product_revenue_MIN = 0;

    let sum_service_revenue = 0;
    let sum_service_revenue_MIN = 0;


    let eachPD_year = 0;
    let eachPD_year_st = []

    let eachSV_year = 0;
    let eachSV_year_st = []

    let totalRevenue_year = []

    tableRevenueData.product_tables.forEach((tableProduct) => {
      {
        tableProduct.products.map((each) => {
          each.seasonal_trends.map((ssn, j) => {
            eachPD_year += (each.revenue_per_unit * ((100 - each.cost_per_unit) / 100)) * 30 * (ssn / 100)
            // eachPD_year_list.push(eachPD_year * st/100)
          })
        }

        )
      }
    });
    tableRevenueData.service_tables.forEach((tableService) => {
      tableService.services.forEach((eachService) => {
        eachSV_year += ((eachService.revenue_per_service * eachService.unit * eachService.serve_per_unit) * ((100 - eachService.cost_per_service) / 100)) * 30 * 12
      });
    });

    saleTrends.map((st) => {
      eachPD_year_st.push(eachPD_year * st / 100)
      eachSV_year_st.push(eachSV_year * st / 100)
    })

    totalRevenue_year = eachPD_year_st.map((PD, i) => PD + eachSV_year_st[i])

    return {
      totalRevenue_year: totalRevenue_year,
      totalRevenue: totalRevenue,
      totalRevenue_MIN: totalRevenue_MIN,
      total_revenue_service_per_day: total_revenue_service_per_day,
      total_revenue_service_per_month: total_revenue_service_per_month,
      totalRevenue_per_year: totalRevenue_per_year,
      each_service_row_totalRevenue_per_year: each_service_row_totalRevenue_per_year,
      each_product_row_totalRevenue_per_year: each_product_row_totalRevenue_per_year,
      totalRevenue_service_per_year: totalRevenue_service_per_year,
      totalRevenue_product_per_year: totalRevenue_product_per_year
    }

  }

  function calculateServiceRevenueListPerYear(amount) {
    let amount_list = []
    let service_revenue_list = []

    amount_list.push(amount * 30 * 12)

    saleTrends.map((eachYear) => {
      amount_list.map((eachAmount) => {
        service_revenue_list.push(eachAmount * eachYear / 100)
      })
    })



  }

  function calculateTotalFixdcost() {
    const totalFixedCost = [];
    let sum_fixed_cost = 0;
    let sum_investment = 0;
    let increase = 0;
    tableExpenseData.fixed_cost_tables.forEach((tableFixedCost) => {
      tableFixedCost.fixed_costs.forEach((eachFixedCost) => {
        sum_fixed_cost += (eachFixedCost.amount * eachFixedCost.unit * 12)
        increase = eachFixedCost.cost_increase
      });
    });
    {
      saleTrends.map((st, i) => (
        totalFixedCost.push(sum_fixed_cost * ((100 + (increase * i)) / 100))
      ))
    }
    return totalFixedCost
  }

  function calculateYearRange() {
    const yearRange = []
    let yearStart = parseInt(modelConfig.start_date.slice(0, 4));
    for (let i = 0; i < modelConfig.projection_period; i++) {
      yearRange.push(yearStart);
      yearStart += 1;
    }
    return yearRange
  }

  function calculateInvestment() {
    // const totalInvestment = [0, 0, 0];
    // tableExpenseData.investment_tables.map((table) => {
    //   table.investments.map((eachCost) => {
    //     totalInvestment += eachCost.amount;
    //   });
    // });
    // totalInvestment.unshift(totalInvestment)

    let totalCFI = [...Array(yearList.length)].fill(0);

    tableExpenseData.investment_tables.forEach((table) => {
      table.investments.forEach((eachData) => {
        let index = yearList.indexOf(parseInt(eachData.start_date.slice(0, 4)));
        if (index >= 0) {
          totalCFI[index] += eachData.amount;
        }
      });
    });
    totalCFI = totalCFI.map((val) => -val)
    return totalCFI
  }

  function calculateMiscellaneous() {
    // let totalCFI = [...Array(yearList.length)].fill(0);

    // tableExpenseData.investment_tables.forEach((table) => {
    //   table.investments.forEach((eachData) => {
    //     let index = yearList.indexOf(parseInt(eachData.start_date.slice(0, 4)));
    //     if (index >= 0) {
    //       totalCFI[index] += eachData.amount;
    //     }
    //   });
    // });
    // totalCFI = totalCFI.map((val) => -val)
    // return totalCFI

    let totalIncomeDebt = [...Array(yearList.length)].fill(0);
    let totalExpendDebt = [...Array(yearList.length)].fill(0);

    tableMiscellaneousData.equity_contribution.map((table) => {
      let index = yearList.indexOf(parseInt(table.date.slice(0, 4)));
      if (index >= 0) {
        totalIncomeDebt[index] += table.amount;
      }
    })

    tableMiscellaneousData.debt_issuance.map((table) => {
      table.payments.map((eachData) => {
        let index = yearNum.indexOf(parseInt(eachData.year));
        if (index >= 0) {
          totalExpendDebt[index] += eachData.amount;
        }
      })
    })
    totalExpendDebt = totalExpendDebt.map((val) => -val)
    // let netIncome = totalRevenue.map((revenue, index) => revenue - totalFixedCost[index]);
    let netDebt = totalIncomeDebt.map((incomeDept, index) => incomeDept + totalExpendDebt[index]);
    return {
      totalIncomeDebt: totalIncomeDebt,
      totalExpendDebt: totalExpendDebt,
      netDebt: netDebt,
    }
  }

  function calculateCFO() {
    const totalCFO = [];
    let sum_fixed_cost = 0;
    let increase = 0;
    let sum_service_revenue = 0;
    let sum_product_revenue = 0;

    tableRevenueData.service_tables.forEach((tableService) => {
      tableService.services.forEach((eachService) => {
        sum_service_revenue += eachService.revenue_per_service;
      });
    });

    tableRevenueData.product_tables.forEach((tableProduct) => {
      tableProduct.products.forEach((eachProduct) => {
        sum_product_revenue += eachProduct.revenue_per_unit;
      });
    });

    tableExpenseData.fixed_cost_tables.map((tableFixedCost) => {
      tableFixedCost.fixed_costs.map((eachFixedCost) => {
        sum_fixed_cost += eachFixedCost.amount;
        increase = eachFixedCost.cost_increase
      });
    });

    totalCFO.push(sum_service_revenue + sum_product_revenue - sum_fixed_cost);

    for (let i = 1; i < modelConfig.projection_period; i++) {
      sum_fixed_cost += sum_fixed_cost * (increase / 100)
      increase += increase
      totalCFO.push(sum_service_revenue + sum_product_revenue - sum_fixed_cost);
    }
    return totalCFO
  }

  function calculateCFI() {
    const totalCFI = [0, 0, 0];
    let sum_investment = 0;
    tableExpenseData.investment_tables.map((table) => {
      table.investments.map((eachData) => {

        sum_investment += eachData.amount

      })
    })
    totalCFI.unshift(-sum_investment);
    return totalCFI
  }

  function calculateCFI2() {
    let totalCFI = [...Array(yearList.length)].fill(0);

    tableExpenseData.investment_tables.forEach((table) => {
      table.investments.forEach((eachData) => {
        let index = yearList.indexOf(parseInt(eachData.start_date.slice(0, 4)));
        if (index >= 0) {
          totalCFI[index] += eachData.amount;
        }
      });
    });
    totalCFI = totalCFI.map((val) => -val)
    return totalCFI
  }

  function calculateCFF() {
    let totalIncomeDebt = [...Array(yearList.length)].fill(0);
    let totalExpendDebt = [...Array(yearList.length)].fill(0);

    tableMiscellaneousData.equity_contribution.map((table) => {
      let index = yearList.indexOf(parseInt(table.date.slice(0, 4)));
      if (index >= 0) {
        totalIncomeDebt[index] += table.amount;
      }
    })

    tableMiscellaneousData.debt_issuance.map((table) => {
      table.payments.map((eachData) => {
        let index = yearNum.indexOf(parseInt(eachData.year));
        if (index >= 0) {
          totalExpendDebt[index] += eachData.amount;
        }
      })
    })
    totalExpendDebt = totalExpendDebt.map((val) => -val)
    // let netIncome = totalRevenue.map((revenue, index) => revenue - totalFixedCost[index]);
    let totalCFF = totalIncomeDebt.map((incomeDept, index) => incomeDept + totalExpendDebt[index]);
    return {
      totalCFF: totalCFF,
      totalIncomeDebt: totalIncomeDebt,
      totalExpendDebt: totalExpendDebt,
    }
  }


  function calculateNPV(initialInvestment, cashFlows, discountRate) {
    let presentValueOfCashFlows = 0
    for (let i = 0; i < cashFlows.length; i++) {
      presentValueOfCashFlows += cashFlows[i] / Math.pow((1 + discountRate), i + 1)
    }
    const netPresentValue = presentValueOfCashFlows - initialInvestment
    console.log(`NPV : ${initialInvestment} ,[ ${cashFlows} ], ${discountRate}`)

    return netPresentValue.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  }

  function calculatePaybackPeriod(initialInvestment, cashFlows) {
    let cumulativeCashFlow = -initialInvestment // Add the initial investment as a negative cash flow
    let paybackPeriod = 0

    for (let i = 0; i < cashFlows.length; i++) {
      cumulativeCashFlow += cashFlows[i]
      if (cumulativeCashFlow >= 0) {
        paybackPeriod += i + (cumulativeCashFlow - cashFlows[i]) / cashFlows[i + 1]
        break
      }
    }

    return paybackPeriod.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  }

  function calculateProfitabilityIndex(initialInvestment, cashFlows, discountRate) {
    let presentValueOfCashFlows = 0
    for (let i = 0; i < cashFlows.length; i++) {
      presentValueOfCashFlows += cashFlows[i] / Math.pow((1 + discountRate), i + 1)
    }
    const netPresentValue = presentValueOfCashFlows - initialInvestment
    const profitabilityIndex = netPresentValue / initialInvestment
    return profitabilityIndex.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  }

  function calculateInitialInvestment_for_chart() {
    const inv_names = [];
    const inv_amounts = [];
    tableExpenseData.investment_tables.map((table) => {
      table.investments.map((eachCost) => {
        inv_names.push(eachCost.name)
        inv_amounts.push(eachCost.amount)
      });
    });
    return {
      inv_names: inv_names,
      inv_amounts: inv_amounts
    }
  }

  function calculateFixedCost_for_chart() {
    const expense_names = [];
    const expense_amounts = [];
    tableExpenseData.fixed_cost_tables.map((tableFixedCost) => {
      tableFixedCost.fixed_costs.map((eachFixedCost) => {
        expense_names.push(eachFixedCost.name)
        expense_amounts.push(eachFixedCost.amount)
      });
    });
    return {
      expense_names: expense_names,
      expense_amounts: expense_amounts
    }
  }

  function calculateRevenue_service_for_chart() {
    const revenue_service_names = [];
    const revenue_service_amounts = [];
    tableRevenueData.service_tables.map((tableService) => {
      tableService.services.map((eachService) => {
        revenue_service_names.push(eachService.name)
        revenue_service_amounts.push(eachService.revenue_per_service)
      });
    });
    return {
      revenue_service_names: revenue_service_names,
      revenue_service_amounts: revenue_service_amounts
    }
  }

  function calculateRevenue_product_for_chart() {
    const revenue_product_names = [];
    const revenue_product_amounts = [];
    tableRevenueData.product_tables.map((tableProduct) => {
      tableProduct.products.map((eachProduct) => {
        revenue_product_names.push(eachProduct.name)
        revenue_product_amounts.push(eachProduct.revenue_per_unit)
      });
    });
    return {
      revenue_product_names: revenue_product_names,
      revenue_product_amounts: revenue_product_amounts
    }
  }

  function moneyDisplay(amount) {
    if (amount < 0) {
      amount *= (-1)
      return `(${amount.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ",")})`
    }
    else {
      return amount.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    }
  }

  function paybackPeriadDisplay(number) {
    // const number = 4.666666666;
    let wholeNumber = Math.floor(number); // Extract the whole number part

    // Calculate the decimal part with a variable number of decimal places
    const decimalPlaces = 6; // Define the desired number of decimal places dynamically
    const decimalPart = (number - wholeNumber).toFixed(decimalPlaces);

    console.log(wholeNumber); // Output: 4
    console.log(decimalPart); // Output: 0.666667 (rounded to 6 decimal places)

    const month = Math.floor(decimalPart * 12)

    
    if (wholeNumber == 0 && month == 0) {
      return `ข้อมูลไม่เพียงพอ`
    }
    if (wholeNumber == 0) {
      return `คืนทุน ${month} เดือน`
    }
    else {
      if (wholeNumber < 0) {
        wholeNumber *= -1
      }
      return `คืนทุน ${wholeNumber} ปี ${month} เดือน`
    }
  }

  return {
    calculateInvestment, calculateCFO, calculateCFI, calculateCFF, calculateYearRange,
    calculateRevenue, calculateTotalFixdcost, calculateNPV, calculatePaybackPeriod, calculateProfitabilityIndex,
    calculateCFI2, calculateInitialInvestment_for_chart, calculateFixedCost_for_chart, calculateRevenue_service_for_chart,
    calculateRevenue_product_for_chart, calculateMiscellaneous, moneyDisplay, getSaleTrends, calculateRevenue_fix,
    paybackPeriadDisplay,
  };

}






