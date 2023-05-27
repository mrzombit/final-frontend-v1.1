import React, { useEffect } from 'react'
import './biztoolButton.css'

const BiztoolButton = (props) => {
  useEffect(() => {
  }, [props.file])
  
  return (
    <div className=''>
      {props.componentStyle === "filled" &&
        <div
          onClick={() => props.handleFunction(props.data)}
          className='btn filled-biztool-button'
        >
          <div>{props.title}</div>
        </div>}
        {props.componentStyle === "filled-large" &&
        <div
          onClick={() => props.handleFunction(props.data)}
          className='btn filled-biztool-button biztool-button-large'
        >
          <div>{props.title}</div>
        </div>}
      {props.componentStyle === "lighted" &&
        <div
          onClick={() => props.handleFunction(props.data)}
          className='lighted-biztool-button'
        >
          {props.title}
        </div>}
    </div>
  )
}

export default BiztoolButton