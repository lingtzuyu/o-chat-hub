import React from 'react';
// TODO: 用snakebar做 https://mui.com/material-ui/react-snackbar/
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import { connect } from 'react-redux';
// 注意這邊的getActions在每個地方 (例如這邊跟auth)都不一樣，getActions只是一個通用的
import { getActions } from '../../store/actions/notification_action';

const NotificationError = ({
  showNotification,
  openNotifyMessage,
  closeNotifyMessage,
}) => {
  return (
    <Snackbar
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      // if openNotifyMessage is true, then open the alert
      open={openNotifyMessage}
      onClose={closeNotifyMessage}
      autoHideDuration={5000}
    >
      <Alert serverity="info">{showNotification}</Alert>
      {/* TODO: 去auth那邊接回alert訊息 */}
    </Snackbar>
  );
};

// connect 回去
const mapStoreStatesToProps = (notification) => {
  return { ...notification };
};

// map actions to props
const mapActionsToProps = (dispatch) => {
  return { ...getActions(dispatch) };
};

export default connect(
  mapStoreStatesToProps,
  mapActionsToProps
)(NotificationError);
