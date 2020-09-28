import React, { useState, Fragment, useEffect, useCallback } from "react";
import {
  Form, Row, Col, Input, Button, Select, DatePicker,
  Icon, TimePicker, Radio, message, Breadcrumb,
} from "antd";
import { useDispatch, useSelector } from "react-redux";
import PlacesAutocomplete, { getLatLng, geocodeByAddress } from "react-places-autocomplete";
import moment from "moment";

import { quillFormats, quillModules } from "../../helpers/constants";
import countries from "../../helpers/countries";
import { LearningEvents } from "../../redux/learning/events";

import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const { Option } = Select;

const Step2 = (props) => {
  const { getFieldDecorator, getFieldValue, setFieldsValue } = props.form;

  const { step2, changeTab } = LearningEvents;
  const dispatch = useDispatch();

  const [description, setDescription] = useState("");
  const [whatLearn, setWhatWillLearn] = useState("");
  const [attend, setWhoAttend] = useState("");
  const [address, setAddress] = useState("");
  const [latLng, setLatLng] = useState([]);
  const learnings = useSelector(state => state.learning);
  const [typeDate, setTypeDate] = useState(1);
  const {
    description: dec, whatLearn: wl, attend: an,
    country, meetingPoint, dateTime, workshopMedium,
    dateType, coordinates: loc, price,
  } = learnings;

  const setEditors = useCallback((dec, wl, an, loc, dt, type) => {
    setLatLng(loc);
    setWhoAttend(an);
    setDescription(dec);
    setWhatWillLearn(wl);
    setTypeDate(dt);
  }, [])

  useEffect(() => {
    setEditors(dec, wl, an, loc, dateType, workshopMedium)
    setFieldsValue({
      country,
      meetingPoint,
      dateType: dateType,
      dates: dateTime.length !== 0 ? JSON.parse(dateTime) : [{}]
    })
  }, [
    an, country, dateTime, dateType, dec, loc, meetingPoint,
    setEditors, setFieldsValue, wl, workshopMedium,
  ])
  const handleSubmit = (e) => {
    e.preventDefault();
    props.form.validateFields((err, values) => {
      if (!err) {
        if (!description || !whatLearn || !attend || (workshopMedium !== 'online' && latLng.length === 0)) {
          return message.error("Please fill all required fields");
        }
        const dateAndTime = [];
        values.dates.map((val, i) => {
          dateAndTime.push({
            fromDate: values[`from-date-${i}`],
            fromTime: values[`from-time-${i}`],
            toDate: values[`to-date-${i}`],
            toTime: values[`to-date-${i}`],
            price: values[`price-${i}`]
          });
          return null;
        });
        const Obj = {
          country: values.country,
          dateTime: dateAndTime,
          meetingPoint: values.meetingPoint,
          description,
          whatLearn,
          attend,
          dateType: values.dateType,
          location: workshopMedium !== 'online' ? [latLng.lng, latLng.lat] : [10.4515, 51.1657],
        };
        dispatch(step2(Obj));
      }
    });
  };

  const onSelect = (address) => {
    setAddress(address);
    geocodeByAddress(address)
      .then((results) => getLatLng(results[0]))
      .then((ll) => setLatLng(ll))
      .catch((error) => console.error("Error", error));
  };

  const onChange = (address) => setAddress(address);

  const addSlots = () => {
    const keys = getFieldValue("dates");
    const nextKeys = keys.concat(new Date().getTime());
    setFieldsValue({ dates: nextKeys });
  };

  const removeSlots = (k) => {
    const keys = getFieldValue("dates");
    setFieldsValue({ dates: keys.filter((key) => key !== k) });
  };

  const handleChageDescription = (textQuillBubble) => {
    setDescription(textQuillBubble)
  }

  const handleWhatLearnChange = (textQuillBubble) => {
    setWhatWillLearn(textQuillBubble)
  }

  const handleWhatAttend = (textQuillBubble) => {
    setWhoAttend(textQuillBubble)
  }

  const onDateTypeChanged = (e) => {
    setTypeDate(e.target.value)
    if (e.target.value === 1) {
      setFieldsValue({ dates: [{}] })
    } else {
      setFieldsValue({ dates: [] })
    }
  }

  getFieldDecorator("dates", { initialValue: [] });
  const kdates = getFieldValue("dates");
  const datesItems = kdates.map((key, i) => (
    <Fragment key={i}>
      <div className="border_sec">
        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
          <h4 className="an-14 medium-text">Slot{i + 1}</h4>
        </Col>
        <Row gutter={4}>
          <Col xs={12} sm={12} md={12} lg={12} xl={12}>
            <Form.Item label="Start date and time">
              <Fragment>
                <Row gutter={4}>
                  <Col xs={12} sm={12} md={12} lg={12} xl={12}>
                    <Form.Item>
                      {getFieldDecorator(`from-date-${i}`, {
                        initialValue: key.fromDate ? moment(key.fromDate) : null,
                        rules: [
                          { required: true, message: "Please Enter Start Date" },
                        ],
                      })(
                        <DatePicker
                          format="YYYY-MM-DD"
                          className="fill-width"
                          placeholder="DD/MM/YY"
                        />
                      )}
                    </Form.Item>
                  </Col>
                  <Col xs={12} sm={12} md={12} lg={12} xl={12}>
                    <Form.Item>
                      {getFieldDecorator(`from-time-${i}`, {
                        initialValue: key.fromTime ? moment(key.fromTime) : null,
                        rules: [
                          { required: true, message: "Please Enter Start Time" },
                        ],
                      })(
                        <TimePicker
                          className="fill-width"
                          placeholder="HH:MM"
                          format="HH:mm"
                          defaultOpenValue={moment("00:00", "HH:mm")}
                        />
                      )}
                    </Form.Item>
                  </Col>
                </Row>
              </Fragment>
            </Form.Item>
          </Col>
          <Col xs={12} sm={12} md={12} lg={12} xl={12}>
            <Form.Item label="End date and time">
              <Fragment>
                <Row gutter={4}>
                  <Col xs={12} sm={12} md={12} lg={12} xl={12}>
                    <Form.Item>
                      {getFieldDecorator(`to-date-${i}`, {
                        initialValue: key.toDate ? moment(key.toDate) : null,
                        rules: [
                          { required: true, message: "Please Enter End Date" },
                        ],
                      })(
                        <DatePicker
                          format="YYYY-MM-DD"
                          className="fill-width"
                          placeholder="DD/MM/YY"
                        />
                      )}
                    </Form.Item>
                  </Col>
                  <Col xs={12} sm={12} md={12} lg={12} xl={12}>
                    <Form.Item>
                      {getFieldDecorator(`to-time-${i}`, {
                        initialValue: key.toTime ? moment(key.toTime) : null,
                        rules: [
                          { required: true, message: "Please Enter End Time" },
                        ],
                      })(
                        <TimePicker
                          className="fill-width"
                          placeholder="HH:MM"
                          format="HH:mm"
                          defaultOpenValue={moment("00:00", "HH:mm")}
                        />
                      )}
                    </Form.Item>
                  </Col>
                </Row>
              </Fragment>
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col xs={12} sm={12} md={12} lg={12} xl={12}>
            <Form.Item label="Price">
              {getFieldDecorator(`price-${i}`, {
                initialValue: key.price ? key.price : price,
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
        </Row>
        {i !== 0 && (
          <Icon
            className="delete-icon date_icn"
            type="close"
            onClick={() => removeSlots(key)}
          />
        )}
      </div>
    </Fragment>
  ));

  return (
    <div className="step-1-expert-form step-2 learn_sec">
      <div className="an-20 medium-text success--text step-title">
        <Breadcrumb separator=">" style={{ marginLeft: -10 }}>
          <Breadcrumb.Item className="an-18 medium-text clr_green">
            Create Trip
          </Breadcrumb.Item>
          <Breadcrumb.Item className="an-16 regular-text pt10">Workshop Details</Breadcrumb.Item>
        </Breadcrumb>
      </div>
      <Form className="ant-advanced-search-form" onSubmit={handleSubmit}>
        <div className="form-profile-container pt20">
          <Row gutter={24}>
            <Form.Item label="Description" className="ant-form-item-required">
              <ReactQuill
                theme="snow"
                value={description}
                modules={quillModules}
                formats={quillFormats}
                onChange={handleChageDescription}
              />
            </Form.Item>
          </Row>
          <Row gutter={24}>
            <Form.Item label="What will you learn?" className="ant-form-item-required">
              <ReactQuill
                theme="snow"
                value={whatLearn}
                modules={quillModules}
                formats={quillFormats}
                onChange={handleWhatLearnChange}
              />
            </Form.Item>
          </Row>
          <Row gutter={24}>
            <Form.Item label="Who should attend?" className="ant-form-item-required">
              <ReactQuill
                theme="snow"
                value={attend}
                modules={quillModules}
                formats={quillFormats}
                onChange={handleWhatAttend}
              />
            </Form.Item>
          </Row>
          <Row gutter={24}>
            <div className="py15 an-14 medium-text flex-x space-between">
              <div className="an-20 medium-text step-title">
                Add Date and Time Slots
              </div>
              <div>
                {typeDate === 1 && (
                  <Button
                    shape="round"
                    icon="plus"
                    className="award-add-btn mb-24"
                    onClick={addSlots}
                  >
                    Add
                  </Button>
                )}
              </div>
            </div>
            <Col
              xs={24}
              sm={24}
              md={24}
              lg={24}
              xl={24}
              style={{ padding: "0" }}
            >
              <Form.Item>
                {getFieldDecorator("dateType", {
                  rules: [
                    { required: true, message: "Please select Date Type!" },
                  ],
                })(
                  <Radio.Group className="ml10" onChange={onDateTypeChanged}>
                    <Radio value={1}>Fixed Date</Radio>
                    <Radio value={2}>Flexible Date</Radio>
                  </Radio.Group>
                )}
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={24} lg={24} xl={24} style={{ padding: "0" }}>
              {datesItems}
            </Col>
          </Row>
          {workshopMedium !== 'online' && (
            <Row gutter={24} >
              <Col xs={24} sm={12} md={12} lg={12} xl={12} style={{ padding: 0 }}>
                <Form.Item label="Country">
                  {getFieldDecorator("country", {
                    rules: [
                      { required: true, message: "Please select Country!" },
                    ],
                  })(
                    <Select placeholder="Select Country">
                      {countries.map((con, i) => (
                        <Option key={i} value={con.name}>
                          {con.name}
                        </Option>
                      ))}
                    </Select>
                  )}
                </Form.Item>
              </Col>
              <Col xs={24} sm={12} md={12} lg={12} xl={12} style={{ padding: '0px 0px 0px 12px' }}>
                <Form.Item label="Location" className="ant-form-item-required">
                  <PlacesAutocomplete
                    value={address}
                    onChange={onChange}
                    onSelect={onSelect}
                  >
                    {({
                      getInputProps,
                      suggestions,
                      getSuggestionItemProps,
                      loading,
                    }) => (
                        <div>
                          <Input
                            {...getInputProps({
                              placeholder: "Search Places ...",
                              className: "location-search-input",
                            })}
                          />
                          <div className="autocomplete-dropdown-container">
                            {loading && (
                              <div style={{ marginTop: 20 }}>Loading...</div>
                            )}
                            {suggestions.map((suggestion) => {
                              const className = suggestion.active
                                ? "suggestion-item--active"
                                : "suggestion-item";
                              return (
                                <div
                                  {...getSuggestionItemProps(suggestion, {
                                    className,
                                  })}
                                >
                                  <span>{suggestion.description}</span>
                                  <br />
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      )}
                  </PlacesAutocomplete>
                </Form.Item>
              </Col>
            </Row>
          )}
          {workshopMedium !== 'online' && (
            <Row gutter={24}>
              <Col xs={24} sm={24} md={24} lg={24} xl={24} style={{ padding: 0 }}>
                <Form.Item label="Meeting Point">
                  {getFieldDecorator("meetingPoint")(
                    <Input placeholder="Meeting Point" />
                  )}
                </Form.Item>
              </Col>
            </Row>
          )}
        </div>
        <Form.Item className="mb0 pt40">
          <Button
            loading={false}
            type="primary"
            htmlType="submit"
            className="ex__primary_btn"
          >
            Next
          </Button>
          <Button
            type="primary"
            className="ex_grey_btn ml40"
            onClick={() => dispatch(changeTab(1))}
          > Back
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

const WrappedCreateStep3 = Form.create({ name: "createTrips" })(Step2);

export default WrappedCreateStep3;
