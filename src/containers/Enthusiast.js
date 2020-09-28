import React, { useState } from "react";
import { Row, Col, Carousel, Button, Input, Card } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { withRouter } from "react-router-dom";
import { compose } from "redux";

import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";

// Image Import
import Header1 from "../assets/images/home/main_banner_img.png";
import Join from "../assets/images/home/join_expeditions_img.png";
import Works from "../assets/images/home/connect_vector.png";
import Learn from "../assets/images/home/learn_vector.png";
import Explore from "../assets/images/home/explore_vector.png";
import Screen from "../assets/images/home/screen.png";
import Experiment from "../assets/images/home/experiment.png";
import Courses from "../assets/images/home/courses_ic_dark.png";

import Learning from "../assets/images/home/learning_expeditions_ic_dark.png";
import volunteer from "../assets/images/home/volunteer_programs_ic_dark.png";
import Webinars from "../assets/images/home/webinars_ic_dark.png";
import Workshop from "../assets/images/home/workshops_ic_dark.png";
import Talk from "../assets/images/home/talk_ic_dark.png";
import Terry from "../assets/images/home/terry_img.png";

import Rachel from "../assets/images/home/rachel_img.png";
import Denise from "../assets/images/home/denise_img.png";

import Campaining from "../assets/images/home/hikers-1147796_1280.jpg";
import Climbing from "../assets/images/home/adventure-1850912_1280.jpg";
import WildLife from "../assets/images/home/Wildlife.jpg";
import BirdWatching from "../assets/images/home/shutterstock_300309332.jpg";
import Photography from "../assets/images/home/photographer.jpg";
import Acrheology from "../assets/images/home/shutterstock_1403691857.jpg";
import Rafting from "../assets/images/home/0d48cb28-f8db-473b-82a8-62356cc0c88c.jpg";

/**
 * Auth Modal
 */
import AuthModal from '../components/Auth/AuthModal';

