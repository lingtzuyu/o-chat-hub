import React, { useEffect } from 'react';
// use useEffect to fetch messages
import { styled } from '@mui/system';
import Messages from './Messages';
import MessageInputArea from './MessageInputArea';
import { getDirectMessageHistroy } from '../../chat/socketConnectionClient';

const MessageAreaContentWrapper = styled('div')({ flexGrow: 1 });

// messageer.js那邊可以得到props，取出chosenChatDetails
// 根據chosenChatDetails的不同來渲染畫面上的歷史資料
const MessageAreaContent = ({ chosenChatDetails }) => {
  // useEffect用來取得歷史聊天資料
  // 點選的好友變動的時候，useEffect偵測到並且觸發getDirectMessageHistory
  useEffect(() => {
    getDirectMessageHistroy({
      receiverUserId: chosenChatDetails.id,
    });
  }, [chosenChatDetails]);

  return (
    <MessageAreaContentWrapper>
      <Messages />
      <MessageInputArea />
    </MessageAreaContentWrapper>
  );
};

export default MessageAreaContent;
