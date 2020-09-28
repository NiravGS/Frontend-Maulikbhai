import React, { useState } from "react";
import { Form, Row, Col, Button, message, Breadcrumb } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

import { ToolBarOptions } from "../../helpers/constants";
import { LearningEvents } from "../../redux/learning/events";

const Step3 = (props) => {
  const [accomodation, setAccomodation] = useState("");
  const [itenary, setItenary] = useState("");
  const [inclusion, setInclusion] = useState("");
  const [exclusion, setExclusion] = useState("");
  const [extras, setExtras] = useState("");
  const [cancellantion, setCancellation] = useState("");

  const loader = useSelector((state) => state.learning.loader);
  const dispatch = useDispatch();
  const { step3 } = LearningEvents;

  const handleSubmit = (e) => {
    e.preventDefault();
    props.form.validateFields((err, values) => {
      if (!err) {
        if (!accomodation) {
          return message.error("Please fill up accomodation");
        }
        if (!itenary) {
          return message.error("Please fill up itenary");
        }
        if (!inclusion) {
          return message.error("Please fill up inclusion");
        }
        if (!exclusion) {
          return message.error("Please fill up exclusion");
        }
        if (!extras) {
          return message.error("Please fill up extras");
        }
        if (!cancellantion) {
          return message.error("Please fill up cancellantion");
        }
        const Obj = {
          accomodation: accomodation.getCurrentContent().getPlainText(),
          itenary: itenary.getCurrentContent().getPlainText(),
          inclusion: inclusion.getCurrentContent().getPlainText(),
          exclusion: exclusion.getCurrentContent().getPlainText(),
          extras: extras.getCurrentContent().getPlainText(),
          cancellantion: cancellantion.getCurrentContent().getPlainText(),
        };
        dispatch(step3(Obj));
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
          <Breadcrumb.Item>Additionals Details</Breadcrumb.Item>
        </Breadcrumb>
      </div>
      <Form className="ant-advanced-search-form" onSubmit={handleSubmit}>
        <div className="form-profile-container pt20">
          <Row gutter={24}>
            <Col xs={24} sm={24} md={24} lg={24} xl={24}>
              <Form.Item label="Accomodation">
                <Editor
                  toolbarHidden={false}
                  editorState={accomodation}
                  toolbarClassName="toolbarClassName"
                  wrapperClassName="wrapperClassName"
                  editorClassName="editorClassName"
                  toolbar={ToolBarOptions}
                  onEditorStateChange={(e) => setAccomodation(e)}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={24}>
            <Col xs={24} sm={24} md={24} lg={24} xl={24}>
              <Form.Item label="Itenary">
                <Editor
                  toolbarHidden={false}
                  editorState={itenary}
                  toolbarClassName="toolbarClassName"
                  wrapperClassName="wrapperClassName"
                  editorClassName="editorClassName"
                  toolbar={ToolBarOptions}
                  onEditorStateChange={(e) => setItenary(e)}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={24}>
            <Col xs={24} sm={24} md={24} lg={24} xl={24}>
              <Form.Item label="Inclusion">
                <Editor
                  toolbarHidden={false}
                  editorState={inclusion}
                  toolbarClassName="toolbarClassName"
                  wrapperClassName="wrapperClassName"
                  editorClassName="editorClassName"
                  toolbar={ToolBarOptions}
                  onEditorStateChange={(e) => setInclusion(e)}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={24}>
            <Col xs={24} sm={24} md={24} lg={24} xl={24}>
              <Form.Item label="Exclusion">
                <Editor
                  toolbarHidden={false}
                  editorState={exclusion}
                  toolbarClassName="toolbarClassName"
                  wrapperClassName="wrapperClassName"
                  editorClassName="editorClassName"
                  toolbar={ToolBarOptions}
                  onEditorStateChange={(e) => setExclusion(e)}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={24}>
            <Col xs={24} sm={24} md={24} lg={24} xl={24}>
              <Form.Item label="Cancellation Policy">
                <Editor
                  toolbarHidden={false}
                  editorState={cancellantion}
                  toolbarClassName="toolbarClassName"
                  wrapperClassName="wrapperClassName"
                  editorClassName="editorClassName"
                  toolbar={ToolBarOptions}
                  onEditorStateChange={(e) => setCancellation(e)}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={24}>
            <Col xs={24} sm={24} md={24} lg={24} xl={24}>
              <Form.Item label="Extra Information">
                <Editor
                  toolbarHidden={false}
                  editorState={extras}
                  toolbarClassName="toolbarClassName"
                  wrapperClassName="wrapperClassName"
                  editorClassName="editorClassName"
                  toolbar={ToolBarOptions}
                  onEditorStateChange={(e) => setExtras(e)}
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
        </Form.Item>
      </Form>
    </div>
  );
};

const WrappedCreateStep3 = Form.create({ name: "createTrips" })(Step3);

export default WrappedCreateStep3;
