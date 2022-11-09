// 取得資料並且渲染好友列表
import React from 'react';
import { styled } from '@mui/system';

// 假資料
import { DUMMY_FRIENDS } from './DUMMY_LIST';

import FriendDataItems from './FriendDataItems';

const FriedListWrapper = styled('div')({
  overflow: 'auto',
  flexGrow: 1,
  width: '100%',
});

const FriendsUsernameList = () => {
  return (
    <FriedListWrapper>
      {/* 拆解出來渲染 */}

      {/* !!! forEach()方法不会返回执行结果，而是undefined。 forEach() 被调用时，不会改变原数组，也就是调用它的数组（尽管callback 函数在被调用时可能会改变原数组）。 map()方法会分配内存空间存储新数组并返回，map 不修改调用它的原数组本身（当然可以在callback 执行时改变原数组 !!!*/}

      {DUMMY_FRIENDS.map((ele) => (
        <FriendDataItems
          // FriendDataItems會製造擺放這些key, username, id的元素
          key={ele.id}
          username={ele.username}
          id={ele.id}
          isOnline={false.isOnline}
        />
      ))}
    </FriedListWrapper>
  );
};

export default FriendsUsernameList;
