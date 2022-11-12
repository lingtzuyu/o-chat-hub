import React, { useState } from 'react';
import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import InviteConfirmButton from './InviteConfirmButton';
import { connect } from 'react-redux';
import { getActions } from '../../store/actions/friend_actions';

const InviteDataItems = ({
  id,
  username,
  mail,
  acceptInvite = () => {},
  rejectInvite = () => {},
}) => {
  const [buttonDisabled, setButtonDisabled] = useState(false);

  const dealAcceptInivte = () => {
    acceptInvite({ acceptId: id, token: localStorage.accessToken });
    // 如果按了一次 就不能再按第二次
    setButtonDisabled(true);
  };

  const dealRejectInivte = () => {
    rejectInvite({ acceptId: id, token: localStorage.accessToken });
    // 如果按了一次 就不能再按第二次
    setButtonDisabled(true);
  };

  return (
    // TODO: 之後可以再加上一些提示資訊tip
    <>
      <div style={{ width: '100%' }}>
        <Box
          sx={{
            width: '100%',
            height: '60px',
            marginTop: '20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          {/* 之後可以做一個頭像 */}
          <Typography
            variant="subtitle1"
            sx={{
              marginLeft: '10px',
              fontWeight: 600,
              flexGrow: 1,
              color: 'black',
            }}
          >
            {username}
          </Typography>
          <InviteConfirmButton
            disabled={buttonDisabled}
            // 不是放變數內的acceptInvite以及rejectInvite，應該是InviteConfirmButton做出來的那個母按鈕的變數
            handleAcceptInivte={dealAcceptInivte}
            handleRejectInivte={dealRejectInivte}
          />
        </Box>
      </div>
    </>
  );
};

// 設定完map Props後，回getActions去新增
const mapActionsToProps = (dispatch) => {
  return {
    ...getActions(dispatch),
  };
};
export default connect(null, mapActionsToProps)(InviteDataItems);
