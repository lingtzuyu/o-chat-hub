// 無用

import React from 'react';
import { styled } from '@mui/system';
import { Typography } from '@mui/material';
// TODO: 用mui做avatar

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
//
// add props to content
const SingleMessage = ({ content, fromMe, username, date, sameTime }) => {
  // 上方用obj
  // const { content, fromMe, username, date, sameTime } = obj;
  // 如果訊息是從自己來的 (自己發送的訊息)
  if (fromMe && sameTime) {
    return (
      <FromMeMessageContent>
        <FromMeMessage>{content}</FromMeMessage>
      </FromMeMessageContent>
    );
  }
  return (
    <MainWrapper>
      <SingleMessageWrapper>
        {/* username後面要有空格 */}
        <Typography style={{ fontSzie: '14px', color: 'black' }}>
          {username}{' '}
          <span style={{ fontSize: '10px', color: 'black' }}>{date}</span>
        </Typography>
        <MessageContent>{content}</MessageContent>
      </SingleMessageWrapper>
    </MainWrapper>
  );
};

export default SingleMessage;
