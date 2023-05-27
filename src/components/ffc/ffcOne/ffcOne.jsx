import React, { useEffect, useState } from "react";
import TitleFFC from "../titleFFC/titleFFC";
import "./ffcOne.css";
import {
  fetchProjectById,
  projectUpdated,
  updateProject,
} from "../../../features/projectsSlice";
import { useDispatch, useSelector } from "react-redux";

function ffcOne() {

  const dispatch = useDispatch();
  const selectedProject = useSelector(
    (state) => state.projects.selectedProject
  );
  const [isLoaded, setIsLoaded] = useState({ user: false, projects: false });
  const [reload, setReload] = useState(false);


  useEffect(() => {

    if (isLoaded.projects) {
      dispatch(fetchProjectById(selectedProject._id));
      setIsLoaded({ user: true, project: true });
    }
    if (!reload) {
      dispatch(fetchProjectById(selectedProject._id));
      setReload(true);
    }
    setffcReason(selectedProject.ffcReason);

  }, [selectedProject]);

  const [ffcReason, setffcReason] = useState(
    selectedProject.ffcReason
  );



  const onValChange = (input) => {
  
    console.log('change');  
    console.log(input);  
    let shallowffcReason = JSON.parse(
      JSON.stringify(input)
    );

    let shallowSelectedProject = {
      ...selectedProject,
      ffcReason: shallowffcReason
    };

    dispatch(projectUpdated(shallowSelectedProject));
    dispatch(
      updateProject({ id: selectedProject._id, data: shallowSelectedProject })
    );
  };

  return (
    <div className="ffc-content">
      <div className="ffc-body-content">
        <div>
          <div>
            <TitleFFC title="เหตุผลในการลงทุน" />
          </div>
          <textarea
            className="input-newInvest-pj"
            style={{ height: "300px", width: "1000px", fontSize: "14px", padding: "10px" }}
            type="textarea"
            name="uname"
            required
            defaultValue={ffcReason}
            onChange={(event) =>
              onValChange(
                // tableService._id,
                // eachService._id,
                event.target.value
              )
            }
          />
        </div>
      </div>
    </div>
  );
}

export default ffcOne;
