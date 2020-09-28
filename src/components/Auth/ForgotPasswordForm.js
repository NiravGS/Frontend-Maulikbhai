import React, { Fragment } from 'react';
import { Form, Input, Button } from "antd";

/**
 * App Imports
 */
import arrowIc from "../../assets/images/arrow_ic.png";

const ForgotPassword = (props) => {
  const { getFieldDecorator } = props.form;

  const handleSubmit = e => {
    e.preventDefault();
    props.form.validateFields((err, values) => {
      if (!err) {
        props.handleForgotPassword(values);
      }
    });
  };

  return (
    <Fragment>
      <div className="forgot-password-title an-18 medium-text success--text pt20">
        FORGOT PASSWORD
      </div>
      <div>
        <div className="an-14 regular-text dark-grey--text py30">
          Enter your register email ID to receive password reset
          instructions.
        </div>
        <Form className="ex__form" onSubmit={handleSubmit}>
          <Form.Item label="Email">
            {getFieldDecorator("email", {
              rules: [
                {
                  type: "email",
                  message: "Invalid email address!"
                },
                { required: true, message: "Please input your email" }
              ]
            })(
              <Input
                className="email-input"
                type="email"
                placeholder="Email"
              />
            )}
          </Form.Item>
          <Form.Item>
            <div className="pt30 pb10 flex-x align-center justify-space-between">
              <div>
                <Button
                  loading={props.loader}
                  type="primary"
                  htmlType="submit"
                  className="ex__primary_btn"
                >
                  Send
                </Button>
              </div>
              <div className="an-14 regular-text" style={{ cursor: 'pointer' }}  onClick={() => props.changeForm(false)}>
                <img className="mr5" src={arrowIc} alt="" />
                <span className="dark--text">
                  <span className="ml5">Back to Login</span>
                </span>
              </div>
            </div>
          </Form.Item>
        </Form>
      </div>
    </Fragment>
  )
}

const ForgotPasswordForm = Form.create({ name: "signin" })(ForgotPassword);

export default ForgotPasswordForm;


