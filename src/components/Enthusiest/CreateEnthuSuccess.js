import React from "react";
import { Modal, Button } from "antd";
import { NavLink, withRouter } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { compose } from "redux";

/**
 * Image Import
 */
import Success from "../../assets/images/success_ic.png";

/**
 * App Imports
 */
import { ModalActions } from '../../redux/models/events';
import { AuthActions } from '../../redux/auth/events';

const CreateEnthuSuccess = (props) => {
  const dispatch = useDispatch();
  const { closeSuccessModal } = ModalActions;
  const { changeRole } = AuthActions;

  const handleClick = () => {
    dispatch(closeSuccessModal());
    dispatch(changeRole('enthusiasts'));
    props.history.push('/enthusiest-profile');
  }

  return (
    <Modal
      centered
      className="auth-modal success-modal"
      width={380}
      closable={false}
      maskClosable={false}
      visible={props.visible}
    >
      <div className="text-center">
        <img src={Success} alt="" />
        <h1 className="text-upper medium-text an-26 text-success mb15 mt15">
          Successfully Created
        </h1>
        <p className="an-18 mb20 regular-text">
          Your profile is successfully created.
        </p>
        <NavLink to="" className="done_btn medium-text an-16">
          <Button type="primary" className="ex__primary_btn" onClick={handleClick}>
            Done
          </Button>
        </NavLink>
      </div>
    </Modal>
  );
};

export default compose(withRouter)(CreateEnthuSuccess);
