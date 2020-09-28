import React, { useEffect, useCallback, useState, Fragment } from 'react';
import { Row, Col, Tabs, Menu, Dropdown, Button, Rate } from "antd";
import { withRouter } from 'react-router-dom';
import { compose } from "redux";
import { FacebookShareButton, TwitterShareButton, WhatsappShareButton } from "react-share";

/**
 * Image Imports
 */
import HeaderImg from "../assets/images/upload_image.png";
import Location_Img from "../assets/images/country_ic.png";
import Date_Img from "../assets/images/followers_ic.png";
import Website_Img from "../assets/images/website_ic.png";
import Phone_Img from "../assets/images/phone-1.png";
import Award_Img from "../assets/images/awards_ic.png";
import Facebook from "../assets/images/fb_ic.png";
import WhatsApp from "../assets/images/whatsapp_ic.png";
import Twitter from "../assets/images/twitter_ic.png";
import Share_Ic from "../assets/images/share_ic.png";
import Speaks from "../assets/images/speaks_ic.png";

/**
 * App Imports
 */
import { getPublicProfile, getUpcomingTrip, getTravelMap, getUpcomingWorkShops } from '../services/expert';
import AppLoader from '../components/Loader';
import { CaptalizeFirst } from '../helpers/methods';
import Map from '../components/Trips/Map';
import MyTrips from '../components/Trips/MyTrips';
import WorkShopTab from '../components/Learning/WorkshopTab';

const ApiKey = process.env.REACT_APP_GOOGLE_MAP_API_KEY;
const URL = "http://expeditions-connect-app.s3-website.eu-central-1.amazonaws.com";

const { TabPane } = Tabs;

