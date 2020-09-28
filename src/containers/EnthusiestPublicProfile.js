import React from 'react';
import { Row, Col, Tabs, Icon } from "antd";
import { useSelector } from 'react-redux';
import moment from 'moment';

// Image Import
import HeaderImg from "../assets/images/upload_image.png";
import Location_Img from "../assets/images/country_ic.png";
import Date_Img from "../assets/images/Group 4262.png";
// import ImageSec_1 from "../assets/images/img_1.png";

import { CaptalizeFirst } from '../helpers/methods';

const { TabPane } = Tabs;

const EnthusiestPublicProfile = () => {
  const profile = useSelector(state => state.enthu);
  if (profile.dob) {
    return (
      <div className="header-container">
        <div className="container align-center">
          <div className="page_wrapper">
            <Row>
              <Col span={24} className="header_bg">
                <img
                  className="mb5"
                  width="100%"
                  src={HeaderImg}
                  alt="Header"
                />
              </Col>
              <Col span={6}>
                <div className="profile_img">
                  <img src={profile.picture} alt="Profile" />
                  <span className="edit_btn medium-text an-14">
                    <Icon className="edit_pancil" type="pencil" />Edit
                  </span>
                </div>
              </Col>
              <Col span={12}>
                <div className="profile_details">
                  <h2 className="medium-text an-26">{CaptalizeFirst(profile.name)}</h2>
                  <h5 className="medium-text an-14">{profile.phone}</h5>
                  <p className="medium-text an-14">
                    <img src={Location_Img} alt="Profile" />
                    <span>{profile.country}</span>
                  </p>
                  <p className="medium-text an-14">
                    <img src={Date_Img} alt="Profile" />
                    <span>{moment(profile.dob).format('LL')}</span>
                  </p>
                </div>
              </Col>
              <Col span={6}>
                <div className="profile_btn">
                  <a href="#!" className="msg_btn">
                    Message
                </a>
                  <a href="#!" className="flw_btn">
                    Follow
                </a>
                </div>
              </Col>
            </Row>
            <Row>
              <Col>
                <div>
                  <Tabs defaultActiveKey="1">
                    <TabPane tab="About" key="1">
                      {/* <div className="advanture_sec">
                        <h4>Advanture preferences</h4>
                        <Row gutter={[40, 40]}>
                          <Col className="gutter-row" span={6}>
                            <img src={ImageSec_1} alt="" />
                            <p className="medium-text an-14">
                              Climbing, Hiking and Trekking
                          </p>
                          </Col>
                          <Col className="gutter-row" span={6}>
                            <img src={ImageSec_1} alt="" />
                            <p className="medium-text an-14">
                              Camping and Backpacking
                          </p>
                          </Col>
                          <Col className="gutter-row" span={6}>
                            <img src={ImageSec_1} alt="" />
                            <p className="medium-text an-14">Caving </p>
                          </Col>
                          <Col className="gutter-row" span={6}>
                            <img src={ImageSec_1} alt="" />
                            <p className="medium-text an-14">Safaries</p>
                          </Col>
                        </Row>
                      </div> */}
                    </TabPane>
                    <TabPane tab="Trips" key="2"></TabPane>
                    <TabPane tab="Album" key="3"></TabPane>
                    <TabPane tab="Following" key="4"></TabPane>
                  </Tabs>
                </div>
              </Col>
            </Row>
          </div>
        </div>
      </div>
    )
  } else {
    return null;
  }
}

export default EnthusiestPublicProfile
