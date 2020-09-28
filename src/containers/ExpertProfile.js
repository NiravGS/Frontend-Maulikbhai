import React, { useEffect, useState, useCallback, Fragment } from "react";
import { Row, Col, Tabs, Menu, Dropdown, Button, Icon, Upload, message } from "antd";
import { NavLink, withRouter } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { compose } from "redux";

/**
 * Image Imports
 */
import Location_Img from "../assets/images/country_ic.png";
import Date_Img from "../assets/images/Group 4262.png";
import Website_Img from "../assets/images/website_ic.png";
import Phone_Img from "../assets/images/phone-1.png";
import Award_Img from "../assets/images/awards_ic.png";
import Facebook from "../assets/images/fb_ic.png";
import Instagram from "../assets/images/instagram_ic.png";
import Twitter from "../assets/images/twitter_ic.png";
import Share_Ic from "../assets/images/share_ic.png";
import Speaks from "../assets/images/speaks_ic.png";
import Upload_Img from "../assets/images/upload_image.png";

/**
 * App Imports
 */
import { CaptalizeFirst, getBase64 } from "../helpers/methods";
import AppLoader from "../components/Loader";
import { ExpertEvents } from "../redux/expert/events";
import { uploadCoverPicture } from "../services/expert";
import Map from "../components/Trips/Map";
import { getUpcomingTrip, getTravelMap } from "../services/expert";
import ExpertMessages from '../components/Expert/Messages';

import WorkShopTab from '../components/Learning/WorkshopTab';
import MyTrips from '../components/Trips/MyTrips';
import AlbumTab from './AlbumTab';

const ApiKey = process.env.REACT_APP_GOOGLE_MAP_API_KEY;

const { TabPane } = Tabs;

const menu = (
  <Menu className="share_btn_box">
    <Menu.Item>
      <NavLink to="/">
        <img src={Facebook} alt="facebook" className="pr10" />
        Facebook
      </NavLink>
    </Menu.Item>
    <Menu.Item>
      <NavLink to="/">
        <img src={Instagram} alt="instagram" className="pr10" />
        Instagram
      </NavLink>
    </Menu.Item>
    <Menu.Item>
      <NavLink to="/" style={{ border: "none" }}>
        <img src={Twitter} alt="twitter" className="pr10" />
        Twitter
      </NavLink>
    </Menu.Item>
  </Menu>
);

