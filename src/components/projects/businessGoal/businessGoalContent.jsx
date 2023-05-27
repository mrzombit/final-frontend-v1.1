import React, { useEffect, useState } from 'react'
import makeAnimated from 'react-select/animated';
import { useSelector } from 'react-redux';
import Select from 'react-select'
import '../AddProjectForm.css'

const BusinessGoalContent = (props) => {
    const animatedComponents = makeAnimated();
    const [onSelectedGoal, setOnSelectedGoal] = useState()
    const businessGoals = useSelector(state => state.businessGoals.businessGoals)
    const [businessGoalOptions, setBusinessGoalOptions] = useState()
    const [isLoaded, setIsLoaded] = useState(false)

    const onSelectedGoalChange = (id) => {
        let shallowBusinessGoals = JSON.parse(JSON.stringify(businessGoals))
        let shallowOnSelectedGoal = shallowBusinessGoals.find(each => each._id === id)
        shallowOnSelectedGoal.detail.cashflows = []
        if (shallowOnSelectedGoal.name.en === 'Yearly Cashflow') {
            // alert(shallowOnSelectedGoal.detail.cashflows)
            // alert(JSON.stringify(shallowOnSelectedGoal.detail.cashflows))

            for (let i = 0; i < props.projectionPeriod; i++) {
                shallowOnSelectedGoal.detail.cashflows.push(0)
            }
        }
        else if (shallowOnSelectedGoal.name.en === 'Monthly Cashflow') {
            // alert(shallowOnSelectedGoal.detail.cashflows)
            // alert(JSON.stringify(shallowOnSelectedGoal.detail.cashflows))

            for (let i = 0; i < props.projectionPeriod * 12; i++) {
                shallowOnSelectedGoal.detail.cashflows.push(0)
            }
        }

        // alert(JSON.stringify(shallowOnSelectedGoal.detail));
        setOnSelectedGoal(JSON.parse(JSON.stringify(shallowOnSelectedGoal)))
    }

    const onGoalValueChange = (val) => {
        let shallowOnSelectedGoal = JSON.parse(JSON.stringify(onSelectedGoal))
        shallowOnSelectedGoal.detail.value = val
        setOnSelectedGoal(JSON.parse(JSON.stringify(shallowOnSelectedGoal)))
    }

    const onGoalValuesChange = (index, val) => {
        let shallowOnSelectedGoal = JSON.parse(JSON.stringify(onSelectedGoal))
        shallowOnSelectedGoal.detail.cashflows[index] = val
        setOnSelectedGoal(JSON.parse(JSON.stringify(shallowOnSelectedGoal)))
    }

    useEffect(() => {
        if (!isLoaded) {
            let shallowBusinesGoalOptions = businessGoals.map((each) => {
                return { value: each._id, label: each.name.th }
            })
            setBusinessGoalOptions(shallowBusinesGoalOptions)
            setIsLoaded(true)
        }
    }, [isLoaded])

    return (
        <div className='align-items-center justify-content-center'>
            <Select
                closeMenuOnSelect={true}
                components={animatedComponents}
                name="business_goals"
                options={businessGoalOptions}
                className="basic-multi-select"
                classNamePrefix="select"
                // onChange={(e) => onSelectedGoalChange(e.target.value)}
                onChange={(e) => onSelectedGoalChange(e.value)}
            />

            {onSelectedGoal && <div className='cashflows-pane'>
                <div >เป้าหมายทีต้องการ:</div>
                {(onSelectedGoal.name.en === 'Yearly Cashflow' || onSelectedGoal.name.en === 'Monthly Cashflow') &&
                    onSelectedGoal.detail.cashflows.map((eachCashflow, index) => (
                        <div className='d-flex'>
                            <div className="w-50 sale-trend-box">{`กระแสเงินสด${onSelectedGoal.name.en === 'Yearly Cashflow' ?
                                'ปีที่ ' : 'เดือนที่ '}${index + 1}`
                            }</div>
                            <input
                                className="sale-trend-input"
                                type='business-goals'
                                onChange={(e) => onGoalValuesChange(index, e.target.value)}
                                onKeyPress={(e) => !/[0-9\b]+/.test(e.key) && e.preventDefault()}
                                // {...register(`onSelectedGoal.name.en${index}`, { required: true })}
                                required
                            />
                        </div>
                    ))
                }
                {(onSelectedGoal.name.en !== 'Yearly Cashflow' && onSelectedGoal.name.en !== 'Monthly Cashflow') &&
                    <input
                        className="sale-trend-input"
                        type='business-goals'
                        onChange={(e) => onGoalValueChange(e.target.value)}
                        onKeyPress={(e) => !/[0-9\b]+/.test(e.key) && e.preventDefault()}
                        // {...register(`onSelectedGoal.name.en${index}`, { required: true })}
                        required
                    />
                }
            </div>
            }
            <div className='d-flex justify-content-between'>
                <button
                    className="btn login-butt"
                    onClick={() => props.close(false)}
                >
                    ยกเลิก
                </button>
                <button
                    className="btn login-butt"
                    onClick={() => onSelectedGoal ? props.addBusinessGoalHandle(onSelectedGoal) : alert('กรุณาเลือกเป้าหมายธุรกิจ')}
                >
                    เพิ่ม
                </button>
            </div>
        </div>
    )
}

export default BusinessGoalContent