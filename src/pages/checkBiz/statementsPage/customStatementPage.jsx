import React from 'react'
import BizSidebar from '../../../components/bizTools/bizSidebar/bizSidebar'
import StatementHearder from '../../../components/statement/statementHearder';
import "./statementsPage.css";
import FFCCard from '../../../components/ffc/ffcCard/ffcCard';

const customStatementPage = () => {
  return (
    <div className='d-flex'>
      <BizSidebar />
      <div className="p-4 biztool-body-width">
        <StatementHearder title="Custom Statement" />
        <div className='d-flex justify-content-center'>
          <div className='custom-statement-body'>
            <FFCCard
              type="total-investment"
              tableName="Capital need"
            />
            <FFCCard
              type="expense"
              tableName="Expense"
            />
            <FFCCard
              type="revenue-service"
              tableName="Revenue Service"
            />
            <FFCCard
              type="revenue-product"
              tableName="Revenue Product"
            />
            <FFCCard
              type="cashflow"
              tableName="Cashflows"
            />
            <FFCCard
              type="financial-return"
              tableName="Financial Returns"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default customStatementPage;
