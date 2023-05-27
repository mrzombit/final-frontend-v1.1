import React from 'react'
import './ffcCard.css'
import { IconContext } from "react-icons";
import { BsFillBarChartFill } from "react-icons/bs";
import { FaThList } from "react-icons/fa";

const ffcHeadCard = () => {
    return (
        <div className='d-flex justify-content-between'>
            <div>name</div>
            <div className='d-flex'>
                <IconContext.Provider value={{ color: "#9fa7c2" }}>
                    <FaThList />&nbsp;
                    <BsFillBarChartFill />
                </IconContext.Provider>
            </div>
        </div>
    )
}

export default ffcHeadCard
