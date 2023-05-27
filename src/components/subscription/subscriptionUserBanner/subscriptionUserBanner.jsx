import React from "react";
import "./subscriptionUserBanner.css";
import { SiMastercard } from "react-icons/si";

function subscriptionUserBanner() {
  return (
    <div className="subscript-banner">
      <div className="t-box">
        <div>Your Subscription Plan</div>
        <div>Free trial</div>
      </div>
      <div className="t-box2">
        <div>
          <div>Payment</div>
          <div className="master-card-text">
            <div>
              <div>
                <SiMastercard />
                Mastercard ending in 7317
              </div>
              <div>Expires: 03/2026</div>
            </div>
          </div>
          <div>Next Billing is on 10 Oct 2022</div>
          <div>
            <div>Update</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default subscriptionUserBanner;
