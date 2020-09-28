import React, { useState, useEffect, useCallback } from "react";
import { Row, Col, Card, Rate, Badge, Button, Dropdown } from "antd";
import { withRouter } from "react-router-dom";
import { useSelector } from "react-redux";
import { compose } from "redux";
import OwlCarousel from "react-owl-carousel";

/**
 * App Imports
 */
import AppLoader from "../components/Loader";
import Slider from "../components/Utils/Slider";
import shareOption from "../containers/commonContainer/shareOption";

/**
 * Image Imports
 */
import Location_Img from "../assets/images/country_ic.png";
import {
  getAllExperts,
  getAllRecentTrips,
  getAllLearnings,
} from "../services/expert";
import { CaptalizeFirst } from "../helpers/methods";
import Share from "../assets/images/share_ic.png";
import SkillRed from "../assets/images/skill_red.svg";
import SkillGreen from "../assets/images/skill_green.svg";
import SkillOrange from "../assets/images/skill_orange.svg";

const expeditionsOptions = {
  items: 3,
  nav: true,
  loop: false,
  responsiveClass: true,
  responsive: {
    0: {
      items: 1,
      nav: true,
      dots: false,
    },
    768: {
      items: 2,
      nav: true,
      dots: false,
    },
    991: {
      items: 3,
      nav: true,
      dots: false,
    },
  },
};
const options = {
  items: 2,
  nav: true,
  loop: false,
  responsiveClass: true,
  responsive: {
    0: {
      items: 1,
      nav: true,
      dots: false,
    },
    768: {
      items: 2,
      nav: true,
      dots: false,
    },
    991: {
      items: 2,
      nav: true,
      dots: false,
    },
  },
};

const expertsOptions = {
  items: 3,
  nav: true,
  loop: false,
  responsiveClass: true,
  responsive: {
    0: {
      items: 1,
      nav: true,
      dots: false,
    },
    768: {
      items: 2,
      nav: true,
      dots: false,
    },
    991: {
      items: 3,
      nav: true,
      dots: false,
    },
  },
};

