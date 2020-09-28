import React from 'react';
import { NavLink } from "react-router-dom";
import { Menu } from "antd";

import Facebook from "../../assets/images/fb_ic.png";
import Instagram from "../../assets/images/instagram_ic.png";
import Twitter from "../../assets/images/twitter_ic.png";

const shareOption = () => {
  return (
    <Menu className="share_btn_box">
      <Menu.Item>
        <NavLink to="/">
          <img src={Facebook} alt="facebook" className="pr10" />
          Facebook
        </NavLink>
      </Menu.Item>
      <Menu.Item>
        <NavLink to="/">
          <img src={Instagram} alt="instagram" className="pr10" />
          Instagram
        </NavLink>
      </Menu.Item>
      <Menu.Item>
        <NavLink to="/" style={{ border: "none" }}>
          <img src={Twitter} alt="twitter" className="pr10" />
          Twitter
        </NavLink>
      </Menu.Item>
    </Menu>
  )
}

export default shareOption;