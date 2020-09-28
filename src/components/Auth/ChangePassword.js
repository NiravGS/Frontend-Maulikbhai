import React from 'react';
import { Form, Input, Row, Col, Button, } from "antd";
import { useDispatch, useSelector } from 'react-redux';
import { AuthActions} from '../../redux/auth/events';

const ChangePassword = (props) => {
  const { getFieldDecorator } = props.form;
 
  const dispatch = useDispatch();
  const loader = useSelector(state => state.auth.loader);
  const { changePassword } = AuthActions;

  const handleFormSubmit = e => {
    e.preventDefault();
    props.form.validateFields((err, values) => {
      if (!err) {
        dispatch(changePassword(values));
      }
    });
  };
  return (
    <div className="step-1-expert-form">
      <div className="an-20 medium-text success--text step-title">
        CHANGE PASSWORD
      </div>
      <Form className="ant-advanced-search-form" onSubmit={handleFormSubmit}>
        <div className="form-profile-container">
          <div className="pt10">
            <Row gutter={24}>
              <Col xs={12} sm={12} md={12} lg={12} xl={12}>
                <Form.Item label="Current Password">
                  {getFieldDecorator("opassword", { rules: [{ required: true, message: 'Current password is required' }] })
                    (<Input.Password placeholder="Enter Name" />)}
                </Form.Item>
              </Col>
              <Col xs={12} sm={12} md={12} lg={12} xl={12}>
                <Form.Item label="New Password">
                  {getFieldDecorator("npassword", {
                    rules: [
                      { required: true, message: 'New password is required' },
                      { min: 8, message: "Password must be 8 char long!" },
                    ]
                  })
                    (<Input.Password placeholder="New Password" />)}
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

const WrappedChangePassword = Form.create({ name: "createProfile" })(ChangePassword);

export default WrappedChangePassword;
