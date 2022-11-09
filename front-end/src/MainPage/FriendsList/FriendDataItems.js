import React from 'react';
import Button from '@mui/material/Button';

import { Typography } from '@mui/material';

// TODO:　functional component for
// 1. 操控inOnline 紅下線，綠上線
// 2. 是可以按的按鈕，按下去開啟對話
// 3. 排版: 頭像 名字 上線狀態

const FriendDataItems = ({ id, username, isOnline }) => {
  return (
    <Button
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
        width: '80%',
        height: '36px',
        marginTop: '10px',
        textTransform: 'none',
        backgroundColor: 'grey',
        color: 'black',
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
      {/* TODO: 待修，現在都只會是online */}
      {{ isOnline } ? 'online' : 'offline'}
    </Button>
  );
};

export default FriendDataItems;
