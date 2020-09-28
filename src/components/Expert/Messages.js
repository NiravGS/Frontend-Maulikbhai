import React, { useEffect, useState, useCallback } from "react";
import { Comment, Avatar, Input, Button, Modal } from "antd";
import { useSelector } from 'react-redux';

import { getExpertMessasges, replyToMessasges } from "../../services/expert";

const { TextArea } = Input;

const ExpertMessages = () => {
  const [messages, setMessages] = useState([]);
  const [loader, setLoader] = useState(false);
  const [repText, setRepText] = useState("");
  const [modal, setModal] = useState({ visible: false, id: null });
  const token  = useSelector(state => state.auth.accessToken);

  const getMesssage = useCallback(async () => {
    try {
      const result = await getExpertMessasges(token);
      if (result.status === 200) {
        setMessages(result.data.data);
      }
    } catch (error) { }
  }, [token]);

  useEffect(() => {
    getMesssage();
  }, [getMesssage]);

  const addReplyHandler = async () => {
    const param = { id: modal.id, reply: repText };
    try {
      setLoader(true)
      const result = await replyToMessasges(token, param);
      if (result.status === 200) {
        getMesssage();
        setLoader(false)
        setModal({ visible: false, id: null });
      }
    } catch (error) { 
      setLoader(false)
    }
  };

  return (
    <div>
      { messages.length ? messages.map((comment, i) => {
          return (
            <Comment
              key={i}
              actions={
                !comment.hasOwnProperty("reply")
                  ? [
                    <span
                      key="comment-nested-reply-to"
                      onClick={() =>
                        setModal({ visible: true, id: comment.id })
                      }
                    >
                      Reply to
                      </span>
                  ]
                  : [<div>{comment.reply}</div>]
              }
              author={<span>{comment.user.name}</span>}
              avatar={
                <Avatar src={comment.user.profile} alt={comment.user.name} />
              }
              content={<p className="medium-text an-14">{comment.message}</p>}
            ></Comment>
          );
        })
        :
        (
          <div>
            <div className="mb10 an-14 medium-text">
              <h3>No messages at the moment</h3>
            </div>
          </div>
        )
      }
      <Modal
        className="auth-modal"
        width={500}
        title="Reply"
        visible={modal.visible}
        onCancel={() => setModal({ visible: false, id: null })}
      >
        <TextArea
          rows={4}
          onChange={e => setRepText(e.target.value)}
          value={repText}
        />
        <div className="pt15">
          <Button 
            className="ex__primary_btn" 
            onClick={addReplyHandler} 
            loading={loader}
            type="primary">
            Reply
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default ExpertMessages;
