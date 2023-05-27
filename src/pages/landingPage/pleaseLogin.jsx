import React, {  useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'

const PleaseLogin = () => {

    const navigate = useNavigate()
    const isAlert = useRef(false)

    useEffect(() => {
        if (isAlert.current) return
        isAlert.current = true
        alert("กรุณาเข้าสู่ระบบ!")
        navigate('/Login')
    }, [])


    return (
        <div>Please Login</div>
    )
}

export default PleaseLogin