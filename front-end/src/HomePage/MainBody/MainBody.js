import React from 'react';
import styled from '@emotion/styled';
import MessgaeTopIcon from '../../MainPage/FriendsList/MessgaeTopIcon';
import FriedListBarWithTitle from '../../MainPage/FriendsList/FriendListBarWithTitle';
import PendingInvitationList from '../../MainPage/FriendsList/PendingInvitationList';
import FriendsListLabel from '../../MainPage/FriendsList/FriendsListLabel';
import { AddFriendIcon } from '../../MainPage/FriendsList/AddFriendIcon';
import MessageAreaContent from '../../MainPage/Messenger/MessageAreaContent';
import MessageAreaTopBar from '../../MainPage/MessageStatusBar/MessageAreaTopBar';
import Messages from '../../MainPage/Messenger/Messages';
import { MessageContentArea } from '../../MainPage/Messenger/MessageContentArea';
import MessageTextField from '../../MainPage/Messenger/MessageTextField';

const LeftFriendBarContainer = styled('div')({
  width: '20%',
  height: '100vh',
  display: 'flex',
  flexDirection: 'Column',
  backgroundColor: '#DFF6FF',
});
const MiddleMessageBarContainer = styled('div')({
  width: '40%',
  height: '100vh',
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'Column',
  backgroundColor: 'white',
  borderRight: '0.5px solid grey',
});

const RightCardBarContainer = styled('div')({
  width: '40%',
  height: '100vh',
  display: 'flex',
  backgroundColor: 'whie',
});

export default function MainBody() {
  return (
    //

    <>
      <LeftFriendBarContainer>
        <MessgaeTopIcon />
        {/* <FriendsListLabel label="Friends" />
        <AddFriendIcon /> */}
        <FriedListBarWithTitle />

        <PendingInvitationList />
      </LeftFriendBarContainer>
      <MiddleMessageBarContainer>
        <MessageAreaTopBar />
        <MessageContentArea />
      </MiddleMessageBarContainer>
      <RightCardBarContainer></RightCardBarContainer>
    </>
  );
}
