import { alertActions } from '../actions/alert_actions';

const initState = {
  showAlert: false,
  alertContent: null,
};

const reducer = (state = initState, action) => {
  switch (action.type) {
    case alertActions.OPEN_ALERT_MESSAGE:
      return {
        ...state,
        showAlert: true,
        alertContent: action.content,
      };
    case alertActions.CLOSE_ALERT_MESSAGE:
      return {
        ...state,
        showAlert: false,
        alertContent: null,
      };
    default:
      return state;
  }
};

export default reducer;
