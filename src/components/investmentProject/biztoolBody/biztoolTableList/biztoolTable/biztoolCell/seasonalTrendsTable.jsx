import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import './cellStyle.css'

const SeasonalTrendsTable = (props) => {
  const selectedProject = useSelector(state => state.projects.selectedProject)

  useEffect(() => {
  }, [selectedProject, props.handleFunction, props.onCellChange])
  
  const monthsName = [
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
  ]

  return (
    <div className='d-flex seasonal-row-style'  >
      {/* {props.data.length} */}
      {props.data.map((each, i) =>
      <div className="d-flex">
        <div className='seasonal-month-style'>
        {monthsName[i]}
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
        <input
          disabled={true}
          value={'%'}
          style={{
            width: `70px`,
            textAlign: `start`,
          }}
          className="column border border-primary biztool-input-cell text-align-start"
        />
        </div>
      )}
    </div>
  )
}

export default SeasonalTrendsTable