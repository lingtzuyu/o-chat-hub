// 無用，移至MessageAreaTopBar

import React from 'react';
import { styled } from '@mui/system';
import SelectedChat from './SelectedChat';

const MessageStatusBarWrapper = styled('div')({
  display: 'flex',
  alignItems: 'center',
  position: 'absolute',
  height: '36px',
  right: '0',
  top: '80px',
  backgroundColor: 'grey',
  borderBottom: '1px solid',
  width: '1536px',
  // 左右開
  justifyContent: 'space-between',
});

const MessageStatusBar = () => {
  return (
    <MessageStatusBarWrapper>
      <SelectedChat />
    </MessageStatusBarWrapper>
  );
};

export default MessageStatusBar;
