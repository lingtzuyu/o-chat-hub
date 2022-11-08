import React from 'react';
import { styled } from '@mui/system';
import AppBar from './AppBar/AppBar';
import FriendsListBar from './FriendsList/FriendsListBar';
import Messenger from './Messenger/Messenger';
import TopBar from './TopBar/TopBar';

const MainPageWrapper = styled('div')({
  width: '100%',
  height: '100vh',
  display: 'flex',
});

const MainPage = () => {
  return (
    <>
      <MainPageWrapper>
        <AppBar />
        <FriendsListBar />
        <Messenger />
        <TopBar />
      </MainPageWrapper>
    </>
  );
};

export default MainPage;
