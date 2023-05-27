
import { Link } from "react-router-dom";
import {
  bizSidebarData_biztools,
  bizSidebarData_checkbiz,
} from "./bizSidebarData";
import "./bizSidebar.css";
import { IconContext } from "react-icons";
import { useSelector } from "react-redux";
import React, { useEffect } from "react";

function bizSidebar() {

  const selectedProject = useSelector(state => state.projects.selectedProject)

  useEffect(() => {
  
  }, [selectedProject])
  
  return (
    <div>
      <IconContext.Provider value={{ color: "#131832" }}>
        <div className="navbar-biz">
          <span>{selectedProject.name}</span>
          <span style={{ opacity: "0.5", fontSize: "12px" }}>Biztools</span>
          <div className="nav-menu-item-biz mb-3">
            {bizSidebarData_biztools.map((item, index) => {
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
          <span style={{ opacity: "0.5", fontSize: "12px" }}>Check Biz</span>
          <div className="nav-menu-item-biz">
            {bizSidebarData_checkbiz.map((item, index) => {
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

export default bizSidebar;
