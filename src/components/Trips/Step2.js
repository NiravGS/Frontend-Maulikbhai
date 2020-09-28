import React, { Fragment, useState, useEffect, useCallback } from 'react';
import { Form, Row, Col, Input, Button, DatePicker, TimePicker, Icon, message, Select, Breadcrumb, Radio } from 'antd';
import PlacesAutocomplete, { getLatLng, geocodeByAddress } from 'react-places-autocomplete';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';


/**
 * App Imports
 */
import { TripsEvents } from '../../redux/trips/events';
import countries from '../../helpers/countries';
import ReactQuill from "react-quill";
import { quillFormats, quillModules } from "../../helpers/constants";
import "react-quill/dist/quill.snow.css";

const { Option } = Select;

const Step2 = React.memo((props) => {
  const [description, setDescription] = useState("");
  const [whatLearn, setWhatWillLearn] = useState("");
  const [attend, setWhoAttend] = useState("");
  const [address, setAddress] = useState('');
  const [latLng, setLatLng] = useState([]);
  const [showDate, setShowDate] = useState(true);
  const { getFieldDecorator, getFieldValue, setFieldsValue } = props.form;
  const { step2, changeTab } = TripsEvents;

  const dispatch = useDispatch();
  const { dateTime, accommodation, meetingPoint, description: dec, 
    whatLearn: wl, attend: an, dateType, country, coordinates, price } = useSelector(state => state.trips)

  const setEditors = useCallback((dec, wl, an) => {
    setWhoAttend(an);
    setDescription(dec);
    setWhatWillLearn(wl);
  }, [])

  useEffect(() => {
    setEditors(dec, wl, an)
    if (dateType === 2) {
      setShowDate(false);
      setFieldsValue({ dates: [] })
    }
    setFieldsValue({
      accommodation,
      meetingPoint,
      dates: dateTime.length !== 0 ? JSON.parse(dateTime) : dateType === 1 ? [{}] : [],
      dateType: dateType,
      country
    })
  }, [dec, wl, an, accommodation, dateTime, meetingPoint, setFieldsValue, setEditors, dateType, country, coordinates])

  const handleSubmit = (e) => {
    e.preventDefault();
    props.form.validateFields((err, values) => {
      if (!err) {
        if (!description || latLng.length === 0) {
          return message.error("Please fill all required fields");
        }
        const dateAndTime = [];
          values.dates.map((val, i) => {
            dateAndTime.push({
              fromDate: values[`from-date-${i}`],
              fromTime: values[`from-time-${i}`],
              toDate: values[`to-date-${i}`],
              toTime: values[`to-time-${i}`],
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
          coordinates: [latLng.lng, latLng.lat],
        };
        dispatch(step2(Obj))
      }
    });
  }

  const onSelect = address => {
    setAddress(address);
    geocodeByAddress(address)
      .then(results => getLatLng(results[0]))
      .then(ll => setLatLng(ll))
      .catch(error => console.error('Error', error));
  }

  const onChange = (address) => setAddress(address);

  const addSlots = () => {
    const keys = getFieldValue('dates');
    const nextKeys = keys.concat(new Date().getTime());
    setFieldsValue({ dates: nextKeys });
  }

  const removeSlots = (k) => {
    const keys = getFieldValue('dates');
    setFieldsValue({ dates: keys.filter(key => key !== k) });
  }

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
    if (e.target.value === 1) {
      setShowDate(true)
      setFieldsValue({ dates: [{}] })
    } else {
      setShowDate(false);
      setFieldsValue({ dates: [] })
    }
  }

  getFieldDecorator("dates", { initialValue: [] });
  const kdates = getFieldValue("dates");
  const datesItems = kdates.map((key, i) => (
    <Fragment key={i}>
      <div className="border_sec" style={{ height: '255px' }}>
        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
          <h4 className="an-14 medium-text">Slot {i + 1}</h4>
        </Col>
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
                      <DatePicker format="YYYY-MM-DD" className="fill-width" placeholder="DD/MM/YY" name={`from-date-${i}`} />
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
                        defaultOpenValue={moment("00:00", "HH:mm")} />
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
                      <DatePicker format="YYYY-MM-DD" className="fill-width" placeholder="DD/MM/YY" />
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
                      defaultOpenValue={moment("00:00", "HH:mm")} />
                    )}
                  </Form.Item>
                </Col>
              </Row>
            </Fragment>
          </Form.Item>
        </Col>
        <Row className="pl10">
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
    <div className="step-1-expert-form step-2 ln_sec learn_sec">
      <Breadcrumb separator=">" style={{ marginLeft: "-10px" }}>
        <Breadcrumb.Item className="an-20 medium-text success--text step-title">
          Create Trip
          </Breadcrumb.Item>
        <Breadcrumb.Item className="an-16 regular-text pt10">Trip Details</Breadcrumb.Item>
      </Breadcrumb>
      <Form className="ant-advanced-search-form" onSubmit={handleSubmit}>
        <div className="form-profile-container pt20">
          <Row gutter={24}>
            <Col xs={24} sm={24} md={24} lg={24} xl={24} style={{ padding: 0 }}>
              <Form.Item label="Description" className="ant-form-item-required">
                <ReactQuill
                  theme="snow"
                  value={description || ''}
                  modules={quillModules}
                  formats={quillFormats}
                  onChange={handleChageDescription}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={24}>
            <Col xs={24} sm={24} md={24} lg={24} xl={24} style={{ padding: 0 }}>
              <Form.Item label="What will you learn?" className="ant-form-item-required">
                <ReactQuill
                  theme="snow"
                  value={whatLearn || ''}
                  modules={quillModules}
                  formats={quillFormats}
                  onChange={handleWhatLearnChange}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={24}>
            <Col xs={24} sm={24} md={24} lg={24} xl={24} style={{ padding: 0 }}>
              <Form.Item label="Who should attend?" className="ant-form-item-required">
                <ReactQuill
                  theme="snow"
                  value={attend || ''}
                  modules={quillModules}
                  formats={quillFormats}
                  onChange={handleWhatAttend}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={24}>
            <div className="py15 an-14 medium-text flex-x space-between">
              <div className="an-20 medium-text">
                Add Date and Time Slots
              </div>
              {showDate && (
                <div>
                  <Button shape="round" icon="plus" className="award-add-btn mb-24" onClick={addSlots}>
                    Add
                    </Button>
                </div>)}
            </div>
            <Col xs={24} sm={24} md={24} lg={24} xl={24} style={{ padding: "0" }}>
              <Form.Item>
                {getFieldDecorator("dateType")
                  (
                    <Radio.Group className="ml10" onChange={onDateTypeChanged}>
                      <Radio value={1}>Fixed Date</Radio>
                      <Radio value={2}>Flexible Date</Radio>
                    </Radio.Group>
                  )}
              </Form.Item>
            </Col>
            {showDate && (
              <Col xs={24} sm={24} md={24} lg={24} xl={24} style={{ padding: "0" }}>
                {datesItems}
              </Col>
            )}
          </Row>
          <Row gutter={24}>
            <Col xs={12} sm={12} md={12} lg={12} xl={12} style={{ paddingLeft: 0 }}>
              <Form.Item label="Country">
                {
                  getFieldDecorator("country", {
                    rules: [{ required: true, message: 'Please Select country' }]
                  })
                    (
                      <Select showSearch placeholder="Select trip Country">
                        {countries.map((con, i) => <Option key={i} value={con.name}>{con.name}</Option>)}
                      </Select>
                    )
                }
              </Form.Item>
            </Col>
            <Col xs={12} sm={12} md={12} lg={12} xl={12} style={{ paddingRight: 0 }}>
              <Form.Item label="City, Location" className="ant-form-item-required">
                <PlacesAutocomplete value={address} onChange={onChange} onSelect={onSelect} >
                  {
                    ({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                      <div>
                        <Input
                          {...getInputProps({
                            placeholder: 'Search Places ...',
                            className: 'location-search-input',
                          })}
                        />
                        <div className="autocomplete-dropdown-container">
                          {loading && <div style={{ marginTop: 20 }}>Loading...</div>}
                          {suggestions.map(suggestion => {
                            const className = suggestion.active ? 'suggestion-item--active' : 'suggestion-item';
                            return (
                              <div {...getSuggestionItemProps(suggestion, { className })}>
                                <span>{suggestion.description}</span><br />
                              </div>
                            )
                          })}
                        </div>
                      </div>
                    )
                  }
                </PlacesAutocomplete>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={24}>
            <Col xs={24} sm={24} md={24} lg={24} xl={24} style={{ padding: 0 }}>
              <Form.Item label="Meeting Point">
                {getFieldDecorator("meetingPoint")
                  (<Input placeholder="Enter Meeting Point" />)}
              </Form.Item>
            </Col>
          </Row>
        </div>
        <Form.Item className="mb0 pt40">
          <Button type="primary" htmlType="submit" className="ex__primary_btn">
            Save & Next
          </Button>
          <Button type="primary" className="ex_grey_btn ml40" onClick={() => dispatch(changeTab(1))}> Back
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
});

const WrappedCreateStep2 = Form.create({ name: "createTrips" })(Step2);

export default WrappedCreateStep2;
