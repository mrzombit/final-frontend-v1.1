import React, { useEffect, useState } from 'react'
import Select from 'react-select'
import BiztoolButton from '../../components/common/biztoolButton/biztoolButton'
import timeToShow from '../../components/common/timeToShow'
import URL from '../../URL'
import INPUT_TYPES from '../comparePage/createProjectInputTypes'
import './createNewProject.css'

const CPTPage = (props) => {
    let onInputChange = props.onInputChange

    useEffect(() => {

    }, [props.file])

    return (
        <div className='d-flex' style={{ maxHeight: '500px' }}>
            <div className='create-project-inputs-style'>
                {props.inputs.map((eachInputType) =>
                    <div className='mt-3'>
                        {eachInputType === INPUT_TYPES.industry &&
                            <div className='mb-2'>
                                <div className={`each-cp-input-header ${props.error.industry === "" ? "" : "text text-danger"}`}>ธุรกิจของคุณอยู่ในหมวดอะไร</div>
                                <Select
                                    closeMenuOnSelect={false}
                                    name="industry_ids"
                                    defaultValue={props.selectedIndustryOption}
                                    options={props.industryOptions}
                                    className={`basic-multi-select min-w-select ${props.error.industry === "" ? "" : "border border-danger"}`} classNamePrefix="select"
                                    onChange={(e) => props.onIndustryChange(e)}
                                />
                                {props.error.industry === "" ? null :
                                    <div className='text text-danger'>{props.error.industry}</div>}
                            </div>
                        }
                        {eachInputType === INPUT_TYPES.name &&
                            <div className='mb-2'>

                                <div className={`each-cp-input-header ${props.error.name === "" ? "" : "text text-danger"}`}>โปรเจกธุรกิจของคุณชื่ออะไร?</div>
                                <input
                                    className={`each-cp-text-input ${props.error.name === "" ? "" : "border border-danger"}`}
                                    value={props.data.name}
                                    onChange={(e) => onInputChange(INPUT_TYPES.name, e.target.value)}
                                    placeholder="ชื่อโปรเจกธุรกิจ"
                                />
                                {props.error.name === "" ? null :
                                    <div className='text text-danger'>{props.error.name}</div>}
                            </div>
                        }
                        {eachInputType === INPUT_TYPES.description &&
                            <div className='mb-2'>

                                <div className={`each-cp-input-header ${props.error.description === "" ? "" : "text text-danger"}`}>รายละเอียดสั้น ๆ เกี่ยวกับธุรกิจนี้ (ไม่บังคับ)</div>
                                <textarea
                                    className={`each-cp-text-inputarea ${props.error.description === "" ? "" : "border border-danger"}`}
                                    type="textarea"
                                    value={props.data.description}
                                    onChange={(e) => onInputChange(INPUT_TYPES.description, e.target.value)}
                                    placeholder="กรอกคำอธิบายรายละเอียดเกี่ยวกับโปรเจกธุรกิจของคุณที่นี่"
                                />
                                {props.error.description === "" ? null :
                                    <div className='text text-danger'>{props.error.description}</div>}
                            </div>
                        }
                        {eachInputType === INPUT_TYPES.startDate &&
                            <div className='mb-2'>

                                <div className={`each-cp-input-header ${props.error.startDate === "" ? "" : "text text-danger"}`}>วันที่เริ่มลงทุนธุรกิจ</div>
                                <input
                                    className={`each-cp-text-input ${props.error.industry === "" ? "" : "border border-danger"}`}
                                    type='date'
                                    value={timeToShow("input-date", props.data.model_config.start_date)}
                                    onChange={(e) => onInputChange(INPUT_TYPES.startDate, e.target.value)}
                                    placeholder="กรุณาระบุวันที่ที่คุณต้องการเริ่มลงทุนในธุรกิจ"
                                    required
                                />
                                {props.error.startDate === "" ? null :
                                    <div className='text text-danger'>{props.error.startDate}</div>}
                            </div>
                        }
                        {eachInputType === INPUT_TYPES.projectionPeriod &&
                            <div>
                                <div className={`each-cp-input-header ${props.error.projectionPeriod === "" ? "" : "text text-danger"}`}>คุณต้องการประมาณการเงินของธุรกิจเป็นระยะเวลากี่ปี?</div>
                                <input
                                    className={`each-cp-text-input ${props.error.projectionPeriod === "" ? "" : "border border-danger"}`}
                                    type='text'
                                    value={props.data.model_config.projection_period}
                                    onChange={(e) => onInputChange(INPUT_TYPES.projectionPeriod, e.target.value)}
                                    onKeyPress={(e) => !/[0-9\b]+/.test(e.key) && e.preventDefault()}
                                    placeholder="เช่น 5 ปี"
                                />
                                {props.error.projectionPeriod === "" ? null :
                                    <div className='text text-danger'>{props.error.projectionPeriod}</div>}
                            </div>
                        }
                        {eachInputType === INPUT_TYPES.currency &&
                            <div className='mb-2'>

                                <div className={`each-cp-input-header ${props.error.currency === "" ? "" : "text text-danger"}`}>คุณต้องการให้แสดงในระบบแสดงสกลุเงินอะไร?</div>
                                <Select
                                    closeMenuOnSelect={false}
                                    defaultValue={props.selectedCurrencyOption}
                                    name="currency_id"
                                    options={props.currencyOptions}
                                    className={`basic-multi-select ${props.error.currency === "" ? "" : "border border-danger"}`}
                                    classNamePrefix="select"
                                    onChange={(e) => props.onCurrencyChange(e)}
                                />
                                {props.error.currency === "" ? null :
                                    <div className='text text-danger'>{props.error.currency}</div>}
                            </div>
                        }
                        {eachInputType === INPUT_TYPES.taxRate &&
                            <div className='mb-2'>

                                <div className={`each-cp-input-header ${props.error.taxRate === "" ? "" : "text text-danger"}`}>อัตราการเสียภาษีเงินได้เป็นกี่เปอร์เซ็น?</div>
                                <input
                                    className={`each-cp-text-input ${props.error.taxRate === "" ? "" : "border border-danger"}`}
                                    type='text'
                                    value={props.data.model_config.income_tax_rate}
                                    onChange={(e) => onInputChange(INPUT_TYPES.taxRate, e.target.value)}
                                    onKeyPress={(e) => !/[0-9\b]+/.test(e.key) && e.preventDefault()}
                                    placeholder="เช่น 15"
                                />
                                {props.error.taxRate === "" ? null :
                                    <div className='text text-danger'>{props.error.taxRate}</div>}
                            </div>
                        }
                        {eachInputType === INPUT_TYPES.discountRate &&
                            <div className='mb-2'>

                                <div className={`each-cp-input-header ${props.error.discountRate === "" ? "" : "text text-danger"}`}>อัตราเงินคิดลดของธุรกิจเป็นกี่เปอร์เซ็น?</div>
                                <input
                                    className={`each-cp-text-input ${props.error.discountRate === "" ? "" : "border border-danger"}`}
                                    type='text'
                                    value={props.data.model_config.discounting_rate}
                                    onChange={(e) => onInputChange(INPUT_TYPES.discountRate, e.target.value)}
                                    onKeyPress={(e) => !/[0-9\b]+/.test(e.key) && e.preventDefault()}
                                    placeholder="เช่น 8"
                                />
                                {props.error.discountRate === "" ? null :
                                    <div className='text text-danger'>{props.error.discountRate}</div>}
                            </div>
                        }
                        {eachInputType === INPUT_TYPES.saleTrend &&
                            <div className='mb-2'>

                                <div className={`each-cp-input-header`}>เปอร์เซ็นแน้วโน้มยอดขายในแต่ละปี</div>
                                {props.data.sale_trends ? props.data.sale_trends.map((eachTrend, index) =>
                                    <div className="d-flex" key={index}>
                                        <div className={`w-50 ${props.error.saleTrends[index] === "" ? " sale-trend-box " : "sale-trend-box-danger"}`}>{`ปีที่ ${eachTrend.year}`}</div>
                                        <div>
                                            <input
                                                className={`sale-trend-input ${props.error.saleTrends[index] === "" ? "" : "border border-danger"}`}
                                                type='sale_trends'
                                                value={eachTrend.trend}
                                                id={`sale_trends_${eachTrend.year - 1}`}
                                                onChange={(e) => props.onEachSaleTrendChange(eachTrend.year - 1, e.target.value)}
                                                onKeyPress={(e) => !/[0-9\b]+/.test(e.key) && e.preventDefault()}
                                                placeholder="เช่น 40"
                                            // required
                                            />
                                            {props.error.saleTrends[index] !== "" ?
                                                <div className='text text-danger'>{props.error.saleTrends[index]}</div> :
                                                null}
                                        </div>
                                    </div>
                                ) : "Loading"}
                            </div>
                        }
                        {eachInputType === INPUT_TYPES.picture &&
                            <div className='mb-2'>

                                <div className='each-cp-input-header'>รูปภาพปัจจุบัน</div>
                                {props.imageName !== "" ?
                                    <img src={`${props.previewImage}`} className='create-project-img-style' />
                                    : <img src={`${URL}${props.data.logo_url}`} className='create-project-img-style' />}
                                <div>ภาพที่เลือก : {props.imageName !== "" ? props.imageName : "คุณยังไม่ได้เลือกรูปภาพ"} </div>
                                {/* <div>ภาพที่เลือก : {props.} </div> */}
                                <div>
                                    <button
                                        for="getFiles"
                                        type="button"
                                        className="btn btn-primary"
                                        onClick={() => document.getElementById('getFiles').click()}
                                    >อัพโหลดรูปภาพ</button>
                                    <input
                                        type="file"
                                        id="getFiles"
                                        style={{ display: "none" }}
                                        onChange={(e) => props.onUploadChange(e)}
                                    />
                                </div>
                            </div>
                        }
                    </div>)}
            </div>
            <div style={{ width: "2px", height: "500px" }}></div>
            {props.inputs[0] !== INPUT_TYPES.picture ?

                props.description 
                :
                <div className='create-project-finish-style d-flex justify-content-center align-items-center'>
                    <div className=''>
                        <div className='d-flex justify-content-center step-header-style'>โปรเจกธุรกิจของคุณพร้อมใช้งานแล้ว !</div>
                        <div className='d-flex justify-content-center each-cp-input-header '>คุณต้องการไปต่อหรือไม่?</div>
                        <div className='d-flex justify-content-center  pt-5'>
                            <BiztoolButton
                                componentStyle={'filled-large'}
                                handleFunction={() => props.uploadData(props.data)}
                                title="สร้างโปรเจก"
                            />
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}

export default CPTPage