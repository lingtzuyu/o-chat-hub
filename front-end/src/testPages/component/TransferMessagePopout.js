// 廢棄嚕，請用popout

import React, { useEffect, useState, useCallback } from 'react';

import { Box } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import { Typography } from '@mui/material';
import InputField from '../../shared/components/InputField';

import CategoryDropDown from './CategoryDropDown';
import MainButton from './MainButton';
import { SelectedMessagesArea } from './SelectedMessagesArea';

import { getActions } from '../../store/actions/card_actions';
import { connect } from 'react-redux';

export const TransferMessagePopout = ({
  isPopoutOpen,
  closePopout,
  showSelectMessageBox,
  saveTransferredMessagesToMongo,
  setSaveMessageButtonDisabled,
  setTransferButtonDisabled,
  chosenChatDetails,
  addCardsAfterTransfer,
}) => {
  const [cardTitle, setCardTitle] = useState('write a good title');
  const [cardNotes, setCardNotes] = useState('write a good note');
  // 帶著accessToken認證欲儲存的訊息
  const messagesCollectionInString = localStorage.getItem(
    'selectedMessagesCollection',
  );
  // const messagesArray = JSON.parse(messagesCollectionInString);
  const accessToken = localStorage.getItem('accessToken');
  const category = localStorage.getItem('noteCategory');
  // 即將存進mongoDB的json 5p4ux,4

  // TODO: 待改message傳送方式
  const messagesToBeSent = {
    category: category,
    messagesToBeSaved: messagesCollectionInString,
    token: accessToken,
  };

  const handleTransferAfterConfirm = () => {
    // 記住object re-render的雷
    messagesToBeSent.Title = cardTitle;
    messagesToBeSent.Notes = cardNotes;

    // TODO:
    // 1. 按下確認後，儲存至DB以及store
    // POST API (帶message ID即可)
    // store action and (帶整串，因為等等要用整串渲染右邊卡片區)
    saveTransferredMessagesToMongo(messagesToBeSent);
    // addCardsAfterTransfer(messagesToBeSent);
    // // 2. 將核取方塊狀態設回去
    setTransferButtonDisabled(true);
    setSaveMessageButtonDisabled(false);
    // showSelectMessageBox(true, 'plain');
    showSelectMessageBox(true, 'hidden');

    // 清空localStorage
    setCardTitle('');
    setCardNotes('');
    handleClosePopout();
  };

  const handleClosePopout = () => {
    // 清空localStorage，並且把核取方塊轉為hidden(不能選)

    localStorage.removeItem('selectedMessagesCollection');
    localStorage.removeItem('noteCategory');
    showSelectMessageBox(true, 'hidden');
    setCardTitle('');
    closePopout();
  };

  return (
    <div>
      <Box p={3}>
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
            <CategoryDropDown />
          </DialogContent>
          <DialogContent>
            {/* <DialogContentText>
              <Typography>Input Card Title</Typography>
            </DialogContentText> */}
            <>
              <InputField
                type="text"
                value={cardTitle}
                setValue={setCardTitle}
                placeholder="Card Title"
              ></InputField>
            </>
            <>
              <InputField
                type="text"
                value={cardNotes}
                setValue={setCardNotes}
                placeholder="Notes"
              ></InputField>
            </>
          </DialogContent>

          <SelectedMessagesArea />
          <DialogActions>
            <MainButton
              buttonName="Transfer"
              onClick={handleTransferAfterConfirm}
              customStyles={{ margin: '10' }}
            />
          </DialogActions>
        </Dialog>
      </Box>
    </div>
  );
};

const mapStoreStateToPropse = ({ card, chat }) => {
  return { ...card, ...chat };
};

const mapActionsToProps = (dispatch) => {
  return { ...getActions(dispatch) };
};

export default connect(
  mapStoreStateToPropse,
  mapActionsToProps,
)(TransferMessagePopout);
