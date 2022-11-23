import React, { useState } from 'react';
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
// import useAuth from 'src/hooks/useAuth';
// import { useTranslation } from 'react-i18next';
import { formatDistance, subMinutes, subHours } from 'date-fns';
import SettingsTwoToneIcon from '@mui/icons-material/SettingsTwoTone';
import SearchTwoToneIcon from '@mui/icons-material/SearchTwoTone';
import Label from '../shared/components/Lable';
import CheckTwoToneIcon from '@mui/icons-material/CheckTwoTone';
import AlarmTwoToneIcon from '@mui/icons-material/AlarmTwoTone';
import { Link as RouterLink } from 'react-router-dom';

import TempProfilePic from '../shared/images/ProfilePhoto.jpg';

import LeftBarFriendListBuilder from '../MainPage/FriendsList/LeftBarFriendListBuilder';

import { AddFriendIcon } from '../MainPage/FriendsList/AddFriendIcon';

import { connect } from 'react-redux';
import PendingInvitationList from '../MainPage/FriendsList/PendingInvitationList';
import LeftBarPendingListBuilder from '../MainPage/FriendsList/LeftBarPendingListBuilder';

const AvatarSuccess = styled(Avatar)(
  ({ theme }) => `
          background-color: ${theme.colors.success.lighter};
          color: ${theme.colors.success.main};
          width: ${theme.spacing(8)};
          height: ${theme.spacing(8)};
          margin-left: auto;
          margin-right: auto;
    `
);

const MeetingBox = styled(Box)(
  ({ theme }) => `
          background-color: ${lighten(theme.colors.alpha.black[10], 0.5)};
          margin: ${theme.spacing(2)} 0;
          border-radius: ${theme.general.borderRadius};
          padding: ${theme.spacing(2)};
    `
);

const RootWrapper = styled(Box)(
  ({ theme }) => `
        padding: ${theme.spacing(2.5)};
  `
);

const ListItemWrapper = styled(ListItemButton)(
  ({ theme }) => `
        &.MuiButtonBase-root {
            margin: ${theme.spacing(1)} 0;
        }
  `
);

const TabsContainerWrapper = styled(Box)(
  ({ theme }) => `
        .MuiTabs-indicator {
            min-height: 4px;
            height: 4px;
            box-shadow: none;
            border: 0;
        }

        .MuiTab-root {
            &.MuiButtonBase-root {
                padding: 0;
                margin-right: ${theme.spacing(3)};
                font-size: ${theme.typography.pxToRem(16)};
                color: ${theme.colors.alpha.black[50]};

                .MuiTouchRipple-root {
                    display: none;
                }
            }

            &.Mui-selected:hover,
            &.Mui-selected {
                color: ${theme.colors.alpha.black[100]};
            }
        }
  `
);

// 檢查線上狀態更改綠點或是紅點
// TODO: 若後端setInterval那邊改掉需要改方式
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

function SidebarContent({ friends, onlineUsers, pendingInvitation }) {
  const userMail = localStorage.getItem('userMail');
  // TODO: 取得username的方式來取代name

  const user = { name: userMail, mail: userMail };

  // const { user } = 'test';

  const [state, setState] = useState({
    invisible: true,
  });

  const handleChange = (event) => {
    setState({
      ...state,
      [event.target.name]: event.target.checked,
    });
  };

  // TODO: 之後做上下線判斷用
  const [currentTab, setCurrentTab] = useState('all');

  const tabs = [
    { value: 'all', label: 'All' },
    { value: 'online', label: 'Online' },
    { value: 'offline', label: 'Offline' },
  ];

  const handleTabsChange = (_event, value) => {
    setCurrentTab(value);
  };

  return (
    <RootWrapper>
      <Box display="flex" alignItems="flex-start">
        <Avatar alt={user.name} src={TempProfilePic} />
        <Box
          sx={{
            ml: 1.5,
            flex: 1,
          }}
        >
          <Box
            display="flex"
            alignItems="flex-start"
            justifyContent="space-between"
          >
            <Box>
              <Typography variant="h5" noWrap>
                {/* 使用者名稱 */}
                {user.name}
              </Typography>
              <Typography variant="subtitle1" noWrap>
                {/* 使用者信箱，之後也可以改成職位或是暱稱 */}
                {user.mail}
              </Typography>
            </Box>
            {/* setting icon */}
            <IconButton
              sx={{
                p: 1,
              }}
              size="small"
              color="primary"
            >
              <SettingsTwoToneIcon fontSize="small" />
            </IconButton>
          </Box>

          {/* 功能未來得及，暫時拿掉 */}
          {/* <FormControlLabel
            control={
              <Switch
                checked={state.invisible}
                onChange={handleChange}
                name="invisible"
                color="primary"
              />
            }
            label={'Invisible'}
          /> */}
        </Box>
      </Box>

      {/* Search bar，可以先留著之後功能用 */}
      <TextField
        sx={{
          mt: 2,
          mb: 1,
        }}
        size="small"
        fullWidth
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchTwoToneIcon />
            </InputAdornment>
          ),
        }}
        placeholder={'Search...'}
      />
      {/* 標題，contact */}
      <Box display="flex" justifyContent={'space-between'} pb={1} mt={4}>
        <Typography
          sx={{
            mb: 1,
            mt: 2,
          }}
          variant="h3"
        >
          {'Contact'}
        </Typography>
        <AddFriendIcon />
      </Box>

      {/* Tab區域，若是功能未到就拿掉 */}
      <TabsContainerWrapper>
        <Tabs
          onChange={handleTabsChange}
          value={currentTab}
          variant="scrollable"
          scrollButtons="auto"
          textColor="primary"
          indicatorColor="primary"
        >
          {tabs.map((tab) => (
            <Tab key={tab.value} label={tab.label} value={tab.value} />
          ))}
        </Tabs>
      </TabsContainerWrapper>

      {/* 聯絡人區域  */}
      <Box mt={2}>
        {/* all的這個邏輯可以拿掉  */}
        {checkOnline(friends, onlineUsers).map((ele, index) => (
          <LeftBarFriendListBuilder
            // FriendDataItems會製造擺放這些key, username, id的元素
            index={index}
            key={ele.id}
            username={ele.username}
            id={ele.id}
            // 如果mail跟socket廣播onlineUsers資料中任何一個相符合的話，就代表online
            isOnline={ele.isOnline}
          />
        ))}
      </Box>

      {/* 改成待接受好友區域  */}
      <Box display="flex" pb={1} mt={4} alignItems="center">
        {/* Meeting文字，可以改成待接受好友  */}
        <Typography
          sx={{
            mr: 1,
          }}
          variant="h3"
        >
          {'Invitations'}
        </Typography>
        <Label color="info">
          {/* TODO: 這邊可以用pending invitation list的數量 */}
          <b>{pendingInvitation.length}</b>
        </Label>
      </Box>

      {/* 接受好友的方框 */}
      {pendingInvitation.map((ele) => (
        <LeftBarPendingListBuilder
          key={ele.sender_user_id}
          id={ele.sender_user_id}
          username={ele.username}
          mail={ele.mail}
        />
      ))}
    </RootWrapper>
  );
}

const mapStoreStateToProps = ({ friends }) => {
  return { ...friends };
};

export default connect(mapStoreStateToProps)(SidebarContent);

// const themeColors = {
//   primary: '#2442AF',
//   secondary: '#6E759F',
//   success: '#57CA22',
//   warning: '#FFA319',
//   error: '#FF1943',
//   info: '#33C2FF',
//   black: '#223354',
//   white: '#ffffff',
//   primaryAlt: '#000C57'
// };
