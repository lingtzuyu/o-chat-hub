import React from 'react';
import { styled } from '@mui/system';
import InviteDataItems from './InviteDataItems';
import { connect } from 'react-redux';
import FriendsListLabel from './FriendsListLabel';

const PendingListTitleContainer = styled('div')({
  width: '96%',
  height: '8%',
  marginLeft: '20px',
  marginTop: '16px',
  display: 'flex',
  justifyContent: 'space-around',
});

const PendingListContainer = styled('div')({
  alignItems: 'center',
  width: '100%',
  height: '12%',
  overflow: 'auto',
});

// 線上即時傳送 => ws
// 在接上的第一時間抓DB資料庫渲染 => new connection (socket.js在建立連線的時候)
const PendingInvitationList = ({ pendingInvitation }) => {
  return (
    <>
      <PendingListTitleContainer>
        <FriendsListLabel label="Invitations" />
      </PendingListTitleContainer>
      <PendingListContainer>
        {pendingInvitation.map((ele) => (
          <InviteDataItems
            key={ele.sender_user_id}
            id={ele.sender_user_id}
            username={ele.username}
            mail={ele.mail}
          />
        ))}
      </PendingListContainer>
    </>
  );
};

// friends 在 rootReducer (store.js)那邊綁定
const mapStoreStateToProps = ({ friends }) => {
  return {
    ...friends,
  };
};

export default connect(mapStoreStateToProps)(PendingInvitationList);
