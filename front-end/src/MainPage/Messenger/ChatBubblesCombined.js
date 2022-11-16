import React, { useEffect } from 'react';
import { styled } from '@mui/system';
import { connect } from 'react-redux';
import { ChatBubble } from './ChatBubble';
import { getDirectMessageHistroy } from '../../chat/socketConnectionClient';

const ChatBubblesCombinedContainer = styled('div')({
  // 卷軸
  overflow: 'auto',
  width: '100%',
  height: 'calc(100%-60px)',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
});

const ChatBubblesCombined = ({ chosenChatDetails, messages }) => {
  // console.log('泡泡內的', messages);
  console.log('泡泡內的chosenChatDetails', chosenChatDetails);
  useEffect(() => {
    getDirectMessageHistroy({
      receiverUserId: chosenChatDetails.id,
    });
  }, [chosenChatDetails]);
  return (
    <>
      <ChatBubblesCombinedContainer>
        {messages.map((message, index) => {
          const sameSender =
            index > 0 && messages[index].sender === messages[index - 1].sender;
          return (
            <ChatBubble
              key={message._id}
              content={message.body}
              username={message.senderMail}
              fromMe={sameSender}
              date={message.date}
              sameTime={true}
            />
          );
        })}
      </ChatBubblesCombinedContainer>
    </>
  );
};

// 勾chatReducer
const mapStoreStateToProps = ({ chat }) => {
  return { ...chat };
};

export default connect(mapStoreStateToProps)(ChatBubblesCombined);
