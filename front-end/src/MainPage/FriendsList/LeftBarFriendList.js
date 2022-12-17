import * as React from 'react';
import {
  Box,
  Typography,
  FormControlLabel,
  Switch,
  Tabs,
  Tab,
  TextField,
  IconButton,
  InputAdornment,
  Avatar,
  List,
  Button,
  Tooltip,
  Divider,
  AvatarGroup,
  ListItemButton,
  ListItemAvatar,
  ListItemText,
  lighten,
  styled,
} from '@mui/material';

import ProfilePhoto from '../../shared/images/ProfilePhoto.jpg';

import { formatDistance, subMinutes, subHours } from 'date-fns';
import SettingsTwoToneIcon from '@mui/icons-material/SettingsTwoTone';
import SearchTwoToneIcon from '@mui/icons-material/SearchTwoTone';

import Label from '../../shared/components/Lable';

import CheckTwoToneIcon from '@mui/icons-material/CheckTwoTone';
import AlarmTwoToneIcon from '@mui/icons-material/AlarmTwoTone';
import { Link as RouterLink } from 'react-router-dom';

import LeftBarFriendListBuilder from './LeftBarFriendListBuilder';

import { connect } from 'react-redux';

const FriedListWrapper = styled('div')({
  overflow: 'auto',
  flexGrow: 1,
  width: '90%',
});

const MainContainer = styled('div')({
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
});

const checkOnline = (friends = [], onlineUsers = []) => {
  // iterate每個朋友檢查他是否online
  friends.forEach((friend) => {
    // find找到就停止的特性效率上會比較好
    const isOnline = onlineUsers.find((ele) => ele.userMail === friend.mail);
    // 新增一個欄位 isOnline (1 online, 0 offline)
    friend.isOnline = isOnline ? 1 : 0;
  });
  return friends;
};

const LeftBarFriendList = ({ friends, onlineUsers }) => {
  return (
    // <MainContainer>
    <FriedListWrapper>
      {checkOnline(friends, onlineUsers).map((ele, index) => (
        <LeftBarFriendListBuilder
          // FriendDataItems會製造擺放這些key, username, id的元素
          photo={ele.photo}
          organization={ele.organization}
          index={index}
          key={ele.id}
          username={ele.username}
          id={ele.id}
          // 如果mail跟socket廣播onlineUsers資料中任何一個相符合的話，就代表online
          isOnline={ele.isOnline}
        />
      ))}
    </FriedListWrapper>
    // </MainContainer>
  );
};

const mapStoreStateToProps = ({ friends }) => {
  return { ...friends };
};

export default connect(mapStoreStateToProps)(LeftBarFriendList);