const ExpertsHomePanel = (props) => {
  const [experts, setExpert] = useState([]);
  const [country, setCountry] = useState("");
  const [activity, setActivity] = useState([]);
  const [langauge, setLangauge] = useState([]);
  const [sortBy, setSortBy] = useState(-1);
  const { role } = useSelector((state) => state.auth);
  const [loader, setLoader] = useState(false);
  const [trips, setTrips] = useState([]);
  const token = useSelector((state) => state.auth.accessToken);
  const [workshops, setWorkshops] = useState([]);

  const getAllExpertsHandler = useCallback(async (value) => {
    try {
      setLoader(true);
      const result = await getAllExperts(value);
      if (result.status === 200) {
        setExpert(result.data.data);
      }
      setLoader(false);
    } catch (err) {
      console.log(err);
      setLoader(false);
    }
  }, []);

  const getAllTripsHandler = useCallback(async () => {
    try {
      const result = await getAllRecentTrips();
      if (result.status === 200) {
        setTrips(result.data.data);
      }
    } catch (err) { }
  }, []);

  const getWorkshops = useCallback(async () => {
    const result = await getAllLearnings();
    if (result.status === 200) {
      setWorkshops(result.data.data);
    }
  }, []);

  useEffect(() => {
    const data = { country, activity, langauge, sortOrder: sortBy };
    getAllExpertsHandler(data);
    getAllTripsHandler();
    getWorkshops();
  }, [
    activity,
    country,
    langauge,
    sortBy,
    token,
    getAllExpertsHandler,
    getAllTripsHandler,
    getWorkshops,
  ]);

  const onCardClick = (id, type) => {
    switch (type) {
      case "trip":
        props.history.push(`/trips-details/${id}`);
        break;
      case "workshop":
        props.history.push(`/learning-details/${id}`);
        break;
      case "expert":
        props.history.push(`/expert-profile/${id}`);
        break;
      default:
        break;
    }
  };
  const onExpeditionsClick = (id) => props.history.push(`/create-trips`);
  const onViewExpeditionsClick = (id) => props.history.push(`/expeditions`);
  const onViewWorkshopsClick = (id) => props.history.push(`/learning`);
  const onExpertsClick = (id) => props.history.push(`/experts`);
  const onCreateWorkshopClick = (id) => props.history.push(`/create-learnings`);

  return (
    <div>
      <div className="header_banner">
        <Slider {...props} role={role} />
      </div>
      <div className="header-container">
        <div className="container align-center">
          <div className="banner_txt">
            <h1 className="an-50 medium-text">
              Welcome{" "}
              {props.expert.firstName
                ? props.expert.firstName
                : props.enthu.name}
              !
            </h1>
            <p className="an-18 medium-text">
              Join a worldwide community of adventurers. Learn <br></br>through
              experience. Help protect our planet.
            </p>
            {role === "expert" && (
              <Button
                className="view-more-trips an-20 mt10"
                onClick={onExpeditionsClick}
              >
                Create Expedition
              </Button>
            )}
          </div>
        </div>
        <div className="container align-center">
          <Row className="pb20">
            <Col xs={18} sm={24} md={18} lg={18} xl={18}>
              <div className="expidition_bg">
                <h4 className="sub_title expert-trip">
                  {CaptalizeFirst("Browse Expeditions")}
                </h4>
              </div>
            </Col>
          </Row>
          <Row gutter={20}>
            <Col xs={24} sm={24} md={24} lg={24} xl={24}>
              <div className="expidition_bg expendition">
                <Row gutter={[15, 25]}>
                  {loader ? (
                    <div className="text-center py20 loader-absolute-class">
                      <AppLoader />
                    </div>
                  ) : trips.length === 0 ? (
                    <div className="no_trips_found">
                      <div className="mb10 an-14 medium-text text-left mt100">
                        <h4>Currently, there are no trips</h4>
                      </div>
                      {role === "expert" && (
                        <Button
                          className="view-more-trips an-20 mt10"
                          onClick={onExpeditionsClick}
                        >
                          Create Expedition
                        </Button>
                      )}
                    </div>
                  ) : (
                        <>
                          <OwlCarousel
                            className="owl-theme"
                            {...expeditionsOptions}
                            margin={40}
                          >
                            {trips.map((t) => (
                              t.active === true &&
                              <Col
                                xs={24}
                                sm={24}
                                md={24}
                                lg={24}
                                xl={24}
                                key={t.id}
                                className="gutter-row"
                              >
                                <Card
                                  hoverable
                                  cover={
                                    <img
                                      onClick={() => onCardClick(t.id, "trip")}
                                      alt="example"
                                      src={t.cover}
                                    />
                                  }
                                >
                                  {t.medium === "online" && (
                                    <span className="online_tag an-10 medium-text">
                                      {CaptalizeFirst(t.type)}{" "}
                                      {CaptalizeFirst(t.medium)}
                                    </span>
                                  )}
                                  <div className="price_sec">
                                    <h5 className="mb10 an-14">
                                      {t.duration} Days -{" "}
                                      {CaptalizeFirst(t.country)} -{" "}
                                      {t.activity.map(
                                        (a) => `${CaptalizeFirst(a)} ,`
                                      )}
                                    </h5>
                                    <p className="mb10 an-14 medium-text">
                                      {CaptalizeFirst(t.title)}
                                    </p>
                                    <Row>
                                      <Col xs={18} sm={18} md={18} lg={18} xl={18}>
                                        <h3 className="medium-text an-18">
                                          {t.price} $
                                    </h3>
                                      </Col>
                                      <Col xs={6} sm={6} md={6} lg={6} xl={6}>
                                        <div className="text-right">
                                          <img
                                            src={
                                              parseInt(t.skill) < 50
                                                ? SkillGreen
                                                : parseInt(t.skill) >= 50 &&
                                                  parseInt(t.skill) < 100
                                                  ? SkillOrange
                                                  : SkillRed
                                            }
                                            alt="Skil level"
                                          />
                                        </div>
                                      </Col>
                                    </Row>
                                  </div>
                                  <Row>
                                    <Col xs={16} sm={16} md={16} lg={16} xl={16}>
                                      <Rate
                                        allowHalf
                                        defaultValue={0}
                                        className="an-14 pt5"
                                      />
                                    </Col>
                                    <Col xs={8} sm={8} md={8} lg={8} xl={8}>
                                      <div className="heart_fill">
                                        <input type="checkbox" id="like1" />
                                        <div className="text-right">
                                          <Dropdown
                                            overlay={shareOption}
                                            placement="bottomCenter"
                                          >
                                            <img
                                              src={Share}
                                              alt="Social Share"
                                              className="share_icn"
                                            />
                                          </Dropdown>
                                          <label htmlFor="like1">
                                            <svg viewBox="0 0 24 24">
                                              <path d="M12 21.35l-1.45-1.32c-5.15-4.67-8.55-7.75-8.55-11.53 0-3.08 2.42-5.5 5.5-5.5 1.74 0 3.41.81 4.5 2.09 1.09-1.28 2.76-2.09 4.5-2.09 3.08 0 5.5 2.42 5.5 5.5 0 3.78-3.4 6.86-8.55 11.54l-1.45 1.31z" />
                                            </svg>
                                          </label>
                                        </div>
                                      </div>
                                    </Col>
                                  </Row>
                                </Card>
                              </Col>
                            ))}
                          </OwlCarousel>
                          <div className="view_more_position">
                            <Button
                              className="view-more-trips an-20 mt10 button_set"
                              onClick={onViewExpeditionsClick}
                            >
                              View More
                        </Button>
                          </div>
                        </>
                      )}
                </Row>
              </div>
            </Col>
          </Row>
          <section className="expe_sec h_padding workshop">
            <div className="container">
              <Row gutter={60}>
                <Col xs={24} sm={24} md={24} lg={8} className="workshop_pad">
                  <h2 className="main_title an-50 h_line">Browse Workshops</h2>
                  <p className="an-20 workshop_text">
                    Get access to the pool of learning resources crafted by
                    experts in a variety of different adventure travel fields.
                  </p>
                  <div className="workshops_currently">
                    {workshops.length === 0 && (
                      <div className="mb10 an-14 medium-text text-left mt100">
                        <h4>Currently, there are no workshops</h4>
                      </div>
                    )}
                  </div>
                  {role === "expert" && (
                    <div className="workshop_button">
                      <Button
                        className="view-more-trips an-20 mt10 button_set"
                        onClick={onCreateWorkshopClick}
                      >
                        Create Workshop
                      </Button>
                    </div>
                  )}
                </Col>
                <Col span={16} xs={24} sm={24} md={24} lg={16}>
                  {loader ? (
                    <div className="text-center py20 loader-absolute-class">
                      <AppLoader />
                    </div>
                  ) : workshops.length === 0 ? (
                    <></>
                  ) : (
                        <>
                          <OwlCarousel
                            className="owl-theme"
                            {...options}
                            margin={40}
                          >
                            {workshops.map((t, index) => (
                              t.active === true &&
                              <Card
                                key={index}
                                hoverable
                                cover={
                                  <img
                                    onClick={() => onCardClick(t.id, "workshop")}
                                    alt="example"
                                    src={t.cover}
                                  />
                                }
                              >
                                {t.medium === "online" && (
                                  <span className="online_tag an-10 medium-text">
                                    {CaptalizeFirst(t.type)}{" "}
                                    {CaptalizeFirst(t.medium)}
                                  </span>
                                )}
                                <div className="price_sec">
                                  <h5 className="mb10 an-14">
                                    {t.duration} Days - {CaptalizeFirst(t.country)}{" "}
                                -{" "}
                                    {t.activity.map(
                                      (a) => `${CaptalizeFirst(a)} ,`
                                    )}
                                  </h5>
                                  <p className="mb10 an-14 medium-text">
                                    {CaptalizeFirst(t.title)}
                                  </p>
                                  <Row>
                                    <Col xs={18} sm={18} md={18} lg={18} xl={18}>
                                      <h3 className="medium-text an-18">
                                        {t.price} $
                                  </h3>
                                    </Col>
                                    <Col xs={6} sm={6} md={6} lg={6} xl={6}>
                                      <div className="text-right">
                                        <img
                                          className="skil_level"
                                          src={
                                            parseInt(t.skill) < 50
                                              ? SkillGreen
                                              : parseInt(t.skill) >= 50 &&
                                                parseInt(t.skill) < 100
                                                ? SkillOrange
                                                : SkillRed
                                          }
                                          alt="Skil level"
                                        />
                                      </div>
                                    </Col>
                                  </Row>
                                </div>
                                <Row>
                                  <Col xs={16} sm={16} md={16} lg={16} xl={16}>
                                    <Rate
                                      allowHalf
                                      defaultValue={0}
                                      className="an-14 pt5"
                                    />
                                  </Col>
                                  <Col xs={8} sm={8} md={8} lg={8} xl={8}>
                                    <div className="heart_fill">
                                      <input type="checkbox" id="like1" />
                                      <div className="text-right">
                                        <Dropdown
                                          overlay={shareOption}
                                          placement="bottomCenter"
                                        >
                                          <img
                                            src={Share}
                                            alt="Social Share"
                                            className="share_icn"
                                          />
                                        </Dropdown>
                                        <label htmlFor="like1">
                                          <svg viewBox="0 0 24 24">
                                            <path d="M12 21.35l-1.45-1.32c-5.15-4.67-8.55-7.75-8.55-11.53 0-3.08 2.42-5.5 5.5-5.5 1.74 0 3.41.81 4.5 2.09 1.09-1.28 2.76-2.09 4.5-2.09 3.08 0 5.5 2.42 5.5 5.5 0 3.78-3.4 6.86-8.55 11.54l-1.45 1.31z" />
                                          </svg>
                                        </label>
                                      </div>
                                    </div>
                                  </Col>
                                </Row>
                              </Card>
                            ))}
                          </OwlCarousel>
                        </>
                      )}
                </Col>
                <div className="view_more_position">
                  <Button
                    className="view-more-trips an-20 mt10 button_set"
                    onClick={onViewWorkshopsClick}
                  >
                    View More
                  </Button>
                </div>
              </Row>
            </div>
          </section>
          <Row className="pb20">
            <Col xs={18} sm={24} md={18} lg={18} xl={18}>
              <div className="expidition_bg">
                <h4 className="sub_title expert-trip">
                  Discover Experts Worldwide
                </h4>
              </div>
            </Col>
          </Row>
          <Row gutter={40} className="Worldwide">
            <Col className="meet_expert" span={24}>
              <div className="expert_bg">
                <Row justify="space-between" gutter={[10, 20]}>
                  {loader ? (
                    <div className="text-center py20 loader-absolute-class">
                      <AppLoader />
                    </div>
                  ) : experts.length === 0 ? (
                    <div className="mb10 an-14 medium-text text-center">
                      <h4>Currently, there are no experts</h4>
                    </div>
                  ) : (
                        <>
                          <OwlCarousel
                            className="owl-theme"
                            {...expertsOptions}
                            margin={40}
                          >
                            {experts.map((expert, index) => (
                              <Col span={24} key={index} className="mb15">
                                <Card
                                  hoverable
                                  onClick={() => onCardClick(expert.id, "expert")}
                                  style={{}}
                                  cover={<img alt="example" src={expert.profile} />}
                                >
                                  <div className="trip_price_sec">
                                    <h5 className="mb10 an-14 medium-text">{`${CaptalizeFirst(
                                      expert.firstName
                                    )} ${CaptalizeFirst(expert.lastName)}`}</h5>
                                    <h6 className="an-14 mb10 medium-text expert_bg_heading">
                                      <Badge
                                        color="yellow"
                                        text={CaptalizeFirst(expert.experties[0])}
                                        className="an-14 start_expert_bg"
                                      />
                                    </h6>
                                    <p className="mb10">
                                      <img src={Location_Img} alt="location" />{" "}
                                      {CaptalizeFirst(expert.country)}
                                    </p>
                                    <Rate
                                      allowHalf
                                      defaultValue={0}
                                      className="an-14"
                                    />{" "}
                                    <span>0 Followers</span>
                                    <div className="mt30 mb20 view_profile text-center">
                                      <a href="#!" className="ex__primary_btn">
                                        View Profile
                                  </a>
                                    </div>
                                  </div>
                                </Card>
                              </Col>
                            ))}
                          </OwlCarousel>
                          <div className="view_more_position meet_expert_button">
                            <Button
                              className="view-more-trips an-20 mt10 button_meet"
                              onClick={onExpertsClick}
                            >
                              View More
                        </Button>
                          </div>
                        </>
                      )}
                </Row>
              </div>
            </Col>
          </Row>
        </div>
      </div>
    </div>
  );
};

export default compose(withRouter)(ExpertsHomePanel);
