import React from "react";
import { Input } from 'antd';
import { Row, Col } from 'antd';
import { Pagination } from 'antd';
import ThreeDot from '../assets/images/dot.svg'
import SearchIc from '../assets/images/search.svg'
import Attachment from '../assets/images/attachment.svg'

import EmojiIcon from '../assets/images/emoji.svg'
import Send from "../assets/images/send.svg";
import { Button, Radio , Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

const { Search } = Input;
const suffix = (
    <img src={SearchIc}/>
  );



const Message = () => {

    return (
        <div className="container">
           <Row className="main-message-box">    
                <Col  xs={24} sm={24} md={8} lg={8} xl={8}>
                    <div className="resposive-message-div">
                        <div className="message">
                            <h3>Message</h3>
                        </div>
                        <div className="message-btn-res">
                            <Button type="primary">All Message</Button>
                            <Button type="primary" className="ml-5">Booking Details</Button>
                        </div>
                    </div>
                    <div className="message-left-box">
                        <div className="serach-bar">
                            <Search placeholder="input search text" onSearch={value => console.log(value)} enterButton suffix={suffix} />
                        </div>
                        <div className="chat-person-aera">
                            <div className="profile">
                                <div className="profile-cotnet">
                                    <div className="profile-photo">
                                        <img src="https://www.venmond.com/demo/vendroid/img/avatar/big.jpg" />                    
                                    </div>
                                    <div className="message-details" >
                                        <div className="person-name">
                                            <h5>Nancy Wagner</h5>
                                        </div>
                                        <div className="message-name">
                                            <h5>Trip name lorem ipsum sit amet</h5>
                                        </div> 
                                        <img  src={ThreeDot} className="threeDot"/>   
                                    </div>
                                </div>
                                <div className="booking-date">
                                    <div className="notification-dot"></div>
                                    <div className="date"><h5>Booking Date: <span>20,Mar 20</span></h5></div>
                                </div>
                            </div>
                            <div className="profile">
                                <div className="profile-cotnet">
                                    <div className="profile-photo">
                                        <img src="https://www.venmond.com/demo/vendroid/img/avatar/big.jpg" />                    
                                    </div>
                                    <div className="message-details">
                                        <div className="person-name">
                                            <h5>Nancy Wagner</h5>
                                        </div>
                                        <div className="message-name">
                                            <h5>Trip name lorem ipsum sit amet</h5>
                                        </div>    
                                    </div>
                                </div>
                                <div className="booking-date">
                                    <div className="notification-dot"></div>
                                    <div className="date"><h5>Booking Date: <span>20,Mar 20</span></h5></div>
                                </div>
                            </div>
                            <div className="profile">
                                <div className="profile-cotnet">
                                    <div className="profile-photo">
                                        <img src="https://www.venmond.com/demo/vendroid/img/avatar/big.jpg" />                    
                                    </div>
                                    <div className="message-details">
                                        <div className="person-name">
                                            <h5>Nancy Wagner</h5>
                                        </div>
                                        <div className="message-name">
                                            <h5>Trip name lorem ipsum sit amet</h5>
                                        </div>    
                                    </div>
                                </div>
                                <div className="booking-date">
                                    <div className="notification-dot"></div>
                                    <div className="date"><h5>Booking Date: <span>20,Mar 20</span></h5></div>
                                </div>
                            </div>
                            <div className="profile">
                                <div className="profile-cotnet">
                                    <div className="profile-photo">
                                        <img src="https://www.venmond.com/demo/vendroid/img/avatar/big.jpg" />                    
                                    </div>
                                    <div className="message-details">
                                        <div className="person-name">
                                            <h5>Nancy Wagner</h5>
                                        </div>
                                        <div className="message-name">
                                            <h5>Trip name lorem ipsum sit amet</h5>
                                        </div>    
                                    </div>
                                </div>
                                <div className="booking-date">
                                    <div className="notification-dot"></div>
                                    <div className="date"><h5>Booking Date: <span>20,Mar 20</span></h5></div>
                                </div>
                            </div>
                            <div className="profile">
                                <div className="profile-cotnet">
                                    <div className="profile-photo">
                                        <img src="https://www.venmond.com/demo/vendroid/img/avatar/big.jpg" />                    
                                    </div>
                                    <div className="message-details">
                                        <div className="person-name">
                                            <h5>Nancy Wagner</h5>
                                        </div>
                                        <div className="message-name">
                                            <h5>Trip name lorem ipsum sit amet</h5>
                                        </div>    
                                    </div>
                                </div>
                                <div className="booking-date">
                                    <div className="notification-dot"></div>
                                    <div className="date"><h5>Booking Date: <span>20,Mar 20</span></h5></div>
                                </div>
                            </div>
                            <div className="profile">
                                <div className="profile-cotnet">
                                    <div className="profile-photo">
                                        <img src="https://www.venmond.com/demo/vendroid/img/avatar/big.jpg" />                    
                                    </div>
                                    <div className="message-details">
                                        <div className="person-name">
                                            <h5>Nancy Wagner</h5>
                                        </div>
                                        <div className="message-name">
                                            <h5>Trip name lorem ipsum sit amet</h5>
                                        </div>    
                                    </div>
                                </div>
                                <div className="booking-date">
                                    <div className="notification-dot"></div>
                                    <div className="date"><h5>Booking Date: <span>20,Mar 20</span></h5></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="pagination-div">
                        <Pagination size="small" total={50} />
                    </div>
                </Col>
                <Col xs={24} sm={24} md={16} lg={16} xl={16}>
                    <div className="container">
                        <div className="right-card">
                            <div className="right-card-align">
                                <div className="up-details">
                                    <div className="profile-photo">
                                        <img  src="https://www.venmond.com/demo/vendroid/img/avatar/big.jpg"/>
                                    </div>
                                    <div className="profile-details">
                                        <h2>Nick Baker</h2>
                                        <h6>20 , Mar 20</h6>
                                    </div>
                                </div>
                                <div className="booking-req">
                                    <h5>Booking Request</h5>
                                    <h4>Trip name lorem ipsum sit amet</h4>
                                </div> 
                            </div>
                            <div className="message-area">
                                <div className="inner-main-box">
                                <div className="message-box">
                                   <div className="req-booking">
                                       <div className="message-content">
                                            <h5>Request</h5>
                                            <h6>Booking Date : <span>20 , Mar 20</span></h6>
                                            <h6>Participants : <span>2</span></h6>
                                            <h6>Contact No. : <span>(118)657-5856</span></h6>  
                                       </div>       
                                       <div className="innerMessgae">
                                           <h6>Lorem Ipsum is a dummy text</h6>
                                       </div>            
                                   </div>
                                </div>
                                <div className="time">
                                    <h6>13:30 AM</h6>
                                </div>
                                <div className="left-message-box">
                                    <h6>Lorem ipsum is dummy text</h6>
                                </div>
                                </div>
                                <div className="typing_dots">
                                    <div className="inner_typing_dots"></div>
                                    <div className="inner_typing_dots"></div>
                                    <div className="inner_typing_dots"></div>
                                </div>
                                <div className="input_div">
                                    <Search placeholder="Write your message here" onSearch={value => console.log(value)} enterButton />
                                    <div className="emoji-ic">
                                          <img src={EmojiIcon}/>
                                    </div>
                                    <div className="up-ic">
                                                <Upload  >
                                                    <Button>
                                                        <img src={Attachment} />
                                                    </Button>
                                                </Upload>
                                            </div>
                                        <div className="all-btn">
                                            <div className="send-img">
                                                <img src={Send} />
                                            </div>
                                            <div className="message-btn">
                                                    <Button type="primary" >
                                                        Confirm Booking
                                                    </Button>
                                            </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Col>
            </Row>
        </div>
    );
};

export default Message;
