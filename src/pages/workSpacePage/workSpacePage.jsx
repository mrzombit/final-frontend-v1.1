import React, { useState, useEffect } from "react";
import "./workSpacePage.css";
import {
  VscAdd,
  VscListUnordered,
  VscDiff,
  VscExtensions,
  VscListSelection,
} from "react-icons/vsc";
import { CiGrid41 } from "react-icons/ci";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserByUsername } from "../../features/usersSlice";
import { fetchProjectsByUserId, setSelectedProject } from "../../features/projectsSlice";
import BiztoolPopup from "../../components/common/biztoolPopup";
import BiztoolOption from "../../components/common/biztoolOption";
import Bizbutton from "../../components/bizTools/bizButton/bizButton";

import ProjectCard from "../../components/projects/projectCard/projectCard";
import ProjectOptionMenu from "./projectOptionMenu";
import CreateProjectTemplate from "../createNewProjectPage/createProjectTemplate";

function WorkSpacePage() {
  const [newProjectPopupState, setNewProjectPopupState] = useState(false);
  const [projectOptionState, setProjectOptionState] = useState(false);
  const [projectData, setProjectData] = useState()
  const [optionAddress, setOptionAddress] = useState({
    left: 0,
    top: 0
  })
  const [thisElement, setThisElement] = useState("")

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const auth = useSelector(state => state.users.auth)
  const user = useSelector(state => state.users.user)
  const projects = useSelector(state => state.projects.projects)
  const [isLoaded, setIsLoaded] = useState({ user: false, projects: false })

  useEffect(() => {
    if (auth.username) {
      if (auth.token !=="") {
        if (!isLoaded.user) {
          dispatch(fetchUserByUsername({ username: auth.username, token: auth.token }))
          setIsLoaded({ user: true, projects: false })
        }
      }
      if (isLoaded.user) {
        if (!isLoaded.projects) {
          dispatch(fetchProjectsByUserId(user._id))
          setIsLoaded({ user: true, projects: true })
        }
      }
    }
    else navigate('/login')
  }, [auth.token, user, newProjectPopupState]);

  const handleProjectOnClick = (each) => {
    // console.log(JSON.stringify(each));
    dispatch(setSelectedProject(each))
    navigate('/ProjectConfig')
  }

  const onProjectOptionHandle = (data, left, top, element) => {
    setThisElement(thisElement)
    setOptionAddress({
      left: left,
      top: top
    })
    
    if (!projectData || (data._id !== projectData._id)) {
      setProjectData(data)
      setProjectOptionState(true)
    }
    else {
      setProjectOptionState(false)
    }
  }

  // if (thisElement) {
  //   document.addEventListener('click', function (e) {
  //     if (!document.getElementById(thisElement).contains(e.target)) {
  //       setProjectOptionState(false)
  //     }
  //   })
  // }

  return (
    <div id='workspace-id'>
      <BiztoolPopup
        leftTitle="สร้างโปรเจกธุรกิจใหม่"
        // content={<AddProjectForm />}
        content={<CreateProjectTemplate />}
        trigger={newProjectPopupState}
        close={() => setNewProjectPopupState(false)}
      />
      
      <BiztoolOption
        left={optionAddress.left}
        top={optionAddress.top}
        content={<ProjectOptionMenu projectData={projectData} setProjectOptionState={setProjectOptionState}/>}
        trigger={projectOptionState}
        close={() => setProjectOptionState(false)}
      />
      <div className="ws">
        <p className="head-text-ws mt-4">ธุรกิจของฉัน</p>
        <hr className="line"></hr>
        <div className="d-flex mt-4">
          <div className="d-flex">
            <Bizbutton
              onClick={() => setNewProjectPopupState(true)}
              name="สร้างโปรเจกธุรกิจใหม่"
              details="ประเมินความเป็นไปได้ของธุรกิจของคุณ"
              icon={<VscExtensions />}
              add={<VscAdd />}
            />
            <Bizbutton
              name="เปรียบเทียบระหว่างธุรกิจ 0/4"
              details="เปรียบเทียบความน่าลงทุนระหว่างธุรกิจ"
              icon={<VscDiff />}
            />
          </div>
          <div className="ss-group">
            <p className="ss-font-text m-2">ล่าสุด</p>
            <VscListUnordered className="ss-font-icon m-2" />
            <CiGrid41 className="ss-font-icon m-2" />
            <input
              className="form-control mr-sm-2 ss-font-search m-2 ss-font-text"
              type="search"
              placeholder="ค้นหา"
              aria-label="Search"
            />
            <VscListSelection className="ss-font-icon m-2" />
          </div>
        </div>
        <div className="d-flex my-3">
          {projects.map((each) => (
            <div className="d-flex" key={each._id}>
              <button style={{ background: "none", border: "none" }} key={each._id} onClick={() => handleProjectOnClick(each)}>
                <ProjectCard name={each.name.slice(0, 12) + (each.name.length > 12 ? "..." : "")} lastEdit="Edited 2 hours ago" />
              </button>
              <button
                id={each._id}
                className="project-option-button-style"
                onClick={() =>
                  onProjectOptionHandle(each,
                    document.getElementById(each._id).getBoundingClientRect().left,
                    document.getElementById(each._id).getBoundingClientRect().top,
                    each._id
                  )}>
                <BsThreeDotsVertical/>
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default WorkSpacePage;
