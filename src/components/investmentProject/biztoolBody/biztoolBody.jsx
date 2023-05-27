import React, { useEffect } from 'react'
import BiztoolAddTable from '../biztoolAddTable/biztoolAddTable'
import BiztoolTableList from './biztoolTableList/biztoolTableList'
import BIZTOOL_PAGE_CONFIG from '../../../pages/bizTools/pageConfig'
import "./biztoolBody.css" 

const BiztoolBody = (props) => {

  useEffect(() => {
    // console.log(`body !${JSON.stringify(props.tableData)}`);
  }, [])

  return (
    <div className='biztool-body p-2'>
      {props.type.page === BIZTOOL_PAGE_CONFIG.revenue.type.page && <div className='biztool-body-flex '>
        <div className='my-3'>
          <div className='revenue-table-header mb-1'>บริการ/การผลิต</div>
          <div className='ml-4 mb-3'>
          <BiztoolAddTable
            type={props.type.service}
            title="+ ตารางใหม่"
            handleFunction={props.handleServiceFunction}
          />
          </div>
          <BiztoolTableList
            handleTableOptionFunction={props.handleTableOptionFunction}
            handleRowOptionFunction={props.handleRowOptionFunction}
            handleFunction={props.handleServiceFunction}
            tableHeaderOnChange={props.tableHeaderOnChange}
            addRowHandle={props.addRowHandle}
            onCellChange={props.onCellChange}
            data={props.tableData.service_tables}
            type={props.type.service}
            tableStyle={props.tableStyle.serviceTableStyle}
          />
        </div>
        <div>
          <div className='revenue-table-header mb-1'>การขายสินค้า</div>
          <div className='ml-4 mb-3'>
          <BiztoolAddTable
            type={props.type.product}
            title="+ ตารางใหม่"
            handleFunction={props.handleProductFunction}
          />
          </div>
          <BiztoolTableList
            handleTableOptionFunction={props.handleTableOptionFunction}
            handleRowOptionFunction={props.handleRowOptionFunction}
            handleFunction={props.handleProductFunction}
            tableHeaderOnChange={props.tableHeaderOnChange}
            addRowHandle={props.addRowHandle}
            onCellChange={props.onCellChange}
            data={props.tableData.product_tables}
            type={props.type.product}
            tableStyle={props.tableStyle.productTableStyle}
          />
        </div>
      </div>}

      {props.type.page === BIZTOOL_PAGE_CONFIG.miscellaneous.type.page && <div className='biztool-body-flex '>
      <div className='my-3'>
          <div className='miscellaneous-table-header mb-1'>ผู้ถือหุ้น</div>
          <BiztoolTableList
            handleRowOptionFunction={props.handleRowOptionFunction}
            addRowHandle={props.addRowHandle}
            onCellChange={props.onCellChange}
            data={props.tableData.equity_contribution_tables}
            type={props.type.equityContribution}
            tableStyle={props.tableStyle.equityContributionTableStyle}
          />
        </div>
        <div>
          <div className='miscellaneous-table-header mb-1'>ผู้รับปันผล</div>
          <BiztoolTableList
            handleRowOptionFunction={props.handleRowOptionFunction}
            addRowHandle={props.addRowHandle}
            onCellChange={props.onCellChange}
            data={props.tableData.equity_repayment_tables}
            allData={props.tableData}
            type={props.type.equityRepayment}
            tableStyle={props.tableStyle.equityRepaymentTableStyle}
          />
        </div>
        <div>
          <div className='miscellaneous-table-header mb-1'>เงินกู้และการชำระเงินกู้</div>
          <BiztoolTableList
            handleRowOptionFunction={props.handleRowOptionFunction}
            addRowHandle={props.addRowHandle}
            onCellChange={props.onCellChange}
            data={props.tableData.debt_issuance_tables}
            type={props.type.debtIssuance}
            tableStyle={props.tableStyle.debtIssuanceTableStyle}
            setRepaymentPopupStateFunction={props.setRepaymentPopupStateFunction}
          />
        </div>
      </div>}

      {props.type.page !==BIZTOOL_PAGE_CONFIG.revenue.type.page &&
        props.type.page !==BIZTOOL_PAGE_CONFIG.miscellaneous.type.page &&
        props.type.page !==BIZTOOL_PAGE_CONFIG.miscellaneous.type.page &&
        props.type.page !==BIZTOOL_PAGE_CONFIG.projectConfig.type.page &&
        props.type.page !==BIZTOOL_PAGE_CONFIG.ffc.type.page &&
        props.type.page !==BIZTOOL_PAGE_CONFIG.statement.type.page &&
        <div className='biztool-body-flex '>
          <BiztoolTableList
            handleTableOptionFunction={props.handleTableOptionFunction}
            handleRowOptionFunction={props.handleRowOptionFunction}
            handleFunction={props.handleFunction}
            tableHeaderOnChange={props.tableHeaderOnChange}
            addRowHandle={props.addRowHandle}
            onCellChange={props.onCellChange}
            data={props.tableData}
            type={props.type.page}
            tableStyle={props.tableStyle}
          />
        </div>}
    </div>
  )
}

export default BiztoolBody