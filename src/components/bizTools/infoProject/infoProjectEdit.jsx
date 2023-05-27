import React, { useState, useEffect } from "react";
import "./infoProject.css";
import onClickOutside from "react-onclickoutside";
import BizTextInfo from "../bizTextInfo/bizTextInfo";
import { AiOutlineClose } from "react-icons/ai";
import BizLogo from "../bizLogo/bizLogo";

import AUTH from "../../../assets/Mock/mockAuth";

function infoProjectEdit(props) {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [auth, setAuth] = useState(AUTH);
  return (
//   props.trigger ? (
    <div className="">
      <div className="info-pj-body">
        <div className="d-flex flex-col">
          {/* <BizTextInfo title="ข้อมูลพื้นฐานธุรกิจ" /> */}
          <p>ข้อมูลพื้นฐานธุรกิจ</p>
          {/* <AiOutlineClose onClick={props.close} /> */}
        </div>
        <div className="new-invest-form">
          <div className="d-flex label-newInvest-pj">
            <form>
              <div className="input-container">
                <BizTextInfo title="ชื่อธุรกิจ" />
                <input
                  className="input-newInvest-pj"
                  style={{ width: "280px" }}
                  type="text"
                  name="uname"
                  required
                />
              </div>
              <div className="d-flex flex-col">
                <div className="input-container ">
                  {/* <BizTextInfo title="Project Logo"/> */}
                  <div className="label-newInvest-pj">โลโก้ธุรกิจ </div>
                  <BizLogo />
           
                </div>
                <div className="flex-col">
                  <div className="input-container">
                    <BizTextInfo title="วันเริ่มดำเนินธุรกิจ" />
                    <input
                      className="input-newInvest-pj-small"
                      type="text"
                      name="uname"
                      required
                    />
                  </div>
                  <div className="input-container">
                    <BizTextInfo title="ระยะเวลาประเมินธุรกิจ" />

                    <input
                      className="input-newInvest-pj-small"
                      type="text"
                      name="uname"
                      required
                    />
                  </div>
                  <div className="input-container">
                    <BizTextInfo title="สกุลเงิน" />
                    <input
                      className="input-newInvest-pj-small"
                      type="text"
                      name="uname"
                      required
                    />
                  </div>
                  <div className="input-container">
                    <BizTextInfo title="ชั่วโมงทำงาน/วัน" />
                    <input
                      className="input-newInvest-pj-small"
                      type="text"
                      name="uname"
                      required
                    />
                  </div>
                </div>
              </div>
              {/* part2 แนวโน้มยอดขาย*/}
              {/*  */}
            </form>

            <form>
              <div className="input-container">
                <BizTextInfo title="คำอธิบายเกี่ยวกับธุรกิจ" />
                <textarea
                  className="input-newInvest-pj"
                  style={{ height: "143px", width: "250px" }}
                  type="textarea"
                  name="uname"
                  required
                />
              </div>
              <div className="input-container">
                <BizTextInfo title="ประเภทธุรกิจ" />
                <input
                  className="input-newInvest-pj-small"
                  type="text"
                  name="pass"
                  required
                />
              </div>
              <div className="d-flex flex-col">
                <div className="input-container">
                  <BizTextInfo title="ภาษีเงินได้" />
                  <input
                    className="input-newInvest-pj-small"
                    type="text"
                    name="pass"
                    required
                  />
                </div>
                <div className="input-container">
                  <BizTextInfo title="อัตราเงินคิดลด" />
                  <input
                    className="input-newInvest-pj-small"
                    type="text"
                    name="pass"
                    required
                  />
                </div>
              </div>
              {/* <div className="button-container">
                <input className="input-newInvest-pj" type="submit" />
              </div> */}
            </form>
          </div>
         
        </div>
      </div>
    </div>
//   ) : null;
  )
}

export default infoProjectEdit;
