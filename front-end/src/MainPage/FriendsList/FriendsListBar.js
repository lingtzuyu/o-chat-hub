import React from 'react';
import { styled } from '@mui/system';
import AddFriendButton from './AddFriendButton';
import FriendsListLabel from './FriendsListLabel';
import FriendsUsernameList from './FriendsUsernameList';
import PendingInvitationList from './PendingInvitationList';

const FriendsListWrapper = styled('div')({
  width: '298px',
  height: '1000px',
  marginTop: '80px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  backgroundColor: 'white',
  borderRight: '2px solid grey',
  // 這邊icon會直條呈現
});

const FriendsListBar = () => {
  return (
    <FriendsListWrapper>
      <AddFriendButton />
      <FriendsListLabel label="Direct Messages" />
      <FriendsUsernameList />
      <FriendsListLabel label="Friends Request" />
      <PendingInvitationList />
    </FriendsListWrapper>
  );
};

export default FriendsListBar;
