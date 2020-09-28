import React from "react";
import { Carousel } from "antd";

/**
 * Image Imports
 */
import Header1 from "../../assets/images/home/header_img_afterlogin.png";
import Header2 from "../../assets/images/home/main_banner_img_1.jpg";

const Slider = (props) => {

  return (
    <Carousel autoplay>
      <div>
        <img className="home_banner" src={Header1} alt="Banner1" />
        <img className="home_banner_for_mobile" src={Header2} alt="Banner-for-mobile" />
      </div>
      <div>
        <img className="home_banner" src={Header1} alt="Banner2" />
        <img className="home_banner_for_mobile" src={Header2} alt="Banner-for-mobile" />
      </div>
      <div>
        <img className="home_banner" src={Header1} alt="Banner3" />
        <img className="home_banner_for_mobile" src={Header2} alt="Banner-for-mobile" />
      </div>
    </Carousel>
  )
};

export default Slider;