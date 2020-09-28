import React, { useEffect } from 'react';
import { Form, Input, Row, Col, Select, Button } from "antd";
import { useDispatch, useSelector } from 'react-redux';

/**
 * App Imports
 */
import countries from '../../helpers/countries';
import { ExpertEvents } from '../../redux/expert/events';
import { CompanyValidator, WebsiteValidator, PhoneValidator } from '../../helpers/validations';
import { RemoveHttpCom } from '../../helpers/methods';

const { Option } = Select;

const CreateExpertStep3 = React.memo((props) => {
  const dispatch = useDispatch();
  const { companyname, website, companycountry, phone, address, address2 } = useSelector(state => state.expert)
  const { step2, changeTab } = ExpertEvents;
  const { getFieldDecorator, setFieldsValue } = props.form;

  useEffect(() => {
    setFieldsValue({
      companycountry, website: RemoveHttpCom(website), companyname,
      phone, address, address2
    })
  }, [address, address2, companycountry, companyname, phone, setFieldsValue, website]);

  const handleFormSubmit = e => {
    e.preventDefault();
    props.form.validateFields((err, values) => {
      if (!err) {
        values = { ...values, website: `https://${values.website}` }
        dispatch(step2(values));
      }
    });
  };
  return (
    <div className="step-1-expert-form height_sec">
      <div className="an-20 medium-text success--text step-title">
        BUSINESS DETAILS
      </div>
      <div className="an-16 regular-text pt10">
        Please fill below details to create your expert Profile
      </div>
      <Form className="ant-advanced-search-form" onSubmit={handleFormSubmit}>
        <div className="form-profile-container pt20">
          <Row gutter={24}>
            <Col xs={24} sm={12} md={12} lg={12} xl={12}>
              <Form.Item label="Company Name">
                {getFieldDecorator("companyname", CompanyValidator)
                  (<Input placeholder="Enter Company Name" />)}
              </Form.Item>
            </Col>
            <Col xs={24} sm={12} md={12} lg={12} xl={12}>
              <Form.Item label="Website">
                {getFieldDecorator("website", WebsiteValidator)
                  (<Input addonBefore="https://" placeholder="website" />)}
              </Form.Item>
            </Col>
            <Col xs={24} sm={12} md={12} lg={12} xl={12}>
              <Form.Item label="Country" className="mb0">
                {getFieldDecorator("companycountry", {
                  rules: [
                    { required: true, message: "Please select your country!" }
                  ]
                })(
                  <Select showSearch placeholder="Select Your Country">
                    {
                      countries.map((con, i) => {
                        return (
                          <Option key={i} value={con.name}>
                            {con.name}
                          </Option>
                        );
                      })
                    }
                  </Select>
                )}
              </Form.Item>
            </Col>
            <Col xs={24} sm={12} md={12} lg={12} xl={12}>
              <Form.Item label="Phone Number">
                {getFieldDecorator("phone", PhoneValidator)
                  (<Input placeholder="Enter Phone Number" />)}
              </Form.Item>
            </Col>
            <Col xs={24} sm={12} md={12} lg={12} xl={12}>
              <Form.Item label="Address Line 1">
                {getFieldDecorator("address", { rules: [{ required: true, message: 'Address is required field' }] })
                  (<Input placeholder="Address Line 1" />)}
              </Form.Item>
            </Col>
            <Col xs={24} sm={12} md={12} lg={12} xl={12}>
              <Form.Item label="Address Line 2">
                {getFieldDecorator("address2", { rules: [{ required: true, message: 'Address is required field' }] })
                  (<Input placeholder="Address Line 2" />)}
              </Form.Item>
            </Col>
          </Row>
        </div>
        <Form.Item className="mb0 pt40">
          <Button
            loading={false}
            type="primary"
            htmlType="submit"
            className="ex__primary_btn">
            Next
          </Button>
          <Button type="primary" className="ex_grey_btn ml40" onClick={() => dispatch(changeTab(1))}>Back</Button>
        </Form.Item>
      </Form>
    </div>
  )
});

const WrappedCreateExpertStep3 = Form.create({ name: "createProfile" })(CreateExpertStep3);

export default WrappedCreateExpertStep3;
