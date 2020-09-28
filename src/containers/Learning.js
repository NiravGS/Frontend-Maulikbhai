import React, { useState, useEffect, useCallback } from "react";
import { Row, Col, Card, Collapse, Form, Select, Rate, Radio } from "antd";
import { withRouter } from "react-router-dom";
import { compose } from "redux";

/**
 * App Imports
 */
import Grid from "../assets/images/expeditions_directory/grid_disable_ic.png";
import Pin from "../assets/images/expeditions_directory/pin_disable.png";
import Share from "../assets/images/share_ic.png";
import SkillRed from "../assets/images/skill_red.svg";
import SkillGreen from "../assets/images/skill_green.svg";
import SkillOrange from "../assets/images/skill_orange.svg";
import countries from "../helpers/countries";
import { GetLearnings } from "../services/expert";
import AppLoader from "../components/Loader";

import langs from "../helpers/langauges";
import { ActivityList } from "../helpers/constants";

import { CaptalizeFirst } from "../helpers/methods";

const { Option } = Select;
const { Panel } = Collapse;

const Learnings = (props) => {
  const [learnings, setLearnings] = useState([]);
  const [loader, setLoader] = useState(false);

  const [activity, setActivity] = useState([]);
  const [country, setCountry] = useState("");
  const [month, setMonth] = useState("");
  const [price, setPrice] = useState("");
  const [sortBy, setSortBy] = useState(-1);
  const [langauges, setLangauges] = useState([]);
  const [skill, setSkill] = useState("");
  const [workshopType, setWorkshopType] = useState("");
  const [workshopMedium, setWorkshopMedium] = useState("");

  const getAllTripsHandler = useCallback(async (value) => {
    try {
      setLoader(true);
      const result = await GetLearnings(value);
      if (result.status === 200) {
        setLearnings(result.data.data);
      }
      setLoader(false);
    } catch (err) {
      setLoader(false);
    }
  }, []);

  useEffect(() => {
    const data = {
      activity,
      country,
      month,
      price,
      langauges,
      sortBy,
      skill,
      workshopType,
      workshopMedium,
    };
    getAllTripsHandler(data);
  }, [
    activity,
    country,
    month,
    price,
    getAllTripsHandler,
    sortBy,
    langauges,
    skill,
    workshopType,
    workshopMedium,
  ]);

  const onCardClick = (id) => props.history.push(`/learning-details/${id}`);

  return (
    <div className="header-container">
      <div className="expedition_head_bg">
        <h1 className="an-36 medium-text">
          “Once in a lifetime Experiences, led by Experts”
        </h1>
      </div>
      <div className="container-fluid align-center">
        <div className="filter_sec_bg learning_sec">
          <Row className="pb20">
            <Col xs={24} sm={24} md={18} lg={18} xl={18}>
              <div className="expidition_bg">
                {/* <h4 className="sub_title">Expeditions</h4> */}
              </div>
            </Col>
            <Col
              xs={24}
              sm={24}
              md={6}
              lg={6}
              xl={6}
              className="pt25 text-right"
            >
              <Select
                defaultValue="Sort By"
                style={{ width: 200 }}
                className="pr20"
                onChange={(e) => setSortBy(e)}
              >
                <Option value="1">A-Z</Option>
                <Option value="-1">Z-A</Option>
              </Select>
              <Radio.Group defaultValue="a" buttonStyle="solid">
                <Radio.Button value="a">
                  <img src={Grid} alt="grid" />
                </Radio.Button>
                <Radio.Button value="b">
                  <img src={Pin} alt="pin" />
                </Radio.Button>
              </Radio.Group>
            </Col>
          </Row>
          <Row gutter={20}>
            <Col xs={24} sm={24} md={5} lg={5} xl={5}>
              <div className="filter_left">
                <h4 className="sub_title an-14 medium-text">Filters</h4>
                <Form>
                  <Collapse>
                    <Panel header="Activity" key="1">
                      <div>
                        <Select
                          mode="multiple"
                          onChange={(e) => setActivity(e)}
                          style={{ width: "100%" }}
                          placeholder="Activity"
                        >
                          {ActivityList.map((exp, i) => (
                            <Option key={i} value={exp.name}>
                              {exp.name}
                            </Option>
                          ))}
                        </Select>
                      </div>
                    </Panel>
                    <Panel header="Languages" key="9">
                      <div>
                        <Select
                          mode="multiple"
                          onChange={(e) => setLangauges(e)}
                          style={{ width: "100%" }}
                          placeholder="Select Language"
                        >
                          {langs.map((exp, i) => (
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
                          onChange={(e) => setCountry(e)}
                          placeholder="Select Country"
                        >
                          {countries.map((exp, i) => (
                            <Option key={i} value={exp.name}>
                              {exp.name}
                            </Option>
                          ))}
                        </Select>
                      </div>
                    </Panel>
                    <Panel header="Workshop Type" key="3">
                      <div className="checkbox_bg">
                        <Radio.Group
                          defaultValue=""
                          onChange={(e) => setWorkshopType(e.target.value)}
                        >
                          <Radio value="">All</Radio>
                          <Radio value="one-one">1-1</Radio>
                          <Radio value="group">Group</Radio>
                          <Radio value="customized">Customized</Radio>
                        </Radio.Group>
                      </div>
                    </Panel>
                    <Panel header="Workshop Medium" key="7">
                      <div className="checkbox_bg setWorkshopMedium">
                        <Radio.Group
                          defaultValue=""
                          onChange={(e) => setWorkshopMedium(e.target.value)}
                        >
                          <Radio value="">All</Radio>
                          <Radio value="online">Online</Radio>
                          <Radio value="classroom">Classroom</Radio>
                          <Radio value="onsite">Onsite</Radio>
                        </Radio.Group>
                      </div>
                    </Panel>
                    <Panel header="Skill Level" key="8">
                      <div className="checkbox_bg">
                        <Radio.Group
                          defaultValue="0-1000"
                          onChange={(e) => setSkill(e.target.value)}
                        >
                          <Radio value="">All</Radio>
                          <Radio value="0-49">Beginner</Radio>
                          <Radio value="50-99">Medium</Radio>
                          <Radio value="100-10000">Advanced</Radio>
                        </Radio.Group>
                      </div>
                    </Panel>
                    <Panel header="Months" key="4">
                      <Radio.Group
                        defaultValue={`${new Date().getFullYear()}-01-01`}
                        onChange={(e) => setMonth(e.target.value)}
                        buttonStyle="solid"
                      >
                        <Radio.Button
                          value={`31-${new Date().getFullYear()}-01-01`}
                        >
                          Jan
                        </Radio.Button>
                        <Radio.Button
                          value={`28-${new Date().getFullYear()}-02-01`}
                        >
                          Feb
                        </Radio.Button>
                        <Radio.Button
                          value={`31-${new Date().getFullYear()}-03-01`}
                        >
                          Mar
                        </Radio.Button>
                        <Radio.Button
                          value={`30-${new Date().getFullYear()}-04-01`}
                        >
                          Apr
                        </Radio.Button>
                        <Radio.Button
                          value={`31-${new Date().getFullYear()}-05-01`}
                        >
                          May
                        </Radio.Button>
                        <Radio.Button
                          value={`30-${new Date().getFullYear()}-06-01`}
                        >
                          Jun
                        </Radio.Button>
                        <Radio.Button
                          value={`31-${new Date().getFullYear()}-07-01`}
                        >
                          Jul
                        </Radio.Button>
                        <Radio.Button
                          value={`31-${new Date().getFullYear()}-08-01`}
                        >
                          Aug
                        </Radio.Button>
                        <Radio.Button
                          value={`30-${new Date().getFullYear()}-09-01`}
                        >
                          Sep
                        </Radio.Button>
                        <Radio.Button
                          value={`31-${new Date().getFullYear()}-10-01`}
                        >
                          Oct
                        </Radio.Button>
                        <Radio.Button
                          value={`30-${new Date().getFullYear()}-11-01`}
                        >
                          Nov
                        </Radio.Button>
                        <Radio.Button
                          value={`31-${new Date().getFullYear()}-12-01`}
                        >
                          Dec
                        </Radio.Button>
                      </Radio.Group>
                    </Panel>
                    <Panel header="Price Range" key="5">
                      <div className="checkbox_bg">
                        <Radio.Group
                          defaultValue=""
                          onChange={(e) => setPrice(e.target.value)}
                        >
                          <Radio value="">All Price Range</Radio>
                          <Radio value="0-1000">$0 - $1000</Radio>
                          <Radio value="1000-5000">$1000 - $5000</Radio>
                          <Radio value="5000-10000">$5000 - $10000</Radio>
                          <Radio value="10000-10000000">
                            {" "}
                            Greater than $1000{" "}
                          </Radio>
                        </Radio.Group>
                      </div>
                    </Panel>
                    <Panel header="Rating" key="6">
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
            <Col xs={24} sm={24} md={19} lg={19} xl={19}>
              <div className="expidition_bg">
                <Row gutter={[15, 25]}>
                  {loader ? (
                    <div className="text-center py20 loader-absolute-class">
                      <AppLoader />
                    </div>
                  ) : learnings.length === 0 ? (
                    <div className="mb10 an-14 medium-text text-center mt100">
                      <h4>No learnings found</h4>
                    </div>
                  ) : (
                        learnings.map((t) => (
                          t.active === true &&
                          <Col
                            xs={24}
                            sm={24}
                            md={8}
                            lg={8}
                            xl={8}
                            key={t.id}
                            className="gutter-row"
                          >
                            <Card
                              hoverable
                              onClick={() => onCardClick(t.id)}
                              cover={<img alt="example" src={t.cover} />}
                            >
                              {t.medium === "online" && (
                                <span className="online_tag an-10 medium-text">
                                  {CaptalizeFirst(t.type)}{" "}
                                  {CaptalizeFirst(t.medium)}
                                </span>
                              )}
                              <div className="price_sec">
                                <h5 className="mb10 an-14">
                                  {t.duration} Days{" "}
                                  {t.country !== "undefined"
                                    ? `- ${CaptalizeFirst(t.country)}`
                                    : ""}{" "}
                              -{" "}
                                  {t.activity.map((a) => `${CaptalizeFirst(a)} ,`)}
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
                                      <img
                                        src={Share}
                                        alt="Social Share"
                                        className="pr10 pt5 share_icn"
                                      />
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

export default compose(withRouter)(Learnings);
