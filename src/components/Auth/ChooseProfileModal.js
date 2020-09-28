import React, { useState } from 'react';
import { Radio, Modal, Button } from "antd";

/**
 * Image Imports
 */
import expert from '../../assets/images/enthu.png';
import enthu from '../../assets/images/expert.png'

const ChooseProfile = props => {

  const [type, setType] = useState(0);

  const onChangeUserType = e => setType(e.target.value);

  return (
    <Modal
      centered
      className="auth-modal choose-profile-modal"
      width={380}
      closable={false}
      maskClosable={false}
      title="SELECT PROFILE"
      visible={props.visible}>
      <div>
        <div className="text-center pb20">
          <Radio.Group
            value={type}
            buttonStyle="solid"
            onChange={onChangeUserType} >
            <Radio.Button className="choose-radio-btn mr40" value={0}>
              <img className="mt15" src={expert} alt="enthu" />
              <div className="radio-text an-14">Expert</div>
            </Radio.Button>
            <Radio.Button className="choose-radio-btn" value={1}>
              <img className="mt15" src={enthu} alt="expert" />
              <div className="radio-text an-14">Enthusiasts</div>
            </Radio.Button>
          </Radio.Group>
        </div>
        <div className="pt30 pb10 text-center mt15">
          <Button
            type="primary"
            htmlType="submit"
            className="ex__primary_btn"
            onClick={() => props.onChoose(type)}>
            Choose
          </Button>
        </div>
      </div>
    </Modal>
  )
}

export default ChooseProfile;
