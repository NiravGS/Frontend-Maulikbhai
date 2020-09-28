import React from "react";
import { Modal, Row, Col } from "antd";
import ReactHtmlParser from 'react-html-parser';

import Close from "../../assets/images/close_ic.png";

const Cancalletion = (props) => {
  return (
    <Modal
      centered
      className="auth-modal reserve_mdl"
      width={380}
      closable={false}
      maskClosable={false}
      visible={props.visible}>
      <div className="text-left sec_border">
        <Row>
          <Col span={20}>
            <h4 className="sub_title">Cancellation Policy</h4>
            <p className="an-14 medium-text pt10">
             
            </p>
          </Col>
          <Col span={4} className="text-right">
            <img src={Close} alt="close" onClick={props.onCloseClick} />
          </Col>
        </Row>
      </div>
      <div className="ant-advanced-search-form pt20">
        <div className="reserve_frm_bg">
          {ReactHtmlParser(props.data)}
        </div>
      </div>
    </Modal>
  );
};

export default Cancalletion;
