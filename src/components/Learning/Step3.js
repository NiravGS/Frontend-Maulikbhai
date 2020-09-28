import React, { useState, useEffect, useCallback, Fragment } from "react";
import { Form, Row, Col, Button, Breadcrumb, Input, Icon, message } from "antd";
import { useSelector, useDispatch } from "react-redux";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

import { quillFormats, quillModules } from "../../helpers/constants";
import { LearningEvents } from "../../redux/learning/events";

const { TextArea } = Input;

const Step3 = (props) => {

  const { getFieldDecorator, getFieldValue, setFieldsValue } = props.form;

  const [accomodation, setAccomodation] = useState("");
  const [inclusion, setInclusion] = useState("");
  const [exclusion, setExclusion] = useState("");
  const [extras, setExtras] = useState("");
  const [cancellantion, setCancellation] = useState("");

  const loader = useSelector((state) => state.learning.loader);
  const learnings = useSelector(state => state.learning);

  const dispatch = useDispatch();
  const { step3, changeTab, update } = LearningEvents;
  const { editMode, workshopMedium } = learnings;

  const setEditors = useCallback((data) => {
    setAccomodation(data.accomodation || "");
    setInclusion(data.inclusion || "");
    setExtras(data.extras || "");
    setExclusion(data.exclusion || "")
    setCancellation(data.cancellantion || "")
  }, [])

  useEffect(() => {
    setEditors(learnings);
    setFieldsValue({ itinerary: learnings.itenary ? JSON.parse(learnings.itenary): [{}] })
  }, [learnings, setEditors, setFieldsValue])

  const addItinerary = () => {
    const keys = getFieldValue('itinerary');
    const nextKeys = keys.concat(new Date().getTime());
    setFieldsValue({ itinerary: nextKeys });
  }

  const removeItinerary = (k) => {
    const keys = getFieldValue('itinerary');
    setFieldsValue({ itinerary: keys.filter(key => key !== k) });
  }

  getFieldDecorator('itinerary', { initialValue: [{}] });
  const itineraryFields = getFieldValue('itinerary');
  const itenaryItems = itineraryFields.map((key, i) => (
    <Fragment key={i}>
      <div className="flex-x align-end">
        <Form.Item className="mb0 flex-1">
          {getFieldDecorator(`itinerary-${i}`, {
            initialValue: key.value,
          })
            (<TextArea placeholder={`Day ${i}`} />)}
        </Form.Item>
        <Icon className="delete-icon work_delete" type="close" onClick={() => removeItinerary(key)} />
      </div>
    </Fragment>
  ));

  const handleSubmit = (e) => {
    e.preventDefault();
    props.form.validateFields((err, values) => {
      if (!err) {
        if (!cancellantion) {
          return message.error("Please fill all required fields");
        }
        const itinerary = []
        values.itinerary.map((key, i) => {
          itinerary.push({ day: i, value: values[`itinerary-${i}`] });
          return null;
        });
        const Obj = {
          ...learnings,
          accomodation: accomodation,
          itenary: JSON.stringify(itinerary),
          inclusion: inclusion,
          exclusion: exclusion,
          extras: extras,
          cancellantion: cancellantion,
        };
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
  };

  return (
    <div className="step-1-expert-form step-2 learn_sec">
      <div className="an-20 medium-text success--text step-title">
        <Breadcrumb separator=">">
          <Breadcrumb.Item className="an-18 medium-text clr_green">
            Create Learnings
          </Breadcrumb.Item>
          <Breadcrumb.Item className="an-16 regular-text pt10">Additionals Details</Breadcrumb.Item>
        </Breadcrumb>
      </div>
      <Form className="ant-advanced-search-form" onSubmit={handleSubmit}>
        <div className="form-profile-container pt20">
          {workshopMedium !== 'online' && (
            <Fragment>
              <Row gutter={24}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                  <Form.Item label="Accomodation">
                    <ReactQuill
                      theme="snow"
                      value={accomodation}
                      modules={quillModules}
                      formats={quillFormats}
                      onChange={(data) => setAccomodation(data)}
                    />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={24}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                  <div className="py15 an-14 medium-text flex-x space-between pt30">
                    <div className="an-14 medium-text step-title" style={{ color: "#0f0f0f"}}>
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
            </Fragment>
          )}
          <Row gutter={24}>
            <Col xs={24} sm={24} md={24} lg={24} xl={24}>
              <Form.Item label="Inclusion">
                <ReactQuill
                  theme="snow"
                  value={inclusion}
                  modules={quillModules}
                  formats={quillFormats}
                  onChange={(data) => setInclusion(data)}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={24}>
            <Col xs={24} sm={24} md={24} lg={24} xl={24}>
              <Form.Item label="Exclusion">
                <ReactQuill
                  theme="snow"
                  value={exclusion}
                  modules={quillModules}
                  formats={quillFormats}
                  onChange={(data) => setExclusion(data)}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={24}>
            <Col xs={24} sm={24} md={24} lg={24} xl={24}>
              <Form.Item label="Cancellation Policy" className="ant-form-item-required">
                <ReactQuill
                  theme="snow"
                  value={cancellantion}
                  modules={quillModules}
                  formats={quillFormats}
                  onChange={(data) => setCancellation(data)}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={24}>
            <Col xs={24} sm={24} md={24} lg={24} xl={24}>
              <Form.Item label="Extra Information">
                <ReactQuill
                  theme="snow"
                  value={extras}
                  modules={quillModules}
                  formats={quillFormats}
                  onChange={(data) => setExtras(data)}
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
            className="ex__primary_btn"
          >
            Submit
          </Button>
          <Button
            type="primary"
            className="ex_grey_btn ml40"
            onClick={() => dispatch(changeTab(2))}
          > Back
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

const WrappedCreateStep3 = Form.create({ name: "createTrips" })(Step3);

export default WrappedCreateStep3;
