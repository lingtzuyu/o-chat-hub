import React from 'react';
import { styled } from '@mui/system';
import { DUMMY_INVITE } from './DUMMY_LIST';
import InviteDataItems from './InviteDataItems';

const PendingListWrapper = styled('div')({
  // display: 'flex',
  // flexDirection: 'cloumn',
  alignItems: 'center',
  width: '100%',
  height: '20%',
  // https://www.w3schools.com/css/css_overflow.asp
  overflow: 'auto',
});

const PendingInvitationList = () => {
  return (
    <PendingListWrapper>
      {DUMMY_INVITE.map((ele) => (
        <InviteDataItems key={ele.id} username={ele.username} mail={ele.mail} />
      ))}
    </PendingListWrapper>
  );
};

export default PendingInvitationList;
