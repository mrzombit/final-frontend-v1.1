import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import InitialPeriodMonths from '../../../../initialPeriodMonths'
import './cellStyle.css'

const NumbersTableCell = (props) => {
  const selectedProject = useSelector(state => state.projects.selectedProject)
  const [periodMonthsName, setPeriodMonthsName] = useState(
    InitialPeriodMonths(
      [
        "มกราคม",
        "กุมภาพันธ์",
        "มีนาคม",
        "เมษายน",
        "พฤษภาคม",
        "มิถุนายน",
        "กรกฏาคม",
        "สิงหาคม",
        "กันยายน",
        "ตุลาคม",
        "พฤศจิกายน",
        "ธันวาคม",
      ],
      selectedProject.model_config.start_date,
      selectedProject.model_config.projection_period
    ))


  useEffect(() => {
    setPeriodMonthsName(InitialPeriodMonths(
      [
        "มกราคม",
        "กุมภาพันธ์",
        "มีนาคม",
        "เมษายน",
        "พฤษภาคม",
        "มิถุนายน",
        "กรกฏาคม",
        "สิงหาคม",
        "กันยายน",
        "ตุลาคม",
        "พฤศจิกายน",
        "ธันวาคม",
      ],
      selectedProject.model_config.start_date,
      selectedProject.model_config.projection_period
    ))
  }, [selectedProject, props.handleFunction, props.onCellChange])


  return (
    <div className='d-flex numbers-table-style'  >
      {props.data.map((each, i) =>
        <div className="d-flex">
          <div className='seasonal-month-style'>
            <div>
              <div>
                ปีที่ {periodMonthsName[i].year}: {periodMonthsName[i].month}
              </div>
              {/* <div>
                เดือน 
              </div> */}
            </div>
          </div>
          <input className='seasonal-cell-style'
            value={each}
            onKeyPress={(e) => !/[0-9\b]+/.test(e.key) && e.preventDefault()}
            onChange={e =>
            props.onCellChange(
              props.tableType,
              props.address.tableId,
              props.address.rowId,
              props.colIndex,
              { index: i, value: e.target.value }
            )
          }
          />
        </div>
      )}
    </div>
  )
}

export default NumbersTableCell