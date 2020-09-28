import React from "react";
import { Modal, Button } from "antd";
import { NavLink, withRouter } from "react-router-dom";
import { compose } from "redux";

/**
 * Image Import
 */
import Success from "../../assets/images/success_ic.png";

const PendingApproval = (props) => {

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
        <h1 className="text-upper medium-text an-26 text- mb15 mt15">
          APPROVAL PENDING
        </h1>
        <p className="an-18 mb20 regular-text">
          Your profile is under review. Once profile is approved you will be able to create trips.
        </p>
        <NavLink to="" className="done_btn medium-text an-16">
          <Button type="primary" className="ex__primary_btn" onClick={props.onCancel}>
            Done
          </Button>
        </NavLink>
      </div>
    </Modal>
  );
};

export default compose(withRouter)(PendingApproval);
