import * as api from '../../api';

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
    //test
    console.log(response);

    if (response.error) {
      // TODO: show error message from API in alert, error是從login apis那邊的exception來的
    } else {
      // TODO: 把API回來的資料存在local storage
      // if the return is null, userDetails會變成undefined
      const { userDetails } = response?.data;
      localStorage.setItem('user', JSON.stringify(userDetails));

      // 改變store state (redux)
      dispatch(setUserDetails(userDetails));
      forwardTo('/profile');
    }
  };
};

const signup = (userDetails, forwardTo) => {
  return async (dispatch) => {
    const response = await api.signup(userDetails);
    //test
    console.log(response);

    if (response.error) {
      // TODO: show error message from API in alert
    } else {
      // TODO: 把API回來的資料存在local storage
      // if the return is null
      const { userDetails } = response?.data;
      localStorage.setItem('user', JSON.stringify('userDetails'));

      dispatch(setUserDetails(userDetails));
      forwardTo('/profile');
    }
  };
};

export { getActions, authActions };
