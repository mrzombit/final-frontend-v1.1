import React from 'react'
import BiztoolTable from './biztoolTable/biztoolTable'
const BiztoolTableList = (props) => {

  return (
    <div>
      {Array.isArray(props.data) ?
        props.data.map((eachTable, index) =>
          <BiztoolTable
            handleTableOptionFunction={props.handleTableOptionFunction}
            handleRowOptionFunction={props.handleRowOptionFunction}
            handleFunction={props.handleFunction}
            tableHeaderOnChange={props.tableHeaderOnChange}
            addRowHandle={props.addRowHandle}
            onCellChange={props.onCellChange}
            key={index}
            eachTable={eachTable}
            type={props.type}
            tableStyle={props.tableStyle}
            allData={props.allData?props.allData:null}
            setRepaymentPopupStateFunction={props.setRepaymentPopupStateFunction}
          />
        ) : null}
    </div>
  )
}

export default BiztoolTableList