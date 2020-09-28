import React from 'react';
import { Icon } from "antd";
import { useSelector } from 'react-redux';

/**
 * App Imports
 */
import CreateExpertStep1 from '../components/Expert/Step1';
import CreateExpertStep2 from '../components/Expert/Step2';
import CreateExpertStep3 from '../components/Expert/Step3';
import CreateExpertSuccess from '../components/Expert/CreateExpertSuccess';
import UpdateExpertSuccess from '../components/Expert/UpdateExpertSuccess';

const CreateExpert = () => {
  const { tab, step1, step2, step3 } = useSelector(state => state.expert);
  const showSuccess = useSelector(state => state.modal.successModel);
  const updateModal = useSelector(state => state.modal.updateModal);
  const tabClass = 'tab-grid an-15 medium-text dark-text flex-x align-center space-between';

  return (
    <div className="create-expert-container flex-x container py30">
      <div className="create-profile-tab">
        <div className={`${tabClass} ${ tab === 1 || step1? 'active': '' }`}>
          PERSONAL INFO {step1 ? (<Icon type="check" />) : ''}
        </div>
        <div className={`${tabClass} ${tab === 2 || step2 ? 'active' : ''}`}>
          BUSINESS DETAILS {step2 ? (<Icon type="check" />) : ''}
        </div>
        <div className={`${tabClass} ${tab === 3 || step3 ? 'active' : ''}`}>
          AWARDS & RECOGNIZATION {step3 ? (<Icon type="check" />) : ''}
        </div>
      </div>
      <div className="create-profile-routes">
        {tab === 1 && (<CreateExpertStep1 />) }
        {tab === 2 && (<CreateExpertStep2 />)}
        {tab === 3 && (<CreateExpertStep3 />)}
      </div>
      {showSuccess && (<CreateExpertSuccess visible={showSuccess}/>) }
      {updateModal && (<UpdateExpertSuccess visible={updateModal} />)}
    </div>
  )
}

export default CreateExpert;
