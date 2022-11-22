// 取代FriendDataItem.js

import React from 'react';
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

import OnlineIndicator from './OnlineIndicator';
import OfflineIndicator from './OfflineIndicator';

import { chatTypes, getActions } from '../../store/actions/chat_actions';
import { connect } from 'react-redux';

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

export const LeftBarFriendListBuilder = ({
  id,
  username,
  isOnline,
  setChosenChatDetails,
}) => {
  // 取得username渲染上方
  const openConversation = () => {
    setChosenChatDetails({ id: id, name: username }, chatTypes.DIRECT);
    console.log('openConversation內的', username);
  };

  return (
    <RootWrapper>
      {/* ListItemWrapper後面可以+屬性"SELECTED"變成選取狀態 */}
      <List button={true}>
        <Box mt={2}>
          <ListItemWrapper>
            <ListItemAvatar>
              <Avatar src="/static/images/avatars/1.jpg" />
            </ListItemAvatar>
            <ListItemText
              onClick={openConversation}
              sx={{
                mr: 1,
              }}
              primaryTypographyProps={{
                color: 'textPrimary',
                variant: 'h5',
                noWrap: true,
              }}
              secondaryTypographyProps={{
                color: 'textSecondary',
                noWrap: true,
              }}
              primary={username}
              // TODO: demo這邊可以用成假文字
              secondary={id}
            />
            {isOnline ? <OnlineIndicator /> : <OfflineIndicator />}
          </ListItemWrapper>
        </Box>
      </List>
    </RootWrapper>
  );
};

const mapActionsToProps = (dispatch) => {
  return { ...getActions(dispatch) };
};

export default connect(null, mapActionsToProps)(LeftBarFriendListBuilder);

// 這兩個應該要在上面那層wrap各別產出的Friend List
// <List>
// <Box mt={2}>
