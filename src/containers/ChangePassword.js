import React from 'react';
import { Icon } from "antd";
import ChangePassword from '../components/Auth/ChangePassword';

const Settings = () => {

  const tabClass = 'tab-grid an-15 medium-text dark-text flex-x align-center space-between';

  return (
    <div className="create-expert-container flex-x container py30">
      <div className="create-profile-tab">
        <div className={`${tabClass} active`}>
          CHANGE PASSWORD {<Icon type="check" />}
        </div>
      </div>
      <div className="create-profile-routes" style={{ width: '100%' }}>
        <ChangePassword />
      </div>
    </div>
  )
}

export default Settings;
