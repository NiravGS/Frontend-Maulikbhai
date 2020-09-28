import React from 'react';
import { Form, Input, Button, Checkbox } from "antd";

/**
 * App Imports
 */
import { LOGIN } from '../../helpers/constants';

const LoginForm = (props) => {

  const { getFieldDecorator } = props.form;

  const handleSubmit = e => {
    e.preventDefault();
    props.form.validateFields((err, values) => {
      if (!err) {
        props.handleLogin({ ...values, type: LOGIN });
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
        <div className="flex-x pt5">
          <div className="flex-1">
            {getFieldDecorator("remember", {
              valuePropName: "checked",
              initialValue: true
            })(
              <Checkbox className="an-14 regular-text dark--text">
                Remember me
              </Checkbox>
            )}
          </div>
          <span className="an-14 regular-text dark--text"
            onClick={() => props.changeForm(true)}
            style={{ cursor: 'pointer' }}>
            Forgot Password?
          </span>
        </div>
        <div className="pt15 pb10">
          <Button
            loading={props.loader}
            type="primary"
            htmlType="submit"
            className="ex__primary_btn"
          >
            Login
          </Button>
        </div>
      </Form.Item>
    </Form>
  )
}

const WrappedNormalRegisterForm = Form.create({ name: "LoginForm" })(LoginForm);

export default WrappedNormalRegisterForm;
