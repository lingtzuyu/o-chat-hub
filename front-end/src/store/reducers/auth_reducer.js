import { authActions } from '../actions/auth_actions';

const initState = {
  userDetails: null,
};

const reducer = (state = initState, action) => {
  switch (action.type) {
    case authActions.SET_USER_DETAILS:
      return {
        ...state,
        // setUserDetails 那邊來的
        userDetails: action.userDetails,
      };
    default:
      return state;
  }
};

export default reducer;

// create action file for the reducer
