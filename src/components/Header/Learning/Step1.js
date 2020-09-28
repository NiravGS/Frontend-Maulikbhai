import React, { useState } from "react";
import {
  Form,
  Upload,
  Row,
  Col,
  Input,
  Select,
  Slider,
  Button,
  Breadcrumb,
} from "antd";
import { useDispatch } from "react-redux";

/**
 * Images Import
 */
import UploadImage from "../../assets/images/cover_upload.png";

/**
 * App Imports
 */
import { ActivityList } from "../../helpers/constants";
import { getBase64, beforeUpload } from "../../helpers/methods";
import langauges from "../../helpers/langauges";
import { LearningEvents } from "../../redux/learning/events";

const { Option } = Select;

const Step1 = React.memo((props) => {
  const [imageUrl, setImageUrl] = useState();
  const { getFieldDecorator } = props.form;
  const dispatch = useDispatch();

  const { step1 } = LearningEvents;

  const handleSubmit = (e) => {
    e.preventDefault();
    props.form.validateFields((err, values) => {
      if (!err) {
        dispatch(step1(values));
      }
    });
  };

  const handleChangePicture = (info) => {
    if (info.file.status === "uploading") {
      return;
    }
    if (info.file.status === "done") {
      getBase64(info.file.originFileObj, (imageUrl) => {
        setImageUrl(imageUrl);
      });
    }
  };

  return (
    <div className="step-1-expert-form learn_sec">
      <div className="an-20 medium-text success--text step-title">
        <Breadcrumb separator=">">
          <Breadcrumb.Item className="an-18 medium-text clr_green">
            Create Workshop
          </Breadcrumb.Item>
          <Breadcrumb.Item>Basic Information</Breadcrumb.Item>
        </Breadcrumb>
      </div>
      <Form className="ant-advanced-search-form" onSubmit={handleSubmit}>
        <div className="form-profile-container pt20">
          <div className="pr20">
            <Form.Item label="" className="mb20">
              {getFieldDecorator("cover", {
                rules: [
                  { required: true, message: "Please Upload Cover photo!" },
                ],
              })(
                <Upload
                  name="avatar"
                  listType="picture-card"
                  className="avatar-uploader"
                  showUploadList={false}
                  onChange={handleChangePicture}
                  beforeUpload={beforeUpload}
                  customRequest={({ file, onSuccess }) =>
                    setTimeout(() => onSuccess("ok"), 0)
                  }
                >
                  <div className="cover-uploader flex-y center">
                    <img
                      src={imageUrl || UploadImage}
                      alt="cover"
                      style={{
                        width: imageUrl ? "100%" : "",
                        height: imageUrl ? "100%" : "",
                        objectFit: "fill",
                      }}
                    />
                    {!imageUrl && (
                      <span className="an-14 regular-text mt20">
                        Upload Cover photo for your trip
                      </span>
                    )}
                  </div>
                </Upload>
              )}
            </Form.Item>
          </div>
          <div>
            <Row gutter={24}>
              <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                <Form.Item label="Workshop Name">
                  {getFieldDecorator("title", {
                    rules: [
                      { required: true, message: "Please Enter Trip Name" },
                    ],
                  })(<Input placeholder="Enter Workshop Name" />)}
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={24}>
              <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                <Form.Item label="Select Activity">
                  {getFieldDecorator("activity", {
                    rules: [
                      { required: true, message: "Please Select Activity" },
                    ],
                  })(
                    <Select
                      mode="multiple"
                      showSearch
                      placeholder="Select Activity"
                    >
                      {ActivityList.map((exp, i) => (
                        <Option key={i} value={exp.name}>
                          {exp.name}
                        </Option>
                      ))}
                    </Select>
                  )}
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={24}>
              <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                <Form.Item label="Price">
                  {getFieldDecorator("price", {
                    rules: [{ required: true, message: "Please Enter Price" }],
                  })(
                    <Input
                      addonBefore="USD"
                      type="number"
                      min={1}
                      placeholder="Enter Price"
                    />
                  )}
                </Form.Item>
              </Col>
              <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                <Form.Item label="Duration">
                  {getFieldDecorator("duration", {
                    rules: [
                      { required: true, message: "Please Enter Duration" },
                    ],
                  })(
                    <Input
                      addonBefore="HOURS"
                      type="number"
                      min={1}
                      placeholder="Enter Duration"
                    />
                  )}
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={24}>
              <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                <Form.Item label="Max Participants">
                  {getFieldDecorator("participants", {
                    rules: [
                      {
                        required: true,
                        message: "Please select your Max Participants!",
                      },
                    ],
                  })(
                    <Select
                      placeholder="Select Max Participants"
                      style={{ lineHeight: 0 }}
                    >
                      {Array(10)
                        .fill(0)
                        .map((lang, i) => (
                          <Option key={i + 1} value={i}>
                            {i + 1}
                          </Option>
                        ))}
                    </Select>
                  )}
                </Form.Item>
              </Col>
              <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                <Form.Item label="Langauge">
                  {getFieldDecorator("langauge", {
                    rules: [
                      {
                        required: true,
                        message: "Please select your Langauge!",
                      },
                    ],
                  })(
                    <Select
                      mode="multiple"
                      showSearch
                      placeholder="Select Your Langauge"
                    >
                      {langauges.map((lang, i) => (
                        <Option key={i} value={lang.name}>
                          {lang.name}
                        </Option>
                      ))}
                    </Select>
                  )}
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                <Form.Item label="Skill level">
                  {getFieldDecorator("skill")(
                    <Slider
                      marks={{
                        0: "Beginner",
                        50: "Medium",
                        100: "Advance",
                      }}
                    />
                  )}
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={24}>
              <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                <Form.Item label="Workshop Type">
                  {getFieldDecorator("workshoptype", {
                    rules: [
                      {
                        required: true,
                        message: "Please select Workshop Type!",
                      },
                    ],
                  })(
                    <Select placeholder="Select Workshop Type">
                      <Option value="one-one">one-one</Option>
                      <Option value="group">group</Option>
                      <Option value="individual">individual</Option>
                      <Option value="other">other</Option>
                    </Select>
                  )}
                </Form.Item>
              </Col>
              <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                <Form.Item label="Workshop Medium">
                  {getFieldDecorator("workshopmedium", {
                    rules: [
                      {
                        required: true,
                        message: "Please select Workshop Medium!",
                      },
                    ],
                  })(
                    <Select placeholder="Select Workshop Medium">
                      <Option value="online">Online</Option>
                      <Option value="offline">Offline</Option>
                      <Option value="other">other</Option>
                    </Select>
                  )}
                </Form.Item>
              </Col>
            </Row>
          </div>
        </div>
        <Form.Item className="mb0 pt25">
          <Button type="primary" htmlType="submit" className="ex__primary_btn">
            Next
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
});

const WrappedCreateStep1 = Form.create({ name: "createTrips" })(Step1);

export default WrappedCreateStep1;
