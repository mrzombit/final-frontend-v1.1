import React from 'react'
import './cptStyle.css'

const CPT3CurrencyTaxDiscount = (props) => {
  const openInNewTab = (url) => {
    window.open(url, '_blank', 'noreferrer');
  };
  return (
    <div className='m-4 '>
      <div>
        <div className='cpt-input-description-header'>
          อัตราภาษี หรือ ภาษีเงินได้
        </div>
        <div className='cpt-input-description-content'>
          คืออัตราภาษีที่ต้องเสียเมื่อมีรายได้ต่อปีถึงขั้นต่ำ
          ที่รัฐบาลกำหนด คุณสามารถกรอกได้ตามอัตราในแต่ละ
          ประเทศที่คุณเสียภาษีให้ โดยขึ้นอยู่กับว่าคุณมีรายได้
          ต่อปีเท่าไร
        </div>
        <div className='d-flex cpt-input-description-content mb-3'>
          <div style={{color: "#000000"}}>สามารถดูอัตราการเสียภาษีของประเทศไทยได้ที่: &nbsp;
          </div>
          <a className="hypertext-style" onClick={() => openInNewTab('https://www.rd.go.th/59670.html')}>กดเพื่อดูอัตราภาษีประเทศไทย</a>
        </div>
        <div className='cpt-input-description-header'>
          อัตราเงินคิดลด
        </div>
        <div className='cpt-input-description-content'>
          คืออัตราที่ใช้คำนวณในการนำมูลค่าอนาคตย้อนกลับ
          มาเป็นมูลค่าปัจจุบัน หากอัตราคิดลดสูง ทำให้มูลค่านั้น
          ลดลงเมื่อเวลาผ่านไป ยิ่งผ่านไปนานยิ่งมูลค่าลดลงมาก
          เช่น สินค้า 1,000 บาท มีอัตราคิดลด 10%  ต่อปี แสดงว่าเมื่อเวลาผ่านไป 1ปี หากจะซื้อสินค้าในปีนี้จะจ่าย
          1,100 บาท ใช้เงินเพิ่ม 100 บาท คือ 10% ของ 1,000 (มูลค่าเงินลดลง 10% ต่อปี)
        </div>
      </div>
    </div>
  )
}

export default CPT3CurrencyTaxDiscount