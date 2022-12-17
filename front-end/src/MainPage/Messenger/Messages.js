import React, { useRef, useEffect } from 'react';

// https://ithelp.ithome.com.tw/articles/10266635
// useRef 只會回傳一個值，這個值是一個有 current 屬性的物件。
// current 值並不會觸發 re-render
// 可以用來避免元件第一次 render 時，useEffect 內的程式碼執行

import { styled } from '@mui/system';
import { MessageAreaHeader } from './MessageAreaHeader';
import { connect } from 'react-redux';
import { DUMMY_MESSAGES } from './DUMMY_MESSAGES';
import SingleMessage from './SingleMessage';
// import { SingleMessageBox } from './ChatBox';
// import { SingleChatRoomBubble } from './SingleChatBubble';

// const convertDate = (date, format) => {
//   const map = {
//     mm: date.getMonth() + 1,
//     dd: date.getDate(),
//     yy: date.getFullYear().toString().slice(-2),
//     yyyy: date.getFullYear(),
//   };

//   return format.replace(/mm|dd|yy|yyyy/gi, (matched) => map[matched]);
// };

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
