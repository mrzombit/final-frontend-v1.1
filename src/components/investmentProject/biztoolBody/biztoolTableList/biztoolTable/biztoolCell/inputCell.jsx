import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import BIZTOOL_PAGE_CONFIG from '../../../../../../pages/bizTools/pageConfig'
import timeToShow from '../../../../../common/timeToShow'

const InputCell = (props) => {
  const selectedProject = useSelector(state => state.projects.selectedProject)

  useEffect(() => {

  }, [selectedProject, props.handleFunction])


  return (
    <div className='d-flex' style={{ width: `${props.width}px` , borderRaduis: `${props.lastRow ?`lastRow ${props.corner}`:"none"}`}}>
      <input
        type={props.type === 'date' ? 'date' : 'text'}
        id='this-cell-input'
        className="column border border-primary biztool-input-cell"
        style={{
          width: `${props.width - ((props.type === 'text' || props.type === 'number' || props.type === 'date') ? 0 :
            props.type === 'unit' ? 100 : 70)}px`,
          textAlign: `start`,
        }}
        disabled={props.disabled ? true : false}
        onKeyPress={(props.type === 'percent' || props.type === 'number' || props.type === 'money' || props.type === 'date' || props.type === 'unit') ? (e) => !/[0-9\b]+/.test(e.key) && e.preventDefault() : null}
        onChange={e =>
          props.type === 'date' ?
            props.tableType !== BIZTOOL_PAGE_CONFIG.miscellaneous.type.equityRepayment ?
              props.onCellChange(props.tableType, props.address.tableId !== undefined ? props.address.tableId : '', props.address.rowId, props.colIndex, e.target.value) :
              props.onCellChange(props.tableType, '', props.address.rowId, props.colIndex, { periodId: props.periodId, startDate: e.target.value })
            :
            props.type === 'number' ?
              props.subType !== 'repayment' ?
                props.onCellChange(props.tableType, props.address.tableId !== undefined ? props.address.tableId : '', props.address.rowId, props.colIndex, e.target.value) :
                props.onCellChange(props.tableType, '', props.address.rowId, props.colIndex, { year: props.data.year, amount: e.target.value }) :
              props.type === 'unit' ? props.onCellChange(props.tableType, props.address.tableId !== undefined ? props.address.tableId : '', props.address.rowId, props.colIndex, { unit: e.target.value, unitName: props.data.unitName }) :
                props.type === 'money' ? props.onCellChange(props.tableType, props.address.tableId !== undefined ? props.address.tableId : '', props.address.rowId, props.colIndex, e.target.value.replace(',', '')) :
                  props.type === 'text' ? props.onCellChange(props.tableType, props.address.tableId !== undefined ? props.address.tableId : '', props.address.rowId, props.colIndex, e.target.value) :
                    props.type === 'percent' ? props.onCellChange(props.tableType, props.address.tableId !== undefined ? props.address.tableId : '', props.address.rowId, props.colIndex, e.target.value.replace('%', '')) :
                      alert('wrong type')
        }
        value={props.type === 'date' ? timeToShow("input-date",
          props.data) :
          props.type === 'number' ?
            props.subType !== 'repayment' ? props.data : props.data.amount :
            props.type === 'unit' ? props.data.unit :
              props.type === 'money' ? props.data.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") :
                props.type === 'text' ? props.data :
                  props.type === 'percent' ? `${props.data}` :
                    'wrong type'
        }
      />
      {(props.type === 'text' || props.type === 'number' || props.type === 'date') ? null : props.type === 'unit' ?
        <input
          type='text'
          className="column border border-primary biztool-input-cell"
          style={{
            width: `100px`,
            textAlign: `start`,
          }}
          value={props.data.unitName}
          onChange={e => props.onCellChange(props.tableType, props.address.tableId !== undefined ? props.address.tableId : '', props.address.rowId, props.colIndex, { unit: props.data.unit, unitName: e.target.value })}
        /> :
        <input
          disabled={true}
          value={props.type === 'money' ? 'บาท' :
            props.type === 'percent' ? '%' : ''}
          style={{
            width: `70px`,
            textAlign: `start`,
          }}
          className="column border border-primary biztool-input-cell text-align-start"
        />
      }
    </div>
  )
}

export default InputCell