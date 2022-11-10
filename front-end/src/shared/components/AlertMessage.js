import React from 'react';
import Alert from '@mui/material/Alert';

// https://mui.com/material-ui/react-snackbar/
import Snackbar from '@mui/material/Snackbar';
import { connect } from 'react-redux';
import { getActions } from '../../store/actions/alert_actions';

// use showAlert, closeAlert, content as PROPS
// showAlert from reducer
// closeAlert from getActions
const AlertMessage = ({ showAlert, closeAlert, alertContent }) => {
  return (
    <Snackbar
      // 定錨點
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      open={showAlert}
      onClose={closeAlert}
      // https://stackoverflow.com/questions/55238278/autohideduration-is-not-working-in-snackbar-material-ui
      autoHideDuration={6000}
    >
      {/* severity 驚嘆號底色等等 */}
      {/* TODO: 待修改 */}
      <Alert severity="warning">{alertContent}</Alert>
    </Snackbar>
  );
};

// 綁定redux

const mapStoreStateToProps = ({ alert }) => {
  return {
    ...alert,
  };
};

const mapActionsToProps = (dispatch) => {
  return {
    ...getActions(dispatch),
  };
};

export default connect(mapStoreStateToProps, mapActionsToProps)(AlertMessage);