const ExpertPublicView = (props) => {
  const { match: { params: { id } } } = props;
  const [profile, setProfile] = useState(null);
  const [loader, setLoader] = useState(true);
  const [tripLoader, setTripLoader] = useState(true);
  const [upcomingTrip, setUpcomingTrip] = useState([]);
  const [upcomingWorkShop, setUpcomingWorkShop] = useState([]);
  const [travelMap, setTravelMap] = useState(null);

  const menu = (
    <Menu className="share_btn_box">
      <Menu.Item>
        <FacebookShareButton className="soc_icon" url={`${URL}/expert-profile/${id}`}>
          <img src={Facebook} alt="facebook" className="pr10" />Facebook
       </FacebookShareButton>
      </Menu.Item>
      <Menu.Item>
        <WhatsappShareButton className="soc_icon" url={`${URL}/expert-profile/${id}`}>
          <img src={WhatsApp} alt="twitter" className="pr10" />WhatsApp
        </WhatsappShareButton>
      </Menu.Item>
      <Menu.Item>
        <TwitterShareButton className="soc_icon" url={`${URL}/expert-profile/${id}`} style={{ border: "none" }}>
          <img src={Twitter} alt="twitter" className="pr10" />Twitter
        </TwitterShareButton>
      </Menu.Item>
    </Menu>
  );

  const getData = useCallback(async () => {
    const result = await getPublicProfile(id);
    if (result.status === 200) {
      setProfile(result.data.data);
      setLoader(false);
    }
  }, [id]);

  const getTrips = useCallback(async () => {
    const result = await getUpcomingTrip(id);
    if (result.status === 200) {
      setUpcomingTrip(result.data.data);
      setTripLoader(false);
    }
    const coords = await getTravelMap(id);
    if (coords.status === 200) {
      setTravelMap(coords.data.data);
    }
  }, [id]);

  const getWorkShops = useCallback(async () => {
    const result = await getUpcomingWorkShops(id);
    if (result.status === 200) {
      setUpcomingWorkShop(result.data.data);
    }
  }, [id]);

  useEffect(() => {
    getData();
    getTrips();
    getWorkShops();
  }, [getData, getTrips, getWorkShops]);

  if (loader) {
    return (
      <div className="text-center py20 loader-absolute-class">
        <AppLoader />
      </div>
    )
  } else {
    return (
      <div className="header-container">
        <div className="container align-center">
          <div className="page_wrapper">
            <Row>
              <Col span={24} className="header_bg">
                <img className="mb5" width="100%" src={profile?.cover || HeaderImg} alt="Header" />
              </Col>
              <Col span={6}>
                <div className="profile_img">
                  <img src={profile.profile} alt="Profile" />
                </div>
              </Col>
              <Col span={12}>
                <div className="profile_details">
                  <h2 className="an-26 medium-text">
                    {`${CaptalizeFirst(profile.firstName)} ${CaptalizeFirst(
                      profile.lastName
                    )}`}{" "}
                    <Rate allowHalf defaultValue={4} className="ml10" />
                  </h2>
                  <h5 className="an-16 medium-text">{`${CaptalizeFirst(
                    profile.experties[0]
                  )}`}</h5>
                  <p className="an-14 medium-text">
                    <img src={Location_Img} alt="Profile" />
                    <span>{CaptalizeFirst(profile.country)}</span>
                  </p>
                  <p className="an-14 medium-text">
                    <img src={Speaks} alt="Profile" />
                    {profile.speaks.map((lang, key) => (
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
              <Col span={3}>
                <div className="mt15 pull-right follow_btn">
                  <Button className="an-14" style={{ height: '40px' }}>Follow</Button>
                </div>
              </Col>
              <Col span={3}>
                <div className="share_btn mt15">
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
                  <Tabs defaultActiveKey="1">
                    <TabPane tab="About" key="1">
                      <Row gutter={[40, 40]}>
                        <Col className="gutter-row" span={16}>
                          <div className="bio_sec">
                            <Row>
                              <Col span={12}>
                                <h4 className="title_line">Bio</h4>
                              </Col>
                            </Row>
                            <p>{profile.bio}</p>
                          </div>
                          <div className="award_sec">
                            <Row>
                              <Col span={12}>
                                <h4 className="title_line">
                                  Awards & Recognization
                              </h4>
                                <Row gutter={[20, 20]}>
                                  {
                                    profile.awards.length ? profile.awards.map(award => (
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
                                    )) : (
                                        <div>
                                          <div className="mb10 ml10 an-14 medium-text"><h3>No Awards</h3></div>
                                        </div>)
                                  }
                                </Row>
                                <h4 className="title_line">Initiatives</h4>
                                <Row gutter={[20, 20]}>
                                  {
                                    profile.initiatives.length ? profile.initiatives.map(award => (
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
                            </Row>
                          </div>
                        </Col>
                        <Col className="gutter-row" span={8}>
                          <div className="buss_bg">
                            <Row>
                              <Col span={12}>
                                <h4 className="title_line">Business</h4>
                              </Col>
                            </Row>
                            <Row>
                              <Col>
                                <h5 className="an-16 mb10 medium-text">{CaptalizeFirst(profile.company.name)}</h5>
                              </Col>
                            </Row>
                            <Row>
                              <Col>
                                <div className="contact_details">
                                  <p className="mb10">
                                    <img src={Location_Img} alt="" className="pr10" />
                                    {CaptalizeFirst(profile.company.country)}
                                  </p>
                                  <p className="mb10">
                                    <img src={Website_Img} alt="" className="pr10" />{" "}
                                    <a href={profile.company.website} rel="noopener noreferrer" target="_blank">{profile.company.website}</a>
                                  </p>
                                  <p className="mb10">
                                    <img src={Phone_Img} alt="" className="pr10" />{" "}
                                    <span href={`tel:${profile.company.phone}`}>{profile.company.phone}</span>
                                  </p>
                                </div>
                              </Col>
                            </Row>
                          </div>
                        </Col>
                      </Row>
                    </TabPane>
                    <TabPane tab="Trips" key="2">
                      <Col>
                        <MyTrips isPublicView={true} token={""} publicTrip={upcomingTrip} travelMap={travelMap} />
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
                    <TabPane tab="Workshops" key="3">
                      <Col>
                        <WorkShopTab isPublicView={true} token={""} publicWorkShop={upcomingWorkShop} travelMap={travelMap} />
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
                    <TabPane tab="Album" key="4"></TabPane>
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
                                  {console.log(t)}
                                  <img src={t.cover} alt="" onClick={() => props.history.push(`/trips-details/${t.id}`)} />
                                  <p className="medium-text an-14 mt10 ml5">{t.title}</p>
                                </Col>
                              ))}
                            </Row>
                          ) : (
                              <div>
                                <div className="mb10 an-14 medium-text"><h3>No trips at the moment</h3></div>
                              </div>
                            )
                          }
                        </Fragment>
                      )}
                      {
                        travelMap && travelMap.length > 0 ?
                          (
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
                          ) : ("")
                      }
                    </Col>
                  </Row>
                </div>
              </Col>
            </Row> */}
          </div>
        </div>
      </div>
    )
  }
}

export default compose(withRouter)(ExpertPublicView);
