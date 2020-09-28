import React, { useEffect, useState } from "react";
import { NavLink, withRouter } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { compose } from "redux";
import { Button, Popover, Avatar, Drawer } from "antd";
import { BellFilled } from "@ant-design/icons";

/**
 * Logo Image import
 */
import logoHorizontal from "../../assets/images/header-logo.png";
import MenuRespons from "../../assets/images/menu-24px.svg";

/**
 * App Imports
 */
import Auth from "../Auth/AuthModal";
import ChooseProfile from "../Auth/ChooseProfileModal";
import PendingApproval from "./PendingApproval";
import { ModalActions } from "../../redux/models/events";
import { AuthActions } from "../../redux/auth/events";
import { ExpertEvents } from "../../redux/expert/events";
import { EnthuEvents } from "../../redux/enthu/events";
import ExpertMenu from "./ExpertMenu";
import EnthusiastMenu from "./EnthusiastMenu";

const Header = (props) => {
  const dispatch = useDispatch();
  const showAuth = useSelector((state) => state.modal.authModal);
  const showChooseProfile = useSelector((state) => state.modal.chooseProfile);
  const showApprovalProfile = useSelector((state) => state.modal.approvalModal);
  const { isLogin, role } = useSelector((state) => state.auth);
  const { picture, approved } = useSelector((state) => state.expert);
  const enthu = useSelector((state) => state.enthu);
  const [visible, setVisible] = useState(false);
  const {
    openAuthModal,
    closeAuthModal,
    closeChooseProfileModal,
    openApprovalModal,
    closeApprovalModal,
  } = ModalActions;
  const { getProfile, logout } = AuthActions;
  const { nullExpert } = ExpertEvents;
  const { nullEnthu } = EnthuEvents;

  useEffect(() => {
    if (isLogin) {
      if (role !== null && role !== "user") {
        dispatch(getProfile());
      }
    }
  }, [dispatch, getProfile, isLogin, role]);

  const onProfileChoose = (type) => {
    dispatch(closeChooseProfileModal());
    dispatch(closeAuthModal());
    if (type === 0) {
      return props.history.push("/create-expert-profile");
    }
    return props.history.push("/create-enthusiest-profile");
  };

  const checkDisabed = (e) => {
    if (!approved) {
      e.preventDefault();
      dispatch(openApprovalModal());
    }
  };

  const logOut = () => {
    dispatch(nullEnthu());
    dispatch(nullExpert());
    dispatch(logout());
  };

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  const content = (
    <div className="profile_bg">
      <div className="primary--text py5 cursor-pointer">
        {role === "expert" ? (
          <NavLink to="/profile-expert">Profile</NavLink>
        ) : (
          <NavLink to="/enthusiest-profile">Profile</NavLink>
        )}
      </div>
      {role === "expert" && <div className="border_bottom"></div>}

      {/* to be deleted
      
      role === "expert" && (
        <div className="primary--text py5 cursor-pointer">
          <NavLink onClick={checkDisabed} to="/create-trips">
            Create Trips
          </NavLink>
        </div>
      )}
      {role === "expert" && (
        <div className="primary--text py5 cursor-pointer">
          <NavLink onClick={checkDisabed} to="/create-learnings">
            Create Learnings
          </NavLink>
        </div>
      )}
      {role === "expert" && (
        <div className="primary--text py5 cursor-pointer">
          <NavLink to="/profile-expert?tab=5">Messages</NavLink>
        </div>
      )*/}
      <div className="primary--text py5 cursor-pointer">
        <NavLink to="/settings">Settings</NavLink>
      </div>
      <div className="border_top"></div>
      <div className="primary--text py5 cursor-pointer" onClick={logOut}>
        Logout
      </div>
    </div>
  );

  return (
    <div className="header-container">
      <div className="container flex-x align-center">
        <div className="header-logo pr10 flex-1">
          <NavLink to="/">
            <img className="mb5" width="170" src={logoHorizontal} alt="logo" />
          </NavLink>
        </div>
        {role === "expert" || role === "enthusiasts" ? (
          <>
            {role === "enthusiasts" ? <EnthusiastMenu /> : <ExpertMenu />}
            <div className="flex-x align-center medium-text text-upper an-16 header-nav-list mr20 bell_iocn">
              <NavLink to="/notification">
                <BellFilled />
              </NavLink>
            </div>
            <Drawer
              title=""
              placement="top"
              closable={false}
              onClose={onClose}
              visible={visible}
            >
              {role === "enthusiasts" ? <EnthusiastMenu /> : <ExpertMenu />}
            </Drawer>
          </>
        ) : (
          <>
            <div className="flex-x align-center medium-text text-upper an-16 header-nav-list mr20">
              <NavLink to="/" exact>
                <div>Home</div>
              </NavLink>
            </div>
            <div className="flex-x align-center medium-text text-upper an-16 header-nav-list mr20">
              <NavLink to="/experts">
                <div>Get Inspired</div>
              </NavLink>
            </div>

            <div className="flex-x align-center medium-text text-upper an-16 header-nav-list mr20">
              <NavLink to="/learning">
                <div>Learn</div>
              </NavLink>
            </div>
            <div className="flex-x align-center medium-text text-upper an-16 header-nav-list mr20">
              <NavLink to="/expeditions">
                <div>Explore</div>
              </NavLink>
            </div>
          </>
        )}
        {isLogin ? (
          <>
            <div className="flex-x align-center an-16 header-nav-list mr20  profile_detail">
              <Popover placement="topRight" content={content} trigger="hover">
                <Avatar
                  shape="square"
                  className="cursor-pointer"
                  size={32}
                  src={
                    role === "expert" || role === "enthusiasts"
                      ? picture
                      : enthu.picture
                  }
                />
              </Popover>
            </div>
            <div className="flex-x align-center an-16 header-nav-list mr20 menu_fix">
              <Button
                className="barsMenu"
                type="primary"
                onClick={visible ? onClose : showDrawer}
              >
                <img src={MenuRespons} alt="Menu icon" />
              </Button>
            </div>
          </>
        ) : (
          <div className="flex-x align-center an-14 medium-text header-nav-list cursor-pointer">
            <Button
              type="primary"
              className="ex__primary_btn text-upper"
              onClick={() => dispatch(openAuthModal(true))}
            >
              Get Started
            </Button>
          </div>
        )}
      </div>
      {showAuth && (
        <Auth
          visible={showAuth}
          onCancel={() => dispatch(closeAuthModal(false))}
        />
      )}
      {showChooseProfile && (
        <ChooseProfile visible={showChooseProfile} onChoose={onProfileChoose} />
      )}
      {showApprovalProfile && (
        <PendingApproval
          visible={showApprovalProfile}
          onCancel={() => dispatch(closeApprovalModal(false))}
        />
      )}
    </div>
  );
};

export default compose(withRouter)(Header);
