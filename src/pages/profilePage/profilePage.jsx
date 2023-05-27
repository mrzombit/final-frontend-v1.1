import React from "react";
import BizSidebarProfile from "../../components/bizTools/bizSidebarProfile/bizSidebarProfile";
import GeneralProfileCard from "../../components/generalProfileCard/generalProfileCard";
import "./profilePage.css";

function ProfilePage() {
  return (
    <div>
      <BizSidebarProfile />
      <div className="biz-content">
        <div className="profile-banner">
          <div className="profile-pic"></div>
          <div className="user-name">Name Surname</div>
        </div>
        <div className="profile-card-mt"><GeneralProfileCard /></div>
      </div>
    </div>
  );
}

export default ProfilePage;
