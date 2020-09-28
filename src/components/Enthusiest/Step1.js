import React, { useState, useEffect, useCallback } from 'react';
import { Form, Input, Row, Col, Select, Button, Upload, DatePicker } from "antd";
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { withRouter } from 'react-router-dom';
import { compose } from "redux";
import uploadIcon from '../../assets/images/upload-icon.png';

import { getBase64, beforeUpload } from '../../helpers/methods';
import { PhoneValidator } from '../../helpers/validations';
import countries from '../../helpers/countries';
import { EnthuEvents } from '../../redux/enthu/events';

const { Option } = Select;

const Step1 = (props) => {
  const { getFieldDecorator, setFieldsValue } = props.form;
  const [imageUrl, setImageUrl] = useState();
  const { picture, name, country, address, phone, dob, isEditMode } = useSelector(state => state.enthu);
  const dispatch = useDispatch();

  const { step1 } = EnthuEvents;

  const setPicture = useCallback(
    (picture) => {
      if (picture) {
        if (isEditMode) {
          setImageUrl(picture)
        } else {
          if (typeof picture === 'string') {
            setImageUrl(picture)
          }
          if (picture.file) {
            getBase64(picture.file.originFileObj, imageUrl => {
              setImageUrl(imageUrl);
            });
          }
        }
      }
    }, [isEditMode])

  useEffect(() => {
    setPicture(picture);
    setFieldsValue({
      picture: picture,
      name, 
      address,
      country,
      phone,
      dob: dob ? moment(dob): null, 
    });
  }, [address, country, dob, name, phone, picture, setFieldsValue, setPicture])

  const handleFormSubmit = e => {
    e.preventDefault();
    props.form.validateFields((err, values) => {
      if (!err) {
        dispatch(step1(values))
      }
    });
  };

  const handleChangePicture = info => {
    if (info.file.status === "uploading") {
      return;
    }
    if (info.file.status === "done") {
      getBase64(info.file.originFileObj, imageUrl => {
        setImageUrl(imageUrl);
      });
    }
  };

  return (
    <div className="step-1-expert-form height_sec_enthu">
      <div className="an-20 medium-text success--text step-title">
        PERSONAL INFO
      </div>
      <div className="an-16 regular-text pt10">
        Please fill below details to create your enthusiast Profile
      </div>
      <Form className="ant-advanced-search-form" onSubmit={handleFormSubmit}>
        <div className="form-profile-container pt20">
          <div className="pr20">
            <Form.Item label="" className="mb0">
              {getFieldDecorator("picture")
                (<Upload
                  name="avatar"
                  listType="picture-card"
                  className="avatar-uploader"
                  onChange={handleChangePicture}
                  beforeUpload={beforeUpload}
                  showUploadList={false}
                  customRequest={({ file, onSuccess }) => setTimeout(() => onSuccess("ok"), 0)}
                >
                  <div className="name-uploader flex-x center">
                    <img src={imageUrl || uploadIcon} alt="avatar" style={{ width: imageUrl ? '100%' : '' }} />
                  </div>
                </Upload>
                )}
            </Form.Item>
          </div>
          <div>
            <div className="pt60">
              <Row gutter={24}>
                <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                  <Form.Item label="Name">
                    {getFieldDecorator("name", { rules: [{ required: true, message: 'Name is required' }] })
                      (<Input placeholder="Enter Name" />)}
                  </Form.Item>
                </Col>
                <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                  <Form.Item label="Phone Number">
                    {getFieldDecorator("phone", PhoneValidator)
                    (<Input placeholder="Enter Phone Number" />)}
                  </Form.Item>
                </Col>
                <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                  <Form.Item label="Address">
                    {getFieldDecorator("address", { rules: [{ required: true, message: 'Address is required field' }] })
                      (<Input placeholder="Address" />)}
                  </Form.Item>
                </Col>
                <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                  <Form.Item label="Country">
                    {getFieldDecorator("country", { rules: [{ required: true, message: "Please select your country!" }] })
                      (<Select showSearch placeholder="Select Your Country">
                        {countries.map((con, i) => <Option key={i} value={con.name}>{con.name}</Option>)}
                      </Select>)}
                  </Form.Item>
                </Col>
                <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                  <Form.Item label="Date of Birth">
                    {
                      getFieldDecorator("dob", { rules: [{ required: true, message: 'Please Enter Date of Birth' }] })
                        (<DatePicker format="YYYY-MM-DD" className="fill-width" placeholder="DD/MM/YYYY" />)
                    }
                  </Form.Item>
                </Col>
              </Row>
            </div>
          </div>
        </div>
        <Form.Item className="mb0 pt25">
          <Button type="primary" htmlType="submit" className="ex__primary_btn">
            Next
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}

const WrappedCreateEnthStep1 = Form.create({ name: "createProfile" })(Step1);

export default compose(withRouter)(WrappedCreateEnthStep1);
