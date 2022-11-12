const logout = () => {
  localStorage.clear();
  // 轉向至login page
  window.location.pathname = '/login';
};

export { logout };
