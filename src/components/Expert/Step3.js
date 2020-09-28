import React, { Fragment, useEffect } from 'react';
import { Form, Input, Row, Col, Button, Icon } from "antd";
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { compose } from "redux";

/**
 * App Imports
 */
import { ExpertEvents } from '../../redux/expert/events';
import { BioValidator, AwardsValidator, InitiativesValidator } from '../../helpers/validations';
import { RemoveHttpCom } from '../../helpers/methods';


const { TextArea } = Input;

const CreateExpertStep2 = React.memo((props) => {
  const { location: { pathname } } = props.history

  const dispatch = useDispatch();
  const loader = useSelector(state => state.expert.loader);
  const expert = useSelector(state => state.expert);

  const { step3, changeTab, updateProfile } = ExpertEvents;

  const { getFieldDecorator, getFieldValue, setFieldsValue } = props.form;

  const { bio, awards, initiatives } = expert;

  useEffect(() => {
    let a = awards;
    let i = initiatives;
    if (a.length === 0 && i.length === 0) {
      a = [];
      i = []
    }
    setFieldsValue({ bio, awards: a, initiatives: i})
  }, [awards, bio, initiatives, setFieldsValue]);

  const handleFormSubmit = e => {
    e.preventDefault();
    props.form.validateFields((err, values) => {
      const awards = [];
      const initiatives = [];
      console.log(values);
      if (!err) {
        if (values.awards.length > 0) {
          values.awards.map((key, i) => {
            awards.push({ name: values[`award-name-${i}`], url: 'https://' +  values[`award-link-${i}`] });
            return null;
          });
        }
        if (values.initiatives.length > 0) {
          values.initiatives.map((key, i) => {
            initiatives.push({ name: values[`init-name-${i}`], url: 'https://' +  values[`init-link-${i}`] });
            return null;
          });
        }
        console.log(values);
        const Obj = { 
          awards: awards.length === 0 ? JSON.stringify([]) : JSON.stringify(awards), 
          initiatives: initiatives.length === 0 ?  JSON.stringify([]) :JSON.stringify(initiatives), 
          bio: values.bio,
          picture: expert.picture,
          firstName: expert.firstName,
          lastName: expert.lastName,
          country: expert.country,
          experties: JSON.stringify(expert.experties),
          speaks: JSON.stringify(expert.speaks),
          companyname: expert.companyname,
          website: expert.website,
          companycountry: expert.companycountry,
          phone: expert.phone,
          address: expert.address,
          address2: expert.address2
        };
        let formData = new FormData();
        for (const property in Obj) {
          if (property === 'picture') {
            if (typeof Obj[property] !== "string") {
              const length = Obj[property].fileList.length
              formData.append(property, Obj[property].fileList[length - 1].originFileObj);
            }
          } else {
            formData.append(property, Obj[property]);
          }
        }
        if (pathname === '/update-expert-profile') {
          dispatch(updateProfile(formData));
        } else {
          dispatch(step3(formData));
        }
      }
    });
  };


  const addAwardsHandler = () => {
    const keys = getFieldValue('awards');
    const nextKeys = keys.concat(new Date().getTime());
    setFieldsValue({ awards: nextKeys });
  }

  const addInitHandler = () => {
    const keys = getFieldValue('initiatives');
    const nextKeys = keys.concat(new Date().getTime());
    setFieldsValue({ initiatives: nextKeys });
  }

  const removeAwards = (k) => {
    const keys = getFieldValue('awards');
    setFieldsValue({ awards: keys.filter(key => key !== k) });
  }

  const removeInits = (k) => {
    const keys = getFieldValue('initiatives');
    setFieldsValue({ initiatives: keys.filter(key => key !== k) });
  }

  getFieldDecorator('awards', { initialValue: [] })
  const awardsFiels = getFieldValue('awards');
  const awardsItems = awardsFiels.map((key, i) => (
    <Fragment key={i}>
      <div className="flex-x align-end">
        <Form.Item label="Award Name" className="mb0 mr30 flex-1">
          {getFieldDecorator(`award-name-${i}`, { initialValue: key.name, ...AwardsValidator } )
            (<Input placeholder="Enter Awards Name" />)}
        </Form.Item>
        <Form.Item label="Reference Link (URL)" className="mb0 flex-1">
          {getFieldDecorator(`award-link-${i}`, { initialValue: RemoveHttpCom(key.url), rules: [{ required: true, message: 'URL is required' }] })
            (<Input addonBefore="https://" placeholder="Enter Awards Reference Link" />)}
        </Form.Item>
        <Icon className="delete-icon" type="close" onClick={() => removeAwards(key)} />
      </div>
    </Fragment>
  ));

  getFieldDecorator('initiatives', { initialValue: [] })
  const initiativesFields = getFieldValue('initiatives');
  const initItems = initiativesFields.map((key, i) => (
    <Fragment key={i}>
      <div className="flex-x align-end" key={key}>
        <Form.Item label="Initiative Name" className="mb0 mr30 flex-1">
          {getFieldDecorator(`init-name-${i}`, { initialValue: key.name, ...InitiativesValidator })
            (<Input placeholder="Enter Awards Name" />)}
        </Form.Item>
        <Form.Item label="Reference Link (URL)" className="mb0 flex-1">
          {getFieldDecorator(`init-link-${i}`, { initialValue: RemoveHttpCom(key.url), rules: [{ required: true, message: 'URL is required' }] })
            (<Input addonBefore="https://" placeholder="Enter Initiative Reference Link" />)}
        </Form.Item>
        <Icon className="delete-icon" type="close" onClick={() => removeInits(key)} />
      </div>
    </Fragment>
  ));
  
  return (
    <div className="step-1-expert-form height_sec">
      <div className="an-20 medium-text success--text step-title">
        AWARDS & RECOGNIZATION
      </div>
      <div className="an-16 regular-text pt10">
        Please fill below details to create your expert Profile
      </div>
      <Form className="ant-advanced-search-form pt20" onSubmit={handleFormSubmit} >
        <Row gutter={24}>
          <Col xs={24} sm={24} md={24} lg={24} xl={24}>
            <Form.Item label="Bio">
              {getFieldDecorator("bio", BioValidator)
                (<TextArea placeholder="Tell us about your self" />)}
            </Form.Item>
          </Col>
          <Col xs={24} sm={24} md={24} lg={24} xl={24}>
            <div className="py15 an-14 medium-text flex-x space-between pt60">
              <div className="an-20 medium-text success--text step-title">
                AWARDS & RECOGNIZATION
              </div>
              <div>
                <Button
                  shape="round"
                  icon="plus"
                  className="award-add-btn mb-24"
                  onClick={addAwardsHandler}>
                  Add
                </Button>
              </div>
            </div>
            { awardsItems }
          </Col>
          <Col xs={24} sm={24} md={24} lg={24} xl={24}>
            <div className="py15 an-14 medium-text flex-x space-between pt30">
              <div className="an-20 medium-text success--text step-title">
                INITIATIVE
              </div>
              <div>
                <Button
                  shape="round"
                  icon="plus"
                  className="award-add-btn mb-24"
                  onClick={addInitHandler}>
                  Add
                </Button>
              </div>
            </div>
            {initItems}
          </Col>
        </Row>
        <Form.Item className="mb0 pt40">
          <Button
            loading={loader}
            type="primary"
            htmlType="submit"
            className="ex__primary_btn">
            Submit
          </Button>
          <Button type="primary" className="ex_grey_btn ml40" onClick={() => dispatch(changeTab(2))}>Back</Button>
        </Form.Item>
      </Form>
    </div>
  )
});

const WrappedCreateExpertStep2 = Form.create({ name: "createProfile" })(CreateExpertStep2);

export default compose(withRouter)(WrappedCreateExpertStep2);
