import React from 'react'
import BiztoolTableList from '../../../investmentProject/biztoolBody/biztoolTableList/biztoolTableList'
import EditSidebarData from './editSidebarData'

const editSidebarDataList = (props) => {
  return (
    <div>
      {
        props.data.map((eachData) => 
        <EditSidebarData />
        
        
        )}
    </div>
  )
}

export default editSidebarDataList
