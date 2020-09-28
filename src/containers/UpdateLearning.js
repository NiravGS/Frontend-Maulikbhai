import React, { useEffect, useState, useCallback } from 'react';
import { Icon } from "antd";
import { useSelector, useDispatch } from 'react-redux';

/**
 * App Imports
 */
import CreateEnthStep1 from '../components/Learning/Step1';
import CreateEnthStep2 from '../components/Learning/Step2';
import CreateEnthStep3 from '../components/Learning/Step3';
import CreateLearningSuccess from '../components/Learning/CreateLearningSuccess';
import UpdateLearningSuccess from '../components/Learning/updateLearningSuccess';
import { GetLearningDetails } from '../services/expert';
import { LearningEvents } from '../redux/learning/events';

const UpdateLearning = (props) => {
  const { match: { params: { id } } } = props;
  const { setData } = LearningEvents;
  const { tab, step1, step2, step3 } = useSelector(state => state.learning);
  const showSuccess = useSelector(state => state.modal.successModel);
  const updateModal = useSelector(state => state.modal.updateModal);
  const [showContent, setShowContent] = useState(false);
  const dispatch = useDispatch();

  const tabClass = 'tab-grid an-15 medium-text dark-text flex-x align-center space-between';

  const getData = useCallback(async (id) => {
    const result = await GetLearningDetails(id);
    if (result.status === 200) {
      setShowContent(true);
      dispatch(setData(result.data.data))
    }
  }, [dispatch, setData])

  useEffect(() => {
    getData(id)
  }, [getData, id])

  if (showContent) {
    return (
      <div className="create-expert-container flex-x container py30">
        <div className="create-profile-tab">
          <div className={`${tabClass} ${tab === 1 || step1 ? 'active' : ''}`}>
            Basic Information {step1 ? (<Icon type="check" />) : ''}
          </div>
          <div className={`${tabClass} ${tab === 2 || step2 ? 'active' : ''}`}>
            Workshop Details {step2 ? (<Icon type="check" />) : ''}
          </div>
          <div className={`${tabClass} ${tab === 3 || step3 ? 'active' : ''}`}>
            Additional Details {step3 ? (<Icon type="check" />) : ''}
          </div>
        </div>
        <div className="create-profile-routes">
          {tab === 1 && (<CreateEnthStep1 />)}
          {tab === 2 && (<CreateEnthStep2 />)}
          {tab === 3 && (<CreateEnthStep3 />)}
        </div>
        {showSuccess && (<CreateLearningSuccess visible={showSuccess} />)}
        {updateModal && (<UpdateLearningSuccess visible={updateModal} />)}
      </div>
    )
  }
  else {
    return null;
  }
}
export default UpdateLearning;
