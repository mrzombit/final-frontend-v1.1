/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-undef */
import React, { useEffect, useState } from "react";
import Select from 'react-select'
import "./infoProject2.css";

import { projectUpdated, setSelectedProject, updateProject } from "../../../features/projectsSlice";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import axios from "axios";
import timeToShow from "../../common/timeToShow";
import BiztoolPopup from "../../common/biztoolPopup";
import BusinessGoalContent from "../../projects/businessGoal/businessGoalContent";
import CashflowContent from "../../projects/businessGoal/cashflowContent";
import INPUT_TYPES from "../../../pages/comparePage/createProjectInputTypes";
// import InitialPeriodMonths from "../../investmentProject/initialPeriodMonths";
import URL from './../URL'

function infoProject(props) {
  const INDUSTRY_CREATE_URL = `${URL}/industry/post/`
  const CURRENCY_CREATE_URL = `${URL}/currency/post/`

  const { register, handleSubmit } = useForm();
  const dispatch = useDispatch();

  const industries = useSelector(state => state.industries.industries)
  const currencies = useSelector(state => state.currencies.currencies)
  const selectedProject = useSelector(state => state.projects.selectedProject)
  const [projectShallow, setProjectShallow] = useState()
  const [industryOptions, setIndustryOptions] = useState([])
  // const [currencyOptions, setCurrencyOptions] = useState([])

  // const [selectedCurrencyId, setSelectedCurrencyId] = useState(selectedProject.model_config.currency_id)
  const [selectedIndustryIds, setSelectedIndustryIds] = useState(selectedProject.industry_ids)

  const [selectedCurrency, setSelectedCurrency] = useState()
  const [selectedIndustries, setSelectedIndustries] = useState([])

  const [isLoaded, setIsLoaded] = useState(false)
  const [counter, setCounter] = useState(0)
  const [doSubmitCheck, setDoSubmitCheck] = useState(false)
  const round = selectedProject.industry_ids.length + 4

  const [file, setFile] = useState()
  const [imageUrl, setImageUrl] = useState(selectedProject.logo_url !== "" ? selectedProject.logo_url : "")
  const [imageName, setImageName] = useState("")
  const [previewImage, setPreviewImage] = useState()
  const saleTrends = []
  // const [projectionPeriod, setprojectionPeriod] = useState()
  // const [saleTrends, setSaleTrends] = useState()
  // const [selectedBusinessGoals, setselectedBusinessGoals] = useState()
  // const [fixedCostTables, setFixedCostTables] = useState()
  // const [debtIssuanceRows, setDebtIssuanceRows] = useState()

  // const getCurrencyById = async (id) => {
  //   let shallowSelectedCurrency = {}
  //   await axios.get(`${CURRENCY_CREATE_URL}${id}`)
  //     .then(res => {
  //       shallowSelectedCurrency = [{ value: res.data._id, label: res.data.name.local }]
  //       setSelectedCurrency(shallowSelectedCurrency)
  //     })
  //     .catch(err => false);
  // }

  const getIndustryByIds = async () => {
    let shallowSelectedIndustry = selectedIndustries
    await selectedProject.industry_ids.forEach(id => {
      axios.get(`${INDUSTRY_CREATE_URL}${id}`)
        .then(res => {
          shallowSelectedIndustry.push({ value: res.data._id, label: res.data.name.th })
        })
        .catch(err => false);
    })
    setSelectedIndustries(shallowSelectedIndustry)
  }

  const resetValue = () => {
    setFile(null)
    setCounter(0)
    setImageName("")
    setImageUrl("")
    setDoSubmitCheck(false)
    setSelectedIndustryIds(selectedProject.industry_ids)
    setSelectedCurrencyId(selectedProject.model_config.currency_id)
    setSelectedCurrency()
    setSelectedIndustries([])
  }


  useEffect(() => {
    if (counter < round) {

      // getCurrencyById(selectedProject.model_config.currency_id)
      getIndustryByIds(selectedProject.industry_ids)

      const shallowIndustryOptions = industries.map((each) => {
        return { value: each._id, label: each.name.th }
      })
      const shallowCurrencyOptions = currencies.map((each) => {
        return { value: each._id, label: each.name.local }
      })
      setIndustryOptions(shallowIndustryOptions)

      setCounter(counter + 1)
    }
    else if (doSubmit) {

      resetValue()
    }
    setCounter(counter + 1)
  }, [isLoaded, selectedIndustries, imageName, doSubmitCheck, selectedProject])

  // const doSubmitOld = (event) => {
  //   if (file) uploadData()
  //   const ToUploadProjectShallow = {
  //     ...selectedProject,
  //     user_id: selectedProject.user_id,
  //     name: event.name,
  //     industry_ids: selectedIndustryIds,
  //     description: event.description,
  //     logo_url: imageUrl !== '' ? imageUrl : selectedProject.logo_url,
  //     created_date: selectedProject.created_date,
  //     modified_date: new Date(),
  //     model_config: {
  //       projection_period: projectionPeriod,
  //       start_date: event.start_date,
  //       currency_id: selectedCurrencyId,
  //       working_hours: Number(event.working_hours),
  //       income_tax_rate: Number(event.income_tax_rate),
  //       discounting_rate: Number(event.discounting_rate),
  //     },
  //     sale_trends: JSON.parse(JSON.stringify(saleTrends)),
  //     business_goals: JSON.parse(JSON.stringify(selectedBusinessGoals)),
  //     expense: {
  //       ...selectedProject.expense,
  //       fixed_cost_tables: fixedCostTables
  //     }
  //   }
  //   setDoSubmitCheck(true)
  //   setProjectShallow(ToUploadProjectShallow)
  // }

  const uploadData = async () => {
    const formData = new FormData();
    if (file) {
      formData.append("image", file);
      await axios.post(`${URL}/`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      }).then(res => {
        setImageUrl(res.data.filename)
        setDosubmit('uploaded-img')
      })
    }
    else {
      setDosubmit('no-uploaded-img')
    }
  }

  const onUploadChange = (e) => {
    setPreviewImage(URL.createObjectURL(e.target.files[0]))
    // console.log(URL.createObjectURL(e.target.files[0]));
    setImageName(e.target.value)
    setFile(e.target.files[0])
  }

  const onCurrencyChange = (e) => {
    setSelectedCurrencyId(e.value)
  }

  // const onProjectionPeriodChangeOld = (e) => {
  //   let shallowSaleTrends = []
  //   if (e.target.value !== '') {
  //     for (let i = 0; i < e.target.value; i++) {
  //       if (i <= projectionPeriod - 1) {
  //         shallowSaleTrends.push(saleTrends[i])
  //       }
  //       else {
  //         let shallowSaleTrend = {
  //           year: i + 1,
  //           trend: 0,
  //           description: "",
  //         }
  //         shallowSaleTrends.push(shallowSaleTrend)

  //       }
  //     }
  //     let shallowTables = JSON.parse(JSON.stringify(selectedProject.expense.fixed_cost_tables))
  //     shallowTables = shallowTables.map((eachTable => {
  //       eachTable.fixed_costs.map(eachRow => {
  //         const shallowNumbersTrends = []
  //         for (let i = 0; i < InitialPeriodMonths([
  //           "มกราคม",
  //           "กุมภาพันธ์",
  //           "มีนาคม",
  //           "เมษายน",
  //           "พฤษภาคม",
  //           "มิถุนายน",
  //           "กรกฏาคม",
  //           "สิงหาคม",
  //           "กันยายน",
  //           "ตุลาคม",
  //           "พฤศจิกายน",
  //           "ธันวาคม",
  //         ],
  //           selectedProject.model_config.start_date,
  //           selectedProject.model_config.projection_period).length; i++) {
  //           if(i< eachRow.number.length) shallowNumbersTrends.push(eachRow.number[i])
  //           else shallowNumbersTrends.push(1)
  //         }
  //         return { ...eachRow, number: shallowNumbersTrends }
  //       })
  //       return eachTable
  //     }
  //     ))

  //     setFixedCostTables(shallowTables)
  //     setSaleTrends(shallowSaleTrends)
  //     setprojectionPeriod(e.target.value)
  //   }
  // }

  const [selectBusinessGoalState, setSelectBusinessGoalState] = useState(false)
  const [setCashflowState, setSetCashflowState] = useState(false)
  const [cashflowStateType, setCashflowStateType] = useState()
  const [currenCashflowData, setCurrenCashflowData] = useState()
  const handleCashflowState = (type, data) => {
    setCashflowStateType(type === 'yearly' ? 'รายปี' : 'รายเดือน')
    setCurrenCashflowData(data)
    setSetCashflowState(true)
  }
  // const updateSaletrends = (shallowSaleTrends) => {
  //   setIsLoaded(!isLoaded)
  //   setSaleTrends(shallowSaleTrends)
  // }
  const onEachSaleTrendChange = (index, value) => {
    const shallowSaleTrends = JSON.parse(JSON.stringify(selectedProject.sale_trends))
    shallowSaleTrends[index].trend = Number(value)
    let shallowSelectedProject = {
      ...selectedProject,
      sale_trends: shallowSaleTrends
    }
    if (validate(INPUT_TYPES.saleTrend, { index: index, value: value })) dispatch(setSelectedProject(shallowSelectedProject))
  }
  // const addBusinessGoalHandle = (selectedGoal) => {
  //   let shallowBusienssGoals = JSON.parse(JSON.stringify(selectedBusinessGoals))
  //   let shallowSelectedGoal = JSON.parse(JSON.stringify(selectedGoal))
  //   if (!shallowBusienssGoals.find(each => each.name.en === shallowSelectedGoal.name.en)) {
  //     // alert(JSON.stringify(shallowSelectedGoal))
  //     shallowBusienssGoals.push(JSON.parse(JSON.stringify(shallowSelectedGoal)))
  //     // alert(JSON.stringify(selectedGoal))
  //     // alert(JSON.stringify(shallowBusienssGoals))
  //     setselectedBusinessGoals(JSON.parse(JSON.stringify(shallowBusienssGoals)))
  //     setSelectBusinessGoalState(false)
  //   }
  //   else alert('ไม่สามารถเพิ่มเป้าหมายซ้ำได้ กรุณาเลือกเป้าหมายอื่น')
  //   // dispatch(projectUpdated())
  // }

  // const setCashflow = (newData) => {
  //   const shallowBusienssGoals = JSON.parse(JSON.stringify(selectedBusinessGoals))
  //   const shallowBusienssGoals2 = JSON.parse(JSON.stringify(shallowBusienssGoals)).map(each => {
  //     return each.name.en === newData.name.en ? newData : each
  //   })
  //   setselectedBusinessGoals(JSON.parse(JSON.stringify(shallowBusienssGoals2)))
  // }

  const [error, setError] = useState({
    industry: "",
    name: "",
    description: "",
    startDate: "",
    projectionPeriod: "",
    currency: "",
    taxRate: "",
    discountRate: "",
    saleTrends: [...Array(selectedProject.sale_trends.length)].fill(""),
  })

  const validate = (typeInput, value) => {
    let validator = false
    if (typeInput === INPUT_TYPES.industry) {
      validator = true
      setError({
        ...error,
        industry: ""
      })
    } else if (typeInput === INPUT_TYPES.name) {
      if (value === '') {
        setError({
          ...error,
          name: "กรุณากรอกชื่อโปรเจกธุรกิจของคุณ"
        })
      }
      else {
        validator = true
        setError({
          ...error,
          name: ""
        })
      }
    } else if (typeInput === INPUT_TYPES.description) {
      validator = true
      setError({
        ...error,
        industry: ""
      })
    } else if (typeInput === INPUT_TYPES.startDate) {
      if (value === '') {
        setError({
          ...error,
          date: "กรุณาวันที่เริ่มลงทุนธุรกิจของคุณ"
        })
      }
      else {
        validator = true
        setError({
          ...error,
          startDate: ""
        })
      }
    } else if (typeInput === INPUT_TYPES.projectionPeriod) {
      if (value === '') {
        setError({
          ...error,
          projectionPeriod: "กรุณากรอกระยะเวลาประเมินการเงินธุรกิจของคุณ"
        })
      }
      else {
        validator = true
        setError({
          ...error,
          projectionPeriod: ""
        })
      }
    } else if (typeInput === INPUT_TYPES.currency) {
      validator = true
      setError({
        ...error,
        currency: ""
      })
    } else if (typeInput === INPUT_TYPES.taxRate) {
      if (value === '') {
        setError({
          ...error,
          taxRate: "กรุณากรอกอัตราการเสัียภาษีเงินได้ธุรกิจของคุณ"
        })
      }
      else if (value < 0 || value > 100) {
        setError({
          ...error,
          taxRate: "กรุณากรอกอัตราการเสัียภาษีเงินได้เป็นตัวเลขจำนวนเต็มระหว่าง 0-100"
        })
      }
      else {
        validator = true
        setError({
          ...error,
          taxRate: ""
        })
      }
    } else if (typeInput === INPUT_TYPES.discountRate) {
      if (value === '') {
        setError({
          ...error,
          discountRate: "กรุณากรอกอัตราการเงินคิดลดธุรกิจของคุณ"
        })
      }
      else if (value < 0 || value > 100) {
        setError({
          ...error,
          discountRate: "กรุณากรอกอัตราการเงินคิดเป็นตัวเลขจำนวนเต็มระหว่าง 0-100"
        })
      }
      else {
        validator = true
        setError({
          ...error,
          discountRate: ""
        })
      }
    } else if (typeInput === INPUT_TYPES.saleTrend) {
      if (value.value === '') {
        let shallowSaleTrend = error.saleTrends
        shallowSaleTrend[value.index] = "กรุณากรอกเปอร์เซ็นยอดขายทางการตลาดธุรกิจของคุณ"
        setError({
          ...error,
          saleTrends: shallowSaleTrend
        })
      }
      else if (value.value < 0 || value.value > 100) {
        let shallowSaleTrend = error.saleTrends
        shallowSaleTrend[value.index] = "กรุณากรอกเปอร์เซ็นยอดขายเป็นตัวเลขจำนวนเต็มระหว่าง 0-100"
        setError({
          ...error,
          saleTrends: shallowSaleTrend
        })
      } else {
        validator = true
        let shallowSaleTrend = error.saleTrends
        shallowSaleTrend[value.index] = ""
        setError({
          ...error,
          saleTrends: shallowSaleTrend
        })
      }
    }
    return true
  }

  const onInputChange = (type, val) => {
    let shallowSelectedProject = selectedProject
    if (type === INPUT_TYPES.industry) {
      shallowSelectedProject = { ...shallowSelectedProject, industry_ids: [val] }
    }
    if (type === INPUT_TYPES.description) {
      shallowSelectedProject = { ...shallowSelectedProject, description: val }
    }
    if (type === INPUT_TYPES.name) {
      shallowSelectedProject = { ...shallowSelectedProject, name: val }
    }
    if (type === INPUT_TYPES.startDate) {
      shallowSelectedProject = { ...shallowSelectedProject, model_config: { ...shallowSelectedProject.model_config, start_date: val } }
    }
    if (type === INPUT_TYPES.projectionPeriod) {
      shallowSelectedProject = onProjectionPeriodChange(val)
    }
    if (type === INPUT_TYPES.currency) {
      shallowSelectedProject = { ...shallowSelectedProject, model_config: { ...shallowSelectedProject.model_config, currency_id: val } }
    }
    if (type === INPUT_TYPES.taxRate) {
      shallowSelectedProject = { ...shallowSelectedProject, model_config: { ...shallowSelectedProject.model_config, income_tax_rate: Number(val) } }
    }
    if (type === INPUT_TYPES.discountRate) {
      shallowSelectedProject = { ...shallowSelectedProject, model_config: { ...shallowSelectedProject.model_config, discounting_rate: Number(val) } }
    }
    if (type === INPUT_TYPES.picture) {
      shallowSelectedProject = { ...shallowSelectedProject, logo_url: val }
    }

    if (validate(type, val)) dispatch(setSelectedProject(shallowSelectedProject))
  }

  const onProjectionPeriodChange = (value) => {
    // console.log(value);
    if (value !== '') {
      let shallowSaleTrends = []
      for (let i = 0; i < Number(value); i++) {
        if (i <= selectedProject.model_config.projection_period - 1) {
          shallowSaleTrends.push(selectedProject.sale_trends[i])
        }
        else {
          let shallowSaleTrend = {
            year: i + 1,
            trend: 0,
            description: "",
          }
          shallowSaleTrends.push(shallowSaleTrend)
        }
      }
      let shallowProject = {
        ...selectedProject,
        model_config: {
          ...selectedProject.model_config,
          projection_period: Number(value)
        },
        sale_trends: shallowSaleTrends,
      }
      return shallowProject
    }
    else return { ...selectedProject, model_config: { ...selectedProject.model_config, projection_period: 0 } }
  }

  const onIndustryChange = (option) => {
    let shallowProject = {
      ...selectedProject,
      model_config: {
        ...selectedProject.model_config,
        industry_ids: [option.value]
      }
    }
    dispatch(setSelectedProject(shallowProject))
  }

  return (
    <div className="new-invest-form">
      <div>
        {/*
       <BiztoolPopup
        preTitle='+เพิ่มเป้าหมาย'
        title="เป้าหมายธุรกิจ"
        content={<BusinessGoalContent
          projectionPeriod={projectionPeriod}
          addBusinessGoalHandle={addBusinessGoalHandle}
          close={setSelectBusinessGoalState} />}
        trigger={selectBusinessGoalState}
        close={() => setSelectBusinessGoalState(false)}
      /> */}
        {/* <BiztoolPopup
        preTitle='เป้าหมายธุรกิจ'
        title={`กระแสเงินสด${cashflowStateType}`}
        content={<CashflowContent
          data={currenCashflowData}
          setCashflow={setCashflow}
          projectionPeriod={projectionPeriod}
          onChangeHandle={() => alert(`CF ${cashflowStateType}`)}
          close={setSetCashflowState} />}
        trigger={setCashflowState}
        close={() => setSetCashflowState(false)}
      /> */}
      </div>
      
        <div className="d-flex label-newInvest-pj">
          <div className="mx-3">
            <div className="input-container m-2">
              <div className={`config-each-cp-input-header ${error.name === "" ? "" : "text text-danger"}`}>ชื่อโปรเจกธุรกิจ</div>
              <input
                className={`config-each-cp-text-input name ${error.name === "" ? "" : "border border-danger"}`}
                value={selectedProject.name}
                onChange={(e) => onInputChange(INPUT_TYPES.name, e.target.value)}
                placeholder="ชื่อโปรเจกธุรกิจ"
              />
              {error.name === "" ? null :
                <div className='text text-danger'>{error.name}</div>}
            </div>
            <div className="d-flex flex-col">
              <div className="input-container ">
                <div className="mx-2">
                  <div className='config-each-cp-input-header'>รูปภาพปัจจุบัน</div>
                  {imageName !== "" ?
                    <img src={`${previewImage}`} className='create-project-img-style' />
                    : <img src={`${URL}${selectedProject.logo_url}`} className='create-project-img-style' />}
                  <div>ภาพที่เลือก : {imageName !== "" ? imageName : "คุณยังไม่ได้เลือกรูปภาพ"} </div>
                  {/* <div>ภาพที่เลือก : {} </div> */}
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
                      onChange={(e) => onUploadChange(e)}
                    />
                  </div>
                </div>
              </div>
              <div className="flex-col">
                <div className="input-container mb-2">
                  <div className={`config-each-cp-input-header ${error.startDate === "" ? "" : "text text-danger"}`}>วันที่เริ่มลงทุนธุรกิจ</div>
                  <input
                    className={`config-each-cp-text-input ${error.industry === "" ? "" : "border border-danger"}`}
                    type='date'
                    value={timeToShow("input-date", selectedProject.model_config.start_date)}
                    onChange={(e) => onInputChange(INPUT_TYPES.startDate, e.target.value)}
                    placeholder="กรุณาระบุวันที่ที่คุณต้องการเริ่มลงทุนในธุรกิจ"
                    required
                  />
                  {error.startDate === "" ? null :
                    <div className='text text-danger'>{error.startDate}</div>}
                </div>
                <div className="input-container">
                  <div className={`config-each-cp-input-header ${error.projectionPeriod === "" ? "" : "text text-danger"}`}>ระยะเวลาประมาณการเงิน(ปี)</div>
                  <input
                    className={`config-each-cp-text-input ${error.projectionPeriod === "" ? "" : "border border-danger"}`}
                    type='text'
                    value={selectedProject.model_config.projection_period}
                    onChange={(e) => onInputChange(INPUT_TYPES.projectionPeriod, e.target.value)}
                    onKeyPress={(e) => !/[0-9\b]+/.test(e.key) && e.preventDefault()}
                    placeholder="เช่น 5 ปี"
                  />
                  {error.projectionPeriod === "" ? null :
                    <div className='text text-danger'>{error.projectionPeriod}</div>}
                </div>
                <div className="input-container">
                  <div className={`config-each-cp-input-header ${error.taxRate === "" ? "" : "text text-danger"}`}>อัตราการเสียภาษีเงินได้(%)</div>
                  <input
                    className={`config-each-cp-text-input ${error.taxRate === "" ? "" : "border border-danger"}`}
                    type='text'
                    value={selectedProject.model_config.income_tax_rate}
                    onChange={(e) => onInputChange(INPUT_TYPES.taxRate, e.target.value)}
                    onKeyPress={(e) => !/[0-9\b]+/.test(e.key) && e.preventDefault()}
                    placeholder="เช่น 15"
                  />
                  {error.taxRate === "" ? null :
                    <div className='text text-danger'>{error.taxRate}</div>}
                </div>
                <div className="input-container">
                  <div className={`config-each-cp-input-header ${error.discountRate === "" ? "" : "text text-danger"}`}>อัตราเงินคิดลดของธุรกิจ(%)</div>
                  <input
                    className={`config-each-cp-text-input ${error.discountRate === "" ? "" : "border border-danger"}`}
                    type='text'
                    value={selectedProject.model_config.discounting_rate}
                    onChange={(e) => onInputChange(INPUT_TYPES.discountRate, e.target.value)}
                    onKeyPress={(e) => !/[0-9\b]+/.test(e.key) && e.preventDefault()}
                    placeholder="เช่น 8"
                  />
                  {error.discountRate === "" ? null :
                    <div className='text text-danger'>{error.discountRate}</div>}
                </div>
                {/* <div className="input-container">
                    <BizTextInfo title="สกุลเงิน" />
                    {counter > round + 1 &&
                      <Select
                        defaultValue={selectedCurrency}
                        closeMenuOnSelect={false}
                        components={animatedComponents}
                        name="currency_id"
                        options={currencyOptions}
                        className="basic-multi-select"
                        classNamePrefix="select"
                        onChange={(e) => onCurrencyChange(e)}
                      />
                    }
                  </div> */}
                {/* <div className="input-container">
                    <BizTextInfo title="ชั่วโมงทำงาน/วัน" />
                    <input
                      defaultValue={
                        selectedProject.model_config.working_hours}
                      onKeyPress={(e) => !/[0-9\b]+/.test(e.key) && e.preventDefault()}
                      // placeholder="8 ชม./วัน"
                      className="input-newInvest-pj-small"
                      type="working_hours"
                      {...register('working_hours', { required: true })}
                      required
                    />
                  </div> */}
              </div>
            </div>
          </div>
          <div>
            <div className="input-container">
              <div className={`config-each-cp-input-header ${error.description === "" ? "" : "text text-danger"}`}>รายละเอียดเกี่ยวกับธุรกิจของฉัน</div>
              <textarea
                className={`config-each-cp-text-inputarea ${error.description === "" ? "" : "border border-danger"}`}
                type="textarea"
                value={selectedProject.description}
                onChange={(e) => onInputChange(INPUT_TYPES.description, e.target.value)}
                placeholder="กรอกคำอธิบายรายละเอียดเกี่ยวกับโปรเจกธุรกิจของคุณที่นี่"
              />
              {error.description === "" ? null :
                <div className='text text-danger'>{error.description}</div>}
            </div>
            <div className={`config-each-cp-input-header ${error.industry === "" ? "" : "text text-danger"}`}>หมวดหมู่ของธุรกิจ</div>
            <Select
              closeMenuOnSelect={true}
              defaultValue={selectedIndustries}
              name="industry_ids"
              options={industryOptions}
              className="basic-multi-select min-w-select"
              classNamePrefix="select"
              onChange={(e) => onIndustryChange(e)}
            />
          </div>
        </div >
        <div className="d-flex mt-2">
          <div className="w-100 ">
            <div className="text-start mx-2">เปอร์เซ็นแนวโน้มยอดขายในแต่ละปี</div>
            {selectedProject.sale_trends ? selectedProject.sale_trends.map((eachTrend, index) =>
              <div className="d-flex" key={index}>
                <div className={`w-25 ${error.saleTrends[index] === "" ? " config-sale-trend-box " : "config-sale-trend-box-danger"}`}>{`ปีที่ ${eachTrend.year}`}</div>
                <div>
                  <input
                    className={`config-sale-trend-input ${error.saleTrends[index] === "" ? "" : "border border-danger"}`}
                    type='sale_trends'
                    value={eachTrend.trend}
                    id={`sale_trends_${eachTrend.year - 1}`}
                    onChange={(e) => onEachSaleTrendChange(eachTrend.year - 1, e.target.value)}
                    onKeyPress={(e) => !/[0-9\b]+/.test(e.key) && e.preventDefault()}
                    placeholder="เช่น 40"
                  // required
                  />
                  {error.saleTrends[index] !== "" ?
                    <div className='text text-danger'>{error.saleTrends[index]}</div> :
                    null}
                </div>
              </div>
            ) : "Loading"}
          </div>
          <div className="w-100">
          <button onClick={() => uploadData()} className="btn login-butt my-2">
              บันทึกการแก้ไข
            </button>
          </div>
          {/* <div className="w-100 ">
              <div className="text-center ">เป้าหมายธุรกิจ</div>
              {selectedBusinessGoals ? selectedBusinessGoals.map((eachGoal, index) => (
                <div className="d-flex" key={index}>
                  <div
                    key={eachGoal._id}
                    className="w-50 business-goal-box">
                    {eachGoal.name.th}
                  </div>
                  {(eachGoal.name.en !== 'Yearly Cashflow' && eachGoal.name.en !== 'Monthly Cashflow') && <input
                    className="business-goal-input"
                    defaultValue={eachGoal.detail.value}
                    type='business_goal'
                    onKeyPress={(e) => !/[0-9\b]+/.test(e.key) && e.preventDefault()}
                    required
                  />}
                  {(eachGoal.name.en === 'Yearly Cashflow' || eachGoal.name.en === 'Monthly Cashflow') && <button
                    onClick={() => handleCashflowState(eachGoal.name.en === 'Yearly Cashflow' ? 'yearly' : 'monthly', eachGoal)}
                    className="sale-trend-input">
                    แก้ไข
                  </button>}
                </div>
              ))
                : null}
              <button
                className="add-business-goal-button"
                onClick={() => setSelectBusinessGoalState(true)}
              >
                + เพิ่มเป้าหมายธุรกิจ
              </button>
            </div> */}
        </div>

    </div >
  );
}

export default infoProject;
