import React from 'react';
import { IconButton, Tooltip } from '@mui/material';
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import { getActions } from '../../store/actions/card_actions';
import { connect } from 'react-redux';
import Swal from 'sweetalert2';

function SaveMessageButton({
  showSelectMessageBox,
  isSavedButtonDisabled,
  setSaveMessageButtonDisabled,
  setTransferButtonDisabled,
  setCancelButtonDisable,
}) {
  // 按下去後，選取的時候需要disable該button

  const handleSaveMessage = () => {
    Swal.fire('Select messages to be saved');
    // 本身轉成disabled
    setSaveMessageButtonDisabled(true);
    // Cancel transfer按鍵點亮
    setCancelButtonDisable(false);
    // 通知核取方塊換狀態 hidden 轉 visible
    showSelectMessageBox(false, 'visible');
    // 可以選取transfer Button
    setTransferButtonDisabled(false);
    // TODO: 但如果沒有選取訊息前不能傳
  };

  return (
    <>
      <Tooltip
        placement="bottom"
        title={'Start saving Message'}
        onClick={handleSaveMessage}
      >
        <IconButton color="primary" disabled={isSavedButtonDisabled}>
          <SaveAltIcon />
        </IconButton>
      </Tooltip>
    </>
  );
}

const mapStoreStateToPropse = ({ card }) => {
  return { ...card };
};

const mapActionsToProps = (dispatch) => {
  return { ...getActions(dispatch) };
};

export default connect(
  mapStoreStateToPropse,
  mapActionsToProps
)(SaveMessageButton);
