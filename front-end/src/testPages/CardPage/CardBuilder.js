// 放單卡
import React, { useState } from 'react';
import {
  Box,
  CardHeader,
  Card,
  List,
  ListItemAvatar,
  ListItem,
  ListItemText,
  Typography,
  Divider,
  useTheme,
  styled,
  Checkbox,
  IconButton,
} from '@mui/material';
import Label from '../../shared/components/Lable';
import Text from '../../shared/components/Text';

import AutoAwesomeMosaicTwoToneIcon from '@mui/icons-material/AutoAwesomeMosaicTwoTone';
import CardTravelTwoToneIcon from '@mui/icons-material/CardTravelTwoTone';
import ContactPhoneTwoToneIcon from '@mui/icons-material/ContactPhoneTwoTone';
import EvStationTwoToneIcon from '@mui/icons-material/EvStationTwoTone';
import NightlifeIcon from '@mui/icons-material/Nightlife';
// stands for work
import WorkIcon from '@mui/icons-material/Work';

// stands for knowledge
import SchoolIcon from '@mui/icons-material/School';

import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Favorite from '@mui/icons-material/Favorite';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';

import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

import { getActions } from '../../store/actions/card_actions';
import { connect } from 'react-redux';
import Work from '@mui/icons-material/Work';
import QuickMessageView from './QuickMessageView';

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

// stands for life

const CardBuilderWork = ({
  noteTime,
  from,
  category,
  title,
  notes,
  liked,
  transferred,
  deleted,
  messageRecords,
  selecteExportCards,
  isMessageViewOpen,
  setMessageView,
}) => {
  const theme = useTheme();

  const handleOpenMessageView = () => {
    console.log(messageRecords);
    setMessageView(true);
  };

  const handleCloseMessageView = () => {
    setMessageView(false);
  };

  // TODO: 之後notion正式點起來的時候使用
  const handleSelected = () => {
    const selectedCardInfo = {
      noteTime: noteTime,
      from: from,
      messageRecords: messageRecords,
      notes: notes,
      category: category,
    };

    // 轉換卡片用
    selecteExportCards(selectedCardInfo);
    console.log(selectedCardInfo);
  };
  console.log('messageRecords', messageRecords);
  return (
    <Box sx={{ backgroundColor: '#EAF6F6' }}>
      <ListItem
        sx={{
          alignItems: 'flex-start',
          p: 2,
        }}
      >
        {/* <Checkbox {...label} size="small" /> */}
        <Box alignSelf="center" display="flex" flexDirection="column">
          <ListItemAvatar
            sx={{
              mr: 2,
              display: 'flex',
              alignItems: 'center',
              minWidth: 0,
              marginRight: '60px',
            }}
          >
            <WorkIcon />
          </ListItemAvatar>
        </Box>

        {/* 與誰的訊息 */}

        <ListItemText
          primary={<Typography variant="h4"> {title}</Typography>}
          secondary={
            <div
              dangerouslySetInnerHTML={{
                __html: notes,
              }}
            />
          }
        />

        <Box alignSelf="center" display="flex">
          <Checkbox
            {...label}
            icon={<FavoriteBorder />}
            checkedIcon={<Favorite />}
            style={{ color: '#223354' }}
          />
          <IconButton>
            <DeleteOutlineIcon
              style={{
                color: '#223354',
              }}
            />
          </IconButton>
          {/* 按了之後就打開紀錄的訊息 */}
          <>
            <IconButton
              messageRecords={messageRecords}
              onClick={handleOpenMessageView}
            >
              <Box
                mt={0.5}
                marginTop="7px"
                marginLeft="3px"
                marginBottom={'10px'}
              >
                <Label color="secondary">
                  <b>{messageRecords.length}</b>
                </Label>
              </Box>
            </IconButton>
            {/* 拿messageRecords到下層渲染 */}
            <QuickMessageView messageRecords={messageRecords} />
          </>
        </Box>
        {/* <Box
          alignSelf="center"
          marginLeft="30px"
          display="flex"
          flexDirection="column"
        >
          <Box mt={0.5}>
            <Label color="secondary">
              <b>{messageRecords.length}</b>
            </Label>
          </Box>
        </Box> */}
      </ListItem>
      <Divider />
    </Box>
  );
};

const mapStoreStateToPropse = ({ card }) => {
  return { ...card };
};

const mapActionsToProps = (dispatch) => {
  return { ...getActions(dispatch) };
};

export default connect(
  mapStoreStateToPropse,
  mapActionsToProps
)(CardBuilderWork);
