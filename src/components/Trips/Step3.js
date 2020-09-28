import React, { useState, Fragment, useCallback, useEffect } from 'react';
import { Form, Row, Col, Button, Breadcrumb, Input, Icon, message } from 'antd';
import { useDispatch, useSelector } from 'react-redux';

/**
 * App Imports
 */
import { TripsEvents } from '../../redux/trips/events';
import ReactQuill from "react-quill";
import { quillFormats, quillModules } from "../../helpers/constants";
import "react-quill/dist/quill.snow.css";

const { TextArea } = Input;

const Step3 = (props) => {
  const { step3, changeTab, update } = TripsEvents;

  const { getFieldDecorator, getFieldValue, setFieldsValue } = props.form;

  const [accommodation, setAccommodation] = useState("");
  const [inclusion, setInclusion] = useState("");
  const [exclusion, setExclusion] = useState("");
  const [cancellations, setCancellations] = useState("");
  const [extras, setExtras] = useState("");

  const dispatch = useDispatch();
  const trips = useSelector(state => state.trips);
  const loader = useSelector(state => state.trips.loader);

  const { editMode } = trips;

  const addItinerary = () => {
    const keys = getFieldValue('itinerary');
    const nextKeys = keys.concat(new Date().getTime());
    setFieldsValue({ itinerary: nextKeys });
  }

  const removeItinerary = (k) => {
    const keys = getFieldValue('itinerary');
    setFieldsValue({ itinerary: keys.filter(key => key !== k) });
  }

  const setEditors = useCallback((data) => {
    setAccommodation(data.accommodation || "");
    setInclusion(data.inclusion || "");
    setExtras(data.extras || "");
    setExclusion(data.exclusion || "")
    setCancellations(data.cancellations || "")
  }, [])

  useEffect(() => {
    setEditors(trips);
    setFieldsValue({ itinerary: (trips.itinerary && trips.itinerary.length !== 0) ? JSON.parse(trips.itinerary) : [{}] })
  }, [trips, setEditors, setFieldsValue])

  getFieldDecorator('itinerary', { initialValue: [{}] });
  const itineraryFields = getFieldValue('itinerary');
  const itenaryItems = itineraryFields.map((key, i) => (
    <Fragment key={i}>
      <div className="flex-x align-end">
        <Form.Item className="mb0 flex-1">
          {getFieldDecorator(`itinerary-${i}`, {
            initialValue: key.value, rules: [
            { required: true, message: 'Please enter itinerary'  }
          ]})
            (<TextArea placeholder={`Day ${i + 1}`} />)}
        </Form.Item>
        <Icon className="delete-icon work_delete" type="close" onClick={() => removeItinerary(key)}/>
      </div>
    </Fragment>
  ));

  const handleSubmit = (e) => {
    e.preventDefault();
    props.form.validateFields((err, values) => {
      if (!err) {
        if (!cancellations) {
          return message.error("Please fill all required fields");
        }
        const itinerary = []
        values.itinerary.map((key, i) => {
          itinerary.push({ day: i, value: values[`itinerary-${i}`] });
          return null;
        });
        const Obj = {
          ...trips,
          inclusion: inclusion,
          exclusion: exclusion,
          cancellations: cancellations,
          extras: extras,
          accomodation: accommodation,
          itenary: JSON.stringify(itinerary),
        }
        let formData = new FormData();
        for (const property in Obj) {
          if (property === 'cover') {
            if (typeof Obj[property] !== 'string') {
              formData.append(property, Obj[property].fileList[0].originFileObj);
            }
          } else {
            formData.append(property, Obj[property]);
          }
        }
        if (editMode) {
          dispatch(update(formData))
        } else {
          dispatch(step3(formData));
        }
      }
    });
  }

  return (
    <div className="step-1-expert-form step-2">
      <Breadcrumb separator=">">
        <Breadcrumb.Item className="an-20 medium-text success--text step-title">
          Create Trip
          </Breadcrumb.Item>
        <Breadcrumb.Item className="an-16 regular-text pt10">Additional Details</Breadcrumb.Item>
      </Breadcrumb>
      <Form className="ant-advanced-search-form" onSubmit={handleSubmit}>
        <div className="form-profile-container pt20">
          <Row gutter={24}>
            <Col xs={24} sm={24} md={24} lg={24} xl={24}>
              <Form.Item label="Accommodation">
                <ReactQuill
                  theme="snow"
                  value={accommodation || ''}
                  modules={quillModules}
                  formats={quillFormats}
                  onChange={(data) => setAccommodation(data)}
                  placeholder="Write here..."
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={24}>
            <Col xs={24} sm={24} md={24} lg={24} xl={24}>
              <div className="py15 an-14 medium-text flex-x space-between pt30">
                <div className="an-14 medium-text step-title ant-form-item-required" >
                  Itinerary
                </div>
                <div>
                  <Button
                    shape="round"
                    icon="plus"
                    className="award-add-btn mb-24"
                    onClick={addItinerary}>
                    Add
                  </Button>
                </div>
              </div>
              {itenaryItems}
            </Col>
          </Row>
          <Row gutter={24}>
            <Col xs={24} sm={24} md={24} lg={24} xl={24}>
              <Form.Item label="Inclusions">
                <ReactQuill
                  theme="snow"
                  value={inclusion || ''}
                  modules={quillModules}
                  formats={quillFormats}
                  onChange={(data) => setInclusion(data)}
                  placeholder="Write here..."
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={24}>
            <Col xs={24} sm={24} md={24} lg={24} xl={24}>
              <Form.Item label="Exclusion">
                <ReactQuill
                  theme="snow"
                  value={exclusion || ''}
                  modules={quillModules}
                  formats={quillFormats}
                  onChange={(data) => setExclusion(data)}
                  placeholder="Write here..."
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={24}>
            <Col xs={24} sm={24} md={24} lg={24} xl={24}>
              <Form.Item label="Cancellation Policy" className="ant-form-item-required">
                <ReactQuill
                  theme="snow"
                  value={cancellations || ''}
                  modules={quillModules}
                  formats={quillFormats}
                  onChange={(data) => setCancellations(data)}
                  placeholder="Write here..."
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={24}>
            <Col xs={24} sm={24} md={24} lg={24} xl={24}>
              <Form.Item label="Extra Information">
                <ReactQuill
                  theme="snow"
                  value={extras || ''}
                  modules={quillModules}
                  formats={quillFormats}
                  onChange={(data) => setExtras(data)}
                  placeholder="Write here..."
                />
              </Form.Item>
            </Col>
          </Row>
        </div>
        <Form.Item className="mb0 pt40">
          <Button
            loading={loader}
            type="primary"
            htmlType="submit"
            className="ex__primary_btn">
            Submit
          </Button>
          <Button type="primary"
            className="ex_grey_btn ml40"
            onClick={() => dispatch(changeTab(2))}>Back</Button>
        </Form.Item>
      </Form>
    </div>
  )
}

const WrappedCreateStep3 = Form.create({ name: "createTrips" })(Step3);

export default WrappedCreateStep3;
