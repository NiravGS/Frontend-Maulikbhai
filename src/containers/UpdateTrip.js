import React, { useEffect, useState, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Icon } from "antd";

/**
 * App Imports
 */
import Step1 from "../components/Trips/Step1";
import Step2 from "../components/Trips/Step2";
import Step3 from "../components/Trips/Step3";
// import CreateTripSuccess from '../components/Trips/CreateTripSuccess';
import { getTripDetail } from "../services/expert";
import { TripsEvents } from "../redux/trips/events";
import SuccessModel from "../components/modal";

const UpdateTrip = (props) => {
  const {
    match: {
      params: { id },
    },
  } = props;
  const { tab, step1, step2, step3 } = useSelector((state) => state.trips);
  const { setData } = TripsEvents;
  const updateModal = useSelector((state) => state.modal.updateModal);
  const [showContent, setShowContent] = useState(false);
  const dispatch = useDispatch();

  const tabClass =
    "tab-grid an-15 medium-text dark-text flex-x align-center space-between";

  const getData = useCallback(
    async (id) => {
      const result = await getTripDetail(id);
      if (result.status === 200) {
        setShowContent(true);
        dispatch(setData(result.data.data));
      }
    },
    [dispatch, setData]
  );

  useEffect(() => {
    getData(id);
  }, [getData, id]);

  if (showContent) {
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
        {updateModal && (
          <SuccessModel
            visible={!updateModal}
            message="Your trip is updated successfully."
          />
        )}
      </div>
    );
  } else {
    return null;
  }
};

export default UpdateTrip;
