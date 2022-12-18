import React from 'react';

import { styled } from '@mui/system';
import { MessageAreaHeader } from './MessageAreaHeader';
import { connect } from 'react-redux';

import SingleMessage from './SingleMessage';

const MessagesContainer = styled('div')({
  // 卷軸
  overflow: 'auto',
  height: 'calc(100%-60px)',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
});

const Messages = ({ chosenChatDetails, messages }) => {
  return (
    <MessagesContainer>
      {/*  chosenDetail內有name值就秀，沒有就undefined */}
      <MessageAreaHeader name={chosenChatDetails?.name} />
      {/* Objects are not valid as a React child */}
      {messages.map((message, index) => {
        // check index 0 會 crash
        // 同樣人的發言在一起
        const sameSender =
          index > 0 && messages[index].sender === messages[index - 1].sender;
        // 比較前後，會判斷true或false

        return (
          // <div>{message.content}</div>
          <SingleMessage
            key={message.id}
            content={message.body}
            username={message.sender}
            fromMe={sameSender}
            date={message.date}
            sameTime={true}
          />
        );
      })}
    </MessagesContainer>
  );
};

// 勾chatReducer
const mapStoreStateToProps = ({ chat }) => {
  return { ...chat };
};

export default connect(mapStoreStateToProps)(Messages);
