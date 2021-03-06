import React, { useEffect, useCallback, useState, Fragment } from "react";
import { Row, Col, List, Avatar, Radio, Form, Card, Badge, Rate, Menu, Dropdown, message } from "antd";
import { Link } from "react-router-dom";
import ReactHtmlParser from "react-html-parser";
import moment from "moment";
import { useSelector } from "react-redux";

// Image Import
import Placeholder from "../assets/images/placeholder.png";
import Location_Img from "../assets/images/country_ic.png";
import Share from "../assets/images/share_ic.png";
import Heart from "../assets/images/save_ic.png";
import Skill from "../assets/images/skill_ic_filled.png";
import Star from "../assets/images/men.png";
import Participate from "../assets/images/participants_ic_filled.png";

import Clock from "../assets/images/duration_ic_filled.png";
import Activity from "../assets/images/activity_ic_filled.png";
import Speak from "../assets/images/speaks_ic.png";

import Lang from "../assets/images/followers_ic.png";
import { GetLearningDetails, getSimilarLearnings } from "../services/expert";
import { CaptalizeFirst } from "../helpers/methods";
import TripMap from "../components/Trips/Map";
import {
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
} from "react-share";

import Facebook from "../assets/images/fb_ic.png";
import WhatsApp from "../assets/images/whatsapp_ic.png";
import Twitter from "../assets/images/twitter_ic.png";

import Reservation from "../components/Trips/Reservation";
import Interested from "../components/Trips/Interested";
import Cancellation from "../components/Trips/Cancellation";
import MoreDetails from "../components/Learning/Moredetails";

import AppLoader from "../components/Loader";

const ApiKey = process.env.REACT_APP_GOOGLE_MAP_API_KEY;
const URL =
  "http://expeditions-connect-app.s3-website.eu-central-1.amazonaws.com";

const colors = ["yellow"];

// Header Section
const data = [
  {
    title: "Location",
    title3: "Duration",
    title2: "Difficulty level",
    title4: "Activity",
    title5: "Expedition Type",
  },
];

