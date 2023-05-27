import React from "react";
import BizSidebarProfile from "../../components/bizTools/bizSidebarProfile/bizSidebarProfile";
import GeneralProfileCard from "../../components/generalProfileCard/generalProfileCard";
import Bizbtn from "../../components/bizTools/bizbtn/bizbtn";
import "./accountPage.css";
function accountPage() {
  return (
    <div>
      <BizSidebarProfile />

      <div className="biz-content-account">

          <div className="text-acc-l">Account</div>
          <div className="acc-mb">
            <GeneralProfileCard />
          </div>
          <div className="text-acc-l">Password and Authentication</div>
          <div className="acc-mb">
            <Bizbtn name="Change Password" />
          </div>
          <div className="text-acc-l">Account Removal</div>
          <div className="acc-mb">
            <Bizbtn name="Delete Account" />
          </div>

      </div>
    </div>
  );
}

export default accountPage;
