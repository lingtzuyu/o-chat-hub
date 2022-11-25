import React, { useEffect, useRef } from 'react';
import { Box, Avatar, Typography, Card, styled, Divider } from '@mui/material';
import { connect } from 'react-redux';

import { getDirectMessageHistroy } from '../chat/socketConnectionClient';

import {
  formatDistance,
  format,
  subDays,
  subHours,
  subMinutes,
} from 'date-fns';
import SingleChatBububle from './component/SingleChatBububle';
import ScheduleTwoToneIcon from '@mui/icons-material/ScheduleTwoTone';

const DividerWrapper = styled(Divider)(
  ({ theme }) => `
      .MuiDivider-wrapper {
        border-radius: ${theme.general.borderRadiusSm};
        text-transform: none;
        background: ${theme.palette.background.default};
        font-size: ${theme.typography.pxToRem(13)};
        color: ${theme.colors.alpha.black[50]};
      }
`
);

const CardWrapperPrimary = styled(Card)(
  ({ theme }) => `
      background: ${theme.colors.primary.main};
      color: ${theme.palette.primary.contrastText};
      padding: ${theme.spacing(2)};
      border-radius: ${theme.general.borderRadiusXl};
      border-top-right-radius: ${theme.general.borderRadius};
      max-width: 380px;
      display: inline-flex;
`
);

const CardWrapperSecondary = styled(Card)(
  ({ theme }) => `
      background: ${theme.colors.alpha.black[10]};
      color: ${theme.colors.alpha.black[100]};
      padding: ${theme.spacing(2)};
      border-radius: ${theme.general.borderRadiusXl};
      border-top-left-radius: ${theme.general.borderRadius};
      max-width: 380px;
      display: inline-flex;
`
);

function ChatContent({
  chosenChatDetails,
  messages,
  isSelectedMessageBoxShown,
  isSelectMessageBoxDisabled,
}) {
  // 選中某個id的時後的第一次渲染
  useEffect(() => {
    getDirectMessageHistroy({
      receiverUserId: chosenChatDetails.id,
    });
  }, [chosenChatDetails]);

  const messageToEndRef = useRef(null);

  const scrollToBottom = () => {
    messageToEndRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(scrollToBottom, [messages]);

  return (
    <Box p={3}>
      {messages.map((message, index) => {
        const sameSender =
          index > 0 && messages[index].sender === messages[index - 1].sender;

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

const mapStoreStateToProps = ({ chat, card }) => {
  return { ...chat, ...card };
};

export default connect(mapStoreStateToProps)(ChatContent);
