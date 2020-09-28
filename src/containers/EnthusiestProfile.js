import React, { useState, useCallback, useEffect } from 'react';
import { Row, Col, Tabs, Icon, Upload, message } from "antd";
import { withRouter } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { compose } from "redux";
import moment from 'moment';

// Image Import
import HeaderImg from "../assets/images/upload_image.png";
import Location_Img from "../assets/images/country_ic.png";
import Date_Img from "../assets/images/Group 4262.png";
import ProfileHolder from '../assets/images/placeholder.png'
import AppLoader from '../components/Loader';

import { CaptalizeFirst, getBase64 } from '../helpers/methods';
import {
  uploadCoverPictureEnth, getAllRecentTrips,
  getAllLearnings,
} from '../services/expert';
import { EnthuEvents } from '../redux/enthu/events';
import { ActivityList } from '../helpers/constants';
import EnthuMessages from '../components/Enthusiest/MessagesEnthu';

import WorkShopTab from '../components/Learning/WorkshopTab';
import MyTrips from '../components/Trips/MyTrips';
import AlbumTab from './AlbumTab';

const { TabPane } = Tabs;

const EnthusiestProfile = (props) => {
  const profile = useSelector(state => state.enthu);
  const token = useSelector(state => state.auth.accessToken);

  const [imageUrl, setImageUrl] = useState();
  const [upload, setUpload] = useState(false);
  const [travelMap, setTravelMap] = useState(null);
  const [upcomingTrip, setUpcomingTrip] = useState([]);
  const [upcomingWorkShop, setUpcomingWorkShop] = useState([]);
  const dispatch = useDispatch();

  const { isEditMode, updateCover } = EnthuEvents;

  const getAllTripsHandler = useCallback(async () => {
    try {
      const result = await getAllRecentTrips();
      if (result.status === 200) {
        setUpcomingTrip(result.data.data);
      }
    } catch (err) { }
  }, []);

  const getWorkshops = useCallback(async () => {
    const result = await getAllLearnings();
    if (result.status === 200) {
      setUpcomingWorkShop(result.data.data);
    }
  }, []);

  useEffect(() => {
    dispatch(isEditMode())
    getAllTripsHandler();
    getWorkshops();
  }, [dispatch, isEditMode, getAllTripsHandler,
    getWorkshops,])

  const uploadCover = useCallback(async (data) => {
    try {
      setUpload(true)
      const result = await uploadCoverPictureEnth(token, data);
      if (result.status === 200) {
        setUpload(false)
        setImageUrl(result.data.data);
        dispatch(updateCover(result.data.data))
      }
    } catch (err) {
      setUpload(false)
      message.error(err.response.data.message)
    }
  }, [dispatch, token, updateCover]);

  const handleChangePicture = info => {
    if (info.file.status === "uploading") {
      return;
    }
    if (info.file.status === "done") {
      getBase64(info.file.originFileObj, imageUrl => {
        setImageUrl(imageUrl);
      });
      const formData = new FormData();
      formData.append('cover', info.file.originFileObj);
      uploadCover(formData)
    }
  };

  const onEditClick = () => props.history.push('/update-enthu-profile')

  if (profile.dob) {
    return (
      <div className="header-container">
        <div className="container align-center">
          <div className="page_wrapper">
            <Row>
              <Col span={24} className="header_bg">
                {
                  upload ?
                    (
                      <div style={{ width: "100%", height: "400px" }} className="flex-y">
                        <AppLoader />
                      </div>
                    )
                    : (
                      <img className="mb5" width="100%" src={imageUrl || profile.cover || HeaderImg} alt="Header" />
                    )
                }
                <Upload
                  name="avatar"
                  className="avatar-uploader"
                  onChange={handleChangePicture}
                  showUploadList={false}
                  customRequest={({ file, onSuccess }) => setTimeout(() => onSuccess("ok"), 0)}>
                  <span className="edit_btn medium-text an-14">
                    <Icon className="edit_pancil" type="pencil" /> Edit
                  </span>
                </Upload>
              </Col>
              <Col span={6}>
                <div className="profile_img">
                  <img src={profile.picture || ProfileHolder} alt="Profile" />
                  <span onClick={onEditClick} className="edit_btn medium-text an-14">
                    <Icon className="edit_pancil" type="pencil" />Edit
                  </span>
                </div>
              </Col>
              <Col span={12}>
                <div className="profile_details">
                  <h2 className="medium-text an-26">{CaptalizeFirst(profile.name)}</h2>
                  <h5 className="medium-text an-14">{profile.phone}</h5>
                  <p className="medium-text an-14">
                    <img src={Location_Img} alt="Profile" />
                    <span>{profile.country}</span>
                  </p>
                  <p className="medium-text an-14">
                    <img src={Date_Img} alt="Profile" />
                    <span>{moment(profile.dob).format('LL')}</span>
                  </p>
                </div>
              </Col>
              <Col span={6}>
                <div className="share_btn mt15">
                  <span onClick={onEditClick} className="edit_btn medium-text an-14">
                    <Icon className="edit_pancil" type="pencil" /> Edit
                  </span>
                </div>
              </Col>
            </Row>
            <Row>
              <Col>
                <div>
                  <Tabs defaultActiveKey="1">
                    <TabPane tab="About" key="1">
                      <div className="advanture_sec">
                        <h4>Advanture preferences</h4>
                        <Row gutter={[40, 40]}>
                          {profile.interested.length > 0 && profile.interested.map((e, i) => {
                            const data = ActivityList.filter(a => a.name.toLowerCase() === e)
                            return (
                              <Col key={i} className="gutter-row" span={6}>
                                <img src={data[0]?.url} alt="" />
                                <p className="medium-text an-14">{CaptalizeFirst(e)}</p>
                              </Col>
                            )
                          })
                          }
                        </Row>
                      </div>
                    </TabPane>
                    <TabPane tab="Trips" key="2">
                      <MyTrips isPublicView={true} token={""} publicTrip={upcomingTrip} travelMap={travelMap} />
                    </TabPane>
                    <TabPane tab="Workshops" key="3">
                      <WorkShopTab isPublicView={true} token={""} publicWorkShop={upcomingWorkShop} travelMap={travelMap} />
                    </TabPane>
                    <TabPane tab="Album" key="4">
                      <AlbumTab />
                    </TabPane>
                    <TabPane tab="Following" key="5"></TabPane>
                    <TabPane tab="Messages" key="6">
                      <EnthuMessages />
                    </TabPane>
                  </Tabs>
                </div>
              </Col>
            </Row>
          </div>
        </div>
      </div>
    )
  } else {
    return null;
  }
}

export default compose(withRouter)(EnthusiestProfile);