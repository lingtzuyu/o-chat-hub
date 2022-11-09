export const logout = () => {
  // TODO: 清掉全部，如果之後Trello要把API存在這邊的話要注意
  localStorage.clear();
  window.location.pathname = '/login';
};
