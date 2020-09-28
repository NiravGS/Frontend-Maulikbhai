import React from 'react';
import { NavLink } from "react-router-dom";
import { Popover } from "antd";
import { CaretDownOutlined } from '@ant-design/icons';

const enthuContent = (
  <div className="profile_bg">
    <div className="primary--text py5 cursor-pointer">
      <NavLink to="/home">
        Home
      </NavLink>
    </div>
    <div className="primary--text py5 cursor-pointer">
      <NavLink to="/experts">
        Experts
      </NavLink>
    </div>
    <div className="primary--text py5 cursor-pointer">
      <NavLink to="/expeditions">
        Expeditions
      </NavLink>
    </div>
    <div className="primary--text py5 cursor-pointer">
      <NavLink to="/learning">
        Workshops
      </NavLink>
    </div>
  </div>
)

const EnthusiastMenu = () => {

  return (
    <div className="mobile_menu" style={{ display: "flex" }}>
      <div className="flex-x align-center medium-text text-upper an-16 header-nav-list mr20">
        <Popover
          placement="topLeft"
          content={enthuContent}
          trigger="hover">
          <span style={{ color: "#212121" }}>Browse</span><CaretDownOutlined />
        </Popover>
      </div>
      <div className="flex-x align-center medium-text text-upper an-16 header-nav-list mr20">
        <NavLink to="/profile-expert">
          <div>My Profile</div>
        </NavLink>
      </div>
      <div className="flex-x align-center medium-text text-upper an-16 header-nav-list mr20">
        <NavLink to="/msessage">
          <div>My Messages</div>
        </NavLink>
      </div>
      <div className="flex-x align-center medium-text text-upper an-16 header-nav-list mr20">
        <NavLink to="/bookings">
          <div>My Bookings</div>
        </NavLink>
      </div>
    </div>
  )
}

export default EnthusiastMenu;
