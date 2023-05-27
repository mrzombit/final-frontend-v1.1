import React from 'react'
import './cptStyle.css'

const CPT2StartDateProjectionPeriod = (props) => {
  return (
    <div className='w-90 m-4 d-flex justify-content-center align-items-center'>
      <div>
      <div className='cpt-input-description-header'>
        วันที่เริ่มลงทุนธุรกิจและระยะเวลาประมาณการเงินของธุรกิจ
      </div>
      <div className='cpt-input-description-content'>
        คือ วันที่คุณเริ่มลงทุนในธุรกิจนี้คือวันที่เท่าไร, เดือนอะไรและปีอะไร โดยปีพ.ศ.ของวันนี้จะเป็นปีพ.ศ.แรกที่ระบบจะเริ่มคำนวณประมาณการเงินของธุรกิจนี้ โดยจะคำนวณเป็นระยะเวลาตามจำนวนปีตามที่กำหนด เช่น
      </div>
      <div className='d-flex' >
        <div className='example-description-border'>
          <div>
            Ex. เริ่มกำเนินธุรกิจ พ.ศ. 2550
          </div>
          <div>
            เป็นระยะเวลา 2 ปี
          </div>
          <img className='cpt1-description-img-2'
             src={require("./cf1.jpg")} />
        </div>
        <div className='example-description-border'>
          <div>
            Ex. เริ่มกำเนินธุรกิจ พ.ศ. 2560
          </div>
          <div>
            เป็นระยะเวลา 5 ปี
          </div>
          <img className='cpt1-description-img-2'
             src={require("./cf2.jpg")} />
        </div>
      </div>
      </div>
    </div>
  )
}

export default CPT2StartDateProjectionPeriod