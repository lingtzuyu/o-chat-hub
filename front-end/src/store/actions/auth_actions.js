import * as api from '../../api';
import { showAlert } from './alert_actions';

const authActions = {
  // 定義redux action
  SET_USER_DETAILS: 'AUTH.SET_USER_DETAILS',
  SET_USERNAME: 'AUTH.SET_USERNAME',
  SET_USERINFO: 'AUTH.SET_USERINFO',
  SET_ORGANIZATION: 'AUTH.SET_ORGANIZATION',
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
    setNewUserNameInStore: (userName) => {
      dispatch(setNewUserNameInStore(userName));
    },
    setNewOrganizationInStore: (organization) => {
      dispatch(setNewOrganizationInStore(organization));
    },
    getUserInfoDetail: (token) => {
      dispatch(getUserInfoDetail(token));
    },
  };
};

export const getUserInfoDetail = (token) => {
  return async (dispatch) => {
    const response = await api.getUserProfile(token);
    if (response.error) {
      console.log(response?.exception?.response?.data);
    } else {
      console.log('getUserInfo', response.data.result);
      dispatch(setUserInfoDetail(response.data.result));
      return response.status;
    }
  };
};

export const setUserInfoDetail = (response) => {
  return { type: authActions.SET_USERINFO, userInfoData: response };
};

export const setNewUserNameInStore = (userName) => {
  return { type: authActions.SET_USERNAME, userName: userName };
};

export const setNewOrganizationInStore = (organization) => {
  return {
    type: authActions.SET_ORGANIZATION,
    organization: organization,
  };
};

// This needs to be exported to auth_reducers later
const setUserDetails = (userDetails) => {
  return { type: authActions.SET_USER_DETAILS, userDetails };
};

// login
const login = (userDetails, forwardTo) => {
  console.log('login action', userDetails);
  // {mail: 'test8888@gmail.com', password: '88888888'}
  return async (dispatch) => {
    // userDetails will become the data for this post request
    const response = await api.login(userDetails);
    console.log('login action', response);
    // {data: {…}, status: 200, statusText: 'OK', headers: AxiosHeaders, config: {…}, …}
    if (response.error) {
      // {error: true, exception: AxiosError}
      console.log('login-error', response?.exception?.response?.data);
      // show error message from API in alert, error是從login apis那邊的exception來的
      // dispatch(showAlert(response?.exception?.response?.data));
      // FIXME: 前端已經用toast直接跳error了，不從這邊接了
      return response?.exception?.response?.data;
      // {msg: 'Unauthenticated, mail or password is wrong'}
    } else {
      // TODO: 把API回來的資料存在local storage
      // if the return is null, userDetails會變成undefined
      const { accessToken } = response?.data?.data?.tokeninfo;
      console.log('response?.data?.data?.tokeninfo', accessToken);
      console.log('userDetail到底是啥', userDetails);
      localStorage.setItem(
        'accessToken',
        response.data.data.tokeninfo.accessToken,
      );
      // // FIXME: 找到哪裡受影響後刪除，後面應該全用token去解
      // localStorage.setItem('userMail', response.data.data.userinfo.mail);
      // localStorage.setItem('userId', response.data.data.userinfo.userId);

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
        response.data.data.tokeninfo.accessToken,
      );
      localStorage.setItem('userMail', response.data.data.userinfo.mail);
      localStorage.setItem('userId', response.data.data.userinfo.id);

      dispatch(setUserDetails(userDetails));
      forwardTo('/homepage');
      return response.status;
    }
  };
};

export { getActions, authActions };
