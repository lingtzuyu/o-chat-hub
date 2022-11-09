import React from 'react';
import { styled } from '@mui/system';

const MessengerWrapper = styled('div')({
  // 空間足夠時允許擴展
  flexGrow: 1,
  backgroundColor: 'white',
  marginTop: '80px',
  height: '1000px',
  display: 'flex',
});

const Messenger = () => {
  return <MessengerWrapper></MessengerWrapper>;
};

export default Messenger;
