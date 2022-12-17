import React, { useState, useEffect, useRef } from 'react';
import Swal from 'sweetalert2';

import {
  Box,
  ListItemAvatar,
  ListItemText,
  Divider,
  List,
  ListItem,
  Card,
  Typography,
  IconButton,
  Button,
  Avatar,
  styled,
  useTheme,
  Dialog,
} from '@mui/material';

import { getActions } from '../../store/actions/card_actions';
import { connect } from 'react-redux';
import * as api from '../../api';
import MoreVertTwoToneIcon from '@mui/icons-material/MoreVertTwoTone';

import Scrollbar from '../../../src/shared/components/Scrollbar';
import Text from '../../shared/components/Text';
import ArrowForwardTwoToneIcon from '@mui/icons-material/ArrowForwardTwoTone';

const ListWrapper = styled(List)(
  () => `
    .MuiDivider-root:first-of-type {
        display: none;
    }
  `,
);

const accessToken = localStorage.getItem('accessToken');

function DeleteAlertMessage({ isDeleteAlertOpen, setDeleteAlert, cardId }) {
  const deletedCardInfo = { data: { token: accessToken, cardId: cardId } };

  const theme = useTheme();

  const handleConfirmDelete = async () => {
    await api.deleteCard(deletedCardInfo);
    setDeleteAlert(false);
  };

  const handleCloseThisDialog = () => {
    setDeleteAlert(false);
  };

  return (
    <Dialog open={isDeleteAlertOpen} onClose={handleCloseThisDialog}>
      <Card
        sx={{
          position: 'relative',
        }}
      >
        {/* 標題 */}
        <Box pt={3} px={3}>
          <Typography
            variant="h3"
            sx={{
              textAlign: 'center',
            }}
          >
            {'Warning'}
          </Typography>
          <Typography variant="subtitle2">
            {'Please note the deleted card can not be recovered'}.
          </Typography>
        </Box>

        <Divider />
        <Box display="flex" justifyContent={'center'}>
          <Box
            p={3}
            sx={{
              textAlign: 'center',
            }}
          >
            <Button
              variant="contained"
              endIcon={<ArrowForwardTwoToneIcon />}
              size="small"
              onClick={handleConfirmDelete}
            >
              {'Confirm'}
            </Button>
          </Box>
          <Box
            p={3}
            sx={{
              textAlign: 'center',
            }}
          >
            <Button
              variant="contained"
              endIcon={<ArrowForwardTwoToneIcon />}
              size="small"
              onClick={handleCloseThisDialog}
            >
              {'Cancel'}
            </Button>
          </Box>
        </Box>
      </Card>
    </Dialog>
  );
}

const mapStoreStateToProps = ({ card }) => {
  return { ...card };
};

const mapActionsToProps = (dispatch) => {
  return {
    ...getActions(dispatch),
  };
};

export default connect(
  mapStoreStateToProps,
  mapActionsToProps,
)(DeleteAlertMessage);
