import React, { useEffect, useCallback, useState } from 'react';
import { message } from 'antd';
import { withRouter } from "react-router-dom";
import { compose } from "redux";
import { useDispatch } from 'react-redux';

import VerifyModal from '../components/Auth/VerifyProfile';
import { ModalActions } from '../redux/models/events';
import { VerifyProfile } from '../services/auth';

const VerifyEmail = props => {

  const { match: { params: { token } } } = props;
  const [showModel, setShowModel] = useState(false);

  const dispatch = useDispatch();
  const { openAuthModal } = ModalActions;

  const handleClick = () => {
    setShowModel(false);
    dispatch(openAuthModal())
  }

  const verifyProfile = useCallback(async value => {
    try {
      const result = await VerifyProfile(token);
      if (result.status === 200) {
        setShowModel(true);  
      }
    } catch (err) {
      message.error(err.response.data.message);
      setShowModel(false)
    }
  }, [token]);

  useEffect(() => {
    verifyProfile()
  }, [verifyProfile])

  return (
    <div>
      <VerifyModal visible={showModel} handleClick={handleClick}/>
    </div>
  )
}

export default compose(withRouter)(VerifyEmail);
