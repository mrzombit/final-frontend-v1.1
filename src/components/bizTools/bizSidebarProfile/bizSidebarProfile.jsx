import React from "react";
import { IconContext } from "react-icons";
import { Link } from "react-router-dom";
import { bizSidebarProfileData } from "./bizSidebarProfileData";
import "./bizSidebarProfile.css";

function bizSidebarProfile() {
  // eslint-disable-next-line react-hooks/rules-of-hooks

  return (
    <div>
      <IconContext.Provider value={{ color: "#131832" }}>
        <div className="navbar-biz">
          {/* <span>KoonK Salon</span>
            <span>KoonK Salon</span> */}

          <div className="nav-menu-item-biz mb-3">
            <div className="bsb-head-font">BIZCHECK</div>
            {bizSidebarProfileData.map((item, index) => {
              return (
                <li key={index} className={item.cName}>
                  <Link to={item.path}>
                    <span>{item.icon}</span>
                    <span className="btn item-title">{item.title}</span>
                  </Link>
                </li>
              );
            })}
          </div>
        </div>
      </IconContext.Provider>
    </div>
  );
}

export default bizSidebarProfile;
