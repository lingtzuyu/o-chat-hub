import React from 'react';
import { styled } from '@mui/system';
import InviteDataItems from './InviteDataItems';
import { connect } from 'react-redux';

const PendingListWrapper = styled('div')({
  // display: 'flex',
  // flexDirection: 'cloumn',
  alignItems: 'center',
  width: '100%',
  height: '20%',
  // https://www.w3schools.com/css/css_overflow.asp
  overflow: 'auto',
});

// 線上即時傳送 => ws
// 在接上的第一時間抓DB資料庫渲染 => new connection (socket.js在建立連線的時候)
const PendingInvitationList = ({ pendingInvitation }) => {
  return (
    <PendingListWrapper>
      {pendingInvitation.map((ele) => (
        <InviteDataItems
          key={ele.sender_user_id}
          id={ele.sender_user_id}
          username={ele.username}
          mail={ele.mail}
        />
      ))}
    </PendingListWrapper>
  );
};

// friends 在 rootReducer (store.js)那邊綁定
const mapStoreStateToProps = ({ friends }) => {
  return {
    ...friends,
  };
};

export default connect(mapStoreStateToProps)(PendingInvitationList);
