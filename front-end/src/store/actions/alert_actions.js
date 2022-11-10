const alertActions = {
  OPEN_ALERT_MESSAGE: 'ALERT.OPEN_ALERT_MESSAGE',
  CLOSE_ALERT_MESSAGE: 'ALERT.CLOSE_ALERT_MESSAGE',
};

const getActions = (dispatch) => {
  return {
    showAlert: (alertContent) => dispatch(showAlert(alertContent)),
    closeAlert: () => dispatch(closeAlert()),
  };
};

const showAlert = (alertContent) => {
  return {
    type: alertActions.OPEN_ALERT_MESSAGE,
    alertContent,
  };
};

const closeAlert = () => {
  return {
    type: alertActions.CLOSE_ALERT_MESSAGE,
  };
};

export { alertActions, getActions, showAlert, closeAlert };
