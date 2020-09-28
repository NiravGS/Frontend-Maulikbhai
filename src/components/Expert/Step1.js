import React, { useState, useEffect, useCallback } from 'react';
import { Form, Input, Row, Col, Select, Button, Upload } from "antd";
import { useSelector, useDispatch } from 'react-redux';

/**
 * Image Import
 */
import uploadIcon from '../../assets/images/upload-icon.png';

/**
 * App Imports
 */
import { getBase64, beforeUpload } from '../../helpers/methods';
import countries from '../../helpers/countries';
import langauges from '../../helpers/langauges';
import { expertiseList } from '../../helpers/constants';
import { ExpertEvents } from '../../redux/expert/events';
import { FirstNameValidator, LastNameValidator } from '../../helpers/validations';

const { Option } = Select;
 
const CreateExpertStep1 = (props) => {
  const { getFieldDecorator, setFieldsValue } = props.form;
  const [imageUrl, setImageUrl] = useState();
  const { picture, firstName, lastName, country, experties, speaks, isEditMode } = useSelector(state => state.expert);
  const { step1 } = ExpertEvents;
  const dispatch = useDispatch();

  const setPicture = useCallback(
    (picture) => {
      if (picture !== null) {
        if (isEditMode) {
          if (typeof picture === 'string') {
            setImageUrl(picture)
          } else {
            getBase64(picture.file.originFileObj, imageUrl => {
              setImageUrl(imageUrl);
            });
          }
        } else {
          if (typeof picture === 'string') {
            setImageUrl(picture)
          } else {
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
      firstName: firstName,
      lastName: lastName,
      experties: experties,
      speaks: speaks,
      country: country
    });
  }, [country, experties, firstName, lastName, picture, setFieldsValue, setPicture, speaks])

  const handleFormSubmit = e => {
    e.preventDefault();
    props.form.validateFields((err, values) => {
      if(!err) {
        dispatch(step1(values));
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
    <div className="step-1-expert-form height_sec">
      <div className="an-20 medium-text success--text step-title">
        PERSONAL INFO
      </div>
      <div className="an-16 regular-text pt10">
        Please fill below details to create your expert Profile
      </div>
      <Form className="ant-advanced-search-form" onSubmit={handleFormSubmit}>
        <div className="form-profile-container pt20">
          <div className="pr20">
            <Form.Item label="" className="mb0">
              {getFieldDecorator("picture", {rules: [{ required: true, message: "Please Upload Your Profile!" }]})
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
                    <img src={imageUrl || uploadIcon} alt="avatar" style={{ width: imageUrl ? '100%': '' }}/>
                  </div>
                </Upload>
              )}
            </Form.Item>
          </div>
          <div>
            <div className="pt60">
              <Row gutter={24}>
                <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                  <Form.Item label="First Name">
                    {getFieldDecorator("firstName",FirstNameValidator)
                    (<Input placeholder="Enter First Name" />)}
                  </Form.Item>
                </Col>
                <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                  <Form.Item label="Last Name">
                    {getFieldDecorator("lastName",LastNameValidator)
                    (<Input placeholder="Enter Last Name" />)}
                  </Form.Item>
                </Col>
                <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                  <Form.Item label="Speaks">
                    {getFieldDecorator("speaks", { rules: [{ required: true, message: "Please select your Speaks!" }] })
                      (<Select mode="multiple" showSearch placeholder="Select Your Speaks">
                        {langauges.map((lang, i) => <Option key={i} value={lang.name}>{lang.name}</Option>)}
                      </Select>)}
                  </Form.Item>
                </Col>
                <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                  <Form.Item label="Expertise">
                    {getFieldDecorator("experties", {rules: [{required: true,message: "Please select your expertise!"}]})
                    (<Select mode="multiple" showSearch placeholder="Select Your Expertise">
                      {expertiseList.map((exp, i) => <Option key={i} value={exp.name}>{exp.name}</Option>)}
                    </Select>)}
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

const WrappedCreateExpertStep1 = Form.create({ name: "createProfile" })(CreateExpertStep1);

export default WrappedCreateExpertStep1;
