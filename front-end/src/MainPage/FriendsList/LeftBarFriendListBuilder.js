// 取代FriendDataItem.js，要留，重構要移到testPage區域

import React from 'react';
import {
  Box,
  Avatar,
  List,
  Tooltip,
  ListItemButton,
  ListItemAvatar,
  ListItemText,
  styled,
} from '@mui/material';

import OnlineIndicator from './OnlineIndicator';
import OfflineIndicator from './OfflineIndicator';

import { chatTypes, getActions } from '../../store/actions/chat_actions';
import { connect } from 'react-redux';

const RootWrapper = styled(Box)(
  ({ theme }) => `
        padding: ${theme.spacing(0.5)};
  `,
);

const ListItemWrapper = styled(ListItemButton)(
  ({ theme }) => `
        &.MuiButtonBase-root {
            margin: ${theme.spacing(1)} 0;
        }
  `,
);

export const LeftBarFriendListBuilder = ({
  id,
  username,
  isOnline,
  setChosenChatDetails,
  photo,
  organization,
  mail,
}) => {
  // 取得username渲染上方，並點亮save Button
  const openConversation = () => {
    setChosenChatDetails(
      {
        id: id,
        name: username,
        photo: photo,
        organization: organization,
        mail: mail,
      },
      chatTypes.DIRECT,
      false,
    );
    // 要將saveButton的disable設false
  };

  return (
    // 使List變成可以按的Button
    <List button={true} disablePadding component="div">
      <ListItemWrapper>
        <ListItemAvatar>
          <Tooltip arrow title={mail}>
            <Avatar src={photo} alt={username} />
          </Tooltip>
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
          secondary={organization}
        />
        {isOnline ? <OnlineIndicator /> : <OfflineIndicator />}
      </ListItemWrapper>
    </List>
  );
};

const mapActionsToProps = (dispatch) => {
  return { ...getActions(dispatch) };
};

export default connect(null, mapActionsToProps)(LeftBarFriendListBuilder);

// 這兩個應該要在上面那層wrap各別產出的Friend List
// <List>
// <Box mt={2}>