const options = {
  items: 4,
  nav: true,
  loop: true,
};
const { Meta } = Card;
const { Search } = Input;
const Enthusiast = () => {

  const [showLogin, setShowLogin] = useState(false);

  const openSignup = () => setShowLogin(true);

  return (
    <div>
      <div className="header_banner">
        <Carousel autoplay>
          <div>
            <img src={Header1} alt="Banner1" />
          </div>
          <div>
            <img src={Header1} alt="Banner2" />
          </div>
          <div>
            <img src={Header1} alt="Banner3" />
          </div>
        </Carousel>
      </div>
      <div className="header-container">
        <div className="container align-center">
          <div className="banner_txt">
            <h1 className="an-50 medium-text">
              Connect<span>.</span> <br></br>Learn<span>.</span>
              <br></br> Explore
              <span>.</span>
            </h1>
            <p className="an-18 medium-text">
              Join a worldwide community of adventurers. Learn <br></br>through
              experience. Help protect our planet.
            </p>
            <Button className="start_exploring an-20 mt10" onClick={openSignup}>
              Start exploring
            </Button>
          </div>
          {/* Join The Expedition Section */}
          <div className="join_sec h_padding" id="join-expeditions">
            <div className="text-center ">
              <h2 className="main_title an-50">Join the Expedition</h2>
              <p className="medium-text an-20">
                We bring people with a passion for exploration, experiential
                <br></br>
                learning and the environment together.
              </p>
            </div>
            <div>
              <Row className="flex_sec">
                <Col span={8}>
                  <img src={Join} alt="join" />
                </Col>
                <Col span={16}>
                  <p className="an-16">
                    Our aim is to facilitate the connection between enthusiast
                    and expert adventurers. We are on a mission to create a
                    sustainable future for our planet by creating a community of
                    like-minded passionate explorers - a place where those
                    seeking their wanderlust can learn from experienced
                    professions.
                    <br></br>
                    <br></br>
                    Therefore, we crafted an inspiring, personalised travel
                    alternative that is better for both humans and the planet.
                    It is our ultimate belief that by spreading awareness and
                    bringing people closer to the environment, we can make a
                    real difference.
                  </p>
                </Col>
              </Row>
            </div>
            <Row>
              <Col>
                <div className="text-center">
                  <Button className="start_exploring an-20 mt10" onClick={openSignup}>
                    Start exploring
                  </Button>
                </div>
              </Col>
            </Row>
          </div>
          {/* Join The Expedition Section */}
        </div>
        <section className="how_it_sec h_padding text-center">
          <h2 className="main_title an-50">How It Works</h2>
          <div className="container">
            <Row className="flex_sec">
              <Col span={16}>
                <div className="h_sub_title">
                  <h3 className="sub_title_bg an-30 medium-text">Connect</h3>
                  <span>1</span>
                  <p className="an-16">
                    Meet and share your passion for adventure with fellow
                    <br></br>
                    explorers from across the globe. Connect with qualified
                    <br></br>
                    professionals that can guide you on your next expedition,
                    <br></br>
                    whether solo or in a group.
                  </p>
                </div>
              </Col>
              <Col span={8}>
                <img src={Works} alt="works" />
              </Col>
            </Row>
          </div>
        </section>
        <section className="h_padding">
          <div className="container">
            <Row className="flex_sec">
              <Col span={16}>
                <img src={Learn} alt="learn" />
              </Col>
              <Col span={8}>
                <div className="h_sub_title">
                  <h3 className="sub_title_bg an-30 medium-text">Learn</h3>
                  <span>2</span>
                  <p className="an-16">
                    Meet and share your passion for adventure with fellow
                    explorers from across the globe. Connect with qualified
                    professionals that can guide you on your next expedition,
                    whether solo or in a group.
                  </p>
                </div>
              </Col>
            </Row>
          </div>
        </section>
        <section className="how_it_sec h_padding text-center">
          <div className="container">
            <Row className="flex_sec">
              <Col span={16}>
                <div className="h_sub_title">
                  <h3 className="sub_title_bg an-30 medium-text">Explore</h3>
                  <span>3</span>
                  <p className="an-16">
                    Meet and share your passion for adventure with fellow
                    <br></br>
                    explorers from across the globe. Connect with qualified
                    <br></br>
                    professionals that can guide you on your next expedition,
                    <br></br>
                    whether solo or in a group.
                  </p>
                </div>
              </Col>
              <Col span={8}>
                <img src={Explore} alt="explore" />
              </Col>
            </Row>
          </div>
        </section>
        <section className="h_padding live_sec flex_sec">
          <div className="container">
            <Row>
              <Col span={12}>
                <h2 className="an-40 medium-text">
                  “Live as if you were to die<br></br> tomorrow. Learn as if you
                  <br></br>
                  were to live forever.”
                </h2>
                <p className="an-16">- Mahatma Gandhi</p>
              </Col>
            </Row>
          </div>
        </section>
        <section className="h_padding learning_bg">
          <div className="text-center ">
            <h2 className="main_title an-50">Learning with Experts</h2>
            <p className="medium-text an-20">
              Broaden your knowledge and hone in on your passions with our
              community of international
              <br></br>
              experts and take your passion for adventure to a next-level.
            </p>
          </div>
          <div className="container">
            <Row gutter={60}>
              <Col span={12}>
                <div className="learning_sec pt40">
                  <img src={Screen} alt="Screen" />
                  <div className="learning_sec_txt pl25">
                    <h3 className="medium-text an-20">Online Resources</h3>
                    <p className="an-16">
                      Whatever your area of interest may be, with Expeditions
                      Connect you’ll find online courses, workshops, webinars,
                      and many other learning materials to broaden your
                      horizons. Always carefully crafted and thought-out by
                      experts.
                    </p>
                  </div>
                </div>

                <div className="learning_sec pt40">
                  <img src={Experiment} alt="experiment" />
                  <div className="learning_sec_txt pl25">
                    <h3 className="medium-text an-20">On the Ground</h3>
                    <p className="an-16">
                      Learn through experience with real life courses,
                      workshops, and expeditions in incredible locations across
                      the world. Plus, you have the chance to become a volunteer
                      in many social and ecological programs, undertake an
                      internship to gain hands-on knowledge, or even join the
                      crew of an inspiring expert.
                    </p>
                  </div>
                </div>
              </Col>
              <Col span={12}>
                <div className="pt40">
                  <Row>
                    <Col span={12}>
                      <div className="h_right_sec">
                        <div className="h_right_img">
                          <img src={Courses} alt="courses" />
                        </div>
                        <p className="pl15 mb0 h_courses an-16 medium-text">
                          Courses
                        </p>
                      </div>
                      <div className="h_right_sec pt20">
                        <div className="h_right_img">
                          <img src={Learning} alt="learning" />
                        </div>
                        <p className="pl15 mb0 h_courses an-16 medium-text">
                          Learning<br></br> Expeditions
                        </p>
                      </div>
                      <div className="h_right_sec pt20">
                        <div className="h_right_img">
                          <img src={Talk} alt="talk" />
                        </div>
                        <p className="pl15 mb0 h_courses an-16 medium-text">
                          Talks
                        </p>
                      </div>
                    </Col>
                    <Col span={12}>
                      <div className="h_right_sec">
                        <div className="h_right_img">
                          <img src={Workshop} alt="workshop" />
                        </div>
                        <p className="pl15 mb0 h_courses an-16 medium-text">
                          Workshops
                        </p>
                      </div>
                      <div className="h_right_sec pt20">
                        <div className="h_right_img">
                          <img src={volunteer} alt="volunteer" />
                        </div>
                        <p className="pl15 mb0 h_courses an-16 medium-text">
                          Webinars
                        </p>
                      </div>
                      <div className="h_right_sec pt20">
                        <div className="h_right_img">
                          <img src={Webinars} alt="webinars" />
                        </div>
                        <p className="pl15 mb0 h_courses an-16 medium-text">
                          Volunteer<br></br> Programs
                        </p>
                      </div>
                    </Col>
                  </Row>
                </div>
              </Col>
            </Row>
          </div>
        </section>
        <div className="expe_bg"></div>
        <section className="expe_sec h_padding">
          <div className="container">
            <Row gutter={60}>
              <Col span={8}>
                <h2 className="main_title an-50 h_line">Experiences</h2>
                <p className="an-20">
                  With endless opportunities to explore the planet, what’s your
                  next adventure?
                </p>
              </Col>
              <Col span={16}>
                <OwlCarousel className="owl-theme" {...options} margin={40}>
                  <div className="item">
                    <div className="grid">
                      <figure className="effect-bubba">
                        <img src={Climbing} alt="img02" />
                        <figcaption></figcaption>
                      </figure>
                      <p className="an-16 medium-text">
                        Climbing and Trekking
                      </p>
                    </div>
                  </div>
                  <div className="item">
                    <div className="grid">
                      <figure className="effect-bubba">
                        <img src={Campaining} alt="img02" />
                        <figcaption></figcaption>
                      </figure>
                      <p className="an-16 medium-text">
                        Hiking
                      </p>
                    </div>
                  </div>
                  <div className="item">
                    <div className="grid">
                      <figure className="effect-bubba">
                        <img src={WildLife} alt="img02" />
                        <figcaption></figcaption>
                      </figure>
                      <p className="an-16 medium-text success-text">
                        Nature and Wildlife
                      </p>
                    </div>
                  </div>
                  <div className="item">
                    <div className="grid">
                      <figure className="effect-bubba">
                        <img src={BirdWatching} alt="img02" />
                        <figcaption></figcaption>
                      </figure>
                      <p className="an-16 medium-text">
                        Birdwatching
                      </p>
                    </div>
                  </div>
                  <div className="item">
                    <div className="grid">
                      <figure className="effect-bubba">
                        <img src={Photography} alt="img02" />
                        <figcaption></figcaption>
                      </figure>
                      <p className="an-16 medium-text">
                        Photography and Filmmaking
                      </p>
                    </div>
                  </div>
                  <div className="item">
                    <div className="grid">
                      <figure className="effect-bubba">
                        <img src={Acrheology} alt="img02" />
                        <figcaption></figcaption>
                      </figure>
                      <p className="an-16 medium-text">
                        History and Archealogy
                      </p>
                    </div>
                  </div>
                  <div className="item">
                    <div className="grid">
                      <figure className="effect-bubba">
                        <img src={Rafting} alt="img02" />
                        <figcaption></figcaption>
                      </figure>
                      <p className="an-16 medium-text">
                        Kayaking and Rafting
                      </p>
                    </div>
                  </div>
                </OwlCarousel>
              </Col>
            </Row>
          </div>
        </section>
        <div className="clr_bg"></div>
        <section className="calling_sec h_padding">
          <div className="container">
            <Row gutter={60}>
              <Col span={8}>
                <h2 className="main_title an-50 h_line">
                  Calling All
                  <br /> Experts
                </h2>
                <p className="an-16">
                  Share your knowledge, skills and expertise with people from
                  around the globe. Inspire passionate explorers to discover the
                  wonders of the natural world through travel, adventure and
                  education. <br />
                  <br />
                  Are you offering a trip, running a course, event or workshop,
                  or publishing new content? Share it with travel enthusiasts
                  all over the world.
                </p>
                <Button className="start_exploring an-20" onClick={openSignup}>
                  Lead the expeditions
                </Button>
              </Col>
              <Col span={16}>
                <Row gutter={40}>
                  <Col span={8}>
                    <Card
                      hoverable
                      style={{ width: 240 }}
                      cover={<img src={Terry} alt="terry" />}
                    >
                      <Meta
                        title="Terry Hudson"
                        description="Wildlife Photographer"
                      />
                    </Card>
                  </Col>
                  <Col span={8}>
                    <Card
                      className="mt80"
                      hoverable
                      style={{ width: 240 }}
                      cover={<img alt="example" src={Denise} />}
                    >
                      <Meta title="Denise Oliver" description="Climber" />
                    </Card>
                  </Col>
                  <Col span={8}>
                    <Card
                      hoverable
                      style={{ width: 240 }}
                      cover={<img src={Rachel} alt="rachel" />}
                    >
                      <Meta title="Rachel Banks" description="Biologist" />
                    </Card>
                  </Col>
                </Row>
              </Col>
            </Row>
          </div>
        </section>
        <section className="submit_sec h_padding">
          <div className="container">
            <div className="text-center">
              <Row>
                <Col span={12} offset={6}>
                  <h2 className="an-30 medium-text text-upper">
                    Join Our Adventure Community
                  </h2>
                  <Search
                    placeholder="Enter your email address"
                    enterButton="Submit"
                    size="large"
                    className="an-20"
                    onSearch={(value) => console.log(value)}
                    prefix={<UserOutlined />}
                  />
                </Col>
              </Row>
            </div>
          </div>
        </section>
      </div>
      {showLogin && <AuthModal visible={showLogin} onCancel={() => setShowLogin(false)}/> }
    </div>
  );
};
export default compose(withRouter)(Enthusiast);
