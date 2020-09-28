import React from 'react';
import { Icon } from "antd";
import { useSelector } from 'react-redux';

/**
 * App Imports
 */
import CreateEnthStep1 from '../components/Enthusiest/Step1';
import CreateEnthStep2 from '../components/Enthusiest/Step2';
import CreateEnthuSuccess from '../components/Enthusiest/CreateEnthuSuccess';
import UpdateEnthuSuccess from '../components/Enthusiest/UpdateEnthuSuccess';

const CreateEnthusiest = () => {
  const { tab, step1, step2 } = useSelector(state => state.enthu);
  const showSuccess = useSelector(state => state.modal.successModel);
  const updateModal = useSelector(state => state.modal.updateModal);
  const tabClass = 'tab-grid an-15 medium-text dark-text flex-x align-center space-between';

  return (
    <div className="create-expert-container flex-x container py30">
      <div className="create-profile-tab">
        <div className={`${tabClass} ${tab === 1 || step1 ? 'active' : ''}`}>
          PERSONAL INFO {step1 ? (<Icon type="check" />) : ''}
        </div>
        <div className={`${tabClass} ${tab === 2 || step2 ? 'active' : ''}`}>
          ADVENTURE PREFERENCES {step2 ? (<Icon type="check" />) : ''}
        </div>
      </div>
      <div className="create-profile-routes">
        {tab === 1 && (<CreateEnthStep1 />)}
        {tab === 2 && (<CreateEnthStep2 />)}
      </div>
      {showSuccess && (<CreateEnthuSuccess visible={showSuccess} />)}
      {updateModal && (<UpdateEnthuSuccess visible={updateModal} />)}
    </div>
  )
}

export default CreateEnthusiest;
