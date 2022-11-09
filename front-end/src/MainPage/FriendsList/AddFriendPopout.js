import React, { useState, useEffect } from 'react';
// https://mui.com/material-ui/react-dialog/
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';

import MainButton from '../../shared/components/MainButton';
import { validateInputMail } from '../../shared/utils/validators';
import { Typography } from '@mui/material';
import InputField from '../../shared/components/InputField';

// TODO: 透過mail來新增朋友
// 1. 按下新增好友按鈕打開popout
// 2. 送出邀請sendFriendRequest
const AddFriendPopout = ({
  isPopoutOpen,
  closePopout,
  // set and pass in redux store
  sendFriendRequest = () => {},
}) => {
  const [mail, setMail] = useState('');
  const [isMailValid, setIsMailValid] = useState('');

  const handleInvitationSent = () => {
    // TODO: send friend request to server
  };

  const handleClosePopout = () => {
    // 關掉popout並且setMail
    closePopout();
    setMail('');
  };

  useEffect(() => {
    // 檢查mail是否valid
    // 必須先過util來的email validator
    setIsMailValid(validateInputMail(mail));
  }, [mail, setIsMailValid]);

  return (
    <Dialog open={isPopoutOpen} onCloase={handleClosePopout}>
      <DialogTitle>
        <Typography>Invite by mail</Typography>
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          <Typography>Please enter a mail to invite friend</Typography>
        </DialogContentText>
        <InputField
          fieldname="Mail"
          type="text"
          // {mail} from state
          value={mail}
          setValue={setMail}
          placeholder="Please enter a valid mail"
        ></InputField>
      </DialogContent>
      <DialogActions>
        <MainButton
          buttonName="Confirm"
          onClick={handleInvitationSent}
          disabled={!isMailValid}
          customStyles={{ margin: '10' }}
        />
      </DialogActions>
    </Dialog>
  );
};

export default AddFriendPopout;
