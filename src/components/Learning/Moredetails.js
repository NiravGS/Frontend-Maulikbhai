import React from "react";
import { Modal, Row, Col } from "antd";
import * as moment from 'moment';

import Close from "../../assets/images/close_ic.png"

const MoreDates = (props) => {
  
  return (
    <Modal
      centered
      className="auth-modal reserve_mdl"
      width={380}
      closable={false}
      maskClosable={false}
      visible={props.visible}>
      <div className="head_title pb10">
        <Row>
          <Col span={12}>
            <h5 className="an-14 medium-text">More Dates</h5>
          </Col>
          <Col span={12}>
            <div className="text-right">
              <img src={Close} alt="Delete" onClick={props.onCloseClick} />
            </div>
          </Col>
        </Row>
      </div>
      { props.data.map((d, i) => {
        return (
          <div className="date_mdl pb15">
            <Row key={i}>
              <Col span={6}>
                <h4 className="an-16 medium-text">{moment(d.fromDate).format("LL")}</h4>
              </Col>
              <Col span={6}>
                <h4 className="an-16 medium-text">${d.price}</h4>
              </Col>
              <Col span={12}>
                <div className="text-right">
                  <button
                    type="button"
                    onClick={props.onIntseretClick}
                    className="interest_btn an-14 medium-text"
                  >
                    I’m Interested
                </button>
                  <button 
                    type="button" 
                    onClick={props.onReserveClick}
                    className="reserve_btn an-14 medium-text">
                    Reserve
                </button>
                </div>
              </Col>
            </Row>
        </div> 
        )
      }) }
    </Modal>
  );
};

export default MoreDates;