import React from 'react';
import { styled } from '@mui/system';
import { connect } from 'react-redux';
import { ChatBubble } from './ChatBubble';

const ChatBubblesCombinedContainer = styled('div')({
  // 卷軸
  overflow: 'auto',
  height: 'calc(100%-60px)',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
});

const ChatBubblesCombined = ({ messages }) => {
  console.log('泡泡內的', messages);
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
