import React, { useState } from 'react'
import BIZTOOL_PAGE_CONFIG from '../../../../../pages/bizTools/pageConfig'
import InputCell from './biztoolCell/inputCell'//
import DropdownCell from './biztoolCell/dropdownCell';
import RepaymentsTable from './biztoolCell/repaymentsTable';
import SeasonalTrendsTable from './biztoolCell/seasonalTrendsTable';
import OptionCell from './biztoolCell/optionCell';
import KCalulateFunctions from '../../../../common/kCalulator';

const BiztoolRow = (props) => {

    const [showOption, setShowOption] = useState(false)


    const columnStyles = props.tableStyle.column.map((each) => ({
        width: each.width,
        color: each.color,
        type: each.type,
        backgroundColor: each.backgroundColor,
    }));

    return (
        <div className={`eachRow-div-style ${props.lastRow?"lastRow":""}`}>
            {props.type === BIZTOOL_PAGE_CONFIG.totalInvestment.type.page &&
                <div className='d-flex' onMouseEnter={() => setShowOption(true)} onMouseLeave={() => setShowOption(false)}>
                    <OptionCell
                        showOption={showOption}
                        colIndex={'option'}
                        tableType={props.type}
                        address={props.address}
                        handleRowOptionFunction={props.handleRowOptionFunction}
                    />
                    <InputCell
                       lastRow={props.lastRow}
                       corner="leftCorner"
                        handleFunction={props.handleFunction}
                        data={props.data.name}
                        type="text"
                        colIndex={0}
                        tableType={props.type}
                        onCellChange={props.onCellChange}
                        address={props.address}
                        width={columnStyles[0].width} />
                    <InputCell
                        handleFunction={props.handleFunction}
                        data={props.data.amount}
                        colIndex={1}
                        type="money"
                        tableType={props.type}
                        onCellChange={props.onCellChange}
                        address={props.address}
                        width={columnStyles[1].width} />
                    <DropdownCell
                        handleFunction={props.handleFunction}
                        data={props.data.account_id}
                        tableType={props.type}
                        colIndex={2}
                        type="asset-account-dropdown"
                        onCellChange={props.onCellChange}
                        address={props.address}
                        width={columnStyles[2].width} />
                    <InputCell
                        lastRow={props.lastRow}
                        corner="rightCorner"
                        handleFunction={props.handleFunction}
                        data={props.data.start_date}
                        tableType={props.type}
                        colIndex={3}
                        type="date"
                        onCellChange={props.onCellChange}
                        address={props.address}
                        width={columnStyles[3].width} />

                </div>
            }
            {props.type === BIZTOOL_PAGE_CONFIG.operationCost.type.page &&
                <div className='d-flex' onMouseEnter={() => setShowOption(true)} onMouseLeave={() => setShowOption(false)}>
                    <OptionCell
                        showOption={showOption}
                        colIndex={'option'}
                        tableType={props.type}
                        address={props.address}
                        handleRowOptionFunction={props.handleRowOptionFunction}
                    />
                    <InputCell
                        lastRow={props.lastRow}
                        corner="leftCorner"
                        handleFunction={props.handleFunction}
                        data={props.data.name}
                        type="text"
                        colIndex={0}
                        tableType={props.type}
                        onCellChange={props.onCellChange}
                        address={props.address}
                        width={columnStyles[0].width} />
                    <InputCell
                        handleFunction={props.handleFunction}
                        data={props.data.unit}
                        type="number"
                        colIndex={1}
                        tableType={props.type}
                        onCellChange={props.onCellChange}
                        address={props.address}
                        width={columnStyles[1].width} />
                    <InputCell
                        handleFunction={props.handleFunction}
                        data={props.data.amount}
                        type="money"
                        colIndex={2}
                        tableType={props.type}
                        onCellChange={props.onCellChange}
                        address={props.address}
                        width={columnStyles[2].width} />
                    <DropdownCell
                        handleFunction={props.handleFunction}
                        data={props.data.period_id}
                        type="period-dropdown"
                        colIndex={3}
                        tableType={props.type}
                        onCellChange={props.onCellChange}
                        address={props.address}
                        width={columnStyles[3].width} />
                    <DropdownCell
                        handleFunction={props.handleFunction}
                        data={{ cost_increase: props.data.cost_increase, cost_increase_period_id: props.data.cost_increase_period_id }}
                        type="cost-increase-dropdown"
                        colIndex={4}
                        tableType={props.type}
                        onCellChange={props.onCellChange}
                        address={props.address}
                        width={columnStyles[4].width} />
                    <InputCell
                        lastRow={props.lastRow}
                        corner="rightCorner"
                        handleFunction={props.handleFunction}
                        data={props.data.start_date}
                        type="date"
                        colIndex={5}
                        tableType={props.type}
                        onCellChange={props.onCellChange}
                        address={props.address}
                        width={columnStyles[5].width} />
                </div>
            }
            {props.type === BIZTOOL_PAGE_CONFIG.revenue.type.service &&
                <div className='d-flex' onMouseEnter={() => setShowOption(true)} onMouseLeave={() => setShowOption(false)}>

                    <OptionCell
                        showOption={showOption}
                        colIndex={'option'}
                        tableType={props.type}
                        address={props.address}
                        handleRowOptionFunction={props.handleRowOptionFunction}
                    />
                    <InputCell
                        lastRow={props.lastRow}
                        corner="leftCorner"
                        handleFunction={props.handleFunction}
                        data={props.data.name}
                        type="text"
                        colIndex={0}
                        tableType={props.type}
                        onCellChange={props.onCellChange}
                        address={props.address}
                        width={columnStyles[0].width} />
                    <InputCell
                        handleFunction={props.handleFunction}
                        data={{ unit: props.data.unit, unitName: props.data.unit_name }}
                        type="unit"
                        colIndex={1}
                        tableType={props.type}
                        onCellChange={props.onCellChange}
                        address={props.address}
                        width={columnStyles[1].width} />
                    <InputCell
                        handleFunction={props.handleFunction}
                        data={props.data.serve_per_unit}
                        type="number"
                        colIndex={2}
                        tableType={props.type}
                        onCellChange={props.onCellChange}
                        address={props.address}
                        width={columnStyles[2].width} />
                    <InputCell
                        handleFunction={props.handleFunction}
                        data={props.data.revenue_per_service}
                        type="money"
                        colIndex={3}
                        tableType={props.type}
                        onCellChange={props.onCellChange}
                        address={props.address}
                        width={columnStyles[3].width} />
                    <InputCell
                        handleFunction={props.handleFunction}
                        data={props.data.cost_per_service}
                        type="percent"
                        colIndex={4}
                        tableType={props.type}
                        onCellChange={props.onCellChange}
                        address={props.address}
                        width={columnStyles[4].width} />
                    {/* <DropdownCell
                        handleFunction={props.handleFunction}
                        data={{ cost_increase: props.data.price_increase, cost_increase_period_id: props.data.price_increase_period_id }}
                        type="cost-increase-dropdown"
                        colIndex={6}
                        tableType={props.type}
                        onCellChange={props.onCellChange}
                        address={props.address}
                        width={columnStyles[6].width} /> */}
                    {/* <DropdownCell
                        handleFunction={props.handleFunction}
                        data={{ cost_increase: props.data.cost_increase, cost_increase_period_id: props.data.cost_increase_period_id }}
                        type="cost-increase-dropdown"
                        colIndex={7}
                        tableType={props.type}
                        onCellChange={props.onCellChange}
                        address={props.address}
                        width={columnStyles[7].width} /> */}
                    <InputCell
                        lastRow={props.lastRow}
                        corner="rightCorner"
                        handleFunction={props.handleFunction}
                        data={props.data.start_date}
                        type="date"
                        colIndex={5}
                        tableType={props.type}
                        onCellChange={props.onCellChange}
                        address={props.address}
                        width={columnStyles[5].width} />
                </div>
            }
            {props.type === BIZTOOL_PAGE_CONFIG.revenue.type.product &&
                <div className='d-flex' onMouseEnter={() => setShowOption(true)} onMouseLeave={() => setShowOption(false)}>

                    <OptionCell
                        showOption={showOption}
                        colIndex={'option'}
                        tableType={props.type}
                        address={props.address}
                        handleRowOptionFunction={props.handleRowOptionFunction}
                    />
                    <InputCell
                        lastRow={props.lastRow}
                        corner="leftCorner"
                        handleFunction={props.handleFunction}
                        data={props.data.name}
                        type="text"
                        colIndex={0}
                        tableType={props.type}
                        onCellChange={props.onCellChange}
                        address={props.address}
                        width={columnStyles[0].width} />
                    {/* <InputCell
                        handleFunction={props.handleFunction}
                        data={props.data.days_of_inventory.months}
                        type="number"
                        colIndex={1}
                        tableType={props.type}
                        onCellChange={props.onCellChange}
                        address={props.address}
                        width={columnStyles[1].width} /> */}
                    <InputCell
                        handleFunction={props.handleFunction}
                        data={props.data.revenue_per_unit}
                        type="money"
                        colIndex={1}
                        tableType={props.type}
                        onCellChange={props.onCellChange}
                        address={props.address}
                        width={columnStyles[1].width} />
                    <InputCell
                        handleFunction={props.handleFunction}
                        data={props.data.cost_per_unit}
                        type="percent"
                        colIndex={2}
                        tableType={props.type}
                        onCellChange={props.onCellChange}
                        address={props.address}
                        width={columnStyles[2].width} />
                    {/* <DropdownCell
                        handleFunction={props.handleFunction}
                        data={{ cost_increase: props.data.price_increase, cost_increase_period_id: props.data.price_increase_period_id }}
                        type="cost-increase-dropdown"
                        colIndex={4}
                        tableType={props.type}
                        onCellChange={props.onCellChange}
                        address={props.address}
                        width={columnStyles[4].width} />
                    <DropdownCell
                        handleFunction={props.handleFunction}
                        data={{ cost_increase: props.data.cost_increase, cost_increase_period_id: props.data.cost_increase_period_id }}
                        type="cost-increase-dropdown"
                        colIndex={5}
                        tableType={props.type}
                        onCellChange={props.onCellChange}
                        address={props.address}
                        width={columnStyles[5].width} /> */}
                    <InputCell
                        handleFunction={props.handleFunction}
                        data={props.data.start_date}
                        type="date"
                        colIndex={3}
                        tableType={props.type}
                        onCellChange={props.onCellChange}
                        address={props.address}
                        width={columnStyles[3].width} />
                    <SeasonalTrendsTable
                        lastRow={props.lastRow}
                        corner="rightCorner"
                        handleFunction={props.handleFunction}
                        data={props.data.seasonal_trends}
                        type="seasonal-trends-table"
                        colIndex={4}
                        tableType={props.type}
                        onCellChange={props.onCellChange}
                        address={props.address}
                        width={columnStyles[4].width} />
                </div>
            }
            {props.type === BIZTOOL_PAGE_CONFIG.miscellaneous.type.equityContribution &&
                <div className='d-flex' onMouseEnter={() => setShowOption(true)} onMouseLeave={() => setShowOption(false)}>

                    <OptionCell
                        showOption={props.data.name!=='ฉัน'?showOption:false}
                        colIndex={'option'}
                        tableType={props.type}
                        address={props.address}
                        handleRowOptionFunction={props.handleRowOptionFunction}
                    />
                    <InputCell
                        lastRow={props.lastRow}
                        corner="leftCorner"
                        disabled={props.data.name!=='ฉัน'?false:true}
                        handleFunction={props.handleFunction}
                        data={props.data.name}
                        type="text"
                        colIndex={0}
                        tableType={props.type}
                        onCellChange={props.onCellChange}
                        address={props.address}
                        width={columnStyles[0].width} />
                    <InputCell
                        handleFunction={props.handleFunction}
                        data={props.data.amount}
                        type="money"
                        colIndex={1}
                        tableType={props.type}
                        onCellChange={props.onCellChange}
                        address={props.address}
                        width={columnStyles[1].width} />
                    <InputCell
                        lastRow={props.lastRow}
                        corner="rightCorner"
                        handleFunction={props.handleFunction}
                        data={props.data.date}
                        type="date"
                        colIndex={2}
                        tableType={props.type}
                        onCellChange={props.onCellChange}
                        address={props.address}
                        width={columnStyles[2].width} />
                </div>
            }
            {props.type === BIZTOOL_PAGE_CONFIG.miscellaneous.type.equityRepayment &&
                <div className='d-flex' onMouseEnter={() => setShowOption(true)} onMouseLeave={() => setShowOption(false)}>
                    <OptionCell
                        showOption={false}
                        isTable={true}
                        colIndex={'option'}
                        tableType={props.type}
                        address={props.address}
                    />
                    <InputCell
                        lastRow={props.lastRow}
                        corner="leftCorner"
                        disabled ={true}
                        handleFunction={props.handleFunction}
                        data={props.data.name}
                        type="text"
                        colIndex={0}
                        tableType={props.type}
                        onCellChange={props.onCellChange}
                        address={props.address}
                        width={columnStyles[0].width} />
                    <InputCell
                        disabled ={true}
                        handleFunction={props.handleFunction}
                        data={KCalulateFunctions.getEquityShare(props.allData, props.data.amount, props.data.name==='ฉัน')}
                        type="percent"
                        colIndex={1}
                        tableType={props.type}
                        onCellChange={props.onCellChange}
                        address={props.address}
                        width={columnStyles[1].width} />
                    <RepaymentsTable
                        lastRow={props.lastRow}
                        corner="rightCorner"
                        handleFunction={props.handleFunction}
                        data={props.data.repayment}
                        type="repayments-table"
                        colIndex={2}
                        tableType={props.type}
                        address={props.address}
                        onCellChange={props.onCellChange}
                        width={columnStyles[2].width} />
                </div>
            }
            {props.type === BIZTOOL_PAGE_CONFIG.miscellaneous.type.debtIssuance &&
                <div className='d-flex' onMouseEnter={() => setShowOption(true)} onMouseLeave={() => setShowOption(false)}>

                    <OptionCell
                        showOption={showOption}
                        colIndex={'option'}
                        tableType={props.type}
                        address={props.address}
                        handleRowOptionFunction={props.handleRowOptionFunction}
                    />
                    <InputCell
                        lastRow={props.lastRow}
                        corner="leftCorner"
                        handleFunction={props.handleFunction}
                        data={props.data.name}
                        type="text"
                        colIndex={0}
                        tableType={props.type}
                        onCellChange={props.onCellChange}
                        address={props.address}
                        width={columnStyles[0].width} />
                    <InputCell
                        handleFunction={props.handleFunction}
                        data={props.data.amount}
                        type="money"
                        colIndex={1}
                        tableType={props.type}
                        onCellChange={props.onCellChange}
                        address={props.address}
                        width={columnStyles[1].width} />
                    <InputCell
                        handleFunction={props.handleFunction}
                        data={props.data.start_date}
                        type="date"
                        colIndex={2}
                        tableType={props.type}
                        onCellChange={props.onCellChange}
                        address={props.address}
                        width={columnStyles[2].width} />
                    <InputCell
                        handleFunction={props.handleFunction}
                        data={props.data.apr}
                        type="percent"
                        colIndex={3}
                        tableType={props.type}
                        onCellChange={props.onCellChange}
                        address={props.address}
                        width={columnStyles[3].width} />
                    <DropdownCell
                        lastRow={props.lastRow}
                        corner="rightCorner"
                        handleFunction={props.handleFunction}
                        data={props.data.period_id}
                        type="period-dropdown"
                        colIndex={4}
                        tableType={props.type}
                        onCellChange={props.onCellChange}
                        address={props.address}
                        width={columnStyles[4].width}
                    />
                </div>
            }
        </div>
    )
}

export default BiztoolRow