import React from 'react';
import { styled } from '@mui/system';
import MyChatButton from './MyChatButton';

const AppBarWrapper = styled('div')({
  width: '80px',
  height: '1000px',
  marginTop: '80px',
  display: 'flex',
  // 這邊icon會直條呈現
  flexDirection: 'column',
  alignItems: 'center',
  backgroundColor: 'black',
  border: '2px solid black',
});

const AppBar = () => {
  return (
    <AppBarWrapper>
      <MyChatButton />
    </AppBarWrapper>
  );
};

export default AppBar;
