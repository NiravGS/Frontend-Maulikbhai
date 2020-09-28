import React, { useEffect, useCallback, useState, Fragment } from "react";
import { Row, Col, List, Avatar, Radio, Form, message } from "antd";
import { Link } from "react-router-dom";
import ReactHtmlParser from 'react-html-parser';
import { withRouter } from "react-router-dom";
import { compose } from "redux";
import moment from "moment";
import { useSelector } from 'react-redux';

// Image Import
import Placeholder from "../assets/images/placeholder.png";
import Location_Img from "../assets/images/country_ic.png";
import Share from "../assets/images/share_ic.png";
import Skill from "../assets/images/skill_ic_filled.png";
import Star from "../assets/images/men.png";
import Participate from "../assets/images/participants_ic_filled.png";
import { CaptalizeFirst } from '../helpers/methods';
import TripMap from "../components/Trips/Map";
import AppLoader from "../components/Loader";

import { getTripDetail } from "../services/expert";

import Reservation from "../components/Trips/Reservation";
import Interested from "../components/Trips/Interested";
import Cancellation from '../components/Trips/Cancellation';
import MoreDetails from '../components/Learning/Moredetails';

import Clock from "../assets/images/duration_ic_filled.png";
import Activity from "../assets/images/activity_ic_filled.png";
import Speak from "../assets/images/speaks_ic.png";

const ApiKey = process.env.REACT_APP_GOOGLE_MAP_API_KEY;

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


