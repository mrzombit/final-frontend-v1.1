import React, { useEffect, useState } from 'react'
import Dropdown from 'react-bootstrap/Dropdown';
import { useSelector } from 'react-redux';
import BIZTOOL_PAGE_CONFIG from '../../../../../../pages/bizTools/pageConfig';
import "./cellStyle.css"

const DropdownCell = (props) => {

  const selectedProject = useSelector(state => state.projects.selectedProject)
  const periods = useSelector(state => state.periods.periods)
  const assetAccounts = useSelector(state => state.assetAccounts.assetAccounts)
  const [dropdownOptions, setDropdownOptions] = useState([])
  const [isLoaded, setIsLoaded] = useState(false)
  const [selectedPeriod, setSelectedPeriod] = useState()
  const [selectedCostIncreasePeriod, setSelectedCostIncreasePeriod] = useState()
  const [selectedCostIncrease, setSelectedCostIncrease] = useState()
  const [selectedAssetAccount, setSelectedAssetAccount] = useState()

  const setAllValue = async () => {
    await setSelectedPeriod({
      value: props.data,
      label: periods.find(each => props.data === each._id)
    })
    await setSelectedCostIncreasePeriod({
      value: props.data.cost_increase_period_id,
      label: periods.find(each => props.data.cost_increase_period_id === each._id)
    })
    await setSelectedCostIncrease(props.data.cost_increase)
    await setSelectedAssetAccount({
      value: props.data,
      label: assetAccounts.find(each => props.data === each._id)
    })
  }
  useEffect(() => {
    if (!isLoaded) {
      let shallowOptions = []
      if (props.type !== 'asset-account-dropdown') {
        shallowOptions = periods.map(each => {
          return { value: each._id, label: each.name.th }
        })
      }
      else if (props.type === 'asset-account-dropdown') {
        shallowOptions = assetAccounts.map(each => {
          return { value: each._id, label: each.name.th }
        })
      }
      setDropdownOptions(shallowOptions)
      setAllValue()
      setIsLoaded(true)
    }
    setAllValue()
  }, [dropdownOptions, selectedProject, props.onCellChange, props.handleFunction])

  //date. setFullYear(date. getFullYear() + 1)

  return (
    <div style={{ width: `${props.width}px`, borderRaduis: `${props.lastRow ?`lastRow ${props.corner}`:"none"}`}}>
      {isLoaded && <>{props.type === 'period-dropdown' &&
        <Dropdown
          onSelect={(valueKey) => props.tableType !== BIZTOOL_PAGE_CONFIG.miscellaneous.type.equityRepayment ?
            props.onCellChange(props.tableType, props.address.tableId, props.address.rowId, props.colIndex, valueKey) :
            props.onCellChange(props.tableType, props.address.tableId, props.address.rowId, props.colIndex, { periodId: valueKey, startDate: props.startDate })
          }
          style={{
            width: `${props.width}px`,
          }}
        >
          <Dropdown.Toggle className='biztool-input-cell' id="dropdown-autoclose-true">
            {/* {JSON.stringify(selectedPeriod)} */}
            {selectedPeriod ? selectedPeriod.label.name.th : "loading"}
          </Dropdown.Toggle>
          <Dropdown.Menu className='biztool-input-cell-no-border'>
            {dropdownOptions && dropdownOptions.map((option) => (
              <Dropdown.Item
                key={option.value}
                className='biztool-input-cell-no-border'
                eventKey={option.value}
                style={{
                  width: `${props.width}px`,
                }}
              >
                {option.label}
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>
      }
        {props.type === 'cost-increase-dropdown' &&
          <div className='d-flex border border-primary biztool-input-cell'>
            <input
              className='biztool-input-cell-no-border'
              id={'cost-increase-input'}
              type='text'
              value={selectedCostIncrease}
              onKeyPress={(e) => !/[0-9\b]+/.test(e.key) && e.preventDefault()}
              format={"## %"}
              onChange={e => props.onCellChange(
                props.tableType,
                props.address.tableId,
                props.address.rowId,
                props.colIndex,
                {
                  type: "cost-increase-dropdown",
                  // cost_increase: e.target.value.toString().replace('%',''), 
                  cost_increase: e.target.value.replace('%', ''),
                },
              )}
            />
            <Dropdown
              className='biztool-input-cell'
              onSelect={(valueKey) =>
                props.onCellChange(
                  props.tableType,
                  props.address.tableId,
                  props.address.rowId,
                  props.colIndex,
                  {
                    type: "cost-increase-period-id-dropdown",
                    // cost_increase: e.target.value.toString().replace('%',''), 
                    cost_increase_period_id: valueKey,
                  },)}
              // onSelect={(valueKey) => alert(props.colIndex)}
              style={{
                width: `${props.width}px`,
              }}
            >
              <Dropdown.Toggle className='biztool-input-cell-no-border' id="dropdown-autoclose-true">
                {selectedCostIncreasePeriod ? selectedCostIncreasePeriod.label.name.th : "Loading"}
                {/* {JSON.stringify(selectedCostIncreasePeriod)} */}
              </Dropdown.Toggle>
              <Dropdown.Menu className='biztool-input-cell'>
                {dropdownOptions && dropdownOptions.map((option) => (
                  <Dropdown.Item
                    key={option.value}
                    className='biztool-input-cell-no-border'
                    eventKey={option.value}
                    style={{
                      width: `${props.width}px`,
                    }}
                  >
                    {option.label}
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>
          </div>
        }
        {props.type === 'asset-account-dropdown' &&
          <Dropdown
            className='biztool-input-cell-no-border'
            onSelect={(valueKey) =>
              props.onCellChange(props.tableType, props.address.tableId, props.address.rowId, props.colIndex, valueKey)
            }
            style={{
              width: `${props.width}px`,
            }}
          >
            <Dropdown.Toggle className='biztool-input-cell' id="dropdown-autoclose-true">
              {selectedAssetAccount ? selectedAssetAccount.label.name.th : "Loading"}
              {/* {JSON.stringify(selectedAssetAccount)} */}

            </Dropdown.Toggle>
            <Dropdown.Menu className='biztool-input-cell-no-border'>
              {dropdownOptions && dropdownOptions.map((option) => (
                <Dropdown.Item
                  key={option.value}
                  className='biztool-input-cell-no-border'
                  eventKey={option.value}
                  style={{
                    width: `${props.width}px`,
                  }}
                >
                  {option.label}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
        }
      </>}
    </div>
  )
}

export default DropdownCell