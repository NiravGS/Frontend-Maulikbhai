import React, { useState, Fragment } from "react";
import {
  Form,
  Row,
  Col,
  Input,
  Button,
  Select,
  DatePicker,
  Icon,
  TimePicker,
  Radio,
  message,
  Breadcrumb,
} from "antd";
import PlacesAutocomplete, {
  getLatLng,
  geocodeByAddress,
} from "react-places-autocomplete";
import { useDispatch } from "react-redux";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { ToolBarOptions } from "../../helpers/constants";
import countries from "../../helpers/countries";
import moment from "moment";
import { LearningEvents } from "../../redux/learning/events";
const { Option } = Select;

const Step2 = (props) => {
  const { getFieldDecorator, getFieldValue, setFieldsValue } = props.form;

  const { step2 } = LearningEvents;
  const dispatch = useDispatch();

  const [description, setDescription] = useState("");
  const [whatLearn, setWhatWillLearn] = useState("");
  const [attend, setWhoAttend] = useState("");
  const [address, setAddress] = useState("");
  const [latLng, setLatLng] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    props.form.validateFields((err, values) => {
      if (!err) {
        if (!description) {
          return message.error("Please enter description");
        }
        if (!whatLearn) {
          return message.error("Please fill up what to learn");
        }
        if (!attend) {
          return message.error("Please fill up who should attend");
        }
        const dateAndTime = [];
        values.dates.map((val, i) => {
          dateAndTime.push({
            fromDate: values[`from-date-${i}`],
            fromTime: values[`from-time-${i}`],
            toDate: values[`to-date-${i}`],
            toTime: values[`to-date-${i}`],
          });
          return null;
        });
        const Obj = {
          country: values.country,
          dates: dateAndTime,
          meetingPoint: values.meetingPoint,
          location: [latLng.lng, latLng.lat],
          description: description.getCurrentContent().getPlainText(),
          whatLearn: whatLearn.getCurrentContent().getPlainText(),
          attend: attend.getCurrentContent().getPlainText(),
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

  getFieldDecorator("dates", { initialValue: [{}] });
  const kdates = getFieldValue("dates");
  const datesItems = kdates.map((key, i) => (
    <Fragment key={i}>
      <div className="border_sec">
        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
          <h4 className="an-14 medium-text">Slot{i + 1}</h4>
        </Col>
        <Col xs={12} sm={12} md={12} lg={12} xl={12}>
          <Form.Item label="Start date and time">
            <Fragment>
              <Row gutter={4}>
                <Col xs={12} sm={12} md={12} lg={12} xl={12}>
                  {getFieldDecorator(`from-date-${i}`, {
                    initialValue: key.from ? moment(key.form) : null,
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
                </Col>
                <Col xs={12} sm={12} md={12} lg={12} xl={12}>
                  {getFieldDecorator(`from-time-${i}`, {
                    initialValue: key.from ? moment(key.form) : null,
                    rules: [
                      { required: true, message: "Please Enter Start Time" },
                    ],
                  })(
                    <TimePicker
                      className="fill-width"
                      placeholder="HH:MM AM"
                      defaultOpenValue={moment("00:00:00", "HH:mm:ss")}
                    />
                  )}
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
                  {getFieldDecorator(`to-date-${i}`, {
                    initialValue: key.from ? moment(key.form) : null,
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
                </Col>
                <Col xs={12} sm={12} md={12} lg={12} xl={12}>
                  {getFieldDecorator(`to-time-${i}`, {
                    initialValue: key.from ? moment(key.form) : null,
                    rules: [
                      { required: true, message: "Please Enter End Time" },
                    ],
                  })(
                    <TimePicker
                      className="fill-width"
                      placeholder="HH:MM AM"
                      defaultOpenValue={moment("00:00:00", "HH:mm:ss")}
                    />
                  )}
                </Col>
              </Row>
            </Fragment>
          </Form.Item>
        </Col>
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
        <Breadcrumb separator=">">
          <Breadcrumb.Item className="an-18 medium-text clr_green">
            Create Trip
          </Breadcrumb.Item>
          <Breadcrumb.Item>Workshop Details</Breadcrumb.Item>
        </Breadcrumb>
      </div>
      <Form className="ant-advanced-search-form" onSubmit={handleSubmit}>
        <div className="form-profile-container pt20">
          <Row gutter={24}>
            <Col xs={24} sm={24} md={24} lg={24} xl={24}>
              <Form.Item label="Description">
                <Editor
                  toolbarHidden={false}
                  editorState={description}
                  toolbarClassName="toolbarClassName"
                  wrapperClassName="wrapperClassName"
                  editorClassName="editorClassName"
                  toolbar={ToolBarOptions}
                  onEditorStateChange={(e) => setDescription(e)}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={24}>
            <Col xs={24} sm={24} md={24} lg={24} xl={24}>
              <Form.Item label="What will you learn?*">
                <Editor
                  toolbarHidden={false}
                  editorState={whatLearn}
                  toolbarClassName="toolbarClassName"
                  wrapperClassName="wrapperClassName"
                  editorClassName="editorClassName"
                  toolbar={ToolBarOptions}
                  onEditorStateChange={(e) => setWhatWillLearn(e)}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={24}>
            <Col xs={24} sm={24} md={24} lg={24} xl={24}>
              <Form.Item label="Who should attend?*">
                <Editor
                  toolbarHidden={false}
                  editorState={attend}
                  toolbarClassName="toolbarClassName"
                  wrapperClassName="wrapperClassName"
                  editorClassName="editorClassName"
                  toolbar={ToolBarOptions}
                  onEditorStateChange={(e) => setWhoAttend(e)}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={24}>
            <div className="py15 an-14 medium-text flex-x space-between">
              <div className="an-20 medium-text step-title">
                Add Date and Time Slots
              </div>
              <div>
                <Button
                  shape="round"
                  icon="plus"
                  className="award-add-btn mb-24"
                  onClick={addSlots}
                >
                  Add
                </Button>
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
                {getFieldDecorator("date-type", {
                  rules: [
                    { required: true, message: "Please select Date Type!" },
                  ],
                })(
                  <Radio.Group className="ml10" initialValue={1}>
                    <Radio value={1}>Fixed Date</Radio>
                    <Radio value={2}>Flexible Date</Radio>
                  </Radio.Group>
                )}
              </Form.Item>
            </Col>
            <Col
              xs={24}
              sm={24}
              md={24}
              lg={24}
              xl={24}
              style={{ padding: "0" }}
            >
              {datesItems}
            </Col>
          </Row>
          <Row gutter={24}>
            <Col xs={24} sm={12} md={12} lg={12} xl={12}>
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
            <Col xs={24} sm={12} md={12} lg={12} xl={12}>
              <Form.Item label="City,Location">
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
          <Row gutter={24}>
            <Col xs={24} sm={24} md={24} lg={24} xl={24}>
              <Form.Item label="Meeting Point">
                {getFieldDecorator("meetingPoint")(
                  <Input placeholder="Meeting Point" />
                )}
              </Form.Item>
            </Col>
          </Row>
        </div>
        <Form.Item className="mb0 pt40">
          <Button
            loading={false}
            type="primary"
            htmlType="submit"
            className="ex__primary_btn"
          >
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

const WrappedCreateStep3 = Form.create({ name: "createTrips" })(Step2);

export default WrappedCreateStep3;
