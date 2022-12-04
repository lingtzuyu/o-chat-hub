import React, { useState, useCallback } from 'react';
import {
  TextField,
  Autocomplete,
  Box,
  Card,
  Grid,
  styled,
  Dialog,
  DialogContent,
  DialogTitle,
  Typography,
  DialogActions,
  Tooltip,
} from '@mui/material';

import InputField from '../../shared/components/InputField';
import Swal from 'sweetalert2';
import CategoryDropDown from './CategoryDropDown';

import { connect } from 'react-redux';
import { getActions } from '../../store/actions/card_actions';
import SelectedMessagesArea from './SelectedMessagesArea';
import MainButton from './MainButton';

// https://www.npmjs.com/package/react-quill
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const EditorWrapper = styled(Box)(
  ({ theme }) => `

    .ql-editor {
      min-height: 100px;
    }

    .ql-snow .ql-picker {
      color: ${theme.colors.alpha.black[100]};
    }

    .ql-snow .ql-stroke {
      stroke: ${theme.colors.alpha.black[100]};
    }

    .ql-toolbar.ql-snow {
      border-top-left-radius: ${theme.general.borderRadius};
      border-top-right-radius: ${theme.general.borderRadius};
    }

    .ql-toolbar.ql-snow,
    .ql-container.ql-snow {
      border-color: ${theme.colors.alpha.black[30]};
    }

    .ql-container.ql-snow {
      border-bottom-left-radius: ${theme.general.borderRadius};
      border-bottom-right-radius: ${theme.general.borderRadius};
    }

    &:hover {
      .ql-toolbar.ql-snow,
      .ql-container.ql-snow {
        border-color: ${theme.colors.alpha.black[50]};
      }
    }
`
);

const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000,
});

function TransferPopOutTable({
  isPopoutOpen,
  closePopout,
  showSelectMessageBox,
  saveTransferredMessagesToMongo,
  setSaveMessageButtonDisabled,
  setTransferButtonDisabled,
  chosenChatDetails,
  setCancelButtonDisable,
}) {
  const [cardTitle, setCardTitle] = useState('');
  const [cardNotes, setCardNotes] = useState('');

  // 帶著accessToken認證欲儲存的訊息
  const messagesCollectionInString = localStorage.getItem(
    'selectedMessagesCollection'
  );
  const messagesArray = JSON.parse(messagesCollectionInString);
  const accessToken = localStorage.getItem('accessToken');
  const category = localStorage.getItem('noteCategory');

  // 即將存進mongoDB的json 5p4ux,4

  const messagesToBeSent = {
    category: category,
    messagesToBeSaved: messagesArray,
    token: accessToken,
    From: chosenChatDetails?.name,
    FromId: chosenChatDetails?.id,
  };

  // useEffect(() => {
  //   messagesToBeSent['Title'] = cardTitle;

  //   console.log('messagesToBeSent.Title', messagesToBeSent.Title);
  // }, [cardTitle]);

  // useEffect(() => {
  //   messagesToBeSent['Notes'] = cardNotes;
  //   console.log('test effect222', messagesToBeSent.Notes);
  // }, [cardNotes]);

  const handleTransferAfterConfirm = useCallback(async () => {
    // console.log(category);

    // 記住object re-render的雷
    messagesToBeSent.Title = cardTitle;
    messagesToBeSent.Notes = cardNotes;

    // console.log('堂新民', messagesToBeSent);
    // TODO:
    // 1. 按下確認後，儲存至DB以及store
    // POST API (帶message ID即可)
    // store action and (帶整串，因為等等要用整串渲染右邊卡片區)

    saveTransferredMessagesToMongo(messagesToBeSent);

    // // 2. 將核取方塊狀態設回去
    setTransferButtonDisabled(true);
    setSaveMessageButtonDisabled(false);
    // showSelectMessageBox(true, 'plain');
    showSelectMessageBox(true, 'hidden');

    // 清空localStorage
    setCardTitle('');
    setCardNotes('');
    handleClosePopout();
    Toast.fire({
      icon: 'success',
      title: 'Note Saved!',
    });
  }, [cardTitle, cardNotes]);

  const handleClosePopout = () => {
    // 清空localStorage，並且把核取方塊轉為hidden(不能選)
    localStorage.removeItem('selectedMessagesCollection');
    localStorage.removeItem('noteCategory');
    showSelectMessageBox(true, 'hidden');
    setCardTitle('');

    // diable自己
    setTransferButtonDisabled(true);
    // enable save button ，若有選中的聊天對象
    if (chosenChatDetails != null) {
      setSaveMessageButtonDisabled(false);
    }
    // disable cancel button
    setCancelButtonDisable(true);

    //  提示
    Toast.fire({
      icon: 'warning',
      title: 'Cancel Transfer!',
    });

    closePopout();
  };

  return (
    <Box p={3}>
      <Dialog open={isPopoutOpen} onClose={handleClosePopout}>
        <DialogTitle>
          <Typography align="center" variant="h3">
            Transferring Messages
          </Typography>
        </DialogTitle>
        <DialogContent>
          <Card
            sx={{
              p: 3,
            }}
          >
            {/* <CategoryDropDown /> */}

            <Grid container spacing={3}>
              <Grid item xs={12}>
                <CategoryDropDown />
              </Grid>
              <Grid item xs={12}>
                <InputField
                  fullWidth
                  name="title"
                  placeholder={'Card title here...'}
                  variant="outlined"
                  value={cardTitle}
                  setValue={setCardTitle}
                  // setValue={setCardTitle}
                />
              </Grid>
              <Grid item xs={12}>
                <EditorWrapper>
                  <ReactQuill
                    value={cardNotes}
                    onChange={setCardNotes}
                    placeholder={'Notes here...'}
                  />
                </EditorWrapper>
              </Grid>
            </Grid>
          </Card>
        </DialogContent>

        <DialogTitle>
          <Typography align="center" variant="h3">
            Selected Messages
          </Typography>
        </DialogTitle>
        <DialogContent>
          <SelectedMessagesArea />
        </DialogContent>
        <DialogActions>
          <Tooltip title="transfer to card area">
            <MainButton
              variant="outlined"
              buttonName="Transfer"
              onClick={handleTransferAfterConfirm}
              customStyles={{ variant: 'contained', margin: '20' }}
            />
          </Tooltip>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

const mapStoreStateToPropse = ({ card, chat }) => {
  return { ...card, ...chat };
};

const mapActionsToProps = (dispatch) => {
  return { ...getActions(dispatch) };
};

export default connect(
  mapStoreStateToPropse,
  mapActionsToProps
)(TransferPopOutTable);
