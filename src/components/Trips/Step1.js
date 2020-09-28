import React, { useState, useEffect, useCallback } from 'react';
import { Form, Upload, Row, Col, Input, Select, Slider, Button, Breadcrumb } from 'antd';
import { useSelector, useDispatch } from 'react-redux';

/**
 * Images Import
 */
import UploadImage from '../../assets/images/cover_upload.png';

/**
 * App Imports
 */
import { Triptype, ActivityList, SuitableFor } from '../../helpers/constants';
import { getBase64, beforeUpload } from '../../helpers/methods';
import { TripsEvents } from '../../redux/trips/events';
import langauges from "../../helpers/langauges";

const { Option } = Select;

const Step1 = React.memo(props => {
  const [imageUrl, setImageUrl] = useState();
  const { getFieldDecorator, setFieldsValue } = props.form;
  let { title, cover, type, activity, price, suitable, difficulty, duration, skill, language, participants } = useSelector(state => state.trips);
  const dispatch = useDispatch();
  const [durationAdd, setDurationAdd] = useState("days")

  const { step1 } = TripsEvents;

  const onAddonChange = (e) => {
    setDurationAdd(e)
  }
  const selectBefore = (
    <Select defaultValue={durationAdd} onChange={onAddonChange}>
      <Option value="days">Days</Option>
      <Option value="night">Hours</Option>
    </Select>
  );

  const setPicture = useCallback(
    (picture) => {
      if (picture !== null && picture !== undefined) {
        if (typeof picture === 'string') {
          setImageUrl(picture)
        } else {
          getBase64(picture.file.originFileObj, imageUrl => {
            setImageUrl(imageUrl);
          });
        }
      }
    }, [])

  useEffect(() => {
    setPicture(cover)

    setFieldsValue({
      title, 
      cover, 
      price, 
      suitable,
      duration,
      difficulty,
      skill,
      language, 
      participants,
      activity: typeof activity === 'string' ? JSON.parse(activity): [],
      type: typeof type === 'string' ? JSON.parse(type): []
    });
  }, [activity, cover, difficulty, duration, price, setFieldsValue, suitable, title, type, skill, language, setPicture, participants]);

  const handleSubmit = (e) => {
    e.preventDefault();
    props.form.validateFields((err, values) => {
      if (!err) {
        dispatch(step1(values));
      }
    });
  }

  const handleChangePicture = info => {
    if (info.file.status === "uploading") {
      return;
    }
    if (info.file.status === "done") {
      getBase64(info.file.originFileObj, imageUrl => {
        setImageUrl(imageUrl);
      });
    }
  };

  return (
    <div className="step-1-expert-form height_sec_enthu learn_sec">
      <Breadcrumb separator=">">
        <Breadcrumb.Item className="an-20 medium-text success--text step-title">
          Create a Trip
          </Breadcrumb.Item>
        <Breadcrumb.Item className="an-16 regular-text pt10">Basic Information</Breadcrumb.Item>
      </Breadcrumb>
      <Form className="ant-advanced-search-form" onSubmit={handleSubmit}>
        <div className="form-profile-container pt20">
          <div>
            <Form.Item label="" className="mb20">
              {getFieldDecorator("cover", { rules: [{ required: true, message: "Please Upload Cover photo!" }] })
                (<Upload
                  name="avatar"
                  listType="picture-card"
                  className="avatar-uploader"
                  showUploadList={false}
                  onChange={handleChangePicture}
                  beforeUpload={beforeUpload}
                  customRequest={({ file, onSuccess }) => setTimeout(() => onSuccess("ok"), 0)}
                >
                  <div className="cover-uploader flex-y center">
                    <img src={imageUrl || UploadImage} alt="cover" style={{ width: imageUrl ? '100%' : '', height: imageUrl ? '100%' : '', objectFit: 'fill' }} />
                    {!imageUrl && (<span className="an-14 regular-text mt20">Upload Cover photo for your trip*</span>)}
                  </div>
                </Upload>
                )}
            </Form.Item>
          </div>
          <div>
            <Row gutter={24}>
              <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                <Form.Item label="Trip Name">
                  {getFieldDecorator("title", { rules: [{ required: true, message: "Please Enter Trip Name" }] })
                    (<Input placeholder="Enter Trip Name" />)}
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={24}>
              <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                <Form.Item label="Activity">
                  {getFieldDecorator("activity", {
                    rules: [
                      { required: true, message: "Please Select Activity" },
                    ],
                  })(
                    <Select
                      mode="multiple"
                      showSearch
                      placeholder="Select Activity"
                    >
                      {ActivityList.map((exp, i) => (
                        <Option key={i} value={exp.name}>
                          {exp.name}
                        </Option>
                      ))}
                    </Select>
                  )}
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={24}>
              <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                <Form.Item label="Base Price">
                  {getFieldDecorator("price", {
                    rules: [{ required: true, message: "Please Enter Price" }],
                  })(
                    <Input
                      addonBefore="USD"
                      type="number"
                      min={1}
                      placeholder="Enter Price"
                    />
                  )}
                </Form.Item>
              </Col>
              <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                <Form.Item label="Duration">
                  {getFieldDecorator("duration", {
                    rules: [
                      { required: true, message: "Please Enter Duration" },
                    ],
                  })(
                    <Input
                      addonBefore={selectBefore}
                      type="number"
                      min={1}
                      placeholder="Enter Duration"
                    />
                  )}
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={24}>
              <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                <Form.Item label="Expedition Type">
                  {
                    getFieldDecorator("type", { rules: [{ required: true, message: "Please Select Expedition Type" }] })
                      (
                        <Select mode="multiple" showSearch placeholder="Select Expedition Type">
                          {Triptype.map((exp, i) => <Option key={i} value={exp.name}>{exp.name}</Option>)}
                        </Select>
                      )
                  }
                </Form.Item>
              </Col>
              <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                <Form.Item label="Suitable for">
                  {
                    getFieldDecorator("suitable", { rules: [{ required: true, message: "Please Select Suitable for" }] })
                      (
                        <Select showSearch placeholder="Select Suitable">
                          {SuitableFor.map((exp, i) => <Option key={i} value={exp.value}>{exp.name}</Option>)}
                        </Select>
                      )
                  }
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={24}>
              <Col xs={24} sm={12} md={12} lg={12} xl={12}>
              <Form.Item label="Max Participants">
                  {getFieldDecorator("participants")(
                    <Input
                      type="number"
                      min={0}
                      placeholder="Enter Max Participants"
                    />
                  )}
                </Form.Item>
              </Col>
              <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                <Form.Item label="Language">
                  {
                    getFieldDecorator("language", { rules: [{ required: true, message: "Please Select Suitable for" }] })
                      (
                        <Select showSearch placeholder="Select Language">
                          {langauges.map((exp, i) => <Option key={i} value={exp.name}>{exp.name}</Option>)}
                        </Select>
                      )
                  }
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={24}>
              <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                <Form.Item label="Difficulty level">
                  {getFieldDecorator('difficulty', { rules: [{ required: true, message: "Please Select Difficulty level" }] })(
                    <Slider marks={{
                      0: 'Light',
                      33: 'Moderate',
                      66: 'Difficult',
                      100: 'Tough',
                    }}
                    />,
                  )}
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={24}>
              <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                <Form.Item label="Skill level">
                  {getFieldDecorator('skill')(
                    <Slider marks={{
                      0: 'Beginner',
                      50: 'Medium',
                      100: 'Advanced',
                    }}
                    />,
                  )}
                </Form.Item>
              </Col>
            </Row>
          </div>
        </div>
        <Form.Item className="mb0 pt25">
          <Button type="primary" htmlType="submit" className="ex__primary_btn">
            Save & Next
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
});

const WrappedCreateStep1 = Form.create({ name: "createTrips" })(Step1);

export default WrappedCreateStep1;
