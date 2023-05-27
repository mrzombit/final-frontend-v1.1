/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-undef */
import React, { useEffect, useState } from "react";
import Select from 'react-select'
import "./infoProject2.css";

import { projectUpdated, setSelectedProject, updateProject } from "../../../features/projectsSlice";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import timeToShow from "../../common/timeToShow";
import INPUT_TYPES from "../../../pages/comparePage/createProjectInputTypes";
import { useNavigate } from "react-router-dom";
import URL from './../../../URL'

function infoProject(props) {
  const INDUSTRY_CREATE_URL = `${URL}/industry/post/`

  const dispatch = useDispatch();

  const industries = useSelector(state => state.industries.industries)
  const selectedProject = useSelector(state => state.projects.selectedProject)
  const [industryOptions, setIndustryOptions] = useState([])
  const [selectedIndustry, setSelectedIndustry] = useState()
  const [prevPeriod, setPrevPeriod] = useState(selectedProject.model_config.projection_period)

  const [isLoaded, setIsLoaded] = useState(false)
  const [counter, setCounter] = useState(0)
  const [dosubmit, setDosubmit] = useState("")

  const [file, setFile] = useState()
  const [imageUrl, setImageUrl] = useState(selectedProject.logo_url !== "" ? selectedProject.logo_url : "")
  const [imageName, setImageName] = useState("")
  const [previewImage, setPreviewImage] = useState()

  const resetValue = () => {
    setFile(null)
    setCounter(0)
    setImageName("")
    setImageUrl("")
    setDosubmit("")
    setSelectedIndustry([])
  }


  useEffect(() => {
    if (!isLoaded) {
      const shallowIndustryOptions = industries.map((each) => {
        return { value: each._id, label: each.name.th }
      })
      setIndustryOptions(shallowIndustryOptions)
      setIsLoaded(true)
    }
    else if (dosubmit !== "") {
      let shallowProject = {
        ...selectedProject,
        industry_ids: [selectedIndustry.value],
        logo_url: dosubmit === 'uploaded-img' ? imageUrl : selectedProject.logo_url
      }
      dispatch(updateProject({ id: shallowProject._id, data: shallowProject }))
      resetValue()
    }
    if (selectedProject.industry_ids.length === 1) {
      let shallowSelectedIndustry =[]
      axios.get(`${INDUSTRY_CREATE_URL}${selectedProject.industry_ids[0]}`)
      .then(res => {
        shallowSelectedIndustry.push({ value: res.data._id, label: res.data.name.th })
        setSelectedIndustry(shallowSelectedIndustry[0])
      })
      setIsLoaded(true)
    }
    if (counter <= 12) {
      setCounter(counter + 1)
    }

  }, [isLoaded, counter,imageName, dosubmit, selectedProject])


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
    setImageName(e.target.value)
    setFile(e.target.files[0])
  }

  const onEachSaleTrendChange = (index, value) => {
    const shallowSaleTrends = JSON.parse(JSON.stringify(selectedProject.sale_trends))
    shallowSaleTrends[index].trend = Number(value)
    let shallowSelectedProject = {
      ...selectedProject,
      sale_trends: shallowSaleTrends
    }
    if (validate(INPUT_TYPES.saleTrend, { index: index, value: value })) dispatch(setSelectedProject(shallowSelectedProject))
  }
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
        shallowSaleTrend[value.index] = "กรุณากรอกเปอร์เซ็นยอดขายธุรกิจของคุณ"
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
    console.log('whp');
    console.log(value);
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
          projection_period: Number(value),
        },
        sale_trends: shallowSaleTrends,
      }
      setPrevPeriod(Number(value))
      dispatch(setSelectedProject(shallowProject))
    }
    else {
      setPrevPeriod(0)
    }
  }

  const onIndustryChange = (option) => {
    console.log(JSON.stringify(option));
    let shallowProject = {
      ...selectedProject,
      industry_ids: [option.value]
    }
    dispatch(setSelectedProject(shallowProject))
  }

  return (
    <div className="new-invest-form">
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
                  value={prevPeriod}
                  onChange={(e) => validate(INPUT_TYPES.projectionPeriod, e.target.value)?onProjectionPeriodChange(e.target.value):null}
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
                  onChange={(e) => onProjectionPeriodChange(e.target.value)}
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
          {selectedIndustry!==undefined &&
            <Select
              closeMenuOnSelect={true}
              defaultValue={selectedIndustry}
              name="industry_ids"
              options={industryOptions}
              className="basic-multi-select min-w-select"
              onChange={(e) => onIndustryChange(e)}
            />
          }
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
                  required
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
      </div>

    </div >
  );
}

export default infoProject;
