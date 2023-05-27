import React, { useState } from "react";
import * as FaIcons from "react-icons/fa";
import { Link } from "react-router-dom";
import { mainSidebarData } from "./mainSidebarData";
import "./mainSidebar.css";
import { IconContext } from "react-icons";
import { VscAccount, VscHome, VscExtensions } from "react-icons/vsc";

function MainSidebar() {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [sidebar, setSidebar] = useState(false);

  const showSidebar = () => setSidebar(!sidebar);

  return (
    <>
      <IconContext.Provider value={{ color: "#fff" }}>
        <div className="navbar">
          <div className="menu-bars2">
            <Link to="#" className="menu-bars" >
              <FaIcons.FaBars onClick={showSidebar} />
            </Link>
            <div className="menu-bars2" style={{ marginTop: "4rem" }}>
              <Link to="/" className="mb-4">
                <VscHome />
              </Link>
              <Link to="/WorkSpace">
                <VscExtensions />
              </Link>
            </div>
          </div>
          <Link to="/Profile" className="menu-bars mb-4">
            <VscAccount />
          </Link>
        </div>

        {/* <nav className={sidebar ? "nav-menu active" : "nav-menu"}> */}
        <nav className="nav-menu">
          {/* <ul className='nav-menu-items' onClick={showSidebar}> */}
          <ul className="nav-menu-items">
            <li className="navbar-toggle">
              {/* <Link to='#' className='menu-bars'>
                  <AiIcons.AiOutlineClose />
                </Link> */}
            </li>
            {mainSidebarData.map((item, index) => {
              return (
                <li key={index} className={item.cName}>
                  <Link to={item.path}>
                    {item.icon}
                    <span>{item.title}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </IconContext.Provider>
    </>
  );
}

export default MainSidebar;
