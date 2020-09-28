import React, { Fragment } from 'react';
import { withRouter } from "react-router-dom";
import { compose } from "redux";
import { Row, Col, Rate, Card, Popover, Dropdown } from 'antd';

/**
 * App Imports
 */
import { CaptalizeFirst } from "../../helpers/methods";
import Share from "../../assets/images/share_ic.png";
import MoreTripOption from "../../assets/images/more_vert-24px.svg";
import SkillRed from "../../assets/images/skill_red.svg";
import SkillGreen from "../../assets/images/skill_green.svg";
import SkillOrange from "../../assets/images/skill_orange.svg";
import shareOption from "../../containers/commonContainer/shareOption";
import Map from "../../components/Trips/Map";

const ApiKey = process.env.REACT_APP_GOOGLE_MAP_API_KEY;


const TripsWorkshopCardView = (props) => {
  const { view, upcomingTrip, pageMinValue, pageMaxValue, isLogin, activeTrip, inActiveTrip, copyTrip, isPublicView, activeWorkshop, inActiveWorkshop, travelMap } = props;

  const onTripClick = (id) => props.history.push(`/trip-edit/${id}`);
  const onWorkshopClick = (id) => props.history.push(`/learning-edit/${id}`);

  const tripsOption = (t) => {
    var id = t._doc ? t._doc._id : t._id
    var detail = t._doc ? t._doc : t;
    return (
      <div className="profile_bg trip_poppop">
        <div className="primary--text py5 cursor-pointer">
          Trip Fully Booked
      </div>
        <div className="border_bottom"></div>
        <div className="primary--text py5 cursor-pointer" onClick={() => props.history.push(`/update-trip/${id}`)}>
          Edit Trip
      </div>
        <div className="primary--text py5 cursor-pointer" onClick={() => [copyTrip(detail), inActiveTrip(id)]}>
          Copy Trip
      </div>
        <div className="primary--text py5 cursor-pointer" onClick={() => t.active ? inActiveTrip(id) : activeTrip(id)}>
          {detail.active ? "InActive Trip" : "Active Trip"}
        </div>
        <div className="border_bottom"></div>
        <div className="primary--text py5 cursor-pointer">
          Delete Trip
      </div>
      </div>
    )
  }

  const workshopsOption = (t) => {
    return (
      <div className="profile_bg trip_poppop">
        <div className="primary--text py5 cursor-pointer">
          Workshop Fully Booked
      </div>
        <div className="border_bottom"></div>
        <div className="primary--text py5 cursor-pointer" onClick={() => props.history.push(`/update-learning/${t.id}`)}>
          Edit Workshop
      </div>
        <div className="primary--text py5 cursor-pointer" onClick={() => props.history.push(`/learning-edit/${t.id}`)}>
          Copy Workshop
      </div>
        <div className="primary--text py5 cursor-pointer" onClick={() => t.active ? inActiveWorkshop(t.id) : activeWorkshop(t.id)}>
          {t.active ? "InActive Workshop" : "Active Workshop"}
        </div>
        <div className="border_bottom"></div>
        <div className="primary--text py5 cursor-pointer">
          Delete Workshop
      </div>
      </div>
    )
  }

  if (upcomingTrip) {
    return (
      <Fragment>
        {isPublicView === true ?
          upcomingTrip.slice(pageMinValue, pageMaxValue).map((t, index) => (
            t.active === true &&
            <Col xs={24} sm={24} md={12} lg={8} xl={8} key={index} className="gutter-row trips_blog">
              <Card
                key={index}
                hoverable
                cover={<img onClick={() => view === "trips" ? onTripClick(t._doc ? t._doc._id : t.id) : onWorkshopClick(t.id)} alt="example" src={t.cover} />}
                extra={isLogin && isPublicView === false &&
                  <div>
                    <Popover
                      placement="bottom"
                      content={view === "trips" ? tripsOption(t._doc ? t._doc : t) : workshopsOption(t)}
                      trigger="hover">
                      <div className="more_icon_upcoming_tips">
                        <img src={MoreTripOption} alt="MoreTrip_Option" />
                      </div>
                      {view === "trips" ? <></> :
                        t.medium === "online" &&
                        <div className="Online_workshop">
                          <p>Online workshop</p>
                        </div>
                      }
                    </Popover>
                  </div>
                }
              >
                {t._doc && t._doc.medium === "online" && (
                  <span className="online_tag an-10 medium-text">
                    {CaptalizeFirst(t._doc ? t._doc.type : t.type)}{" "}
                    {CaptalizeFirst(t._doc ? t._doc.medium : t.medium)}
                  </span>
                )}
                <div className="price_sec">
                  <h5 className="mb10 an-14">
                    {t._doc ? t._doc.duration : t.duration} Days - {CaptalizeFirst(t._doc ? t._doc.country : t.country)} -{" "}
                    {t._doc ? t._doc.activity.map((a) => `${CaptalizeFirst(a)} ,`) : t.activity.map((a) => `${CaptalizeFirst(a)} ,`)}
                  </h5>
                  <p className="mb10 an-14 medium-text">
                    {CaptalizeFirst(t._doc ? t._doc.title : t.title)}
                  </p>
                  <Row>
                    <Col xs={18} sm={18} md={18} lg={18} xl={18}>
                      <h3 className="medium-text an-18">
                        {t._doc ? t._doc.price : t.price} $
                        </h3>
                    </Col>
                    <Col xs={6} sm={6} md={6} lg={6} xl={6}>
                      <div className="text-right">
                        <img
                          src={
                            parseInt(t._doc ? t._doc.skill : t.skill) < 50
                              ? SkillGreen
                              : parseInt(t._doc ? t._doc.skill : t.skill) >= 50 &&
                                parseInt(t._doc ? t._doc.skill : t.skill) < 100
                                ? SkillOrange
                                : SkillRed
                          }
                          alt="Skil level"
                        />
                      </div>
                    </Col>
                  </Row>
                </div>
                <Row  >
                  <Col xs={16} sm={16} md={16} lg={16} xl={16}>
                    <Rate
                      allowHalf
                      defaultValue={0}
                      className="an-14 pt5"
                    />
                  </Col>
                  <Col xs={8} sm={8} md={8} lg={8} xl={8}>
                    <div className="heart_fill trip_set_icon">
                      <input type="checkbox" id="like1" />
                      <div className="text-right">
                        <Dropdown overlay={shareOption} placement="bottomCenter">
                          <img
                            src={Share}
                            alt="Social Share"
                            className="share_icn"
                          />
                        </Dropdown>
                        <label htmlFor="like1"><svg viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32c-5.15-4.67-8.55-7.75-8.55-11.53 0-3.08 2.42-5.5 5.5-5.5 1.74 0 3.41.81 4.5 2.09 1.09-1.28 2.76-2.09 4.5-2.09 3.08 0 5.5 2.42 5.5 5.5 0 3.78-3.4 6.86-8.55 11.54l-1.45 1.31z"></path></svg></label>
                      </div>

                    </div>
                  </Col>
                </Row>
              </Card>
            </Col>
          ))
          :
          <div>
            <Row>
              <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                <div className="expidition_bg expendition">
                  <Row gutter={[15, 25]}>
                    {upcomingTrip.slice(pageMinValue, pageMaxValue).map((t, index) => (
                      <Col xs={24} sm={24} md={12} lg={8} xl={8} key={index} className="gutter-row trips_blog">
                        <Card
                          key={index}
                          hoverable
                          cover={<img onClick={() => view === "trips" ? onTripClick(t._doc ? t._doc._id : t.id) : onWorkshopClick(t.id)} alt="example" src={t.cover} />}
                          extra={isLogin && isPublicView === false &&
                            <div>
                              <Popover
                                placement="bottom"
                                content={view === "trips" ? tripsOption(t._doc ? t._doc : t) : workshopsOption(t)}
                                trigger="hover">
                                <div className="more_icon_upcoming_tips">
                                  <img src={MoreTripOption} alt="MoreTrip_Option" />
                                </div>
                              </Popover>
                              <div className="onilne_trip_inactive_fix">
                                {view === "trips" ? <></> :
                                  t.medium === "online" &&
                                  <div className="Online_workshop">
                                    <p>Online workshop</p>
                                  </div>
                                }
                                {t._doc && t._doc.active == false &&
                                  <div className="inactive_online_button">
                                    <span href="#!" onClick={() => activeTrip(t._doc._id)} className="inactive edit_btn medium-text an-14 pull-right mt30">
                                      InActive
                                        </span>
                                  </div>
                                }
                                {t.active === false &&
                                  <div className="inactive_online_button">
                                    <span href="#!" onClick={() => activeTrip(t._id)} className="inactive edit_btn medium-text an-14 pull-right mt30">
                                      InActive
                                        </span>
                                  </div>
                                }
                              </div>
                            </div>
                          }
                        >
                          {t._doc && t._doc.medium === "online" && (
                            <span className="online_tag an-10 medium-text">
                              {CaptalizeFirst(t._doc ? t._doc.type : t.type)}{" "}
                              {CaptalizeFirst(t._doc ? t._doc.medium : t.medium)}
                            </span>
                          )}
                          <div className="price_sec">
                            <h5 className="mb10 an-14">
                              {t._doc ? t._doc.duration : t.duration} Days - {CaptalizeFirst(t._doc ? t._doc.country : t.country)} -{" "}
                              {t._doc ? t._doc.activity.map((a) => `${CaptalizeFirst(a)} ,`) : t.activity.map((a) => `${CaptalizeFirst(a)} ,`)}
                            </h5>
                            <p className="mb10 an-14 medium-text">
                              {CaptalizeFirst(t._doc ? t._doc.title : t.title)}
                            </p>
                            <Row>
                              <Col xs={18} sm={18} md={18} lg={18} xl={18}>
                                <h3 className="medium-text an-18">
                                  {t._doc ? t._doc.price : t.price} $
                        </h3>
                              </Col>
                              <Col xs={6} sm={6} md={6} lg={6} xl={6}>
                                <div className="text-right">
                                  <img
                                    src={
                                      parseInt(t._doc ? t._doc.skill : t.skill) < 50
                                        ? SkillGreen
                                        : parseInt(t._doc ? t._doc.skill : t.skill) >= 50 &&
                                          parseInt(t._doc ? t._doc.skill : t.skill) < 100
                                          ? SkillOrange
                                          : SkillRed
                                    }
                                    alt="Skil level"
                                  />
                                </div>
                              </Col>
                            </Row>
                          </div>
                          <Row  >
                            <Col xs={16} sm={16} md={16} lg={16} xl={16}>
                              <Rate
                                allowHalf
                                defaultValue={0}
                                className="an-14 pt5"
                              />
                            </Col>
                            <Col xs={8} sm={8} md={8} lg={8} xl={8}>
                              <div className="heart_fill trip_set_icon">
                                <input type="checkbox" id="like1" />
                                <div className="text-right">
                                  <Dropdown overlay={shareOption} placement="bottomCenter">
                                    <img
                                      src={Share}
                                      alt="Social Share"
                                      className="share_icn"
                                    />
                                  </Dropdown>
                                  <label htmlFor="like1"><svg viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32c-5.15-4.67-8.55-7.75-8.55-11.53 0-3.08 2.42-5.5 5.5-5.5 1.74 0 3.41.81 4.5 2.09 1.09-1.28 2.76-2.09 4.5-2.09 3.08 0 5.5 2.42 5.5 5.5 0 3.78-3.4 6.86-8.55 11.54l-1.45 1.31z"></path></svg></label>
                                </div>

                              </div>
                            </Col>
                          </Row>
                        </Card>
                      </Col>
                    ))}
                  </Row>
                </div>
              </Col>
            </Row>
            <Row>
              <Col>
                {travelMap && travelMap.length > 0 && (
                  <div>
                    {/* <h4 className="sub_title">Travel Map</h4> */}
                    <Row gutter={[40, 16]}>
                      <Map
                        multiple
                        travelMap={travelMap}
                        zoom={2}
                        ApiKey={ApiKey}
                      />
                    </Row>
                  </div>)
                }
              </Col>
            </Row>
          </div>
        }


      </Fragment>
    )
  } else {
    return null;
  }
}

export default compose(withRouter)(TripsWorkshopCardView)
