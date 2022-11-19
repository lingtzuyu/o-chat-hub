import React from 'react';
import styled from '@emotion/styled';
import MessgaeTopIcon from '../../MainPage/FriendsList/MessgaeTopIcon';
import FriedListBarWithTitle from '../../MainPage/FriendsList/FriendListBarWithTitle';
import PendingInvitationList from '../../MainPage/FriendsList/PendingInvitationList';
import MessageAreaTopBar from '../../MainPage/MessageStatusBar/MessageAreaTopBar';
import { MessageContentArea } from '../../MainPage/Messenger/MessageContentArea';
import CardArea from '../../MainPage/CardArea/CardArea';
import CardFilterArea from '../../MainPage/CardArea/CardFilterArea';
import CardTransferArea from '../../MainPage/CardArea/CardTransferArea';

const LeftFriendBarContainer = styled('div')({
  width: '20%',
  height: '100vh',
  display: 'flex',
  flexDirection: 'Column',
  backgroundColor: '#DFF6FF',
});
const MiddleMessageBarContainer = styled('div')({
  width: '50%',
  height: '100vh',
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'column',
  backgroundColor: 'white',
  borderRight: '0.5px solid grey',
});

const RightCardBarContainer = styled('div')({
  width: '30%',
  height: '100vh',
  display: 'flex',
  flexDirection: 'column',
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
      <RightCardBarContainer>
        <CardFilterArea></CardFilterArea>
        <CardArea></CardArea>
        <CardTransferArea></CardTransferArea>
      </RightCardBarContainer>
    </>
  );
}