import React, { useEffect } from 'react';
// use useEffect to fetch messages
import { styled } from '@mui/system';
import Messages from './Messages';
import MessageInputArea from './MessageInputArea';

const MessageAreaContentWrapper = styled('div')({ flexGrow: 1 });

// messageer.js那邊可以得到props，取出chosenChatDetails
// 根據chosenChatDetails的不同來渲染畫面上的歷史資料
const MessageAreaContent = ({ chosenChatDetails }) => {
  // useEffect用來取得歷史聊天資料
  useEffect(() => {}, [chosenChatDetails]);

  return (
    <MessageAreaContentWrapper>
      <Messages />
      <MessageInputArea />
    </MessageAreaContentWrapper>
  );
};

export default MessageAreaContent;
