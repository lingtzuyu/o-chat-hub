import React from 'react';

import {
  Box,
  Divider,
  List,
  Card,
  Typography,
  Button,
  styled,
  useTheme,
  Dialog,
} from '@mui/material';

import { getActions } from '../../store/actions/card_actions';
import { connect } from 'react-redux';
import * as api from '../../api';

import ArrowForwardTwoToneIcon from '@mui/icons-material/ArrowForwardTwoTone';

const accessToken = localStorage.getItem('accessToken');

function DeleteAlertMessage({ isDeleteAlertOpen, setDeleteAlert, cardId }) {
  const deletedCardInfo = { data: { token: accessToken, cardId: cardId } };

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
