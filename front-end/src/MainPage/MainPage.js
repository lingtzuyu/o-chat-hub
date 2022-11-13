import React, { useEffect } from 'react';
import { styled } from '@mui/system';
import AppBar from './AppBar/AppBar';
import FriendsListBar from './FriendsList/FriendsListBar';
import Messenger from './Messenger/Messenger';
import MessageStatusBar from './MessageStatusBar/MessageStatusBar';
import TopBar from './TopBar/TopBar';
import { connect } from 'react-redux';
import { getActions } from '../store/actions/auth_actions';
import { connectSocketBackend } from '../chat/socketConnectionClient';

const MainPageWrapper = styled('div')({
  width: '100%',
  height: '100vh',
  display: 'flex',
});

const MainPage = ({ setUserDetails }) => {
  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    // const userMail = localStorage.getItem('userMail');
    if (!accessToken) {
      // TODO: logout
      window.location.pathname = '/login';
    } else {
      // store state，從authactions這邊派發，之後userEmail可以從這邊解
      setUserDetails(accessToken);
      // TODO: 透過socket.id與mail (唯一值) 的綁定廣播來讓別人知道某人上線
      connectSocketBackend(accessToken);
    }
  }, []);

  return (
    <>
      <MainPageWrapper>
        <AppBar />
        <FriendsListBar />
        <Messenger />
        <TopBar />
        <MessageStatusBar />
      </MainPageWrapper>
    </>
  );
};

const mapActionsToProps = (dispatch) => {
  return { ...getActions(dispatch) };
};

export default connect(null, mapActionsToProps)(MainPage);
