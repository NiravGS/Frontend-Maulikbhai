import React from "react";
import { NavLink } from "react-router-dom";
import { Popover } from "antd";
import { CaretDownOutlined } from "@ant-design/icons";

const expertContent = (
  <div className="profile_bg">
    <div className="primary--text py5 cursor-pointer">
      <NavLink to="/home">Home</NavLink>
    </div>
    <div className="primary--text py5 cursor-pointer">
      <NavLink to="/experts">Get Inspired</NavLink>
    </div>
    <div className="primary--text py5 cursor-pointer">
      <NavLink to="/expeditions">Explore</NavLink>
    </div>
    <div className="primary--text py5 cursor-pointer">
      <NavLink to="/learning">Learn</NavLink>
    </div>
  </div>
);

const ExpertMenu = () => {
  return (
    <div className="mobile_menu" style={{ display: "flex" }}>
      <div className="flex-x align-center medium-text text-upper an-16 header-nav-list mr20">
        <Popover placement="topLeft" content={expertContent} trigger="hover">
          <span style={{ color: "#212121" }}>Browse</span>
          <CaretDownOutlined />
        </Popover>
      </div>
      <div className="flex-x align-center medium-text text-upper an-16 header-nav-list mr20">
        <NavLink to="/expeditions">
          <div>My Expeditions</div>
        </NavLink>
      </div>
      <div className="flex-x align-center medium-text text-upper an-16 header-nav-list mr20">
        <NavLink to="/profile-expert">
          <div>My Workshops</div>
        </NavLink>
      </div>
      <div className="flex-x align-center medium-text text-upper an-16 header-nav-list mr20">
        <NavLink to="/message">
          <div>Messages</div>
        </NavLink>
      </div>
      <div className="flex-x align-center medium-text text-upper an-16 header-nav-list mr20">
        <NavLink to="/bookings">
          <div>Bookings</div>
        </NavLink>
      </div>
    </div>
  );
};

export default ExpertMenu;
