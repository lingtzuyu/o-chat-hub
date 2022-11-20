import React from 'react';

import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import { Typography } from '@mui/material';

import CategoryDropDown from './CategoryDropDown';
import MainButton from '../../../shared/components/MainButton';
import { SelectedMessagesArea } from './SelectedMessagesArea';

import { getActions } from '../../../store/actions/card_actions';
import { connect } from 'react-redux';

export const TransferMessagePopout = ({
  isPopoutOpen,
  closePopout,
  showSelectMessageBox,
  saveTransferredMessagesToMongo,
}) => {
  const messagesCollectionInString = localStorage.getItem(
    'selectedMessagesCollection'
  );
  const messagesArray = JSON.parse(messagesCollectionInString);
  const accessToken = localStorage.getItem('accessToken');
  const category = localStorage.getItem('noteCategory');
  const messagesToBeSent = {
    category: category,
    messagesToBeSaved: messagesArray,
    token: accessToken,
  };

  const handleTransferAfterConfirm = () => {
    // console.log(category);
    // TODO:
    // 1. 按下確認後，儲存至DB以及store
    // POST API (帶message ID即可)
    // store action and (帶整串，因為等等要用整串渲染右邊卡片區)
    saveTransferredMessagesToMongo(messagesToBeSent);
    // // 2. 將核取方塊狀態設回去
    // showSelectMessageBox(true, 'plain');
    // TODO: 通知反核取 => Already issue Bug Ticket in Trello

    // 清空localStorage
    handleClosePopout();
  };

  const handleClosePopout = () => {
    // TODO: 清空localStorage，並且把核取方塊轉為ture(不能選)
    localStorage.removeItem('selectedMessagesCollection');
    localStorage.removeItem('noteCategory');
    showSelectMessageBox(true, 'plain');
    closePopout();
    // TODO: 通知反核取 => Bug Ticket Trello
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
            <Typography>Select categories</Typography>
          </DialogContentText>
        </DialogContent>
        <CategoryDropDown />
        <SelectedMessagesArea />
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

const mapStoreStateToPropse = ({ card }) => {
  return { ...card };
};

const mapActionsToProps = (dispatch) => {
  return { ...getActions(dispatch) };
};

export default connect(
  mapStoreStateToPropse,
  mapActionsToProps
)(TransferMessagePopout);
