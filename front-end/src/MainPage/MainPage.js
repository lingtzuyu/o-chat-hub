import React, { useEffect } from 'react';
import { styled } from '@mui/system';
import AppBar from './AppBar/AppBar';
import FriendsListBar from './FriendsList/FriendsListBar';
import Messenger from './Messenger/Messenger';
import TopBar from './TopBar/TopBar';
import { connect } from 'react-redux';
import { getActions } from '../store/actions/auth_actions';

const MainPageWrapper = styled('div')({
  width: '100%',
  height: '100vh',
  display: 'flex',
});

const MainPage = ({ setUserDetails }) => {
  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) {
      // TODO: logout
      window.location.pathname = '/login';
    } else {
      // store state，從authactions這邊派發
      setUserDetails(accessToken);
    }
  }, []);

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

const mapActionsToProps = (dispatch) => {
  return { ...getActions(dispatch) };
};

export default connect(null, mapActionsToProps)(MainPage);
