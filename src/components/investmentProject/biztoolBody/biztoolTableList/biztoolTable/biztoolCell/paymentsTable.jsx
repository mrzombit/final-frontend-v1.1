import React from 'react'
import { useSelector } from 'react-redux'
import BIZTOOL_PAGE_CONFIG from '../../../../../../pages/bizTools/pageConfig'
import KCalulateFunctions from '../../../../../common/kCalulator'
import InputCell from './inputCell'

const PaymentsTable = (props) => {
  const selectedProject = useSelector(state => state.projects.selectedProject)

  return (
    <div className='mt-4'>
      <div className='d-flex mb-2'>
        <div>จำนวนยอดหนี้คงเหลือที่ยังไม่ระบุปีที่จะคืนเงินต้น :</div>
        <div className='fw-bold text-danger'>&nbsp;{KCalulateFunctions.getRemainDebt(props.data)}</div>
      </div>
      <div className='d-flex'>
        <div style={{ width: "200px" }}>
          <div className='bg-dark text-light border border-light d-flex justify-content-center align-items-center' style={{ height: "100px", width: "200px" }}>รายการที่กู้ยืม</div>
          {props.data.map((eachRow, index) =>
            <InputCell
              disabled={true}
              data={eachRow.name}
              type="text"
              width={200} />
          )}
          <div className='bg-secondary text-light border border-light d-flex justify-content-center align-items-center' style={{ height: "50px", width: "200px" }}>
            จำนวนยอดหนี้ตกค้างรวม
          </div>
        </div>

        <div style={{ overflowX: "scroll",}}>
          <div className='bg-dark text-light border border-light d-flex justify-content-center align-items-center' style={{ height: "50px", width: "400px", overflow: 'hidden', }}>การชำระเงินต้น</div>
          <div style={{ minWidth: "400px", overflowX: "scroll", overflowY: 'hidden'}}>
            <div className='d-flex ' style={{ height: "50px" }}>
              {[...Array(selectedProject.model_config.projection_period)].map((a, index) =>
                <div key={index} className='bg-primary border border-light d-flex justify-content-center align-items-center'
                  style={{ height: "50px", minWidth: "200px" }}>ปีที่ {index + 1}</div>
              )}
            </div>
            {props.data.map((eachDebt, index) =>
              <div className='d-flex' key={eachDebt._id} >
                {eachDebt.payments.map((eachPayment, index) =>
                  <InputCell
                    key={index}
                    tableType={BIZTOOL_PAGE_CONFIG.miscellaneous.type.debtIssuance}
                    address={
                      {
                        tableId: '',
                        rowId: eachDebt._id,
                      }}
                    colIndex={5}
                    onCellChange={props.onCellChange}
                    data={eachPayment}
                    type="number"
                    subType="repayment"
                    width={200} />
                )}

              </div>
            )}
            <div className='d-flex' >
            {[...Array(selectedProject.model_config.projection_period)].map((a, index) =>
              <div className="border border-dark d-flex justify-content-center align-items-center" style={{ backgroundColor: "#eeeeee", height: "50px", minWidth: "200px" }}>
                {KCalulateFunctions.getRemainDebtYearly(props.data, index + 1)}
              </div>
            )}
             </div>

          </div>
        </div>
      </div>
    </div>
  )
}

export default PaymentsTable