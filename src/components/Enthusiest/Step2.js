import React, { useState, useEffect, useCallback } from "react";
import { Row, Col, Button } from "antd";
import { useSelector, useDispatch } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { compose } from "redux";

import { ActivityList } from '../../helpers/constants';
import { EnthuEvents } from '../../redux/enthu/events'

const Step2 = (props) => {
  const { location: { pathname } } = props.history
  const [initValue, setInitValue] = useState(ActivityList);
  const [selected, setSelected] = useState([]);
  const [doRender, setDoRender] = useState(false)
  const enth = useSelector(state => state.enthu);
  const dispatch = useDispatch();

  const { step2, updateProfile, changeTab } = EnthuEvents;
  
  const setinterestedIn = useCallback(() => {
    enth.interested.map((n) => {
      const value = initValue.find(e => e.name.toLowerCase() === n);
      const index = initValue.findIndex(e => e.name.toLowerCase() === n);
      value.checked = !value.checked
      initValue[index] = value;
      return null;
    });
    setInitValue(initValue);
    setDoRender(true)
  }, [enth.interested, initValue]);

  const setValuesSelected = useCallback(() => {
    const selected = []
    enth.interested.map((n) => {
      const value = initValue.find(e => e.name.toLowerCase() === n);
      selected.push(value);
      return null;
    });
    setSelected(selected)
  }, [enth.interested, initValue])

  useEffect(() => {
    setinterestedIn();
    setValuesSelected();
  }, [setValuesSelected, setinterestedIn])

  const handleFormSubmit = e => {
    e.preventDefault();
    const interested = [];
    selected.map((e) => interested.push(e.name.toLowerCase()));
    const Obj = {
      picture: enth.picture,
      firstName: enth.name,
      lastName: enth.name,
      address: enth.address,
      country: enth.country,
      phone: enth.phone,
      dob: enth.dob,
      interested: JSON.stringify(interested),
    }
    let formData = new FormData();
    for (const property in Obj) {
      if (property === 'picture') {
        if (Obj[property] !== null) {
          if (typeof Obj[property] !== "string") {
            const length = Obj[property].fileList.length
            formData.append(property, Obj[property].fileList[length -1].originFileObj);
          }
        }
      } else {
        formData.append(property, Obj[property]);
      }
    }
    if (pathname === '/update-enthu-profile') {
      dispatch(updateProfile(formData));
    } else {
      dispatch(step2(formData));
    }
  };

  const onSelectedClick = (id, name) => {
    const newSelected = selected.some((i) => i.id === id);
    if (!newSelected) {
      return setSelected([...selected, { id, name, checked: true }]);
    }
    const filtered = selected.filter(i => i.id !== id);
    setSelected([...filtered]);
  }

  const onChange = (id) => {
    const value = initValue.find(e => e.id === id);
    const index = initValue.findIndex(e => e.id === id);
    value.checked = !value.checked
    initValue[index] = value;
    setInitValue(initValue)
  }
  if (doRender) {
    return (
      <div className="step-1-expert-form">
        <div className="an-20 medium-text success--text step-title">
          ADVENTURE PREFERENCES
        </div>
        <div className="an-16 regular-text pt10">
          Select your Adventure Preferences
        </div>
        <div className="img_box pt30">
          <form onSubmit={handleFormSubmit}>
            <Row gutter={40}>
              {
                initValue.map(a => (
                  <Col span={6} key={a.id}>
                    <div className="box_img">
                      <input type="checkbox" 
                        value={a.name} id={a.id}
                        checked={a.checked}
                        onChange={() => onChange(a.id)}
                        onClick={() => onSelectedClick(a.id, a.name)} />
                      <label htmlFor={a.id}>
                        <img src={a.url} alt={a.url} />
                      </label>
                      <p className="an-14 medium-text">{a.name}</p>
                    </div>
                  </Col>
                ))
              }
            </Row>
            <div className="mb0 pt40">
              <Button
                loading={enth.loader}
                type="primary"
                htmlType="submit"
                className="ex__primary_btn">
                Next
              </Button>
              <Button type="primary" className="ex_grey_btn ml40" onClick={() => dispatch(changeTab(1)) }>Back</Button>
            </div>
          </form>
        </div>
      </div>
    );
  } else {
    return null
  }
};

export default compose(withRouter)(Step2);