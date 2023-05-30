import React, { useEffect, useState } from 'react'
import './createNewProject.css'
import { useDispatch, useSelector } from 'react-redux'
import AttributeExplaination from './attributeExplanation'
import CPTPage from './cptPage'
import INPUT_TYPES from './../../components/bizTools/infoProject/createProjectInputTypes'
import { useNavigate } from 'react-router-dom'
import { addNewProject, setSelectedProject, setShallowCreateProject } from '../../features/projectsSlice'
import BiztoolButton from '../../components/common/biztoolButton/biztoolButton'
import axios from 'axios'

import URL from '../../URL'
const INDUSTRY_CREATE_URL = `${URL}/industry/post/`

const CreateNewProject = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [file, setFile] = useState()
  const [dosubmit, setDosubmit] = useState("")

  const createProject = useSelector(state => state.projects.shallowCreateProject)
  const [currentStep, setCurrentStep] = useState(createProject.name === 'เทมเพลตเปล่า' ? 0 : 1)
  const stepHeader = [
    "ประเภทธุรกิจของคุณ",
    "ข้อมูลพื้นฐานเกี่ยวกับธุรกิจของคุณ",
    "วันที่คุณเริ่มลงทุนธุรกิจและระยะเวลาที่คุณต้องการประเมินธุรกิจ",
    // "สกุลเงิน, อัตราภาษีและอัตราเงินคิดลด",
    "อัตราภาษีและอัตราเงินคิดลด",
    "เปอร์เซ็นยอดขายในแต่ละปี",
    "รูปภาพโลโกของธุรกิจ",
  ]
  const [error, setError] = useState({
    industry: "",
    name: "",
    description: "",
    startDate: "",
    projectionPeriod: "",
    currency: "",
    taxRate: "",
    discountRate: "",
    saleTrends: [...Array(createProject.sale_trends.length)].fill(""),
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

  const user = useSelector(state => state.users.user)
  const industries = useSelector(state => state.industries.industries)
  const currencies = useSelector(state => state.currencies.currencies)
  const [isLoaded, setIsLoaded] = useState(false)
  const [industryOptions, setIndustryOptions] = useState([])
  const [currencyOptions, setCurrencyOptions] = useState([])
  // const [selectedCurrencyOption, setSelectedCurrencyOption] = useState(createProject.name === 'เทมเพลตเปล่า' ? "" : createProject.model_config.currency_id)
  const [selectedIndustryOption, setSelectedIndustryOption] = useState()
  const [imageUrl, setImageUrl] = useState(createProject.logo_url !== "" ? createProject.logo_url : "")
  const [imageName, setImageName] = useState("")
  const [previewImage, setPreviewImage] = useState()
  // const [selectedIndustryOption, setSelectedIndustryOption] = useState(createProject.name === 'เทมเพลตเปล่า' ? "" : "")

  const getIndustryByIds = async () => {

    let shallowSelectedIndustry = []
    await axios.get(`${INDUSTRY_CREATE_URL}${createProject.industry_ids[0]}`)
      .then(res => {
        shallowSelectedIndustry.push({ value: res.data._id, label: res.data.name.th })
      })
      .catch(err => false);
    console.log(JSON.stringify(shallowSelectedIndustry[0]));
    setSelectedIndustryOption(shallowSelectedIndustry)
  }
  const [count, setCount] = useState(0)
  useEffect(() => {
    if (!isLoaded) {
      const shallowIndustryOptions = industries.map((each) => {
        return { value: each._id, label: each.name.th }
      })
      const shallowCurrencyOptions = currencies.map((each) => {
        return { value: each._id, label: each.name.local }
      })
      createProject.name === 'เทมเพลตเปล่า' ? setSelectedIndustryOption("") : getIndustryByIds(createProject.industry_ids)
      setIndustryOptions(shallowIndustryOptions)
      setCurrencyOptions(shallowCurrencyOptions)
      setIsLoaded(true)
      console.log(JSON.stringify(selectedIndustryOption));
    }
    else if (dosubmit !== "") {
      let shallowProject = {
        ...createProject,
        user_id: user._id,
        logo_url: dosubmit === 'uploaded-img' ? imageUrl : createProject.logo_url
      }
      dispatch(addNewProject(shallowProject))
      dispatch(setSelectedProject(shallowProject))
      navigate('/ProjectConfig')
    }
  }, [isLoaded, industryOptions, currencyOptions, createProject, file, dosubmit])


  const onStepChange = (destinationNumber) => {
    if (destinationNumber >= 0) setCurrentStep(destinationNumber)
  }

  const onInputChange = (type, val) => {
    let shallowCreateProject = createProject
    if (type === INPUT_TYPES.industry) {
      shallowCreateProject = { ...shallowCreateProject, industry_ids: [val] }
    }
    if (type === INPUT_TYPES.description) {
      shallowCreateProject = { ...shallowCreateProject, description: val }
    }
    if (type === INPUT_TYPES.name) {
      shallowCreateProject = { ...shallowCreateProject, name: val }
    }
    if (type === INPUT_TYPES.startDate) {
      shallowCreateProject = { ...shallowCreateProject, model_config: { ...shallowCreateProject.model_config, start_date: val } }
    }
    if (type === INPUT_TYPES.projectionPeriod) {
      shallowCreateProject = onProjectionPeriodChange(val)
    }
    if (type === INPUT_TYPES.currency) {
      shallowCreateProject = { ...shallowCreateProject, model_config: { ...shallowCreateProject.model_config, currency_id: val } }
    }
    if (type === INPUT_TYPES.taxRate) {
      shallowCreateProject = { ...shallowCreateProject, model_config: { ...shallowCreateProject.model_config, income_tax_rate: Number(val) } }
    }
    if (type === INPUT_TYPES.discountRate) {
      shallowCreateProject = { ...shallowCreateProject, model_config: { ...shallowCreateProject.model_config, discounting_rate: Number(val) } }
    }
    if (type === INPUT_TYPES.picture) {
      shallowCreateProject = { ...shallowCreateProject, logo_url: val }
    }

    if (validate(type, val)) dispatch(setShallowCreateProject(shallowCreateProject))
  }

  const onProjectionPeriodChange = (value) => {
    console.log(value);
    if (value !== '') {
      let shallowSaleTrends = []
      for (let i = 0; i < Number(value); i++) {
        if (i <= createProject.model_config.projection_period - 1) {
          shallowSaleTrends.push(createProject.sale_trends[i])
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
        ...createProject,
        model_config: {
          ...createProject.model_config,
          projection_period: Number(value)
        },
        sale_trends: shallowSaleTrends,
      }
      return shallowProject
    }
    else return { ...createProject, model_config: { ...createProject.model_config, projection_period: 0 } }
  }

  const onIndustryChange = (option) => {
    let shallowProject = {
      ...createProject,
      industry_ids: [option.value]
    }
    dispatch(setShallowCreateProject(shallowProject))
  }

  const onCurrencyChange = (option) => {
    let shallowProject = {
      ...createProject,
      model_config: {
        ...createProject.model_config,
        currency_id: option.value
      }
    }
    dispatch(setShallowCreateProject(shallowProject))
    // alert(option.value)
  }
  const uploadData = async (data) => {

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

  const onEachSaleTrendChange = (index, value) => {
    const shallowSaleTrends = JSON.parse(JSON.stringify(createProject.sale_trends))
    shallowSaleTrends[index].trend = value
    let shallowProject = {
      ...createProject,
      sale_trends: shallowSaleTrends
    }
    if (validate(INPUT_TYPES.saleTrend, { index: index, value: value })) dispatch(setShallowCreateProject(shallowProject))
  }
  return (
    <div className=' m-5 mt-5'>
      <div className='fw-bold'>สร้างโปรเจกธุรกิจใหม่</div>
      <div className='fw-bold'>{`ขั้นตอนที่ ${currentStep}/5 :`}</div>
      <div className='step-header-style'>{stepHeader[currentStep]}</div>
      <div className=''>
        <div className='d-flex'>
          {currentStep === 0 ?
            <CPTPage error={error} onInputChange={onInputChange}
              selectedIndustryOption={selectedIndustryOption}
              industryOptions={industryOptions} onIndustryChange={onIndustryChange}
              data={createProject} inputs={[INPUT_TYPES.industry]}
              description={<AttributeExplaination industry={true} />} /> :
            currentStep === 1 ?
              <CPTPage error={error} onInputChange={onInputChange}
                data={createProject} inputs={[INPUT_TYPES.name, INPUT_TYPES.description]}
                description={<AttributeExplaination nameDescription={true} />} /> :
              currentStep === 2 ?
                <CPTPage error={error} onInputChange={onInputChange}
                  data={createProject} inputs={[INPUT_TYPES.startDate, INPUT_TYPES.projectionPeriod]}
                  description={<AttributeExplaination startDateProjectionPeriod={true} />} /> :
                currentStep === 3 ?
                  <CPTPage error={error} onInputChange={onInputChange}
                    // selectedCurrencyOption={selectedCurrencyOption}
                    // currencyOptions={currencyOptions} onCurrencyChange={onCurrencyChange}
                    // data={createProject} inputs={[INPUT_TYPES.currency, INPUT_TYPES.taxRate, INPUT_TYPES.discountRate]}
                    data={createProject} inputs={[INPUT_TYPES.taxRate, INPUT_TYPES.discountRate]}
                    description={<AttributeExplaination currencyTaxDiscount={true} />} /> :
                  currentStep === 4 ?
                    <CPTPage error={error} onInputChange={onInputChange}
                      onEachSaleTrendChange={onEachSaleTrendChange}
                      data={createProject} inputs={[INPUT_TYPES.saleTrend]}
                      description={<AttributeExplaination saleTrend={true} />} /> :
                    <CPTPage error={error} onInputChange={onInputChange}
                      imageName={imageName} previewImage={previewImage}
                      onUploadChange={onUploadChange} uploadData={uploadData}
                      data={createProject} inputs={[INPUT_TYPES.picture]}
                      description={<AttributeExplaination picture={true} />} />
          }
        </div>
        {currentStep <= 4 ?
          <div className="d-flex justify-content-center align-items-center" style={{ height: '100px', width: '1000px' }}>
            <div className='m-2'>
              <BiztoolButton
                componentStyle={'lighted'}
                handleFunction={() => onStepChange(currentStep - 1)}
                title="ย้อนกลับ"
              />
            </div>
            <div className='m-2'>

              <BiztoolButton
                componentStyle={'lighted'}
                handleFunction={() => onStepChange(currentStep + 1)}
                title="ถัดไป"
              />

            </div>
          </div> :
          <div className="d-flex justify-content-center align-items-center" style={{ height: '100px', width: '1000px' }}>
            <div className='m-2 '>
              <BiztoolButton
                componentStyle={'lighted'}
                handleFunction={() => onStepChange(currentStep - 1)}
                title="ย้อนกลับ"
              />
            </div>
          </div>

        }
      </div>
    </div >
  )
}

export default CreateNewProject