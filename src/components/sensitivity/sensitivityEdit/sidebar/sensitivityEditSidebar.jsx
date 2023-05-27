import React, { useState } from "react";
import { AiOutlineDoubleLeft } from "react-icons/ai";
import "./sensitivityEditSidebar.css";

function sensitivityEditSidebar() {
  const [sidebar, setSidebar] = useState(false);

  const showSidebar = () => setSidebar(!sidebar);

  // const selectedProject = useSelector(
  //   (state) => state.projects.selectedProject
  // );

  // useEffect(() => {}, [selectedProject]);

  return (
    <div className="d-flex">

      {sidebar ? (
        <div className="sen-sidebar">
          {/* <ul className='nav-menu-items' onClick={showSidebar}></ul> */}
          <div className="sen-sidebar-show" onClick={showSidebar}>
            <AiOutlineDoubleLeft />
          </div>
        </div>
      ) : (
        <div className="sen-sidebar2">
          {/* <ul className='nav-menu-items' onClick={showSidebar}></ul> */}
          <div className="sen-sidebar-show2" onClick={showSidebar}>
            <AiOutlineDoubleLeft />
          </div>
        </div>
      )}
    </div>
  );
}

export default sensitivityEditSidebar;
