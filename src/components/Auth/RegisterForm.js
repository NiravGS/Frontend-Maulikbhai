import React from 'react';
import { Form, Input, Button } from "antd";

/**
 * App Import
 */
import { REGISTER } from '../../helpers/constants';

const RegisterForm = (props) => {

  const { getFieldDecorator } = props.form;

  const handleSubmit = e => {
    e.preventDefault();
    props.form.validateFields((err, values) => {
      if (!err) {
        props.handleLogin({ ...values, type: REGISTER });
      }
    });
  };

  return (
    <Form onSubmit={handleSubmit} className="ex__form">
      <Form.Item label="Email">
        {getFieldDecorator("email", {
          rules: [
            {
              type: "email",
              message: "Invalid email address!"
            },
            { required: true, message: "Please input your email" }
          ]
        })(<Input className="email-input" type="email" placeholder="Email" />)}
      </Form.Item>
      <Form.Item hasFeedback label="Password">
        {getFieldDecorator("password", {
          rules: [
            { min: 8, message: "Min password length 8 is required" },
            {
              required: true,
              message: "Please input your password"
            }
          ]
        })(<Input.Password placeholder="Password" />)}
      </Form.Item>

      <Form.Item className="mb0">
        <div className="pt30 pb10">
          <Button
            loading={props.loader}
            type="primary"
            htmlType="submit"
            className="ex__primary_btn"
          >
            Register
          </Button>
        </div>
      </Form.Item>
    </Form>
  )
}

const WrappedNormalRegisterForm = Form.create({ name: "RegisterForm" })(RegisterForm);

export default WrappedNormalRegisterForm;
