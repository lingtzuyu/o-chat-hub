import React, { useState } from 'react';
import { IconButton, Tooltip } from '@mui/material';
import InputIcon from '@mui/icons-material/Input';
import TransferMessagePopout from './TransferMessagePopout';
import { getActions } from '../../store/actions/card_actions';
import { connect } from 'react-redux';

function SaveMessageButton({
  showSelectMessageBox,
  fetchCardCategoryAction,
  saveTransferredMessagesToMongo,
  setSaveMessageButtonDisabled,
}) {
  // 彈窗後的轉換訊息到卡片的動作
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

  //  用action將bookmark設回hidden

  return (
    <>
      <Tooltip
        placement="bottom"
        title={'Transfer selected messages'}
        onClick={handleTransferMessage}
      >
        <IconButton color="primary">
          <InputIcon />
        </IconButton>
      </Tooltip>

      <TransferMessagePopout
        // 下一層關閉視窗的時候我要隱藏checkbox
        showSelectMessageBox={showSelectMessageBox}
        isPopoutOpen={isPopoutOpen}
        closePopout={handleClosePopout}
        saveTransferredMessagesToMongo={saveTransferredMessagesToMongo}
        setSaveMessageButtonDisabled={setSaveMessageButtonDisabled}
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
)(SaveMessageButton);
