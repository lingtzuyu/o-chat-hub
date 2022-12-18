// 取代invitation data item

import React, { useState } from 'react';
import {
  Box,
  Typography,
  Avatar,
  Tooltip,
  AvatarGroup,
  lighten,
  styled,
} from '@mui/material';

import InviteConfirmButton from './InviteConfirmButton';

import { connect } from 'react-redux';
import { getActions } from '../../store/actions/friend_actions';

const MeetingBox = styled(Box)(
  ({ theme }) => `
          background-color: ${lighten(theme.colors.alpha.black[10], 0.5)};
          margin: ${theme.spacing(2)} 0;
          border-radius: ${theme.general.borderRadius};
          padding: ${theme.spacing(2)};
    `,
);

export const LeftBarPendingListBuilder = ({
  id,
  username,
  mail,
  photo,
  acceptInvite = () => {},
  rejectInvite = () => {},
}) => {
  const [buttonDisabled, setButtonDisabled] = useState(false);

  const dealAcceptInivte = () => {
    acceptInvite({ userId: id, token: localStorage.accessToken });
    // 如果按了一次 就不能再按第二次
    setButtonDisabled(true);
  };

  const dealRejectInivte = () => {
    rejectInvite({ userId: id, token: localStorage.accessToken });
    // 如果按了一次 就不能再按第二次
    setButtonDisabled(true);
  };

  return (
    <>
      <MeetingBox>
        <Typography variant="h4">{username}</Typography>

        <Box display="flex" alignItems="center" justifyContent="space-between">
          <AvatarGroup>
            <Tooltip arrow title={mail}>
              <Avatar
                sx={{
                  width: 28,
                  height: 28,
                }}
                to="#"
                alt={username}
                src={photo}
              />
            </Tooltip>
          </AvatarGroup>
          <InviteConfirmButton
            disabled={buttonDisabled}
            // 不是放變數內的acceptInvite以及rejectInvite，應該是InviteConfirmButton做出來的那個母按鈕的變數
            handleAcceptInivte={dealAcceptInivte}
            handleRejectInivte={dealRejectInivte}
          />
        </Box>
      </MeetingBox>
    </>
  );
};

const mapActionsToProps = (dispatch) => {
  return {
    ...getActions(dispatch),
  };
};
export default connect(null, mapActionsToProps)(LeftBarPendingListBuilder);
