import * as React from 'react';
import styled from '@emotion/styled';
import FriendDataItems from './FriendDataItems';
import { connect } from 'react-redux';
import FriendsListLabel from './FriendsListLabel';
import { AddFriendIcon } from '../../MainPage/FriendsList/AddFriendIcon';

// MainContainer
const MainContainer = styled('div')({
  width: '60%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
});

// Top Title
const LeftFriendListTitleContainer = styled('div')({
  width: '96%',
  height: '20%',
  marginLeft: '20px',
  marginTop: '16px',
  display: 'flex',
  justifyContent: 'center',
});

const LeftFriendLabelSubContainer = styled('div')({
  height: '100%',
  display: 'flex',
});

// Friend List container
const LeftFriendListContainer = styled('div')({
  width: '96%',
  height: '80%',
  alignItems: 'center',
  marginLeft: '36px',
  marginTop: '10px',
  // overflow: 'scroll',
});

const LeftFriendListSubContainer = styled('div')({ height: '100%' });

// check online by interating friends frist time
// TODO: 改成小賴建議的資料型態 (socket那邊)
const checkOnline = (friends = [], onlineUsers = []) => {
  friends.forEach((friend) => {
    const isOnline = onlineUsers.find((ele) => ele.userMail === friend.mail);
    // 新增一個欄位 isOnline (1 online, 0 offline)
    friend.isOnline = isOnline ? 1 : 0;
  });
  return friends;
};

// TODO: 改寫FriendsUsernameList
// 從props來的friends => connect to store
const FriedListBarWithTitle = ({ friends, onlineUsers }) => {
  return (
    <MainContainer>
      <LeftFriendListTitleContainer>
        <LeftFriendLabelSubContainer>
          <FriendsListLabel sx={{ alignItems: 'center' }} label="Friends" />
          <AddFriendIcon />
        </LeftFriendLabelSubContainer>
      </LeftFriendListTitleContainer>
      <LeftFriendListContainer>
        <LeftFriendListSubContainer>
          {/* 拆解出來渲染 */}

          {/* !!! forEach()方法不会返回执行结果，而是undefined。 forEach() 被调用时，不会改变原数组，也就是调用它的数组（尽管callback 函数在被调用时可能会改变原数组）。 map()方法会分配内存空间存储新数组并返回，map 不修改调用它的原数组本身（当然可以在callback 执行时改变原数组 !!!*/}
          {/* 用chekOnline生出來的新friends取代原本直接拿backend來的friends資料 */}
          {checkOnline(friends, onlineUsers).map((ele, index) => (
            <FriendDataItems
              // FriendDataItems會製造擺放這些key, username, id的元素
              index={index}
              key={ele.id}
              username={ele.username}
              id={ele.id}
              // 如果mail跟socket廣播onlineUsers資料中任何一個相符合的話，就代表online
              isOnline={ele.isOnline}
            />
          ))}
        </LeftFriendListSubContainer>
      </LeftFriendListContainer>
    </MainContainer>
  );
};

// store.js內卻忍有combine相關的 => friends: friendReducer,
const mapStoreStateToProps = ({ friends }) => {
  return { ...friends };
};

export default connect(mapStoreStateToProps)(FriedListBarWithTitle);