const TripsEditView = (props) => {
  const { match: { params: { id } } } = props;
  const [loader, setLoader] = useState(true);
  const [trip, setTrip] = useState(null);
  const [slot, setSlot] = useState(null);
  const isLogin = useSelector((state) => state.auth.isLogin);
  const role = useSelector((state) => state.auth.role);

  const [showCanc, setShowCanc] = useState(false);
  const [datePrice, setDatePrice] = useState("");
  const [moreDetail, setMoreDetails] = useState(false);
  const [showInterest, setShowInterest] = useState(false);
  const [showR, setShowR] = useState(false);

  const onCloseClick = () => {
    setShowR(false)
    setShowCanc(false);
    setMoreDetails(false);
  };

  const onInstCloseClick = () => setShowInterest(false);

  const getData = useCallback(async (id) => {
    const result = await getTripDetail(id);
    if (result.status === 200) {
      setTrip(result.data.data);
      setLoader(false);
    }
  }, []);


  const selectDate = (date, price) => {
    setSlot(date);
    setDatePrice(price);
  };

  const onIntseretClick = () => {
    if (isLogin) {
      if (role !== 'enthusiasts') {
        return message.error("You must be logged in as enthusiasts to send request");
      }
      setShowInterest(true);
    } else {
      message.error("Please login to make reservation request");
    }
  };

  const onReserveClick = () => {
    if (!slot) {
      return message.error("Please select date slot to make reservation request");
    }
    if (isLogin) {
      if (role !== 'enthusiasts') {
        return message.error("You must be logged in as enthusiasts to send request");
      }
      setShowR(true);
    } else {
      message.error("Please login to make reservation request");
    }
  };



  useEffect(() => {
    getData(id)
  }, [getData, id])

  console.log(trip);

  if (loader) {
    return (
      <div className="text-center py20 loader-absolute-class">
        <AppLoader />
      </div>
    );
  } else {
    return (
      <div className="header-container w_bg">
        <div
          className="gallery_bg"
          style={{ backgroundImage: `url(${trip.cover})` }}>
        </div>
        <div className="container align-center">
          <div className="expedition_bg">
            <div className="gallery_sec">
              <Row>
                <Col>
                  <h1 className="an-30 medium-text">
                    {CaptalizeFirst(trip.title)}
                  </h1>
                  {trip.country !== 'undefined' && (
                    <h4 className="an-15 medium-text work_title trip_border_btm">
                      <Avatar src={Location_Img} />{" "}
                      {CaptalizeFirst(trip.country)}
                    </h4>
                  )}
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
                              className="pl5"
                              description={`${trip.duration} Nights`}
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
                              description={`${trip.language}`}
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
                              avatar={<Avatar src={Skill} className="pl5 fill-width" />}
                              title="Skill Level"
                              description={parseInt(trip.skill) < 49 ? 'Beginner' : parseInt(trip.skill) > 49 && parseInt(trip.skill) < 99 ? 'Medium' : 'Advanced'}
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
                              avatar={<Avatar src={Star} />}
                              title="Expedition Type"
                              description={trip.type.map(
                                (t) => CaptalizeFirst(t) + " "
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
                              avatar={<Avatar src={Participate} className="pl5 fill-width" />}
                              title="Participants"
                              description={trip.participants}
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
                              description={trip.activity.map(a => `${CaptalizeFirst(a)},`)}
                            />
                          </List.Item>
                        )}
                      />
                    </Col>
                  </Row>
                  <Row>
                    <Col span={24}>
                      <div className="text-right edt_btn_sec header_edit">
                        <Link to={`/update-trip/${id}`}>
                          <i className="fas fa-pencil-alt"></i> Edit
                        </Link>
                      </div>
                    </Col>
                  </Row>
                </Col>
                <Col span={8}>
                  <div className="date_sec br5">
                    <Row className="header_per_txt">
                      <Col span={14}>
                        <h2 className="an-30 medium-text mb10">{datePrice || trip.price} $</h2>
                        <p className="mb10 an-14 medium-text">Per Person</p>
                      </Col>
                      <Col span={4}>
                        <div className="share_btn">
                          <img alt="share" src={Share} />
                        </div>
                      </Col>
                      <Col span={6}>
                        <div className="edt_btn_sec">
                          <Link to={`/update-trip/${id}`}>
                            <i class="fas fa-pencil-alt"></i> Edit
                          </Link>
                        </div>
                      </Col>
                    </Row>
                    <Row>
                      <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                        <div className="select_date mt10">
                          {trip.dateTime.length > 0 ? (
                            <Fragment>
                              <p className="an-14 medium-text pt10 fill-width">
                                Select Date
                              </p>
                              {trip.dateTime.length > 3 && (
                                <button onClick={() => setMoreDetails(true)}>More Details</button>
                              )}
                            </Fragment>
                          ) : (<p className="an-14 medium-text pt10 fill-width">
                            Flexible Dates, Please contact expert for more info
                          </p>)}
                        </div>
                      </Col>
                      <Col>
                        {trip.dateTime.length > 0 && (<Row>
                          <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                            <Form.Item>
                              <Radio.Group initialValue={0}>
                                {trip.dateTime.map((d, i) => {
                                  if (i === 0 || i === 1 || i === 2) {
                                    return (<Radio.Button key={d._id} value={i}
                                      onClick={() => selectDate(d.fromDate, d.price)}>
                                      {moment(d.fromDate).format("LL")}
                                    </Radio.Button>)
                                  } else {
                                    return null;
                                  }
                                })}
                              </Radio.Group>
                            </Form.Item>
                          </Col>
                        </Row>)}
                        <div className="btn_head">
                          <span onClick={onIntseretClick} className="yellow_btn mr10 cursor-pointer">
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
                <h3 className=" an-22 medium-text pb10">Trip Details</h3>
              </Col>
              <Col span={12}>
                <div className="trip_detail_des">
                  <h4 className="medium-text an-18">About This trip</h4>
                </div>
              </Col>
              <Col span={4}>
                <div className=" text-right edt_btn_sec">
                  <Link to={`/update-trip/${id}`}>
                    <i class="fas fa-pencil-alt"></i> Edit
                  </Link>
                </div>
              </Col>
              <Col span={16}>
                <div className="trip_detail_des">
                  <span className="lh-30">{ReactHtmlParser(trip.description)}</span>
                </div>
                <div className="trip_detail_des">
                  <h4 className="medium-text an-18">What will you learn ?</h4>
                  <div className="lh-30">
                    {ReactHtmlParser(trip.whatLearn)}
                  </div>
                </div>
                <div className="trip_detail_des">
                  <h4 className="medium-text an-18">Who should attend ?</h4>
                  <div className="lh-30">
                    {ReactHtmlParser(trip.attend)}
                  </div>
                </div>
              </Col>
              <Col span={8}>
                <div className="trip_exp_bg br20 text-center pb40">
                  <h4 className="sub_title text-center">About This Experts</h4>
                  <img src={trip.expert.profile} alt="profile" className="br10" />
                  <h5 className="an-14 medium-text pt10 mb10">{`${CaptalizeFirst(trip.expert.firstName)} ${CaptalizeFirst(trip.expert.lastName)}`}</h5>
                  <p className="grn_txt medium-text an-14">
                    {trip.expert.experties.map(e => `${CaptalizeFirst(e)}, `)}
                  </p>
                  <p>
                    <img src={Location_Img} alt="" className="pb10" id="location_img" />
                    {CaptalizeFirst(trip.expert.country)}
                  </p>
                  <p>
                  </p>
                  <Link to={`/expert-profile/${trip.expert._id}`} className="ex__primary_btn pt20 pb20 br5">
                    View Profile
                  </Link>
                </div>
              </Col>
            </Row>
            <Row >
              <Col className="day_sec" span={16}>
                <Row className="pt20">
                  <Col span={24}>
                    <h3 className="an-22 medium-text pb10">Location</h3>
                  </Col>
                  <Col span={20}>
                    <div className="trip_detail_des">
                      <h4 className="medium-text an-18">Meeting Point</h4>
                      <p className="lh-30">{trip?.meetingPoint}</p>
                    </div>
                  </Col>
                  <Col span={4}>
                    <div className=" text-right edt_btn_sec">
                      <Link to={`/update-trip/${id}`}>
                        <i class="fas fa-pencil-alt"></i> Edit
                      </Link>
                    </div>
                  </Col>
                </Row>
                <Row className="pt20">
                  <Col span={24} className="map pb30 pr30">
                    <TripMap
                      center={trip.location.coordinates}
                      zoom={5}
                      ApiKey={ApiKey}
                    />
                  </Col>
                </Row>
              </Col>
            </Row>
            <Row>
              <Col span={16}>
                <Row>
                  <Col span={20}>
                    <div className="trip_detail_des">
                      <h4 className="medium-text an-18 pt30">Itinerary</h4>
                    </div>
                  </Col>
                  <Col span={4}>
                    <div className=" text-right edt_btn_sec pt30">
                      <Link to={`/update-trip/${id}`}>
                        <i class="fas fa-pencil-alt"></i> Edit
                      </Link>
                    </div>
                  </Col>
                </Row>
                <div className="trip_detail_des">
                  {trip.itenary && trip.itenary.map((i, index) => (
                    <div className="day_sec" key={index}>
                      <h4 className="sub_title an-14" style={{ paddingTop: 20, paddingBottom: 20 }}>Day {index + 1}</h4>
                      <p className="lh-30">{i.value}</p>
                    </div>
                  ))}
                </div>
              </Col>
            </Row>
            <Row>
              {trip?.accomodation && (
                <Fragment>
                  <Col span={12}>
                    <div className="trip_detail_des">
                      <h4 className="medium-text an-18 pt30">Accommodation</h4>
                    </div>
                  </Col>
                  <Col span={4}>
                    <div className=" text-right edt_btn_sec mt20">
                      <Link to={`/update-trip/${id}`}>
                        <i class="fas fa-pencil-alt"></i> Edit
                      </Link>
                    </div>
                  </Col>
                  <Col span={16}>
                    <div className="trip_detail_des">
                      <div className="lh-30">{ReactHtmlParser(trip?.accomodation)}</div>
                    </div>
                  </Col>
                </Fragment>
              )}
            </Row>
            <Row>
              {trip?.extras && (
                <Fragment>
                  <Col span={12}>
                    <div className="trip_detail_des">
                      <h4 className="medium-text an-18 pt30">Extra Information</h4>
                    </div>
                  </Col>
                  <Col span={4}>
                    <div className=" text-right edt_btn_sec mt20">
                      <Link to={`/update-trip/${id}`}>
                        <i class="fas fa-pencil-alt"></i> Edit
                      </Link>
                    </div>
                  </Col>
                  <Col span={16}>
                    <div className="trip_detail_des">
                      <div className="lh-30">{ReactHtmlParser(trip?.extras)}</div>
                    </div>
                  </Col>
                </Fragment>
              )}
            </Row>
            <Row gutter={20} className="mt40 mb40">
              {trip.inclusion && (
              <Col span={8}>
                  <div className="trip_inclusion_sec trip_detail_des brder_sec">
                    <Row className="border_btm mb15">
                      <Col span={12}>
                          <h4 className="medium-text an-18 pb20 brder_nn">Inclusions</h4>
                      </Col>
                      <Col span={12}>
                        <div className=" text-right edt_btn_sec">
                          <Link to={`/update-trip/${id}`}>
                            <i class="fas fa-pencil-alt"></i> Edit
                          </Link>
                        </div>
                      </Col>
                    </Row>
                  <div className="lh-30">{ReactHtmlParser(trip?.inclusion)}</div>
                </div>
              </Col>
              )}
              {trip.exclusion && (
                <Col span={8}>
                  <div className="trip_inclusion_sec trip_detail_des brder_sec">
                    <Row className="border_btm mb15">
                      <Col span={12}>
                        <h4 className="medium-text an-18 pb20 brder_nn">Exclusions</h4>
                      </Col>
                      <Col span={12}>
                        <div className=" text-right edt_btn_sec">
                          <Link to={`/update-trip/${id}`}>
                            <i class="fas fa-pencil-alt"></i> Edit
                          </Link>
                        </div>
                      </Col>
                    </Row>
                    <div className="lh-30">{ReactHtmlParser(trip?.exclusion)}</div>
                  </div>
                </Col>
              )}
            </Row>

            <Row>
              <Col span={16}>
                <div className="person_sec">
                  <div className="fill-width">
                    <h1 className="medium-text an-28 mb0">{datePrice || trip.price}$</h1>
                    <p className="an-14 medium-text">Per Person</p>
                  </div>
                  <div className="fill-width text-right">
                    <span onClick={onIntseretClick} className="yellow_btn mr10 cursor-pointer">
                      I’m Interested
                    </span>
                    <span onClick={onReserveClick} className="green_btn cursor-pointer">
                      Reserve
                    </span>
                    {trip.cancellations && (<h6 className="an-14 cursor-pointer" onClick={() => setShowCanc(true)}>*Cancellation Policy</h6>)}
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
                            Pictures and Videos from Past Trips
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
                    </Col>
                  </Row>
                </div>
              </Col>
            </Row>
          </div>
        </div>
        {moreDetail && (<MoreDetails
          visible={moreDetail}
          data={trip.dateTime}
          onIntseretClick={onIntseretClick}
          onReserveClick={onReserveClick}
          onCloseClick={onCloseClick} />)}
        {showCanc && (<Cancellation visible={showCanc} data={trip.cancellations} onCloseClick={onCloseClick} />)}
        {showR && (<Reservation visible={showR} trip={trip.title} slot={slot} onCloseClick={onCloseClick} id={id} />)}
        {showInterest && (<Interested visible={showInterest} trip={trip.title} onCloseClick={onInstCloseClick} id={id} />)}
      </div>
    );
  }
};
export default compose(withRouter)(TripsEditView)
