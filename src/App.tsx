import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "./App.css";

import MainSidebar from "./components/common/mainSidebar/mainSidebar";
import LandingPage from "./pages/landingPage/landingPage";
import LoginPage from "./pages/loginPage/loginPage";
import RegisterPage from "./pages/registerPage/registerPage";

import WorkSpacePage from "./pages/workSpacePage/workSpacePage"; //
import CreateNewProject from "./pages/createNewProjectPage/createNewProject"; //
import ProjectConfigPage from "./pages/bizTools/projectConfigPage/projectConfigPage"; //
import TotalInvestmentPage from "./pages/bizTools/totalInvestmentPage/totalInvestmentPage";//
import OperationCostPage from "./pages/bizTools/operationCostPage/operationCostPage";//
import RevenuePage from "./pages/bizTools/revenuePage/revenuePage";//
import MiscellaneousPage from "./pages/bizTools/miscellaneousPage/miscellaneousPage";//
import FFCPage from "./pages/checkBiz/ffcPage/ffcPage";//

import StatementsPage from "./pages/checkBiz/statementsPage/statementsPage";//
import CashFlowStatement from "./pages/checkBiz/statementsPage/cashFlowStatementPage";//
import CashflowChartPage from "./pages/checkBiz/statementsPage/chartPages/cashflowChartPage";//
import ProfitLossStatement from "./pages/checkBiz/statementsPage/profitLossStatement";
import IncomeChartPage from "./pages/checkBiz/statementsPage/chartPages/incomeChartPage";
import PleaseLogin from "./pages/landingPage/pleaseLogin";

import { useDispatch, useSelector } from "react-redux";
import store from "./app/store";
import { fetchAssetAccounts } from "./features/assetAccountsSlice";
import { fetchBusinessGoals } from "./features/businessGoalsSlice";
import { fetchCurrencies } from "./features/currenciesSlice";
import { fetchIndustries } from "./features/industriesSlice";
import { fetchPeriods } from "./features/periodsSlice";
import { fetchSubscriptionPlans } from "./features/substriptionPlansSlice";
import { fetchProjectTemplates } from "./features/projectTemplatesSlice";

function App() {
  type RootState = ReturnType<typeof store.getState>;
  const dispatch = useDispatch<typeof store.dispatch>();
  const isLoggedIn = useSelector<RootState, boolean>(
    (state) => state.users.auth.isLoggedIn
  );

  useEffect(() => {
    dispatch(fetchAssetAccounts());
    dispatch(fetchBusinessGoals());
    dispatch(fetchCurrencies());
    dispatch(fetchIndustries());
    dispatch(fetchPeriods());
    dispatch(fetchProjectTemplates());
    dispatch(fetchSubscriptionPlans());
  }, []);

  return (
    <Router>
      <div className="root-style">
        <MainSidebar />
        <div>
          {isLoggedIn ? (
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/Login" element={<LoginPage />} />
              <Route path="/Register" element={<RegisterPage />} />
              <Route path="/WorkSpace" element={<WorkSpacePage />} />
              <Route path="/CreateProject" element={<CreateNewProject />} />
              <Route path="/ProjectConfig" element={<ProjectConfigPage />} />
              <Route path="/TotalInvestment" element={<TotalInvestmentPage />} />
              <Route path="/OperationCost" element={<OperationCostPage />} />
              <Route path="/Revenue" element={<RevenuePage />} />
              <Route path="/Miscellaneous" element={<MiscellaneousPage />} />
              <Route path="/FFC" element={<FFCPage />} />
              <Route path="/Statements" element={<StatementsPage/>} />
              <Route path="/CashFlowStatements" element={<CashFlowStatement />} />
              <Route path="/ProfitLossStatements" element={<ProfitLossStatement />}/>
              <Route path="/Chart/cashflow" element={<CashflowChartPage />} />
              <Route path="/Chart/income" element={<IncomeChartPage />} />

              <Route path="*" element={<LandingPage />} />
            </Routes>
          ) : (
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/Login" element={<LoginPage />} />
              <Route path="/Register" element={<RegisterPage />} />
              <Route path="/WorkSpace" element={<WorkSpacePage />} />
              <Route path="*" element={<PleaseLogin />} />
            </Routes>
          )}
        </div>
      </div>
    </Router>
  );
}

export default App;
