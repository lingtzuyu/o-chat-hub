// 各個好友按鈕的公版
import React from 'react';
import Button from '@mui/material/Button';

import { Typography } from '@mui/material';

import { chatTypes, getActions } from '../../store/actions/chat_actions';
import { connect } from 'react-redux';

// TODO:　functional component for
// 1. 操控inOnline 紅下線，綠上線
// 2. 是可以按的按鈕，按下去開啟對話
// 3. 排版: 頭像 名字 上線狀態

// setSelectedChatInfo 是從props傳過來的
const FriendDataItems = ({ id, username, isOnline, setChosenChatDetails }) => {
  const openConversation = () => {
    // 這邊是在那個button裡面的id, name...etc.
    // chatDetails 裡面可以正確抓到id, name
    // 傳details檔案以及type
    setChosenChatDetails({ id: id, name: username }, chatTypes.DIRECT);
    console.log('openConversation內的', username);
  };

  return (
    // TODO: Button上建立一個onClick來打開聊天室
    <Button
      onClick={openConversation}
      style={{
        display: 'flex',
        width: '80%',
        height: '36px',
        marginTop: '10px',
        textTransform: 'none',
        backgroundColor: 'grey',
        color: 'black',
        alignItems: 'center',
        justifyContent: 'flex-start',
        position: 'relative',
      }}
    >
      {/* TODO: 無法正常顯示圖片，待處理 */}
      {/* <Avatar alt={username} src="../../shared/images/fake_avatar.png" /> */}
      <Typography
        align="center"
        variant="subtitle1"
        style={{
          marginleft: '10px',
          marginRight: '10px',
          fontWeight: 800,
          color: 'Black',
        }}
      >
        {id}
      </Typography>
      <Typography
        align="center"
        variant="subtitle1"
        style={{ marginleft: '10px', fontWeight: 800, color: 'Black' }}
      >
        {username}
      </Typography>
      {/* TODO: 之後改成icon */}
      {/* DB的online offline以1: online 0: offline寫 */}
      {isOnline ? 'online' : 'offline'}
    </Button>
  );
};

const mapActionsToProps = (dispatch) => {
  return { ...getActions(dispatch) };
};

export default connect(null, mapActionsToProps)(FriendDataItems);
