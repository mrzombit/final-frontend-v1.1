import React from 'react'

const CashflowContent = (props) => {
    const onGoalValuesChange = (index, val) => {
        let shallowOnSelectedGoal = JSON.parse(JSON.stringify(props.data))
        shallowOnSelectedGoal.detail.cashflows[index] = val
        props.setCashflow(JSON.parse(JSON.stringify(shallowOnSelectedGoal)))
    }

    return (
        <div className='cashflows-pane'>
            {props.data.detail.cashflows.map((eachCashflow, index) => (
                <div className='d-flex'>
                    <div className="w-50 sale-trend-box">{`กระแสเงินสด${props.data.name.en === 'Yearly Cashflow' ?
                        'ปีที่ ' : 'เดือนที่ '}${index + 1}`
                    }</div>
                    <input
                        className="sale-trend-input"
                        type='business-goals'
                        defaultValue={eachCashflow}
                        onChange={(e) => onGoalValuesChange(index, e.target.value)}
                        onKeyPress={(e) => !/[0-9\b]+/.test(e.key) && e.preventDefault()}
                        // {...register(`onSelectedGoal.name.en${index}`, { required: true })}
                        required
                    />
                </div>
            ))
            }
            <button
                className="btn login-butt"
                onClick={() => props.close(false)}
            >
                ย้้อนกลับ
            </button>
        </div>
    )
}

export default CashflowContent