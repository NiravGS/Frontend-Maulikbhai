import React, { useState, useCallback } from 'react';
import { Form, Input, Row, Col, Button, message } from "antd";
import { withRouter } from "react-router-dom";
import { compose } from "redux";

import { userResetPassword } from '../../services/auth';

const ResetPassword = (props) => {
  const [confirmDirty, setConfirmDirty] = useState(false);
  const [loader, setLoader] = useState(false);

  const { getFieldDecorator } = props.form;
  const { token } = props

  const resetPassword = useCallback( async (password) => {
    setLoader(true);
    try {
      const result = await userResetPassword(token, password);
      if (result.status === 200) {
        setLoader(false);
        message.success('Password reset success !!');
        props.history.push('/')
      } else {
        message.error('Error setting new password !!');
        props.history.push('/')
      } 
    } catch(err) {
      message.error(err.response.data.message);
      props.history.push('/');
    }
  },[props.history, token])

  const handleFormSubmit = e => {
    e.preventDefault();
    props.form.validateFields((err, values) => {
      if (!err) {
        resetPassword({ password: values.password })
      }
    });
  };

  const handleConfirmBlur = e => {
    const { value } = e.target;
    setConfirmDirty(confirmDirty || !!value);
  };

  const compareToFirstPassword = (rule, value, callback) => {
    const { form } = props;
    if (value && value !== form.getFieldValue("password")) {
      callback("Two passwords that you enter are inconsistent!");
    } else {
      callback();
    }
  };

  const validateToNextPassword = (rule, value, callback) => {
    const { form } = props;
    if (value && confirmDirty) {
      form.validateFields(["confirm"], { force: true });
    }
    callback();
  };

  return (
    <div className="step-1-expert-form">
      <div className="an-20 medium-text success--text step-title">
        RESET PASSWORD
      </div>
      <Form className="ant-advanced-search-form" onSubmit={handleFormSubmit}>
        <div className="form-profile-container">
          <div className="pt10">
            <Row gutter={24}>
              <Col xs={12} sm={12} md={12} lg={12} xl={12}>
                <Form.Item label="New Password">
                  {getFieldDecorator("password", { 
                    rules: [
                      { required: true, message: 'New password is required' },
                      { min: 8, message: "Password must be 8 char long!" },
                      { validator: validateToNextPassword }
                    ]
                  })
                  (<Input.Password placeholder="New password" />)}
                </Form.Item>
              </Col>
              <Col xs={12} sm={12} md={12} lg={12} xl={12}>
                <Form.Item label="Confirm New Password">
                  {getFieldDecorator("confirm", {
                    rules: [
                      { required: true, message: 'Please confirm your password' },
                      { validator: compareToFirstPassword }
                    ]
                  })
                    (<Input.Password placeholder="Confirm new Password" onBlur={handleConfirmBlur}/>)}
                </Form.Item>
              </Col>
            </Row>
          </div>
        </div>
        <Form.Item className="mb0 pt25">
          <Button type="primary"
            loading={loader}
            htmlType="submit"
            className="ex__primary_btn">
            Next
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}

const WrappedResetPassword = Form.create({ name: "createProfile" })(ResetPassword);

export default compose(withRouter)(WrappedResetPassword);
