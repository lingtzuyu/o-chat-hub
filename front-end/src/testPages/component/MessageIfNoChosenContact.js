import React from 'react';
import { styled } from '@mui/system';
import { Typography } from '@mui/material';

const ChatContentMessageWrapper = styled('div')({
  flexGrow: 1,
  padding: '20px',
  height: '80%',
  display: 'flex',
  alignItems: 'center',
});

// 什麼都沒選到的時候，顯示此段文字

export const MeesageIfNoChosenContact = () => {
  return (
    <ChatContentMessageWrapper>
      <Typography variant="h3" sx={{ color: 'grey' }}>
        Choose a contact to start conversation
      </Typography>
    </ChatContentMessageWrapper>
  );
};
