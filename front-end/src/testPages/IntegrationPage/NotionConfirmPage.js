import React from 'react';
import { IconButton, Tooltip } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';
import * as api from '../../api';

export default function NotionConfirmPage() {
  const params = new URL(window.document.location).searchParams;
  const code = params.get('code');
  // 如果param沒有帶code就返回

  const confirmLink = () => {
    console.log(code);
    const result = api.getNotionToken(code);
  };

  return (
    <>
      <Tooltip
        placement="bottom"
        title={'Confirm link notion with take-notes.chat'}
        onClick={confirmLink}
      >
        <IconButton color="primary">
          <CheckIcon />
        </IconButton>
      </Tooltip>
      <Tooltip
        placement="bottom"
        title={'Cancel link notion with take-notes.chat'}
      >
        <IconButton color="primary">
          <ClearIcon />
        </IconButton>
      </Tooltip>
    </>
  );
}