const WorkShopDetails = (props) => {
  const {
    match: {
      params: { id },
    },
  } = props;
  const [showContent, setShowContent] = useState(false);
  const [learning, setLearning] = useState(null);
  const [similarLearning, setSimilarLearnings] = useState(null);
  const [similarLoader, setSimilarLoader] = useState(false);
  const [slot, setSlot] = useState(null);
  const [showR, setShowR] = useState(false);
  const [showInterest, setShowInterest] = useState(false);
  const [showCanc, setShowCanc] = useState(false);
  const isLogin = useSelector((state) => state.auth.isLogin);
  const role = useSelector((state) => state.auth.role);
  const [datePrice, setDatePrice] = useState("");
  const [moreDetail, setMoreDetails] = useState(false);

  const onCloseClick = () => {
    setShowR(false);
    setShowCanc(false);
    setMoreDetails(false);
  };
  const onInstCloseClick = () => setShowInterest(false);

  const onReserveClick = () => {
    if (!slot) {
      return message.error(
        "Please select date slot to make reservation request"
      );
    }
    if (isLogin) {
      if (role !== "enthusiasts") {
        return message.error(
          "You must be logged in as enthusiasts to send request"
        );
      }
      setShowR(true);
    } else {
      message.error("Please login to make reservation request");
    }
  };

  const selectDate = (date, price) => {
    setSlot(date);
    setDatePrice(price);
  };

  const onIntseretClick = () => {
    if (isLogin) {
      if (role !== "enthusiasts") {
        return message.error(
          "You must be logged in as enthusiasts to send request"
        );
      }
      setShowInterest(true);
    } else {
      message.error("Please login to make reservation request");
    }
  };

  const menu = (
    <Menu className="share_btn_box">
      <Menu.Item>
        <FacebookShareButton url={`${URL}/learning-details/${id}`}>
          <img src={Facebook} alt="facebook" className="pr10" />
          Facebook
        </FacebookShareButton>
      </Menu.Item>
      <Menu.Item>
        <WhatsappShareButton url={`${URL}/learning-details/${id}`}>
          <img src={WhatsApp} alt="twitter" className="pr10" />
          WhatsApp
        </WhatsappShareButton>
      </Menu.Item>
      <Menu.Item>
        <TwitterShareButton
          url={`${URL}/trips-details/${id}`}
          style={{ border: "none" }}
        >
          <img src={Twitter} alt="twitter" className="pr10" />
          Twitter
        </TwitterShareButton>
      </Menu.Item>
    </Menu>
  );

  const getData = useCallback(async (id) => {
    const result = await GetLearningDetails(id);
    if (result.status === 200) {
      setShowContent(true);
      setLearning(result.data.data);
    }
    const data = { activity: JSON.stringify(result.data.data.activity) };
    const st = await getSimilarLearnings(data);
    if (st.status === 200) {
      setSimilarLearnings(st.data.data);
      setSimilarLoader(true);
      setDatePrice(st.data.data.price);
    }
  }, []);

  useEffect(() => {
    getData(id);
  }, [getData, id]);
  console.log('Learning', learning);
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
                  <h1 className="an-30 medium-text">
                    {CaptalizeFirst(learning.title)}
                  </h1>
                  {learning.country !== 'undefined' && (
                    <h4 className="an-15 medium-text work_title">
                      <Avatar src={Location_Img} />{" "}
                      {CaptalizeFirst(learning.country)}
                    </h4>
                  ) }
                </Col>
              </Row>
              <Row gutter={20}>
                <Col span={16}>
                  <Row gutter={20}>
                    <Col span={8}>
                      <List
                        itemLayout="horizontal"
                        dataSource={data}
                        renderItem={(item) => (
                          <List.Item>
                            <List.Item.Meta
                              avatar={<Avatar src={Clock} />}
                              title="Duration"
                              description={`${learning.duration} Days`}
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
                              avatar={<Avatar src={Activity} />}
                              title="Activity"
                              description={learning.activity.map(
                                (a) => `${CaptalizeFirst(a)} `
                              )}
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
                              avatar={<Avatar src={Speak} />}
                              title="Language"
                              description={learning.langauges.map(
                                (a) => `${CaptalizeFirst(a)} `
                              )}
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
                                  src={Skill}
                                  className="pl5 fill-width"
                                />
                              }
                              title="Skill Level"
                              description={
                                parseInt(learning.skill) < 49
                                  ? "Beginner"
                                  : parseInt(learning.skill) > 49 &&
                                    parseInt(learning.skill) < 99
                                    ? "Moderate"
                                    : "Advance"
                              }
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
                              description={`${CaptalizeFirst(
                                learning.workshopType
                              )} - ${CaptalizeFirst(learning.workshopMedium)}`}
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
                </Col>
                <Col span={8}>
                  <div className="date_sec br5">
                    <Row className="header_per_txt">
                      <Col span={16}>
                        <h2 className="an-30 medium-text mb10">
                          {datePrice || learning.price} $
                        </h2>
                        <p className="mb10 an-14 medium-text">Per Person</p>
                      </Col>
                      <Col span={4}>
                        <div className="share_btn">
                          <Dropdown overlay={menu} placement="topLeft">
                            <img alt="share" src={Share} />
                          </Dropdown>
                        </div>
                      </Col>
                      <Col span={4}>
                        <div className="share_btn">
                          <img alt="share_heart" src={Heart} />
                        </div>
                      </Col>
                    </Row>
                    <Row>
                      <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                        <div className="select_date mt10">
                          {learning.dateTime.length > 0 ? (
                            <Fragment>
                              <p className="an-14 medium-text pt10 fill-width">
                                Select Date
                              </p>
                              {learning.dateTime.length > 3 && (
                                <a onClick={() => setMoreDetails(true)}>
                                  More Details
                                </a>
                              )}
                            </Fragment>
                          ) : (
                              <p className="an-14 medium-text pt10 fill-width">
                                Flexible Dates, Please contact expert for more
                                info
                              </p>
                            )}
                        </div>
                      </Col>
                      <Col>
                        {learning.dateTime.length > 0 && (
                          <Row>
                            <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                              <Form.Item>
                                <Radio.Group initialValue={0}>
                                  {learning.dateTime.map((d, i) => {
                                    if (i === 0 || i === 1 || i === 2) {
                                      return (
                                        <Radio.Button
                                          key={d._id}
                                          value={i}
                                          onClick={() =>
                                            selectDate(d.fromDate, d.price)
                                          }
                                        >
                                          {moment(d.fromDate).format("LL")}
                                        </Radio.Button>
                                      );
                                    } else {
                                      return null;
                                    }
                                  })}
                                </Radio.Group>
                              </Form.Item>
                            </Col>
                          </Row>
                        )}
                        <div className="btn_head">
                          <span
                            onClick={onIntseretClick}
                            className="yellow_btn mr10 cursor-pointer"
                          >
                            I’m Interested
                          </span>
                          <span onClick={onReserveClick} className="green_btn cursor-pointer">
                            Reserve
                          </span>
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
              <Col span={16}>
                <div className="trip_detail_des">
                  <h4 className="medium-text an-18">About This Workshop</h4>
                  <span className="lh-30">
                    {ReactHtmlParser(learning.description)}
                  </span>
                </div>
                <div className="trip_detail_des">
                  <h4 className="medium-text an-18">What will you learn ?</h4>
                  <div className="lh-30">
                    {ReactHtmlParser(learning.whatLearn)}
                  </div>
                </div>
                <div className="trip_detail_des">
                  <h4 className="medium-text an-18">Who should attend ?</h4>
                  <div className="lh-30">
                    {ReactHtmlParser(learning.attend)}
                  </div>
                </div>
              </Col>
              <Col span={8}>
                <div className="trip_exp_bg br20 text-center pb40">
                  <h4 className="sub_title text-center">About This Expert</h4>
                  <img
                    src={learning.expert.profile}
                    alt="profile"
                    className="br10"
                  />
                  <h5 className="an-14 medium-text pt10 mb10">{`${CaptalizeFirst(
                    learning.expert.firstName
                  )} ${CaptalizeFirst(learning.expert.lastName)}`}</h5>
                  <p className="grn_txt medium-text an-14">
                    {learning.expert.experties.map(
                      (e) => `${CaptalizeFirst(e)}`
                    )}
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
                    <img
                      src={Lang}
                      alt="Lang"
                      className="pb10"
                      id="location_img"
                    />
                    {learning.expert.speaks.map((e) => `${CaptalizeFirst(e)}`)}
                  </p>
                  <p></p>
                  <Link
                    to={`/expert-profile/${learning.expert._id}`}
                    className="ex__primary_btn pt20 pb20 br5"
                  >
                    View Profile
                  </Link>
                </div>
              </Col>
            </Row>
            {learning.workshopMedium !== "online" && (
              <Row className="bg_map">
                <Col span={16}>
                  <Row className="pt20">
                    <Col span={24}>
                      <h3 className=" an-22 medium-text pb10">Location</h3>
                    </Col>
                    {learning.meetingPoint !== "null" && (
                      <Col span={16}>
                        <div className="trip_detail_des">
                          <h4 className="medium-text an-18">Meeting Point</h4>
                          <p className="lh-30">{learning.meetingPoint}</p>
                        </div>
                      </Col>
                    )}
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
            )}
            {learning.itenary[0].value && (
              <Row>
                <Col>
                  <div className="policy_sec">
                    <h4 className="sub_title">Itinerary</h4>
                    {learning.itenary.map((i, index) => (
                      <div className="day_sec" key={index}>
                        <h4 className="sub_title an-14">Day-{index + 1}</h4>
                        <p>{i.value}</p>
                      </div>
                    ))}
                  </div>
                </Col>
              </Row>
            )}
            <Row>
              {learning?.accomodation && (
                <Col span={16}>
                  <div>
                    <h4 className="sub_title">Accommodation</h4>
                    <div className="lh-10 acco_line">
                      {ReactHtmlParser(learning?.accomodation)}
                    </div>
                  </div>
                </Col>
              )}
            </Row>
            <Row>
              {learning?.extras && (
                <Col span={16}>
                  <div>
                    <h4 className="sub_title pb0 pt0">Extras</h4>
                    <div className="acco_line">
                      {ReactHtmlParser(learning?.extras)}
                    </div>
                  </div>
                </Col>
              )}
            </Row>
            <Row gutter={20} className="mt40 mb40">
              {learning.inclusion && (
                <Col span={8}>
                  <div className="inclusion_sec">
                    <h4 className="sub_title mb15">Inclusions</h4>
                    {ReactHtmlParser(learning?.inclusion)}
                  </div>
                </Col>
              )}

              <Col span={8}>
                {learning.exclusion && (
                  <div className="exclusion_sec an-16">
                    <h4 className="sub_title mb15">Exclusion</h4>
                    {ReactHtmlParser(learning?.exclusion)}
                  </div>
                )}
              </Col>
            </Row>

            <Row>
              <Col span={16}>
                <div className="person_sec">
                  <div className="fill-width">
                    <h1 className="medium-text an-28 mb0">
                      {datePrice || learning.price}$
                    </h1>
                    <p className="an-14 medium-text">Per Person</p>
                  </div>
                  <div className="fill-width text-right">
                    <span
                      onClick={onIntseretClick}
                      className="yellow_btn mr10 cursor-pointer"
                    >
                      I’m Interested
                    </span>
                    <span onClick={onReserveClick} className="green_btn cursor-pointer">
                      Reserve
                    </span>
                    {learning.cancellantion && (
                      <h6 className="an-14 cursor-pointer" onClick={() => setShowCanc(true)}>
                        * Cancellation Policy
                      </h6>
                    )}
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
                          <div className="text-right mt30">
                            <Link to="\" className="ex__primary_btn br5">
                              View More
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
                      <Row className=" pt30">
                        <Col span={12}>
                          <h4 className="sub_title">Similar Workshops</h4>
                        </Col>
                        <Col span={12}>
                          <div className="text-right mt30">
                            <Link to="\" className="ex__primary_btn br5">
                              View More
                            </Link>
                          </div>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                  <Row gutter={40} className="pb40">
                    {similarLearning &&
                      similarLoader &&
                      similarLearning.map((l) => {
                        if (l.id !== id) {
                          return (
                            <Col key={l.id} span={8} className="gutter-row">
                              <Card
                                className="price_sec"
                                hoverable
                                onClick={() =>
                                  props.history.push(
                                    `/learning-details/${l.id}`
                                  )
                                }
                                cover={<img alt="example" src={l.cover} />}
                              >
                                <div className="price_sec">
                                  <h5 className=" an-14 medium-text">
                                    {l.title}
                                  </h5>
                                  <p className="mb10">
                                    Activity : {l.activity.toString()}
                                  </p>
                                  <Row>
                                    <Col span={18}>
                                      <h3 className="medium-text an-18">
                                        {l.price} $
                                      </h3>
                                    </Col>
                                    <Col span={6} className="text-right">
                                      <div>
                                        {colors.map((color) => (
                                          <div key={color}>
                                            <Badge
                                              color={color}
                                              text={
                                                parseInt(l.skill) < 50
                                                  ? "Light"
                                                  : parseInt(l.skill) >= 50 &&
                                                    parseInt(l.skill) < 100
                                                    ? "Medium"
                                                    : "Hard"
                                              }
                                              className="an-14"
                                            />
                                          </div>
                                        ))}
                                      </div>
                                    </Col>
                                  </Row>
                                </div>
                                <hr className="light_clr" />
                                <Row>
                                  <Col span={16}>
                                    <Rate
                                      allowHalf
                                      defaultValue={3}
                                      className="an-14 pt5"
                                    />
                                  </Col>
                                  <Col span={8}>
                                    <div className="heart_fill">
                                      <input type="checkbox" id="like3" />
                                      <label htmlFor="like3">
                                        <svg viewBox="0 0 24 24">
                                          <path d="M12 21.35l-1.45-1.32c-5.15-4.67-8.55-7.75-8.55-11.53 0-3.08 2.42-5.5 5.5-5.5 1.74 0 3.41.81 4.5 2.09 1.09-1.28 2.76-2.09 4.5-2.09 3.08 0 5.5 2.42 5.5 5.5 0 3.78-3.4 6.86-8.55 11.54l-1.45 1.31z" />
                                        </svg>
                                      </label>
                                    </div>
                                  </Col>
                                </Row>
                              </Card>
                            </Col>
                          );
                        } else {
                          return null;
                        }
                      })}
                  </Row>
                </div>
              </Col>
            </Row>
          </div>
        </div>
        {moreDetail && (
          <MoreDetails
            visible={moreDetail}
            data={learning.dateTime}
            onIntseretClick={onIntseretClick}
            onReserveClick={onReserveClick}
            onCloseClick={onCloseClick}
          />
        )}
        {showCanc && (
          <Cancellation
            visible={showCanc}
            data={learning.cancellantion}
            onCloseClick={onCloseClick}
          />
        )}
        {showR && (
          <Reservation
            visible={showR}
            trip={learning.title}
            slot={slot}
            onCloseClick={onCloseClick}
            id={id}
          />
        )}
        {showInterest && (
          <Interested
            visible={showInterest}
            trip={learning.title}
            onCloseClick={onInstCloseClick}
            id={id}
          />
        )}
      </div>
    );
  } else {
    return (
      <div className="text-center py20 loader-absolute-class">
        <AppLoader />
      </div>
    );
  }
};
export default WorkShopDetails;
