import React, { useEffect, useState, useCallback } from 'react';
import { useSelector } from "react-redux";
import { Row, Col, Card, Button, Popover, Dropdown } from 'antd';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';

/**
 * App Imports
 */
import Share from "../assets/images/share_ic.png";
import shareOption from './commonContainer/shareOption';
import AppLoader from '../components/Loader';
import { CaptalizeFirst } from '../helpers/methods';
import MoreTripOption from '../assets/images/more_vert-24px.svg';
import Popup from "./Album/Popup";

import { getMyAlbums, deleteAlbums } from "../services/expert";

const AlbumTab = () => {
  const token = useSelector((state) => state.auth.accessToken);
  const { role } = useSelector((state) => state.auth);
  const [loader, setLoader] = useState(false);
  const [visible, setVisible] = useState(false);
  const [albums, setAlbums] = useState([]);

  const getData = useCallback(async (token) => {
    const result = await getMyAlbums(token);
    if (result.status === 200) {
      setAlbums(result.data.data);
      setLoader(false);
    }
  }, []);

  useEffect(() => {
    getData(token);
  }, [getData, token]);

  const onCreateAlbum = () => {
    setVisible(false);
    getData(token);
  }

  const deletePhoto = async (id) => {
    const result = await deleteAlbums(token, id);
    if (result) {
      getData(token);
    }
  }

  const albumOption = (t) => {
    return (
      <div className='profile_bg trip_poppop'>
        <div className='primary--text py5 cursor-pointer'>Edit Photo</div>
        <div className='primary--text py5 cursor-pointer'>Add/Edit Location</div>
        <div className='primary--text py5 cursor-pointer'>Add/Edit Date</div>
        <div className='primary--text py5 cursor-pointer' onClick={() => deletePhoto(t)}>Hide Photo</div>
        <div className='border_bottom'></div>
        <div className='primary--text py5 cursor-pointer' onClick={() => deletePhoto(t)}>Delete Photo</div>
      </div>
    )
  };

  return (
    <div className='header-container headre_text'>
      <div className='container-fluid align-center'>
        <div className='filter_sec_bg learning_sec album_header'>
          <Popup title="Add Album" visible={visible} handleOk={onCreateAlbum} handleCancel={() => setVisible(false)} />
          {role === "expert" &&
            <Row gutter={40} className='new_row'>
              <Col span={10}>
                <div className='expidition_bg'>
                  <h4 className='sub_title'>Trips & Workshop Albums</h4>
                </div>
              </Col>
              <Col span={14} className='album_right_detail text-right'>
                <Button className='view-more-trips an-20 mt10 album_button' onClick={() => setVisible(true)}>
                  Create Album
              </Button>
                <Button className='view-more-trips an-20 mt10 album_button_set' onClick={() => setVisible(true)}>
                  Add Photos /Video
              </Button>
              </Col>
            </Row>
          }
          <Row gutter={[40, 40]} className='mt20'>
            <Col span={8} xs={24} sm={24} md={24} lg={24} xl={24}>
              <div className='expidition_bg Album_blog'>
                <Row gutter={[15, 25]}>
                  {loader ? (
                    <div className='text-center py20 loader-absolute-class'>
                      <AppLoader />
                    </div>
                  ) : albums.length === 0 ? (
                    <div className='mb10 an-14 medium-text text-center mt100'>
                      <h4>Currently, there is no album found</h4>
                    </div>
                  ) : (
                        albums.map((album, index) => (
                          <Col
                            span={8}
                            xs={24}
                            sm={24}
                            md={12}
                            lg={8}
                            xl={8}
                            key={index}
                            className='gutter-row trips_blog'
                          >
                            <Card
                              hoverable
                              cover={<img alt='example' src={album.images[0]} />}
                              extra={
                                <Popover
                                  placement='bottom'
                                  content={albumOption(album.id)}
                                  trigger='hover'
                                >
                                  <div className='more_icon_upcoming_tips'>
                                    <img
                                      src={MoreTripOption}
                                      alt='MoreTrip_Option'
                                    />
                                  </div>
                                </Popover>
                              }
                            >
                              <div className='price_sec'>
                                <h5 className='mb10 an-14 medium-text'>
                                  {CaptalizeFirst(album.caption)}
                                </h5>
                                <p className='mb10 an-14 Album_sub_title'>
                                  <b>Germany</b>
                                </p>
                              </div>
                              <div className='heart_fill album-share'>
                                <input type='checkbox' id='like1' />
                                <div className='text-right'>
                                  <Dropdown
                                    overlay={shareOption}
                                    placement='bottomCenter'
                                  >
                                    <img
                                      src={Share}
                                      alt='Social Share'
                                      className='share_icn'
                                    />
                                  </Dropdown>
                                  <label htmlFor='like1'>
                                    <svg viewBox='0 0 24 24'>
                                      <path d='M12 21.35l-1.45-1.32c-5.15-4.67-8.55-7.75-8.55-11.53 0-3.08 2.42-5.5 5.5-5.5 1.74 0 3.41.81 4.5 2.09 1.09-1.28 2.76-2.09 4.5-2.09 3.08 0 5.5 2.42 5.5 5.5 0 3.78-3.4 6.86-8.55 11.54l-1.45 1.31z' />
                                    </svg>
                                  </label>
                                </div>
                              </div>
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

export default compose(withRouter)(AlbumTab);
