const notificationActions = {
  OPEN_NOTIFY_MESSAGE: 'ALERT.OPEN_NOTIFY_MESSAGE',
  CLOSE_NOTIFY_MESSAGE: 'ALERT.CLOSE_NOTIFY_MESSAGE',
};

export const getActions = (dispatch) => {
  return {
    // 就跟剛剛login跟signup一樣
    openNotifyMessage: (content) => dispatch(openNotifyMessage(content)),
    closeNotifyMessage: () => dispatch(closeNotifyMessage()),
  };
};

//  這邊要export出去給auth_action改變內容state用
export const openNotifyMessage = (content) => {
  return { type: notificationActions.OPEN_NOTIFY_MESSAGE, content };
};

export const closeNotifyMessage = () => {
  return { type: notificationActions.CLOSE_NOTIFY_MESSAGE };
};

export default notificationActions;
