import React from 'react'
import DropdownCell from './dropdownCell'
import InputCell from './inputCell'

const RepaymentsTable = (props) => {

  // onCellChange = (tableType, tableId, rowId, columnIndex, value)
  return (
    <div className='d-flex'>
      <input className='seasonal-cell-style border border-primary'type="text" value="รอบการปันผล" style={{width: `130px` , borderRaduis: `${props.lastRow ?`lastRow ${props.corner}`:"none"}`}} disabled/>
      <DropdownCell
        handleFunction={props.handleFunction}
        data={props.data.period_id}
        type={"period-dropdown"}
        colIndex={props.colIndex}
        tableType={props.tableType}
        onCellChange={props.onCellChange}
        address={props.address}
        startDate={props.data.start_date}
        width={200} />
      <InputCell
        handleFunction={props.handleFunction}
        data={props.data.start_date}
        type="date"
        periodId={props.data.period_id}
        colIndex={props.colIndex}
        tableType={props.tableType}
        onCellChange={props.onCellChange}
        address={props.address}
        width={150} />
    </div>
  )
}

export default RepaymentsTable