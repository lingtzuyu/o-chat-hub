import React from 'react';

import Button from '@mui/material/Button';
import { Typography } from '@mui/material';
import styled from '@emotion/styled';

import Avatar from '../../shared/components/Avatar';
import OnlineIndicator from './OnlineIndicator';
import OfflineIndicator from './OfflineIndicator';

import { chatTypes, getActions } from '../../store/actions/chat_actions';
import { connect } from 'react-redux';

const ProfileContainer = styled('div')({
  marginTop: '10px',
  borderBottom: '1px solid grey',
  align: 'center',
  height: '60px',
});

const MainContainer = styled('div')({
  width: '90%',
});

// 各個好友按鈕的公版
const FriendDataItems = ({ id, username, isOnline, setChosenChatDetails }) => {
  const openConversation = () => {
    setChosenChatDetails({ id: id, name: username }, chatTypes.DIRECT);
    console.log('openConversation內的', username);
  };

  return (
    <ProfileContainer>
      <MainContainer>
        <Button
          onClick={openConversation}
          style={{
            display: 'flex',
            width: '100%',
            height: '60px',
            marginTop: '10px',
            textTransform: 'none',
            backgroundColor: 'white',
            borderBottom: '1px, solid',
            color: 'black',
            alignItems: 'center',
            justifyContent: 'flex-start',
            position: 'relative',
          }}
        >
          <Avatar username={username} />

          <Typography
            marginLeft="10px"
            align="center"
            variant="subtitle1"
            style={{ marginleft: '10px', fontWeight: 600, color: 'Black' }}
          >
            {username}
          </Typography>
          {/* TODO: 之後改成icon */}
          {/* DB的online offline以1: online 0: offline寫 */}
          {isOnline ? <OnlineIndicator /> : <OfflineIndicator />}
        </Button>
      </MainContainer>
    </ProfileContainer>
  );
};

const mapActionsToProps = (dispatch) => {
  return { ...getActions(dispatch) };
};

export default connect(null, mapActionsToProps)(FriendDataItems);
