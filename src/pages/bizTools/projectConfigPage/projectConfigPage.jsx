import React from "react";
import BizSidebar from "../../../components/bizTools/bizSidebar/bizSidebar";
import InfoProject from "../../../components/bizTools/infoProject/infoProject";

import BiztoolHeader from "../../../components/investmentProject/biztoolHeader/biztoolHeader";
import BIZTOOL_PAGE_CONFIG from "../pageConfig";

function ProjectConfigPage() {

  const config = BIZTOOL_PAGE_CONFIG.projectConfig

  return (
    <div className="d-flex">
      <BizSidebar />
      <div className="m-5">
        <BiztoolHeader type={config.type} title={config.title} />
        <InfoProject/>
      </div>
    </div>
  );
}

export default ProjectConfigPage;
