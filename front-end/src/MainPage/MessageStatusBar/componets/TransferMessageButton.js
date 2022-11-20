import React, { useState } from 'react';

import { Button } from '@mui/material';

import { TransferMessagePopout } from './TransferMessagePopout';
import { getActions } from '../../../store/actions/card_actions';

import { connect } from 'react-redux';

function TransferMessageButton({
  showSelectMessageBox,
  fetchCardCategoryAction,
  saveTransferredMessagesToMongo,
}) {
  const [isPopoutOpen, setIsPopoutOpen] = useState(false);

  const handleTransferMessage = () => {
    // 1. 彈出視窗
    setIsPopoutOpen(true);
    // 2. 取得分類訊息並儲存在store中
    fetchCardCategoryAction();
    // 3. 確定將以下訊息傳送至 or 單純確認 => 完成，在SelectedMessageArea內展開
    // 4. TODO:按下之後傳送，並且把核取狀態轉回true
  };

  const handleClosePopout = () => {
    setIsPopoutOpen(false);
  };

  return (
    <>
      <Button variant="outlined" onClick={handleTransferMessage}>
        Transfer Message
      </Button>
      <TransferMessagePopout
        // 下一層我要隱藏checkbox用
        showSelectMessageBox={showSelectMessageBox}
        // 下一層我要反核取checkbx用

        isPopoutOpen={isPopoutOpen}
        closePopout={handleClosePopout}
        saveTransferredMessagesToMongo={saveTransferredMessagesToMongo}
      />
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
)(TransferMessageButton);
