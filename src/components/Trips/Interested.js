import React, { useState } from "react";
import { Modal, Row, Col, Form, Input, Button, message } from "antd";
import { withRouter } from "react-router-dom";
import { compose } from "redux";
import { useSelector } from 'react-redux';

import Close from "../../assets/images/close_ic.png";
import { SendMessage } from '../../services/expert';

const { TextArea } = Input;

const Interested = (props) => {
  const token = useSelector(state => state.auth.accessToken);
  const { getFieldDecorator } = props.form;
  const [loader, setLoader] = useState(false);

  const sendMessageToExpert = async (params) => {
    setLoader(true);
    const data = { message: params }
    try {
      const result = await SendMessage(token, data, props.id);
      if (result.status === 200) {
        setLoader(false);
        message.success('Request submitted successfully');
        props.onCloseClick()
      } else {
        setLoader(false)
        message.error('Error submitting request');
      }
    } catch (error) {
      setLoader(false)
      message.error('Error submitting request');
    }
  };

  const onFormSubmit = (e) => {
    e.preventDefault();
    props.form.validateFields((err, values) => {
      if (!err) {
        const message = `
        Name: ${values.name}
        Phone: ${values.phone}
        Trip: ${props.trip}
        Description: ${values.description}`
        sendMessageToExpert(message)
      }
    })
  }

  return (
    <Modal
      centered
      className="auth-modal reserve_mdl"
      width={380}
      closable={false}
      maskClosable={false}
      visible={props.visible}>
      <div className="text-left sec_border">
        <Row>
          <Col span={20}>
            <h4 className="sub_title">Instersted Request</h4>
            <p className="an-14 medium-text pt10">
              Please fill the form for your Interested in request
            </p>
          </Col>
          <Col span={4} className="text-right">
            <img src={Close} alt="close" onClick={props.onCloseClick} />
          </Col>
        </Row>
      </div>
      <Form className="ant-advanced-search-form pt20" onSubmit={onFormSubmit}>
        <div className="reserve_frm_bg">
          <Row gutter={[20]}>
            <Col span={12} className="gutter-row">
              <Form.Item label="Name" className="mb0 flex-1">
                {
                  getFieldDecorator("name", { rules: [{ required: true, message: "Name is required field" }] })
                    (<Input placeholder="Enter Name" />)
                }
              </Form.Item>
            </Col>
            <Col span={12} className="gutter-row">
              <Form.Item label="Contact No." className="mb0 flex-1">
                {
                  getFieldDecorator("phone", { rules: [{ required: true, message: "Phone is a required field" }] })
                    (<Input placeholder="Enter Contact No." />)
                }
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={[20]}>
            <Col span={24} className="gutter-row">
              <Form.Item label="Description" className="mb0 flex-1">
                {
                  getFieldDecorator("description", { rules: [{ required: true, message: "Description is a required field" }] })
                    (<TextArea rows={4} placeholder="Description..." />)
                }
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col>
              <div className="text-right mt40">
                <Button
                  type="primary"
                  className="ex_grey_btn mr20"
                  onClick={props.onCloseClick}>
                  Cancel
                </Button>
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={loader}
                  className="ex__primary_btn">
                  Send
                </Button>
              </div>
            </Col>
          </Row>
        </div>
      </Form>
    </Modal>
  );
};

const WrappedReservation = Form.create({ name: "Interested" })(Interested);
export default compose(withRouter)(WrappedReservation);
