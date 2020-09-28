import React, { useState, useEffect, useCallback } from "react";
import {
  Row,
  Col,
  Card,
  Collapse,
  Form,
  Select,
  Badge,
  Rate,
  Radio,
} from "antd";
import { withRouter } from "react-router-dom";
import { compose } from "redux";

/**
 * App Imports
 */
import Grid from "../assets/images/expeditions_directory/grid_disable_ic.png";
import Pin from "../assets/images/expeditions_directory/pin_disable.png";
import Location_Img from "../assets/images/country_ic.png";
import { Triptype, ActivityList } from "../helpers/constants";
import countries from "../helpers/countries";
import { getAllTrips } from "../services/expert";
import AppLoader from "../components/Loader";
import { CaptalizeFirst } from "../helpers/methods";

const { Option } = Select;
const { Panel } = Collapse;

const Trips = (props) => {
  const [trips, setTrips] = useState([]);
  const [loader, setLoader] = useState(false);

  const [activity, setActivity] = useState([]);
  const [country, setCountry] = useState("");
  const [type, setType] = useState([]);
  const [month, setMonth] = useState("");
  const [price, setPrice] = useState("");
  const [suitable, setSuitable] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [sortBy, setSortBy] = useState(-1);

  const getAllTripsHandler = useCallback(async (value) => {
    try {
      setLoader(true);
      const result = await getAllTrips(value);
      if (result.status === 200) {
        setTrips(result.data.data);
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
      type,
      month,
      price,
      suitable,
      difficulty,
      sortBy,
    };
    getAllTripsHandler(data);
  }, [
    activity,
    country,
    difficulty,
    month,
    price,
    suitable,
    type,
    getAllTripsHandler,
    sortBy,
  ]);

  const onCardClick = (id) => props.history.push(`/trips-details/${id}`);

  const onSortOrderChanged = (e) => setSortBy(e);

  return (
    <div className="header-container">
      <div className="expedition_head_bg">
        <h1 className="an-36 medium-text">
          “Once in a lifetime Experiences, led by Experts”
        </h1>
      </div>
      <div className="container-fluid align-center">
        <div className="filter_sec_bg learning_sec">
          <Row gutter={40}>
            <Col span={6}></Col>
            <Col span={10}>
              <div className="expidition_bg">
                {/* <h4 className="sub_title">Expeditions</h4> */}
              </div>
            </Col>
            <Col span={4} className="pt25">
              <Select
                defaultValue="Sort by"
                onChange={onSortOrderChanged}
                style={{ width: 200 }}
                className="pr20"
              >
                <Option value="1">A-Z</Option>
                <Option value="-1">Z-A</Option>
              </Select>
            </Col>
            <Col span={4} className="pt25">
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
          <Row gutter={20} className="mt20">
            <Col xs={24} sm={24} md={5} lg={5} xl={5}>
              <div className="filter_left">
                <h4 className="sub_title an-14">Filters</h4>
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
                    <Panel header="Country" key="2">
                      <div>
                        <Select
                          style={{ width: "100%" }}
                          onChange={(e) => setCountry(e)}
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
                    <Panel header="Expedition Type" key="3">
                      <div>
                        <Select
                          mode="multiple"
                          onChange={(e) => setType(e)}
                          style={{ width: "100%" }}
                          placeholder="Select Type"
                        >
                          {Triptype.map((exp, i) => (
                            <Option key={i} value={exp.name}>
                              {exp.name}
                            </Option>
                          ))}
                        </Select>
                      </div>
                    </Panel>
                    <Panel header="Months" key="4">
                      <Radio.Group
                        defaultValue={`${new Date().getFullYear()}-01-01`}
                        onChange={(e) => setMonth(e.target.value)}
                        buttonStyle="solid"
                      >
                        <Radio.Button value="">All</Radio.Button>
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
                          <Radio value="">Any</Radio>
                          <Radio value="0-1000">$0 - $1000</Radio>
                          <Radio value="1000-5000">$1000 - $5000</Radio>
                          <Radio value="5000-10000">$5000 - $10000</Radio>
                          <Radio value="10000-10000000">
                            {" "}
                            More Than $1000{" "}
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
                    <Panel header="Activity Level" key="7">
                      <div className="checkbox_bg">
                        <Radio.Group
                          defaultValue=""
                          onChange={(e) => setDifficulty(e.target.value)}
                        >
                          <Radio value="">All</Radio>
                          <Radio value="light">Light</Radio>
                          <Radio value="moderate">Moderate</Radio>
                          <Radio value="difficult">Difficult</Radio>
                          <Radio value="tough">Tough</Radio>
                        </Radio.Group>
                      </div>
                    </Panel>
                    <Panel header="Suitable For" key="8">
                      <div className="suitable_sec">
                        <Radio.Group
                          defaultValue=""
                          onChange={(e) => setSuitable(e.target.value)}
                          buttonStyle="solid"
                        >
                          <Radio value="">All</Radio>
                          <Radio value="individual">Individual</Radio>
                          <Radio value="groups">Group</Radio>
                          <Radio value="couples">Couples</Radio>
                          <Radio value="families">Family</Radio>
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
                              onClick={() => onCardClick(t.id)}
                              cover={<img alt="example" src={t.cover} />}
                            >
                              <div className="price_sec">
                                <h5 className="mb10 an-14 medium-text">
                                  {CaptalizeFirst(t.title)}
                                </h5>
                                <p className="mb10 an-14">
                                  <img
                                    src={Location_Img}
                                    alt="location"
                                    className="pr10"
                                  />
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
                                        text={
                                          parseInt(t.difficulty) < 50
                                            ? "Light"
                                            : parseInt(t.difficulty) >= 50 &&
                                              parseInt(t.difficulty) < 100
                                              ? "Moderate"
                                              : "Advance"
                                        }
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

export default compose(withRouter)(Trips);
