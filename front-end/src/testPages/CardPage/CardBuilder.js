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
import Swal from 'sweetalert2';
// stands for knowledge
import SchoolIcon from '@mui/icons-material/School';

import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Favorite from '@mui/icons-material/Favorite';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';

import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import * as api from '../../api';
import { getActions } from '../../store/actions/card_actions';
import { connect } from 'react-redux';
import Work from '@mui/icons-material/Work';
import QuickMessageView from './QuickMessageView';
import DeleteAlertMessage from './DeleteAlertMessage';

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000,
  // onOpen: (toast) => {
  //   toast.addEventListener('mouseenter', Swal.stopTimer);
  //   toast.addEventListener('mouseleave', Swal.resumeTimer);
  // },
});

// TODO: 這邊變數名稱待改 CardBuilder

const CardBuilderWork = ({
  cardId,
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
  setDeleteAlert,
  setMessagesArrayInQuickView,
}) => {
  const accessToken = localStorage.getItem('accessToken');
  const handleCardInfo = { token: accessToken, cardId: cardId };
  const theme = useTheme();
  const [selected, setSelected] = useState(liked);

  const handleOpenMessageView = () => {
    // 把值傳到state去做渲染
    setMessagesArrayInQuickView(messageRecords);
    console.log(messageRecords);
    setMessageView(true);
  };

  const handleOpenDeleteAlert = () => {
    // set true 打開  delete Alert
    // setDeleteAlert(true);
    // console.log('open delete alert');
    const deletedCardInfo = { token: accessToken, cardId: cardId };
    Swal.fire({
      title: 'Are you sure?',
      html: `<p>The following card will be deleted forever!<p><b>Title:</b> ${title}</p><p><b>Card Id:</b> ${cardId}</p>`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Delete',
    }).then(async (result) => {
      if (result.isConfirmed) {
        const result = await api.deleteCard(deletedCardInfo);
        Toast.fire({
          icon: 'success',
          title: `${result.data.message}`,
        });
        // Swal.fire(`${result.data.message}`);
      }
    });
  };

  const handleCloseMessageView = () => {
    setMessageView(false);
  };

  // Like以及unlike的onchange
  const handleLiked = async () => {
    if (selected === true) {
      setSelected(false);
      Toast.fire({
        icon: 'success',
        title: 'Remove from liked！',
      });
      await api.dislikeCard(handleCardInfo);
    }
    if (selected === false) {
      setSelected(true);
      Toast.fire({
        icon: 'success',
        title: 'Add to liked！',
      });
      await api.likeCard(handleCardInfo);
    }
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
            checked={selected}
            onChange={handleLiked}
            style={{ color: '#223354' }}
          />
          {/* 按了之後打開確認popout */}
          <IconButton onClick={handleOpenDeleteAlert}>
            <DeleteOutlineIcon
              style={{
                color: '#223354',
              }}
            />
          </IconButton>
          {/* <DeleteAlertMessage cardId={cardId} /> */}
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
