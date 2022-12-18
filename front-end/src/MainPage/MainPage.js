import React, { useEffect } from 'react';
import { styled } from '@mui/system';

import { connect } from 'react-redux';
import { getActions } from '../store/actions/auth_actions';
import { connectSocketBackend } from '../chat/socketConnectionClient';

import TopAppBar from './TopBar/TopAppBar';

import MainBody from '../HomePage/MainBody/MainBody';

const MainPageWrapper = styled('div')({
  width: '100%',
  height: '90%',
  display: 'flex',
});

const TopBarWrapper = styled('div')({
  width: '100%',
  height: '10%',
  display: 'flex',
});

const MainPage = ({ setUserDetails }) => {
  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    // const userMail = localStorage.getItem('userMail');
    if (!accessToken) {
      window.location.pathname = '/login';
    } else {
      // store state，從authactions這邊派發，之後userEmail可以從這邊解
      setUserDetails(accessToken);
      // TODO: 透過socket.id與mail (唯一值) 的綁定廣播來讓別人知道某人上線，改寫
      connectSocketBackend(accessToken);
    }
  }, []);

  return (
    <>
      <TopBarWrapper>
        <TopAppBar />
      </TopBarWrapper>
      <MainPageWrapper>
        {/* <AppBar />
        <FriendsListBar />
        <Messenger />
        <CardArea />
        
        <MessageStatusBar /> */}

        <MainBody></MainBody>
      </MainPageWrapper>
    </>
  );
};

const mapActionsToProps = (dispatch) => {
  return { ...getActions(dispatch) };
};

export default connect(null, mapActionsToProps)(MainPage);
