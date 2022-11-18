import React from 'react';
import { Button } from '@mui/material';
import { getActions } from '../../../store/actions/card_actions';
import { connect } from 'react-redux';

function SaveMessageButton({ showSelectMessageBox }) {
  const handleSaveMessage = () => {
    // 通知核取方塊換狀態 false to true
    showSelectMessageBox(false);
    // 通知左上角文字換狀態
    // 通知按鍵換狀態
  };
  return (
    <Button variant="outlined" onClick={handleSaveMessage}>
      Save Message
    </Button>
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
