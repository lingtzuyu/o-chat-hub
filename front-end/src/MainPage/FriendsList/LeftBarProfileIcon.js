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

import CheckTwoToneIcon from '@mui/icons-material/CheckTwoTone';
import AlarmTwoToneIcon from '@mui/icons-material/AlarmTwoTone';
import { Link as RouterLink } from 'react-router-dom';
import { connect } from 'react-redux';

const RootWrapper = styled(Box)(
  ({ theme }) => `
        padding: ${theme.spacing(2.5)};
  `,
);

// 聊天區塊最上方，取代TopIcon
export const LeftBarProfileIcon = (userInfoDetail) => {
  // TODO: 從localStorage拿username，先都用mail
  const userMail = userInfoDetail?.mail;
  const user = { name: userMail, mail: userMail };

  return (
    // <RootWrapper>
    <Box display="flex" alignItems="flex-start">
      <Avatar alt={user.name} src={ProfilePhoto} />
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

          {/* TODO: 修改setting齒輪 */}
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
      </Box>
    </Box>
    // </RootWrapper>
  );
};

const mapStoreStateToProps = ({ card, auth }) => {
  return { ...card, ...auth };
};

export default connect(mapStoreStateToProps)(LeftBarProfileIcon);
