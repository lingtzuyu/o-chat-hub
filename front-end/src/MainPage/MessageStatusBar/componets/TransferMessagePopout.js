import React from 'react';

import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import { Typography } from '@mui/material';

import MainButton from '../../../shared/components/MainButton';
import { getActions } from '../../../store/actions/card_actions';
import { connect } from 'react-redux';

export const TransferMessagePopout = ({
  isPopoutOpen,
  closePopout,
  showSelectMessageBox,
}) => {
  const handleTransferAfterConfirm = () => {
    // TODO: 按下確認後，儲存至DB
    handleClosePopout();
    // 清空localStorage
    localStorage.removeItem('selectedMessagesCollection');
    showSelectMessageBox(true);
    // TODO: 通知反核取
  };

  const handleClosePopout = () => {
    // TODO: 清空localStorage，並且把核取方塊轉為ture(不能選)
    localStorage.removeItem('selectedMessagesCollection');
    showSelectMessageBox(true);
    closePopout();
    // TODO: 通知反核取
  };

  return (
    <div>
      <Dialog
        open={isPopoutOpen}
        // onClose: Callback fired when the component requests to be closed
        onClose={handleClosePopout}
      >
        <DialogTitle>
          <Typography>Transferring Messages</Typography>
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            <Typography>Please confirm messages to be saved</Typography>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <MainButton
            buttonName="Transfer"
            onClick={handleTransferAfterConfirm}
            customStyles={{ margin: '10' }}
          />
        </DialogActions>
      </Dialog>
    </div>
  );
};

const mapActionsToProps = (dispatch) => {
  return { ...getActions(dispatch) };
};

export default connect(null, mapActionsToProps)(TransferMessagePopout);
