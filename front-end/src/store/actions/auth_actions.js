import * as api from '../../api';
import { showAlert } from './alert_actions';

const authActions = {
  // 定義redux action
  SET_USER_DETAILS: 'AUTH.SET_USER_DETAILS',
};

// redux 分發
const getActions = (dispatch) => {
  return {
    // login actoin, history object 轉發的動作 (careful for v6)
    login: (userDetails, history) => dispatch(login(userDetails, history)),
    // signup action
    signup: (userDetails, history) => dispatch(signup(userDetails, history)),
    setUserDetails: (userDetails) => {
      dispatch(setUserDetails(userDetails));
    },
  };
};

// This needs to be exported to auth_reducers later
const setUserDetails = (userDetails) => {
  return { type: authActions.SET_USER_DETAILS, userDetails };
};

// redux thunk, able to use async function calls in redux action
const login = (userDetails, forwardTo) => {
  return async (dispatch) => {
    // userDetails will become the data for this post request
    const response = await api.login(userDetails);
    if (response.error) {
      console.log(response?.exception?.response?.data);
      // show error message from API in alert, error是從login apis那邊的exception來的
      // dispatch(showAlert(response?.exception?.response?.data));
      return response?.exception?.response?.data;
    } else {
      // TODO: 把API回來的資料存在local storage
      // if the return is null, userDetails會變成undefined
      const { userDetails } = response?.data;
      localStorage.setItem('accessToken', response.data.accessToken);
      localStorage.setItem('userMail', response.data.mail);
      localStorage.setItem('userId', response.data.userId);

      // 改變store state (redux)
      dispatch(setUserDetails(userDetails));

      forwardTo('/homepage');
      return response.status;
    }
  };
};

const signup = (userDetails, forwardTo) => {
  return async (dispatch) => {
    const response = await api.signup(userDetails);

    if (response.error) {
      console.log(response?.exception?.response?.data);
      // show error message from API in alert
      dispatch(showAlert(response?.exception?.response?.data));
    } else {
      // TODO: 把API回來的資料存在local storage
      // if the return is null
      const { userDetails } = response?.data;
      localStorage.setItem(
        'accessToken',
        // TODO: 之後 JSON資料格式要統一
        response.data.data.tokeninfo.accessToken
      );
      localStorage.setItem('userMail', response.data.data.userinfo.mail);
      localStorage.setItem('userId', response.data.data.userinfo.id);

      dispatch(setUserDetails(userDetails));
      forwardTo('/homepage');
    }
  };
};

export { getActions, authActions };
