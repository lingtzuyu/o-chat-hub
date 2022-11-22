import React from 'react';
import { Avatar } from '@mui/material';
import { ChatBox, ReceiverMessage, SenderMessage } from 'mui-chat-box';
import { Typography } from '@mui/material';
import styled from '@emotion/styled';

// singleMessage

const MainWrapper = styled('div')({
  width: '90%',
  display: 'flex',
  marginTop: '10px',
});

// const AvatarWrapper = styled('div')({});

const UserNameDisplay = styled('div')({ color: 'red' });

const SingleMessageWrapper = styled('div')({
  display: 'flex',
  flexDirection: 'column',
});

const MessageContent = styled('div')({ color: 'black' });

const FromMeMessageContent = styled('div')({ color: 'grey', width: '90%' });

// 這邊要用span才能inline
const FromMeMessage = styled('span')({
  marginLeft: ' 80px',
});

export const SingleMessageBox = ({
  content,
  fromMe,
  username,
  date,
  sameTime,
}) => {
  if (fromMe && sameTime) {
    return (
      <ChatBox>
        <SenderMessage avatar={<Avatar>TEST</Avatar>}>{content}</SenderMessage>
      </ChatBox>
    );
  }
  return (
    <>
      <Typography style={{ fontSzie: '14px', color: 'black' }}>
        {username}{' '}
        <span style={{ fontSize: '10px', color: 'black' }}>{date}</span>
      </Typography>
      <ReceiverMessage avatar={<Avatar>TEST</Avatar>}>
        {content}
      </ReceiverMessage>
    </>
  );
};
