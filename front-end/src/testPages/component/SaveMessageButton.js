import React from 'react';
import { IconButton, Tooltip } from '@mui/material';
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import { getActions } from '../../store/actions/card_actions';
import { connect } from 'react-redux';

function SaveMessageButton({
  showSelectMessageBox,
  isSavedButtonDisabled,
  setSaveMessageButtonDisabled,
  setTransferButtonDisabled,
}) {
  // 按下去後，選取的時候需要disable該button

  const handleSaveMessage = () => {
    // 本身轉成disabled
    // TODO: snackbar通知選取訊息
    setSaveMessageButtonDisabled(true);
    // 通知核取方塊換狀態 hidden 轉 visible
    showSelectMessageBox(false, 'visible');
    // 可以選取transfer Button
    // TODO: 但如果沒有選取訊息前不能傳
    setTransferButtonDisabled(false);
  };

  // TODO: 如果選擇到了好友，才能按，從store拿chosenChatDetail
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
