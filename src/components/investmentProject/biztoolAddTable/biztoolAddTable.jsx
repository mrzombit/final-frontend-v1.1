import React from 'react'
import BiztoolButton from '../../common/biztoolButton/biztoolButton'

const BiztoolAddTable = (props) => {

  return (
    <BiztoolButton
      componentStyle="filled"
      data={props.type}
      title="+ ตารางใหม่"
      handleFunction={props.handleFunction}
    />
  )
}

export default BiztoolAddTable