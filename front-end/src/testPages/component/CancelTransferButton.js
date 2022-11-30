import React from 'react';
import { IconButton, Tooltip } from '@mui/material';
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import CancelPresentationIcon from '@mui/icons-material/CancelPresentation';

import { getActions } from '../../store/actions/card_actions';
import { connect } from 'react-redux';
import Swal from 'sweetalert2';

const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000,
});

function CancelTransferButton({
  isCancelButtonDisabeld,
  setCancelButtonDisable,
  setTransferButtonDisabled,
  setSaveMessageButtonDisabled,
  showSelectMessageBox,
  chosenChatDetails,
}) {
  const handleCancel = () => {
    // 本身也變成disabled
    setCancelButtonDisable(true);
    // 將Transfer改disabled
    setTransferButtonDisabled(true);
    // save按鍵改為enabel (如果有選人的話)
    if (chosenChatDetails != null) {
      setSaveMessageButtonDisabled(false);
    }
    // 清空localStorage暫存訊息
    localStorage.removeItem('selectedMessagesCollection');
    // 將selected message box 隱藏 TODO: 以及反核取
    showSelectMessageBox(true, 'hidden');

    Toast.fire({
      icon: 'warning',
      title: 'Cancel Transfer!',
    });
  };

  return (
    <>
      <Tooltip
        placement="bottom"
        title={'Cancel Transfer'}
        onClick={handleCancel}
      >
        {/* 本身轉成disabled，預設是Disable，在saveButton按下後亮起 */}
        <IconButton color="warning" disabled={isCancelButtonDisabeld}>
          <CancelPresentationIcon />
        </IconButton>
      </Tooltip>
    </>
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
)(CancelTransferButton);
