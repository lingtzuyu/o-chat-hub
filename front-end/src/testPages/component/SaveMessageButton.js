import React from 'react';
import { IconButton, Tooltip } from '@mui/material';
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import { getActions } from '../../store/actions/card_actions';
import { connect } from 'react-redux';

function SaveMessageButton({
  showSelectMessageBox,
  isSavedButtonDisabled,
  setSaveMessageButtonDisabled,
}) {
  // 按下去後，選取的時候需要disable該button

  const handleSaveMessage = () => {
    // 本身轉成disabled
    // TODO: snackbar通知選取訊息
    setSaveMessageButtonDisabled(true);
    // 通知核取方塊換狀態 hidden 轉 visible
    showSelectMessageBox(false, 'visible');
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
