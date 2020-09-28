import React, { useEffect, useCallback, useState } from 'react';
import { Icon, message } from "antd"; 
import { withRouter } from "react-router-dom";
import { compose } from "redux";

/**
 * App Imports
 */
import ResetPasswordForm from '../components/Auth/ResetPassword';
import { checkResetToken } from '../services/auth';

const ResetPassword = (props) => {
  const { match: { params } } = props;
  const [loader, setLoader] = useState(true);

  const checkToken = useCallback(async (token) => {
    try {
      const result = await checkResetToken(token);
      if (result.status === 200) {
        setLoader(false);
      } else {
        message.error('Link as expired !!');
        props.history.push('/')
      } 
    } catch (err) {
      message.error(err.response.data.message);
      props.history.push('/')
    }
  }, [props.history])

  useEffect(() => {
    checkToken(params.token)
  }, [checkToken, params]);

  const tabClass = 'tab-grid an-15 medium-text dark-text flex-x align-center space-between';
  if(!loader) {
    return (
      <div className="create-expert-container flex-x container py30">
        <div className="create-profile-tab">
          <div className={`${tabClass} active`}>
            RESET PASSWORD {<Icon type="check" />}
          </div>
        </div>
        <div className="create-profile-routes" style={{ width: '100%' }}>
          <ResetPasswordForm token={params.token}/>
        </div>
      </div>
    )
  } else {
    return null;
  }
}

export default compose(withRouter)(ResetPassword);
