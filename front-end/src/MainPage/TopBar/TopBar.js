import React from 'react';
import { styled } from '@mui/system';

const TopBarWrapper = styled('div')({
  display: 'flex',
  alignItems: 'center',
  position: 'absolute',
  height: '80px',
  right: '0',
  top: '0',
  backgroundColor: 'black',
  width: '100%',
  // 左右開
  justifyContent: 'space-between',
});

const TopBar = () => {
  return <TopBarWrapper></TopBarWrapper>;
};

export default TopBar;
