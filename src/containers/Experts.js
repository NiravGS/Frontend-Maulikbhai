import React, { useState, useEffect, useCallback } from "react";
import {
  Row,
  Col,
  Select,
  Collapse,
  Form,
  Card,
  Rate,
  Radio,
  Badge,
} from "antd";
import { withRouter } from "react-router-dom";
import { compose } from "redux";

/**
 * App Imports
 */
import { expertiseList } from "../helpers/constants";
import countries from "../helpers/countries";
import langauges from "../helpers/langauges";
import AppLoader from "../components/Loader";

/**
 * Image Imports
 */
import Location_Img from "../assets/images/country_ic.png";
// import Card_1 from "../assets/images/expeditions_directory/card_1.png";
import { getAllExperts, getAllRecentTrips } from "../services/expert";
import { CaptalizeFirst } from "../helpers/methods";

const { Option } = Select;
const { Panel } = Collapse;

const Experts = (props) => {
  const [experts, setExpert] = useState([]);
  const [country, setCountry] = useState("");
  const [activity, setActivity] = useState([]);
  const [langauge, setLangauge] = useState([]);
  const [sortBy, setSortBy] = useState(-1);
  const [loader, setLoader] = useState(false);
  const [tripsLoader, setTripsLoader] = useState(false);
  const [trips, setTrips] = useState([]);

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
      setTripsLoader(true);
      const result = await getAllRecentTrips();
      if (result.status === 200) {
        setTrips(result.data.data);
      }
      setTripsLoader(false);
    } catch (err) {
      setTripsLoader(false);
    }
  }, []);

  useEffect(() => {
    const data = { country, activity, langauge, sortOrder: sortBy };
    getAllExpertsHandler(data);
    getAllTripsHandler();
  }, [
    activity,
    country,
    langauge,
    sortBy,
    getAllExpertsHandler,
    getAllTripsHandler,
  ]);

  const onCardClick = (id) => props.history.push(`/expert-profile/${id}`);
  const onTripsCardClick = (id) => props.history.push(`/trips-details/${id}`);

  const onLangaugeChanged = (e) => setLangauge(e);

  const onCountryChanged = (e) => setCountry(e);

  const onActivityChanged = (e) => setActivity(e);

  const onSortOrderChanged = (e) => setSortBy(e);

  return (
    <div className="header-container">
      <div className="expedition_head_bg">
        <h1 className="an-36 medium-text">
          “Discover the fellow experts across the globe.”
        </h1>
      </div>
      <div className="container align-center">
        <div className="filter_sec_bg">
          <Row gutter={40}>
            <Col span={6}></Col>
            <Col span={12}>
              <div className="expidition_bg">
                <h4 className="sub_title">Expert</h4>
              </div>
            </Col>
            <Col span={6} className="pt25 text-right">
              <Select
                onChange={onSortOrderChanged}
                defaultValue="Sort by"
                style={{ width: 200 }}
                className="pr20"
              >
                <Option value="1">A-Z</Option>
                <Option value="-1">Z-A</Option>
              </Select>
            </Col>
          </Row>
          <Row gutter={40}>
            <Col span={6}>
              <div className="filter_left">
                <h4 className="sub_title an-14">Filters</h4>
                <Form>
                  <Collapse defaultActiveKey={["1"]}>
                    <Panel header="Activity" key="1">
                      <div>
                        <Select
                          mode="multiple"
                          style={{ width: "100%" }}
                          onChange={onActivityChanged}
                          placeholder="Experties"
                        >
                          {expertiseList.map((exp, i) => (
                            <Option key={i} value={exp.name}>
                              {exp.name}
                            </Option>
                          ))}
                        </Select>
                      </div>
                    </Panel>
                    <Panel header="Country" key="2">
                      <div>
                        <Select
                          style={{ width: "100%" }}
                          onChange={onCountryChanged}
                          placeholder="Select Country"
                        >
                          <Option value="">All</Option>
                          {countries.map((exp, i) => (
                            <Option key={i} value={exp.name}>
                              {exp.name}
                            </Option>
                          ))}
                        </Select>
                      </div>
                    </Panel>
                    <Panel header="Languages" key="3">
                      <div>
                        <Select
                          mode="multiple"
                          style={{ width: "100%" }}
                          onChange={onLangaugeChanged}
                          placeholder="Select Language"
                        >
                          {langauges.map((exp, i) => (
                            <Option key={i} value={exp.name}>
                              {exp.name}
                            </Option>
                          ))}
                        </Select>
                      </div>
                    </Panel>
                    <Panel header="Rating" key="4">
                      <div className="rating_sec">
                        <Radio.Group defaultValue="a" buttonStyle="solid">
                          <Radio value="a">
                            <Rate
                              allowHalf
                              defaultValue={1}
                              className="an-14 pt5 rating_lft"
                            />
                          </Radio>
                          <Radio value="b">
                            <Rate
                              allowHalf
                              defaultValue={2}
                              className="an-14 pt5 rating_lft"
                            />
                          </Radio>
                          <Radio value="c">
                            <Rate
                              allowHalf
                              defaultValue={3}
                              className="an-14 pt5 rating_lft"
                            />
                          </Radio>
                          <Radio value="d">
                            <Rate
                              allowHalf
                              defaultValue={4}
                              className="an-14 pt5 rating_lft"
                            />
                          </Radio>
                          <Radio value="e">
                            <Rate
                              allowHalf
                              defaultValue={5}
                              className="an-14 pt5 rating_lft"
                            />
                          </Radio>
                        </Radio.Group>
                      </div>
                    </Panel>
                  </Collapse>
                </Form>
              </div>
            </Col>
            <Col span={18}>
              <div className="expert_bg">
                <Row justify="space-between" gutter={[10, 20]}>
                  {loader ? (
                    <div className="text-center py20 loader-absolute-class">
                      <AppLoader />
                    </div>
                  ) : experts.length === 0 ? (
                    <div className="mb10 an-14 medium-text text-center">
                      <h4>No experts found</h4>
                    </div>
                  ) : (
                        experts.map((expert, index) => (
                          <Col span={8} key={index} className="mb15">
                            <Card
                              hoverable
                              onClick={() => onCardClick(expert.id)}
                              style={{ width: 250 }}
                              cover={<img alt="example" src={expert.profile} />}
                            >
                              <div className="trip_price_sec">
                                <h5 className="mb10 an-14 medium-text">{`${CaptalizeFirst(
                                  expert.firstName
                                )} ${CaptalizeFirst(expert.lastName)}`}</h5>
                                <h6 className="an-14 mb10 medium-text">
                                  <Badge
                                    color="yellow"
                                    text={CaptalizeFirst(expert.experties[0])}
                                    className="an-14"
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
                                <div className="mt30 mb20">
                                  <a href="#!" className="ex__primary_btn">
                                    Follow
                              </a>
                                </div>
                              </div>
                            </Card>
                          </Col>
                        ))
                      )}
                </Row>
              </div>
              <Row>
                <Col span={24}>
                  <h4 className="sub_title" style={{ paddingBottom: 0 }}>
                    Recent Trips
                  </h4>
                </Col>
              </Row>
              <div className="feature_bg">
                <Row gutter={[0, 40]} className="pt40">
                  {tripsLoader ? (
                    <div className="text-center py20 loader-absolute-class">
                      <AppLoader />
                    </div>
                  ) : trips.length === 0 ? (
                    <div className="mb10 an-14 medium-text text-center mt100">
                      <h4>No trips found</h4>
                    </div>
                  ) : (
                        trips.map((t) => (
                          t.active === true &&
                          <Col span={8} key={t.id}>
                            <Card
                              hoverable
                              onClick={() => onTripsCardClick(t.id)}
                              style={{ width: 240 }}
                              cover={<img alt="example" src={t.cover} />}
                            >
                              <div className="price_sec">
                                <h5 className="mb10 an-14 medium-text">
                                  {CaptalizeFirst(t.title)}
                                </h5>
                                <p className="mb10 an-14">
                                  <img src={Location_Img} alt="location" />{" "}
                                  {t.location}
                                </p>
                                <p className="mb10 an-14">
                                  <b>Activity :</b>{" "}
                                  {t.activity.map((a) => `${CaptalizeFirst(a)} `)}
                                </p>
                                <Row>
                                  <Col span={8}>
                                    <h3 className="medium-text an-16">
                                      {t.price} $
                                </h3>
                                  </Col>
                                  <Col span={8}>
                                    <div>
                                      <Badge
                                        color="yellow"
                                        text={`${t.duration} Nigth`}
                                        className="an-14"
                                      />
                                    </div>
                                  </Col>
                                  <Col span={8}>
                                    <div>
                                      <Badge
                                        color="yellow"
                                        text={CaptalizeFirst(t.difficulty)}
                                        className="an-14"
                                      />
                                    </div>
                                  </Col>
                                </Row>
                              </div>
                              <Row>
                                <Col span={16}>
                                  <Rate
                                    allowHalf
                                    defaultValue={0}
                                    className="an-14 pt5"
                                  />
                                </Col>
                                <Col span={8}>
                                  <div className="heart_fill">
                                    <input type="checkbox" id="like1" />
                                    <label htmlFor="like1">
                                      <svg viewBox="0 0 24 24">
                                        <path d="M12 21.35l-1.45-1.32c-5.15-4.67-8.55-7.75-8.55-11.53 0-3.08 2.42-5.5 5.5-5.5 1.74 0 3.41.81 4.5 2.09 1.09-1.28 2.76-2.09 4.5-2.09 3.08 0 5.5 2.42 5.5 5.5 0 3.78-3.4 6.86-8.55 11.54l-1.45 1.31z" />
                                      </svg>
                                    </label>
                                  </div>
                                </Col>
                              </Row>
                            </Card>
                          </Col>
                        ))
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

export default compose(withRouter)(Experts);
