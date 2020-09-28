import React, { useEffect, useCallback, useState } from "react";
import { Row, Col, List, Avatar, Radio, Form } from "antd";
import { Link } from "react-router-dom";

// Image Import
import Placeholder from "../assets/images/placeholder.png";
import Location_Img from "../assets/images/country_ic.png";
import Group_1 from "../assets/images/group_1.png";
import Group_3 from "../assets/images/group_3.png";
import Sleep_1 from "../assets/images/sleep_1.png";
import Share from "../assets/images/share_ic.png";
import Skill from "../assets/images/skill_ic_filled.png";
import Star from "../assets/images/men.png";
import Participate from "../assets/images/participants_ic_filled.png";
import ReactHtmlParser from 'react-html-parser';
import { GetLearningDetails } from '../services/expert';
import { CaptalizeFirst } from '../helpers/methods';
import TripMap from "../components/Trips/Map";

const ApiKey = process.env.REACT_APP_GOOGLE_MAP_API_KEY;

// Header Section
const data = [
  {
    title1: "Location",
    title2: "Duration",
    title3: "Difficulty level",
    title4: "Activity",
    title5: "Expedition Type",
  },
];

const WorkShopEdit = (props) => {
  const { match: { params: { id } } } = props;
  const [showContent, setShowContent] = useState(false);
  const [learning, setLearning] = useState(null)

  const getData = useCallback(async (id) => {
    const result = await GetLearningDetails(id);
    if (result.status === 200) {
      setShowContent(true);
      setLearning(result.data.data)
    }
  }, [])

  useEffect(() => {
    getData(id)
  }, [getData, id])
  if (showContent && learning) {
    return (
      <div className="header-container w_bg">
        <div
          className="gallery_bg"
          style={{ backgroundImage: `url(${learning.cover})` }}
        ></div>
        <div className="container align-center">
          <div className="expedition_bg">
            <div className="gallery_sec">
              <Row>
                <Col>
                  <h1 className="an-30 medium-text">{CaptalizeFirst(learning.title)}</h1>
                </Col>
              </Row>
              <Row gutter={20}>
                <Col span={16}>
                  <List
                    title="Location"
                    itemLayout="horizontal"
                    dataSource={data}
                    renderItem={(item) => (
                      <List.Item>
                        <List.Item.Meta
                          avatar={<Avatar src={Location_Img} />}
                          title="Location"
                          description={CaptalizeFirst(learning.country)}
                        />
                      </List.Item>
                    )}
                  />
                  <Row gutter={20}>
                    <Col span={8}>
                      <List
                        itemLayout="horizontal"
                        dataSource={data}
                        renderItem={(item) => (
                          <List.Item>
                            <List.Item.Meta
                              avatar={<Avatar src={Sleep_1} />}
                              title="Duration"
                              description={`${learning.duration} Nights`}
                            />
                          </List.Item>
                        )}
                      />
                    </Col>
                    <Col span={8}>
                      <List
                        itemLayout="horizontal"
                        dataSource={data}
                        renderItem={(item) => (
                          <List.Item>
                            <List.Item.Meta
                              avatar={<Avatar src={Group_1} />}
                              title="Difficulty Level"
                              description="Moderate"
                            />
                          </List.Item>
                        )}
                      />
                    </Col>

                    <Col span={8}>
                      <List
                        itemLayout="horizontal"
                        dataSource={data}
                        renderItem={(item) => (
                          <List.Item>
                            <List.Item.Meta
                              avatar={<Avatar src={Group_3} />}
                              title="Activity"
                              description={learning.activity.map(a => `${CaptalizeFirst(a)},`)}
                            />
                          </List.Item>
                        )}
                      />
                    </Col>
                    <Col span={8}>
                      <List
                        itemLayout="horizontal"
                        dataSource={data}
                        renderItem={(item) => (
                          <List.Item>
                            <List.Item.Meta
                              avatar={
                                <Avatar src={Skill} className="pl5 fill-width" />
                              }
                              title="Skill Level"
                              description={parseInt(learning.skill) < 49 ? 'Beginner' : parseInt(learning.skill) > 49 && parseInt(learning.skill) < 99 ? 'Moderate' : 'Advance'}
                            />
                          </List.Item>
                        )}
                      />
                    </Col>
                    <Col span={8}>
                      <List
                        itemLayout="horizontal"
                        dataSource={data}
                        renderItem={(item) => (
                          <List.Item>
                            <List.Item.Meta
                              avatar={
                                <Avatar src={Star} className="pl5 fill-width" />
                              }
                              title="Workshop Type"
                              description={`${CaptalizeFirst(learning.workshopType)} - ${CaptalizeFirst(learning.workshopMedium)}`}
                            />
                          </List.Item>
                        )}
                      />
                    </Col>
                    <Col span={8}>
                      <List
                        itemLayout="horizontal"
                        dataSource={data}
                        renderItem={(item) => (
                          <List.Item>
                            <List.Item.Meta
                              avatar={
                                <Avatar
                                  src={Participate}
                                  className="pl5 fill-width"
                                />
                              }
                              title="Participants"
                              description={learning.participants}
                            />
                          </List.Item>
                        )}
                      />
                    </Col>
                  </Row>
                  <Row>
                    <Col span={24}>
                      <div className="text-right edt_btn_sec header_edit">
                        <Link to={`/update-learning/${id}`}>
                          <i class="fas fa-pencil-alt"></i> Edit
                        </Link>
                      </div>
                    </Col>
                  </Row>
                </Col>
                <Col span={8}>
                  <div className="date_sec br5">
                    <Row className="header_per_txt">
                      <Col span={14}>
                        <h2 className="an-30 medium-text mb10">{learning.price} $</h2>
                        <p className="mb10 an-14 medium-text">Per Person</p>
                      </Col>
                      <Col span={4}>
                        <div className="share_btn">
                          <img src={Share} alt="share" />
                        </div>
                      </Col>
                      <Col span={6}>
                        <div className="edt_btn_sec">
                          <Link to={`/update-learning/${id}`}>
                            <i class="fas fa-pencil-alt"></i> Edit
                          </Link>
                        </div>
                      </Col>
                    </Row>
                    <Row>
                      <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                        <div className="select_date mt10">
                          <p className="an-14 medium-text pt10 fill-width">
                            Select Date
                      </p>
                          <Link to="\">More Details</Link>
                        </div>
                      </Col>
                      <Col>
                        <Row>
                          <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                            <Form.Item>
                              <Radio.Group initialValue="individual">
                                <Radio.Button value="individual">
                                  10 Mar 20
                            </Radio.Button>
                                <Radio.Button value="couples">
                                  20 Mar 20
                            </Radio.Button>
                                <Radio.Button value="date">
                                  30 Mar 20
                            </Radio.Button>
                              </Radio.Group>
                            </Form.Item>
                          </Col>
                        </Row>
                        <div className="btn_head">
                          <Link
                            to="\"
                            className="yellow_btn mr10 an-14 medium-text"
                          >
                            I’m Interested
                      </Link>
                          <Link to="\" className="green_btn an-14 medium-text">
                            Reserve
                      </Link>
                        </div>
                      </Col>
                    </Row>
                  </div>
                </Col>
              </Row>
            </div>
            <Row gutter={20} className="pt60">
              <Col span={24}>
                <h3 className=" an-22 medium-text pb10">Workshop Details</h3>
              </Col>
              <Col span={12}>
                <div className="trip_detail_des">
                  <h4 className="medium-text an-18">About This Workshop</h4>
                </div>
              </Col>
              <Col span={4}>
                <div className=" text-right edt_btn_sec">
                  <Link to={`/update-learning/${id}`}>
                    <i class="fas fa-pencil-alt"></i> Edit
                  </Link>
                </div>
              </Col>
              <Col span={16}>
                <div className="trip_detail_des">
                  <span className="lh-30">{ReactHtmlParser(learning.description)}</span>
                </div>
                <div className="trip_detail_des">
                  <h4 className="medium-text an-18">What will you learn ?</h4>
                  {ReactHtmlParser(learning.whatLearn)}
                </div>

                <div className="trip_detail_des">
                  <h4 className="medium-text an-18">Who should attend ?</h4>
                  {ReactHtmlParser(learning.attend)}
                </div>
              </Col>
              <Col span={8}>
                <div className="trip_exp_bg br20 text-center pb40">
                  <h4 className="sub_title text-center">About This Experts</h4>
                  <img src={learning.expert.profile} alt="profile" className="br10" />
                  <h5 className="an-14 medium-text pt10 mb10">{`${CaptalizeFirst(learning.expert.firstName)} ${CaptalizeFirst(learning.expert.lastName)}`}</h5>
                  <p className="grn_txt medium-text an-14">
                    {learning.expert.experties.map(e => `${CaptalizeFirst(e)}, `)}
                  </p>
                  <p>
                    <img
                      src={Location_Img}
                      alt=""
                      className="pb10"
                      id="location_img"
                    />
                    {CaptalizeFirst(learning.expert.country)}
                  </p>
                  <p>
                  </p>
                  <Link to={`/expert-profile/${learning.expert._id}`} className="ex__primary_btn pt20 pb20 br5">
                    View Profile
                  </Link>
                </div>
              </Col>
            </Row>
            <Row className="bg_map">
              <Col span={16}>
                <Row className="pt20">
                  <Col span={20}>
                    <h3 className=" an-22 medium-text pb10">Location</h3>
                  </Col>
                  <Col span={4}>
                    <div className="text-right edt_btn_sec">
                      <Link to={`/update-learning/${id}`}>
                        <i class="fas fa-pencil-alt"></i> Edit
                  </Link>
                    </div>
                  </Col>
                  <Col span={16}>
                    <div className="trip_detail_des">
                      <h4 className="medium-text an-18">Meeting Point</h4>
                      <p className="lh-30">{learning?.meetingPoint}</p>
                    </div>
                  </Col>
                </Row>
                <div className="map pt30 pb30">
                  <TripMap
                    center={learning.location.coordinates}
                    zoom={5}
                    ApiKey={ApiKey}
                  />
                </div>
              </Col>
            </Row>
            <Row>
              <Col span={12}>
                {learning?.accomodation && (
                  <Col span={16}>
                    <div>
                      <h4 className="sub_title">Accommodation</h4>
                      <div className="lh-30">{ReactHtmlParser(learning?.accomodation)}</div>
                    </div>
                  </Col>)}
              </Col>
              <Col span={4}>
                {learning?.accomodation && (
                  <div className="text-right edt_btn_sec mt25">
                    <Link to={`/update-learning/${id}`}>
                      <i class="fas fa-pencil-alt"></i> Edit
                    </Link>
                  </div>
                )}
              </Col>
            </Row>

            <Row gutter={20} className="mt40 mb40">
              {learning.inclusion && (
                <Col span={8}>
                  <div className="inclusion_sec brder_sec">
                    <Row className="border_btm">
                      <Col span={12}>
                        <h4 className="sub_title brder_nn">Inclusions</h4>
                      </Col>
                      <Col span={12}>
                        <div className="text-right edt_btn_sec mt15">
                          <Link to={`/update-learning/${id}`}>
                            <i class="fas fa-pencil-alt"></i> Edit
                    </Link>
                        </div>
                      </Col>
                    </Row>
                    {ReactHtmlParser(learning?.inclusion)}
                  </div>
                </Col>
              )}
              {learning.exclusion && (
                <Col span={8}>
                  <div className="inclusion_sec brder_sec an-16">
                    <Row className="border_btm">
                      <Col span={12}>
                        <h4 className="sub_title brder_nn">Exclusion</h4>
                      </Col>
                      <Col span={12}>
                        <div className="text-right edt_btn_sec mt15">
                          <Link to={`/update-learning/${id}`}>
                            <i class="fas fa-pencil-alt"></i> Edit
                          </Link>
                        </div>
                      </Col>
                    </Row>
                    {ReactHtmlParser(learning?.exclusion)}
                  </div>
                </Col>
              )}
            </Row>

            <Row>
              <Col span={16}>
                <div className="person_sec">
                  <div className="fill-width">
                    <h1 className="medium-text an-28 mb0">{learning.price}$</h1>
                    <p className="an-14 medium-text">Per Person</p>
                  </div>
                  <div className="fill-width text-right">
                    <Link to="\" className="yellow_btn mr10 an-14 medium-text">
                      I’m Interested
                </Link>
                    <Link to="\" className="green_btn an-14 medium-text">
                      Reservation
                </Link>
                    <h6 className="an-14">Cancellation Policy</h6>
                  </div>
                </div>
              </Col>
            </Row>
            <Row>
              <Col>
                <div className="photo_sec">
                  <Row>
                    <Col>
                      <Row>
                        <Col span={12}>
                          <h4 className="sub_title">
                            Pictures and Videos from Past Workshops
                      </h4>
                        </Col>
                        <Col span={12}>
                          <div className="text-right edt_btn_sec mt20">
                            <Link to="/">
                              <i class="fas fa-pencil-alt"></i> Add Photos
                        </Link>
                          </div>
                        </Col>
                      </Row>
                      <Row gutter={[40]}>
                        <Col className="gutter-row" span={8}>
                          <img src={Placeholder} alt="" />
                        </Col>
                        <Col className="gutter-row" span={8}>
                          <img src={Placeholder} alt="" />
                        </Col>
                        <Col className="gutter-row" span={8}>
                          <img src={Placeholder} alt="" />
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                </div>
              </Col>
            </Row>
          </div>
        </div>
      </div>
    );
  } else {
    return null
  }
};
export default WorkShopEdit;
