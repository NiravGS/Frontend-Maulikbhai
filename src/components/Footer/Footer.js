import React from "react";
import { NavLink } from "react-router-dom";
import { Row, Col } from "antd";

/**
 * App Imports
 */
import logoHorizontal from "../../assets/images/logo.png";

const Footer = () => {
  return (
    <section className="footer_bg_sec">
      <div className="container">
        <div className="h_padding">
          <Row>
            <Col xs={24} sm={24} md={24} lg={6} xl={6} className="footer_blog">
              <NavLink to="/">
                <img className="mb5" src={logoHorizontal} alt="logo" />
              </NavLink>
            </Col>
            <Col xs={24} sm={24} md={8} lg={6} xl={6} className="footer_blog">
              <h5 className="an-16 medium-text">Community</h5>
              <ul>
                <li>
                  <NavLink to="/experts" className="regular-text an-14">
                    Experts
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/education" className="regular-text an-14">
                    Learning
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/expeditions" className="regular-text an-14">
                    Expeditions
                  </NavLink>
                </li>
              </ul>
            </Col>
            <Col xs={24} sm={24} md={8} lg={6} xl={6} className="footer_blog">
              <h5 className="an-16 medium-text">Company</h5>
              <ul>
                <li>
                  <NavLink to="/" className="an-14 regular-text">
                    Home
                  </NavLink>
                </li>

                <li>
                  <a href="#join-expeditions" className="an-14 regular-text">
                    About Us
                  </a>
                </li>
                <li>
                  <a
                    href="mailto:contact@expeditionsconnect.com"
                    className="regular-text an-14"
                  >
                    Contact Us
                  </a>
                </li>
                <li>
                  <NavLink to="/" className="an-14 regular-text">
                    Terms of Service
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/" className="an-14 regular-text">
                    Privacy Policy
                  </NavLink>
                </li>
              </ul>
            </Col>
            <Col xs={24} sm={24} md={8} lg={6} xl={6} className="footer_blog">
              <h5 className="an-16 medium-text">Follow Us</h5>
              <div className="social_btn pt10">
                <a
                  rel="noopener noreferrer"
                  target="_blank"
                  href="https://www.facebook.com/expeditionsconnect"
                >
                  <i
                    className="fab fa-facebook social_round"
                    aria-hidden="true"
                  ></i>
                </a>
                <a
                  rel="noopener noreferrer"
                  target="_blank"
                  href="https://twitter.com/ExpeditionsC"
                >
                  <i
                    className="fab fa-twitter social_round"
                    aria-hidden="true"
                  ></i>
                </a>
                <a
                  rel="noopener noreferrer"
                  target="_blank"
                  href="https://www.instagram.com/expeditionsconnects"
                >
                  <i
                    className="fab fa-instagram social_round"
                    aria-hidden="true"
                  ></i>
                </a>
                <a
                  rel="noopener noreferrer"
                  target="_blank"
                  href="https://www.linkedin.com/company/expeditionsconnect"
                >
                  <i
                    className="fab fa-linkedin social_round"
                    aria-hidden="true"
                  ></i>
                </a>
              </div>
              <div className="pt20">
                <p className="an-14 medium-text">
                  © 2020{" "}
                  <NavLink to="/">
                    <span>Expeditions Connect.</span>
                  </NavLink>{" "}
                  All rights reserved.
                </p>
              </div>
            </Col>
          </Row>
        </div>
      </div>
    </section>
  );
};
export default Footer;
