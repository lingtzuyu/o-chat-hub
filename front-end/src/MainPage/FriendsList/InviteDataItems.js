import React, { useState } from 'react';
import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import InviteConfirmButton from './InviteConfirmButton';

const InviteDataItems = ({
  id,
  username,
  mail,
  acceptInvite = () => {},
  rejectInvite = () => {},
}) => {
  const [buttonDisabled, setButtonDisabled] = useState(false);

  const handleAcceptInivte = () => {
    acceptInvite({ id });
    // 如果按了一次 就不能再按第二次
    setButtonDisabled(true);
  };

  const handleRejectInivte = () => {
    rejectInvite({ id });
    // 如果按了一次 就不能再按第二次
    setButtonDisabled(true);
  };

  return (
    // TODO: 之後可以再加上一些提示資訊tip
    <div style={{ width: '100%' }}>
      <Box
        sx={{
          width: '100%',
          height: '60px',
          marginTop: '20px',
          display: 'flex',
          alignItems: 'centerr',
          justifyContent: 'space-between',
        }}
      >
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
          acceptInvite={handleAcceptInivte}
          rejectInite={handleRejectInivte}
        />
      </Box>
    </div>
  );
};

export default InviteDataItems;
