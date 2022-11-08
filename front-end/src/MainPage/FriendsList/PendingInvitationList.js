import React from 'react';
import { styled } from '@mui/system';

const PendingListWrapper = styled('div')({
  display: 'flex',
  flexDirection: 'cloumn',
  alignItems: 'center',
  width: '100%',
  height: '20%',
  // https://www.w3schools.com/css/css_overflow.asp
  overflow: 'auto',
});

const PendingInvitationList = () => {
  return <PendingListWrapper></PendingListWrapper>;
};

export default PendingInvitationList;
