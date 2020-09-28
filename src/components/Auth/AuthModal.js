import React, { useState, Fragment } from 'react';
import { Button, Divider, Tabs, Modal } from "antd";
import { GoogleLogin } from "react-google-login";
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";
import { useSelector, useDispatch } from 'react-redux';

/**
 * Images import
 */
import fullfill from '../../assets/images/fullfill.png';
import singleLogo2 from '../../assets/images/single-logo2.png';
import appLogo from '../../assets/images/logo.png';
import googleIc from '../../assets/images/google_ic.png';
import fbIc from '../../assets/images/fb_ic.png';

/**
 * App Imports
 */
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import { AuthActions } from '../../redux/auth/events';
import { FACEBOOK, GOOGLE } from '../../helpers/constants';
import ForgotPasswordForm from './ForgotPasswordForm';

// Antd Destructring
const { TabPane } = Tabs;

const Auth = (props) => {
  const [activeTab, setActivetab] = useState("login");
  const [showForm, setShowForm] = useState(false);
  const dispatch = useDispatch();
  const loader = useSelector(state => state.auth.loader);

  const { login, forgotPassword } = AuthActions;
  const { visible, onCancel } = props;

  const responseGoogle = response => {
    if (response.error) return;
    const obj = {
      id: response.profileObj.googleId,
      email: response.profileObj.email,
      provider: "google",
      type: GOOGLE
    };
    dispatch(login(obj));
  };

  const responseFacebook = response => {
    if (response.status === 'unknown') return;
    const obj = {
      id: response.userID,
      email: response.email,
      provider: "facebook",
      type: FACEBOOK
    };
    dispatch(login(obj));
  };

  const changeForm = (form) => setShowForm(form)

  const handleLogin = data => dispatch(login(data));

  const handleForgotPassword = (data) => dispatch(forgotPassword(data))

  return (
    <Modal
      centered
      className="auth-modal signin-modal"
      width={1000}
      closable={false}
      visible={visible}
      onCancel={onCancel}
    >
      <div className="login-container flex-x">
        <div className="login_banner flex-1">
          <div className="login_overlay">
            <div>
              <img src={singleLogo2} alt="" />
            </div>
            <div className="fullfill-text">
              <img width="150" src={fullfill} alt="fullfill" />
            </div>
          </div>
        </div>
        <div className="auth_form flex-1">
          <div className="auth_app_logo">
            <img src={appLogo} alt="Expeditions Connect" />
          </div>
          {
          showForm ? 
            (<ForgotPasswordForm changeForm={changeForm} loader={loader} handleForgotPassword={handleForgotPassword}/>) : 
          (<Fragment>
            <div className="auth_form_tabs">
              <Tabs defaultActiveKey={activeTab} onChange={t => setActivetab(t)}>
                <TabPane tab={<span className="an-16 medium-text">LOGIN</span>} key="login">
                  <div>
                    <LoginForm handleLogin={handleLogin} loader={loader} changeForm={changeForm} />
                  </div>
                </TabPane>
                <TabPane tab={<span className="an-16 medium-text">SIGNUP</span>} key="signup">
                  <div>
                    <RegisterForm handleLogin={handleLogin} loader={loader} />
                  </div>
                </TabPane>
              </Tabs>
            </div>
            <Divider
              className={`an-14 regular-text dark-text ${activeTab === 'login' ? '' : 'mb45'}`} orientation="left" >
              {activeTab === "login" ? "Or Login With" : "Or Signup With"}
            </Divider>
            <div className="flex-x">
              <div className="pr15">
                <GoogleLogin
                  clientId={process.env.REACT_APP_GOOGLE_ID}
                  buttonText="Login"
                  onSuccess={responseGoogle}
                  onFailure={responseGoogle}
                  cookiePolicy={"single_host_origin"}
                  render={renderProps => (
                    <Button
                      className="fill-width google-button"
                      onClick={renderProps.onClick}
                      disabled={renderProps.disabled}>
                      <img src={googleIc} alt="g" className="mr20" />
                      {activeTab === 'login' ? "Log in with Google" : "Signup with Google" } 
                    </Button>
                  )}
                />
              </div>
              <div className="pl15">
                <FacebookLogin
                  appId={process.env.REACT_APP_FACEBOOK_ID}
                  autoLoad={false}
                  fields="name,email,picture"
                  callback={responseFacebook}
                  cssClass="my-facebook-button-class"
                  render={renderProps => (
                    <Button
                      className="fill-width facebook-button"
                      onClick={renderProps.onClick}>
                      <img src={fbIc} alt="fb" className="mr20" />
                      {activeTab === 'login' ? "Log in with Facebook" : "Signup with Facebook"}
                    </Button>
                  )}
                />
              </div>
            </div>
          </Fragment>
          )}
        </div>
      </div>
    </Modal>
  )
}

export default Auth;
