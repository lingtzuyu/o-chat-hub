import React, { useRef, useEffect } from 'react';
import { styled } from '@mui/system';

const CardWrapper = styled('div')({
  // 空間足夠時允許擴展
  flexGrow: 1,
  width: '360px',
  backgroundColor: 'grey',
  marginTop: '80px',
  height: '920px',
  display: 'flex',
});

const CardArea = () => {
  return <CardWrapper></CardWrapper>;
};

export default CardArea;