const ExpertProfile = (props) => {
  const expert = useSelector((state) => state.expert);
  const token = useSelector((state) => state.auth.accessToken);
  const [imageUrl, setImageUrl] = useState();
  const [upload, setUpload] = useState(false);

  const [tripLoader, setTripLoader] = useState(true);
  const [upcomingTrip, setUpcomingTrip] = useState(null);
  const [travelMap, setTravelMap] = useState(null);

  const dispatch = useDispatch();
  const { changeTab, isEditMode, updateCover } = ExpertEvents;

  const getTrips = useCallback(async (id) => {
    const result = await getUpcomingTrip(id);
    if (result.status === 200) {
      setUpcomingTrip(result.data.data);
      setTripLoader(false);
    }
    const coords = await getTravelMap(id);
    if (coords.status === 200) {
      setTravelMap(coords.data.data);
    }
  }, []);

  const { id } = expert;

  useEffect(() => {
    dispatch(isEditMode());
    if (id !== null) {
      getTrips(id);
    }
  }, [dispatch, getTrips, id, isEditMode]);

  const uploadCover = useCallback(
    async (data) => {
      try {
        setUpload(true);
        const result = await uploadCoverPicture(token, data);
        if (result.status === 200) {
          setUpload(false);
          setImageUrl(result.data.data);
          dispatch(updateCover(result.data.data));
        }
      } catch (err) {
        setUpload(false);
        message.error(err.response.data.message);
      }
    },
    [dispatch, token, updateCover]
  );

  const editProfile = () => {
    dispatch(changeTab(1));
    props.history.push("/update-expert-profile");
  };

  const editAwardsInit = () => {
    dispatch(changeTab(3));
    props.history.push("/update-expert-profile");
  };

  const editBusiness = () => {
    dispatch(changeTab(2));
    props.history.push("/update-expert-profile");
  };

  const handleChangePicture = (info) => {
    if (info.file.status === "uploading") {
      return;
    }
    if (info.file.status === "done") {
      getBase64(info.file.originFileObj, (imageUrl) => {
        setImageUrl(imageUrl);
      });
      const formData = new FormData();
      formData.append("cover", info.file.originFileObj);
      uploadCover(formData);
    }
  };

  if (!expert.step1) {
    return (
      <div className="text-center py20 loader-absolute-class">
        <AppLoader />
      </div>
    );
  } else {
    return (
      <div className="header-container">
        <div className="container align-center">
          <div className="page_wrapper page_wrapper_pad">
            <Row>
              <Col span={24} className="header_bg">
                {upload ? (
                  <div
                    style={{ width: "100%", height: "400px" }}
                    className="flex-y"
                  >
                    <AppLoader />
                  </div>
                ) : (
                    <img
                      className="mb5"
                      width="100%"
                      src={imageUrl || expert.cover || Upload_Img}
                      alt="Header"
                    />
                    // <img src={Upload_Img} />
                  )}

                <Upload
                  name="avatar"
                  className="avatar-uploader"
                  onChange={handleChangePicture}
                  showUploadList={false}
                  customRequest={({ file, onSuccess }) =>
                    setTimeout(() => onSuccess("ok"), 0)
                  }
                >
                  <span className="edit_btn medium-text an-14">
                    <Icon className="edit_pancil" type="pencil" /> Edit
                  </span>
                </Upload>
              </Col>
              <Col xs={24} sm={24} md={24} lg={6} xl={6}>
                <div className="profile_img">
                  <img src={expert.picture} alt="Profile" />
                  <span
                    className="edit_btn medium-text an-14"
                    onClick={editProfile}
                  >
                    <Icon className="edit_pancil" type="pencil" />
                    Edit
                  </span>
                </div>
              </Col>
              <Col xs={24} sm={24} md={16} lg={12} xl={12} >
                <div className="profile_details">
                  <h2 className="an-26 medium-text">
                    {CaptalizeFirst(expert.firstName) +
                      " " +
                      CaptalizeFirst(expert.lastName)}
                  </h2>
                  <h5 className="an-16 medium-text">
                    {CaptalizeFirst(expert.experties[0])}
                  </h5>
                  <p className="an-14 medium-text">
                    <img src={Location_Img} alt="Profile" />
                    <span>{CaptalizeFirst(expert.country)}</span>
                  </p>
                  <p className="an-14 medium-text">
                    <img src={Speaks} alt="Profile" />
                    {expert.speaks.map((lang, key) => (
                      <span key={key}>
                        {CaptalizeFirst(lang)}
                        {","}
                      </span>
                    ))}
                  </p>
                  <p className="an-14 medium-text">
                    <img src={Date_Img} alt="Profile" />
                    <span>0 Followers</span>
                  </p>
                </div>
              </Col>
              <Col xs={24} sm={24} md={8} lg={6} xl={6} >
                <div className="share_btn mt10">
                  <span
                    onClick={editProfile}
                    className="edit_btn btn_edit medium-text an-14 mr10"
                  >
                    <Icon className="edit_pancil" type="pencil" /> Edit
                  </span>
                  <Dropdown overlay={menu} placement="bottomLeft">
                    <Button className="share_btn medium-text an-14">
                      <img src={Share_Ic} alt="Share" /> Share
                    </Button>
                  </Dropdown>
                </div>
              </Col>
            </Row>
            <Row>
              <Col>
                <div>
                  <Tabs defaultActiveKey={props.location.search === "?tab=5" ? "5" : "1"}>
                    <TabPane tab="About" key="1">
                      <Row gutter={[40, 40]}>
                        <Col className="gutter-row" span={16}>
                          <div className="bio_sec">
                            <Row>
                              <Col span={12}>
                                <h4 className="title_line">Bio</h4>
                              </Col>
                              <Col span={12}>
                                <span
                                  href="#!"
                                  onClick={editAwardsInit}
                                  className="edit_btn medium-text an-14 pull-right mt30"
                                >
                                  <Icon className="edit_pancil" type="pencil" />{" "}
                                  Edit
                                </span>
                              </Col>
                            </Row>
                            <p>{expert.bio}</p>
                          </div>
                          <div className="award_sec">
                            <Row>
                              <Col span={12}>
                                <h4 className="title_line">
                                  Awards & Recognization
                                </h4>
                                <Row gutter={[20, 20]}>
                                  {expert.awards.length ? expert.awards.map((award) => (
                                    <div className="award_box" key={award._id}>
                                      <Col span={12}>
                                        <img
                                          src={Award_Img}
                                          alt="da"
                                          className="pt30 pb30 pr30 pl30"
                                        />
                                        <h5 className="an-14 medium-text">
                                          {award.name}
                                        </h5>
                                        <a href={award.url} rel="noopener noreferrer" target="_blank">{award.url}</a>
                                      </Col>
                                    </div>
                                  )) :
                                    (
                                      <div>
                                        <div className="mb10 ml10 an-14 medium-text"><h3>No Awards</h3></div>
                                      </div>
                                    )
                                  }
                                </Row>
                                <h4 className="title_line">Initiatives</h4>
                                <Row gutter={[20, 20]}>
                                  {expert.initiatives.length ? expert.initiatives.map((award) => (
                                    <div className="award_box" key={award._id}>
                                      <Col span={12}>
                                        <img
                                          src={Award_Img}
                                          alt="da"
                                          className="pt30 pb30 pr30 pl30"
                                        />
                                        <h5 className="an-14 medium-text">
                                          {award.name}
                                        </h5>
                                        <a href={award.url} rel="noopener noreferrer" target="_blank">{award.url}</a>
                                      </Col>
                                    </div>
                                  )) :
                                    (
                                      <div>
                                        <div className="mb10 an-14 ml10 medium-text"><h3>No Initiatives</h3></div>
                                      </div>
                                    )
                                  }
                                </Row>
                              </Col>
                              <Col span={12}>
                                <span
                                  href="#!"
                                  onClick={editAwardsInit}
                                  className="edit_btn medium-text an-14 pull-right mt30"
                                >
                                  <Icon className="edit_pancil" type="pencil" />{" "}
                                  Edit
                                </span>
                              </Col>
                            </Row>
                          </div>
                        </Col>
                        <Col className="gutter-row" span={8}>
                          <div className="buss_bg">
                            <Row>
                              <Col span={12}>
                                <h4 className="title_line">Business</h4>
                              </Col>
                              <Col span={12}>
                                <div className="right_sec pull-right text-right mt30">
                                  <span
                                    href="#!"
                                    onClick={editBusiness}
                                    className="edit_btn medium-text an-14"
                                  >
                                    <Icon
                                      className="edit_pancil"
                                      type="pencil"
                                    />{" "}
                                    Edit
                                  </span>
                                </div>
                              </Col>
                            </Row>
                            <Row>
                              <Col>
                                <h5 className="an-16 mb10 medium-text">
                                  {CaptalizeFirst(expert.companyname)}
                                </h5>
                              </Col>
                            </Row>
                            <Row>
                              <Col>
                                <div className="contact_details">
                                  <p className="mb10">
                                    <img
                                      src={Location_Img}
                                      alt=""
                                      className="pr10"
                                    />
                                    {CaptalizeFirst(expert.companycountry)}
                                  </p>
                                  <p className="mb10">
                                    <img
                                      src={Website_Img}
                                      alt=""
                                      className="pr10"
                                    />{" "}
                                    <a href={expert.website} rel="noopener noreferrer" target="_blank">
                                      {expert.website}
                                    </a>
                                  </p>
                                  <p className="mb10">
                                    <img
                                      src={Phone_Img}
                                      alt=""
                                      className="pr10"
                                    />{" "}
                                    <span href={`tel:${expert.phone}`}>
                                      {expert.phone}
                                    </span>
                                  </p>
                                </div>
                              </Col>
                            </Row>
                          </div>
                        </Col>
                      </Row>
                    </TabPane>
                    <TabPane tab="Trips" key="2">
                      <div className="photo_sec">
                        <Row>
                          <Col>
                            <MyTrips isPublicView={false} token={token} publicTrip={[]} travelMap={travelMap} />
                            {/* {travelMap && travelMap.length > 0 ? (
                              <div>
                                <h4 className="sub_title">Travel Map</h4>
                                <Row gutter={[40, 16]}>
                                  <Map
                                    multiple
                                    travelMap={travelMap}
                                    zoom={5}
                                    ApiKey={ApiKey}
                                  />
                                </Row>
                              </div>
                            ) : (
                                ""
                              )} */}
                          </Col>
                        </Row>
                      </div>
                    </TabPane>
                    <TabPane tab="Workshops" key="3">
                      <Col>
                        <WorkShopTab isPublicView={false} token={token} publicWorkShop={[]} travelMap={travelMap} />
                        {/* {travelMap && travelMap.length > 0 ? (
                          <div>
                            <h4 className="sub_title">Travel Map</h4>
                            <Row gutter={[40, 16]}>
                              <Map
                                multiple
                                travelMap={travelMap}
                                zoom={5}
                                ApiKey={ApiKey}
                              />
                            </Row>
                          </div>
                        ) : (
                            ""
                          )} */}
                      </Col>
                    </TabPane>
                    <TabPane tab="Album" key="4">
                      <AlbumTab />
                    </TabPane>
                    <TabPane tab="Messages" key="5">
                      <ExpertMessages />
                    </TabPane>
                  </Tabs>
                </div>
              </Col>
            </Row>
            {/* <Row>
              <Col>
                <div className="photo_sec">
                  <Row>
                    <Col>
                      {!tripLoader && (
                        <Fragment>
                          <h4 className="sub_title">Recent Trips And Events</h4>
                          {upcomingTrip.length > 0 ? (
                            <Row gutter={[40, 16]}>
                              {upcomingTrip.map((t) => (
                                <Col key={t.id} className="gutter-row" span={6}>
                                  <img
                                    src={t.cover}
                                    alt=""
                                    onClick={() =>
                                      props.history.push(
                                        `/trips-details/${t.id}`
                                      )
                                    }
                                  />
                                  <p className="medium-text an-14 mt10 ml5">
                                    {t.title}
                                  </p>
                                </Col>
                              ))}
                            </Row>
                          ) : (
                            <div>
                              <div className="mb10 an-14 medium-text">
                                <h3>No trips at the moment</h3>
                              </div>
                            </div>
                          )}
                        </Fragment>
                      )}
                    </Col>
                  </Row>
                </div>
              </Col>
            </Row> */}
          </div>
        </div>
      </div>
    );
  }
};

export default compose(withRouter)(ExpertProfile);
