import React from "react";
import { useSelector } from "react-redux";
import { Icon } from "antd";

/**
 * App Imports
 */
import Step1 from "../components/Trips/Step1";
import Step2 from "../components/Trips/Step2";
import Step3 from "../components/Trips/Step3";
import CreateTripSuccess from "../components/Trips/CreateTripSuccess";

const CreateTrips = () => {
  const { tab, step1, step2, step3 } = useSelector((state) => state.trips);
  const showSuccess = useSelector((state) => state.modal.successModel);
  const tabClass =
    "tab-grid an-15 medium-text dark-text flex-x align-center space-between";

  return (
    <div className="create-expert-container flex-x container py30">
      <div className="create-profile-tab">
        <div className={`${tabClass} ${tab === 1 || step1 ? "active" : ""}`}>
          BASIC INFORMATION {step1 ? <Icon type="check" /> : ""}
        </div>
        <div className={`${tabClass} ${tab === 2 || step2 ? "active" : ""}`}>
          TRIP DETAILS {step2 ? <Icon type="check" /> : ""}
        </div>
        <div className={`${tabClass} ${tab === 3 || step3 ? "active" : ""}`}>
          ADDITIONALS DETAILS {step3 ? <Icon type="check" /> : ""}
        </div>
      </div>
      <div className="create-profile-routes">
        {tab === 1 && <Step1 />}
        {tab === 2 && <Step2 />}
        {tab === 3 && <Step3 />}
      </div>
      {showSuccess && <CreateTripSuccess visible={showSuccess} />}
    </div>
  );
};

export default CreateTrips;
