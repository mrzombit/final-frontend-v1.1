import React from "react";
import "./biztoolOption.css";

const BiztoolOption = (props) => {
    return props.trigger ? (
        <div className="option-overlay"
            style={{
                left: `${props.left+0}px`,
                top: `${props.top+20}px`
            }}>
            <div className="option-content-style">
                <div className=" flex-col justify-content-center  d-flex">
                    <div className="align-items-center popup-content">
                        {props.content}
                    </div>
                </div>
            </div>
        </div>
    ) : null;
}

export default BiztoolOption