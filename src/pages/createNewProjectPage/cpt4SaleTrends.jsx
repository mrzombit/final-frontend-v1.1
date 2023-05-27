import React from 'react'
import './cptStyle.css'

const CPT4SaleTrends = (props) => {
  return (
    <div className='m-4 '>
      <div>
        <div className='cpt-input-description-header'>
          เปอร์เซ็นยอดขายทางการตลาด
        </div>
        <div className='cpt-input-description-content'>
          คือ อัตราหรือเปอร์เซ็นการตลาดของธุรกิจที่จะขายสินค้าได้ในแต่ละปี เช่น ปีแรก ๆ มักจะทำตลาดได้น้อยหน่อย เพราะเพิ่งเปิดร้าน จึงมีอัตราอยู่ที่ 60% เท่านั้น ปีต่อมาเริ่มมีการพูดปากต่อปากมากขึ้นทำให้คนรู้จัก
          มากขึ้น ยอดขายจึงสูงขึ้นเป็น 80% ในปีที่สอง เป็นต้น
        </div>
      </div>
    </div>
  )
}

export default CPT4SaleTrends