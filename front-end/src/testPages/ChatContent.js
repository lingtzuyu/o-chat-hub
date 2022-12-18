//. 留

import React, { useEffect, useRef } from 'react';
import { Box, Card, styled, Divider } from '@mui/material';
import { connect } from 'react-redux';

import { getDirectMessageHistroy } from '../chat/socketConnectionClient';

import SingleChatBububle from './component/SingleChatBububle';

function ChatContent({
  userInfoDetail,
  chosenChatDetails,
  messages,
  isSelectedMessageBoxShown,
  isSelectMessageBoxDisabled,
}) {
  const userId = userInfoDetail?.id;

  // 選中某個id的時後的第一次渲染
  useEffect(() => {
    getDirectMessageHistroy({
      receiverUserId: chosenChatDetails.id,
    });
  }, [chosenChatDetails]);

  // 按下核取方塊後的重新渲染
  useEffect(() => {});

  const messageToEndRef = useRef(null);

  const scrollToBottom = () => {
    messageToEndRef.current.scrollIntoView({ behavior: 'auto' });
  };

  useEffect(scrollToBottom, [messages]);

  return (
    <Box p={3}>
      {messages.map((message, index) => {
        const sameSender = message.sender === parseInt(userId);

        // TODO: 分隔線待改
        const localTime = new Date(message.date);
        // Wed Nov 23 2022
        const localDate = localTime.toDateString();
        // 時間，不足兩位用pad補0
        const localClock = `${localTime
          .getHours()
          .toString()
          .padStart(2, '0')}:${localTime
          .getMinutes()
          .toString()
          .padStart(2, '0')}`;

        // const sameDate = index > 0 && localDate === lastLocalDate;

        return (
          <SingleChatBububle
            key={message._id}
            mapKey={message._id}
            content={message.body}
            username={message.senderMail}
            fromMe={sameSender}
            date={message.date}
            sameTime={true}
            isSelectMessageBoxDisabled={isSelectMessageBoxDisabled}
            isSelectedMessageBoxShown={isSelectedMessageBoxShown}
          />
        );
      })}
      <div ref={messageToEndRef} />
    </Box>
  );
}

const mapStoreStateToProps = ({ chat, card, auth }) => {
  return { ...chat, ...card, ...auth };
};

export default connect(mapStoreStateToProps)(ChatContent);
