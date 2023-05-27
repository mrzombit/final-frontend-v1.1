import React from 'react'
import { IconContext } from 'react-icons'
import { AiFillInfoCircle } from 'react-icons/ai'
import { Link } from 'react-router-dom'
import BIZTOOL_PAGE_CONFIG from '../../../pages/bizTools/pageConfig'
import BiztoolAddTable from '../biztoolAddTable/biztoolAddTable'
import "./biztoolHeader.css"

const BiztoolHeader = (props) => {
  return (
    // <div className='border border-primary d-flex p-2'>
    <div className='d-flex p-2'>
      <div >
        <div className='d-flex biztool-header-text-div mb-2'>
          <div className="biztool-header-text">{props.title}</div>
          <Link to={props.infoPath}>&nbsp;
            <IconContext.Provider value={{ color: "#9fa7c2" }}>
              <AiFillInfoCircle />
            </IconContext.Provider>
          </Link>
        </div>
        {props.type.page !== BIZTOOL_PAGE_CONFIG.revenue.type.page &&
          props.type.page !== BIZTOOL_PAGE_CONFIG.miscellaneous.type.page &&
          props.type.page !== BIZTOOL_PAGE_CONFIG.projectConfig.type.page &&
          props.type.page !== BIZTOOL_PAGE_CONFIG.ffc.type.page &&
          props.type.page !== BIZTOOL_PAGE_CONFIG.statement.type.page &&
          <BiztoolAddTable
            type={props.type}
            title="+ ตารางใหม่"
            handleFunction={props.handleFunction}
          />
        }
        <div className='line-hr mt-2 mb-2'></div>
      </div>
    </div>
  )
}

export default BiztoolHeader