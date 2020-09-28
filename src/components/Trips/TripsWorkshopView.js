import React, { useEffect, useCallback, useState, Fragment } from 'react';
import { withRouter } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { compose } from "redux";
import { Row, Col, Select, Radio, Button, Pagination, Icon } from 'antd';

/**
 * App Imports
 */
import Grid from "../../assets/images/expeditions_directory/grid_disable_ic.png";
import Pin from "../../assets/images/expeditions_directory/pin_disable.png";
import { CreateTrips, GetMyTrips, GetLearningMy, InActiveTrip, InActiveWorkshop, ActiveTrip, ActiveWorkshop } from '../../services/expert';
import AppLoader from "../../components/Loader";
import Map from "../../components/Trips/Map";
import TripsWorkshopCardView from './TripsWorkshopCardView';
import { TripsEvents } from '../../redux/trips/events';

const ApiKey = process.env.REACT_APP_GOOGLE_MAP_API_KEY;
const { Option } = Select;

const TripsWorkshopView = (props) => {
  const { view, token, publicTrip, publicWorkShop, isPublicView, travelMap } = props;
  const [upcomingTrip, setUpcomingTrip] = useState([]);
  const [allTrip, setAllTrip] = useState([]);
  const [loader, setLoader] = useState(false);
  const [activeUpcomingTrip, setactiveUpcomingTrip] = useState(false);
  const [activePastTrip, setactivePastTrip] = useState(false);
  const [activeUpcomingWorkshop, setactiveUpcomingWorkshop] = useState(false);
  const [activePastWorkshop, setactivePastWorkshop] = useState(false);
  const [workshops, setWorkshops] = useState([]);
  const [allWorkshops, setAllWorkshops] = useState([]);
  const [pageMinValue, setPageMinValue] = useState(0);
  const [pageMaxValue, setPageMaxValue] = useState(9);
  const [isMapView, setIsMapView] = useState(false);
  const dispatch = useDispatch();

  const { step3 } = TripsEvents;

  const { isLogin, role } = useSelector((state) => state.auth);

  const getTrips = useCallback(async (token) => {
    // setLoader(true);
    if (publicTrip && publicTrip.length > 0) {
      setUpcomingTrip(publicTrip);
      setAllTrip(publicTrip);
      setLoader(false);
    } else {
      const result = await GetMyTrips(token);
      if (result.status === 200) {
        setUpcomingTrip(result.data.data);
        setAllTrip(result.data.data);
        setLoader(false);
      }
    }
  }, []);

  const getWorkshops = useCallback(async (token) => {
    if (publicWorkShop && publicWorkShop.length > 0) {
      setWorkshops(publicWorkShop);
      setAllWorkshops(publicWorkShop);
    } else {
      const result = await GetLearningMy(token);
      if (result.status === 200) {
        setWorkshops(result.data.data);
        setAllWorkshops(result.data.data);
      }
    }
  }, []);

  useEffect(() => {
    if (!publicWorkShop) {
      getTrips(token)
    }
    if (!publicTrip) {
      getWorkshops(token);
    }
  }, [getTrips, getWorkshops, token])

  const handleChange = (value) => {
    if (value <= 1) {
      setPageMinValue(0);
      setPageMaxValue(9);
    } else {
      setPageMinValue(pageMaxValue);
      setPageMaxValue(value * 9);
    }
  }

  const showSizehandleChange = (value, size) => {
    setPageMinValue(0);
    setPageMaxValue(size);
  }

  function itemRender(current, type, originalElement) {
    if (type === 'prev') {
      return <a>Prev</a>;
    }
    if (type === 'next') {
      return <a>Next</a>;
    }
    return originalElement;
  }

  const getUpcomingTrip = () => {
    let finalTrip = [];
    if (view === "trips" && activeUpcomingTrip === false) {
      setactiveUpcomingTrip(true);
      setactivePastTrip(false);
      allTrip.map((tripData, index) => {
        let tripDetail = tripData._doc ? tripData._doc : tripData;
        if (tripDetail.dateTime.length > 0) {
          if ((tripDetail.dateType === 2) || (new Date(tripDetail.dateTime[0].fromDate) > new Date())) {
            finalTrip.push(tripData);
          }
          if (allTrip.length === index + 1) {
            setUpcomingTrip(finalTrip);
          }
        }
      })
    } else {
      setactiveUpcomingTrip(false);
      setUpcomingTrip(allTrip);
    }
  }

  const getUpcomingWorkshop = () => {
    let finalWorkshop = [];
    if (view === "workshop" && activeUpcomingWorkshop === false) {
      setactiveUpcomingWorkshop(true);
      setactivePastWorkshop(false);
      allWorkshops.map((workshopData, index) => {
        if (workshopData.dateTime.length > 0) {
          if ((new Date(workshopData.dateTime[0].fromDate) > new Date()) || (workshopData.dateType === 2)) {
            finalWorkshop.push(workshopData);
          }
          if (allWorkshops.length === index + 1) {
            setWorkshops(finalWorkshop);
          }
        }
      })
    } else {
      setactiveUpcomingWorkshop(false);
      setWorkshops(allWorkshops);
    }
  }

  const getPastTrip = () => {
    let finalTrip = [];
    if (view === "trips" && activePastTrip === false) {
      setactivePastTrip(true);
      setactiveUpcomingTrip(false);
      allTrip.map((tripData, index) => {
        if (tripData._doc ? tripData._doc.dateTime[0].fromDate.length > 0 : tripData.dateTime.length > 0) {
          if (new Date(tripData._doc ? tripData._doc.dateTime[0].fromDate : tripData.dateTime[0].fromDate) < new Date()) {
            finalTrip.push(tripData);
          }
          if (allTrip.length === index + 1) {
            setUpcomingTrip(finalTrip);
          }
        }
      })
    } else {
      setactivePastTrip(false);
      setUpcomingTrip(allTrip);
    }
  }

  const getPastWorkshop = () => {
    let finalWorkshop = [];
    if (view === "workshop" && activePastWorkshop === false) {
      setactivePastWorkshop(true);
      setactiveUpcomingWorkshop(false);
      allWorkshops.map((workshopData, index) => {
        if (workshopData.dateTime.length > 0) {
          if (new Date(workshopData.dateTime[0].fromDate) < new Date()) {
            finalWorkshop.push(workshopData);
          }
          if (allWorkshops.length === index + 1) {
            setWorkshops(finalWorkshop);
          }
        }
      })
    } else {
      setactivePastWorkshop(false);
      setWorkshops(allWorkshops);
    }
  }

  const aTozSort = (option) => {
    if (view === "trips") {
      if (option == 1) {
        upcomingTrip.sort(function (a, b) {
          if (a._doc.title < b._doc.title) { return -1; }
          if (a._doc.title > b._doc.title) { return 1; }
          return 0;
        })
        setUpcomingTrip([...upcomingTrip]);
      } else {
        upcomingTrip.sort(function (a, b) {
          if (a._doc.title > b._doc.title) { return -1; }
          if (a._doc.title < b._doc.title) { return 1; }
          return 0;
        })
        setUpcomingTrip([...upcomingTrip]);
      }
    } else {
      if (option == 1) {
        workshops.sort(function (a, b) {
          if (a.title < b.title) { return -1; }
          if (a.title > b.title) { return 1; }
          return 0;
        })
        setWorkshops([...workshops]);
      } else {
        workshops.sort(function (a, b) {
          if (a.title > b.title) { return -1; }
          if (a.title < b.title) { return 1; }
          return 0;
        })
        setWorkshops([...workshops]);
      }
    }
  }

  const handleChangeType = (typeVal) => {
    if (typeVal === "1") {
      getUpcomingTrip();
    } else {
      getPastTrip();
    }
  }

  const inActiveTrip = async (id) => {
    const result = await InActiveTrip(token, id);
    if (result) {
      getTrips(token);
    }
  }

  const inActiveWorkshop = async (id) => {
    const result = await InActiveWorkshop(token, id);
    if (result) {
      getWorkshops(token);
    }
  }

  const activeTrip = async (id) => {
    const result = await ActiveTrip(token, id);
    if (result) {
      getTrips(token);
    }
  }

  const activeWorkshop = async (id) => {
    const result = await ActiveWorkshop(token, id);
    if (result) {
      getWorkshops(token);
    }
  }

  const onChange = e => {
    if (e.target.value === "grid") {
      setIsMapView(false)
    } else if (e.target.value === "map") {
      setIsMapView(true)
    }
  };

  const copyTrip = async (d) => {
    let formData = new FormData();
    let Obj = {
      accomodation: d.accomodation,
      accomodationPhotos: d.accomodationPhotos,
      active: d.active,
      activity: JSON.stringify(d.activity),
      attend: d.attend,
      cancellations: d.cancellations,
      country: d.country,
      cover: d.cover,
      dateTime: JSON.stringify([{
        fromDate: d.dateTime[0].fromDate,
        fromTime: d.dateTime[0].fromTime,
        toDate: d.dateTime[0].toDate,
        toTime: d.dateTime[0].toTime,
      }]),
      dateType: d.dateType,
      description: d.description,
      difficulty: d.difficulty,
      duration: d.duration,
      exclusion: d.exclusion,
      expert: d.expert,
      extras: d.extras,
      inclusion: d.inclusion,
      itenary: JSON.stringify(d.itenary),
      language: d.language,
      coordinates: JSON.stringify(d.location.coordinates),
      meetingPoint: d.meetingPoint,
      participants: d.participants,
      price: d.price,
      skill: d.skill,
      suitable: d.suitable,
      title: d.title,
      type: JSON.stringify(d.type),
      whatLearn: d.whatLearn,
    }
    for (const property in Obj) {
      formData.append(property, Obj[property]);
    }
    let result = await CreateTrips(token, formData);
    if (result) {
      getTrips(token);
    }
  }

  if (upcomingTrip) {
    return (
      <Fragment>
        <div className="container-fluid align-center ">
          <div className="filter_sec_bg learning_sec  top_trip">
            <Row gutter={40} className="trip_detail">
              {view === "trips" ?
                <Col xs={24} sm={24} md={16} lg={5} xl={7} className={`first_trip ${isPublicView && "title_set"}`}>
                  <div className="expidition_bg">
                    <h4 className="sub_title">Trips</h4>
                  </div>
                </Col>
                : <Col xs={24} sm={24} md={16} lg={5} xl={5} className="first_trip">
                  <div className="expidition_bg">
                    <h4 className="sub_title">Workshops</h4>
                  </div>
                </Col>
              }
              {view === "trips" ?
                <Col className="trip_button" xs={24} sm={24} md={16} lg={9} xl={7} >
                  <Button type="primary" size="default" shape="round" className={`upcoming_button ${activeUpcomingTrip && "active_upcoming_trip"}`} onClick={getUpcomingTrip}>Upcoming Trips</Button>
                  <Button type="primary" size="default" shape="round" className={`${activePastTrip && "active_past_trip"}`} onClick={getPastTrip}>Past Trips</Button>
                </Col>
                :
                <Col className="trip_button" xs={24} sm={24} md={16} lg={9} xl={8} >
                  <Button type="primary" size="default" shape="round" className={`upcoming_button ${activeUpcomingWorkshop && "active_upcoming_workshop"}`} onClick={() => getUpcomingWorkshop()}>Upcoming Workshops</Button>
                  <Button type="primary" size="default" shape="round" className={`${activePastWorkshop && "active_past_workshop"}`} onClick={() => getPastWorkshop()}>Past Workshops</Button>
                </Col>
              }
              <Col xs={24} sm={24} md={16} lg={4} xl={5} className="trip_short">
                <Select
                  defaultValue="Sort by"
                  onChange={aTozSort}
                  style={{ width: 200 }}
                  className="pr20"
                >
                  <Option value="1">A-Z</Option>
                  <Option value="-1">Z-A</Option>
                </Select>
              </Col>
              <Col xs={24} sm={24} md={16} lg={4} xl={4} className="trip_short_by">
                <Select
                  defaultValue={"1"}
                  onChange={handleChangeType}
                  style={{ width: 200 }}
                  className="pr20"
                >
                  <Option value="1">{`Upcoming ${view === "trips" ? "Trips" : "Workshops"}`}</Option>
                  <Option value="-1">{`Past ${view === "trips" ? "Trips" : "Workshops"}`}</Option>
                </Select>
              </Col>
              {view === "trips" ?
                (isLogin && role === "expert" && isPublicView === false) ?
                  <Col xs={24} sm={24} md={8} lg={6} xl={5} className="filter_tab">
                    <Button className="view-more-trips an-20 mt10 button_set" onClick={() => props.history.push('/create-trips')}>
                      Create Trips
                    </Button>
                  </Col>
                  :
                  <Col xs={24} sm={24} md={8} lg={6} xl={4} className="filter_tab text-right grid_fixed">
                    <Radio.Group defaultValue="grid" buttonStyle="solid" className="grid_set" onChange={onChange}>
                      <Radio.Button value="grid">
                        <img src={Grid} alt="grid" />
                      </Radio.Button>
                      <Radio.Button value="map">
                        <img src={Pin} alt="map" />
                      </Radio.Button>
                    </Radio.Group>
                  </Col>
                :
                (isLogin && role === "expert" && isPublicView === false) ?
                  <Col xs={24} sm={24} md={8} lg={6} xl={6} className="filter_tab">
                    <Button className="view-more-trips an-20 mt10 button_set" onClick={() => props.history.push('/create-learnings')}>
                      Create Workshop
                    </Button>
                  </Col>
                  :
                  <Col xs={24} sm={24} md={8} lg={6} xl={4} className="filter_tab">
                    <Radio.Group defaultValue="grid" buttonStyle="solid" className="grid_set" onChange={onChange}>
                      <Radio.Button value="grid">
                        <img src={Grid} alt="grid" />
                      </Radio.Button>
                      <Radio.Button value="map">
                        <img src={Pin} alt="pin" />
                      </Radio.Button>
                    </Radio.Group>
                  </Col>
              }
            </Row>
            <Row gutter={[40, 16]}>
              <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                <div className="expidition_bg expendition">
                  <Row gutter={[15, 25]}>
                    {loader ? (
                      <div className="text-center py20 loader-absolute-class">
                        <AppLoader />
                      </div>
                    ) :
                      view === "trips" ?
                        upcomingTrip.length === 0 ? (
                          <div className="mb10 an-14 medium-text text-center mt100">
                            <h4>Currently, there are no Trips</h4>
                          </div>
                        ) : (
                            isMapView ?
                              travelMap && travelMap.length > 0 && (
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
                              :
                              <TripsWorkshopCardView
                                upcomingTrip={upcomingTrip}
                                view={view}
                                pageMaxValue={pageMaxValue}
                                pageMinValue={pageMinValue}
                                isLogin={isLogin}
                                inActiveTrip={(d) => inActiveTrip(d)}
                                activeTrip={(d) => activeTrip(d)}
                                isPublicView={isPublicView}
                                travelMap={travelMap}
                                copyTrip={(d) => copyTrip(d)}
                              />
                          )
                        :
                        workshops.length === 0 ? (
                          <div className="mb10 an-14 medium-text text-center mt100">
                            <h4>Currently, there are no Workshops</h4>
                          </div>
                        ) : (
                            isMapView ?
                              travelMap && travelMap.length > 0 && (
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
                              :
                              <TripsWorkshopCardView
                                upcomingTrip={workshops}
                                view={view}
                                pageMaxValue={pageMaxValue}
                                pageMinValue={pageMinValue}
                                isLogin={isLogin}
                                activeWorkshop={(d) => activeWorkshop(d)}
                                inActiveWorkshop={(l) => inActiveWorkshop(l)}
                                isPublicView={isPublicView}
                                travelMap={travelMap}
                              />
                          )
                    }
                  </Row>
                </div>
              </Col>
              <div className="pagination_trip">
                <Pagination
                  showSizeChanger
                  onShowSizeChange={showSizehandleChange}
                  total={view === "trips" ? upcomingTrip.length : workshops.length}
                  defaultPageSize={9}
                  defaultCurrent={1}
                  responsive={true}
                  itemRender={itemRender}
                  onChange={handleChange}
                />
              </div>
            </Row>
          </div>
        </div>
      </Fragment>
    )
  } else {
    return null;
  }
}

export default compose(withRouter)(TripsWorkshopView)
